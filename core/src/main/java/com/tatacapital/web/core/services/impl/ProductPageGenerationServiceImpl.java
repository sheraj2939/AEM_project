package com.tatacapital.web.core.services.impl;

import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.tatacapital.web.core.models.ConfigModel;
import com.tatacapital.web.core.services.ProductPageGenerationService;
import com.tatacapital.web.core.services.ResourceHelper;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.util.*;
import java.util.stream.Collectors;

@Component(service = ProductPageGenerationService.class, immediate = true)
public class ProductPageGenerationServiceImpl implements ProductPageGenerationService {

    @Reference
    ResourceHelper resHelper;

    @Reference
    HttpClientBuilderFactory httpFactory;

    Logger log = LoggerFactory.getLogger(this.getClass());

    ConfigModel configModel = ConfigModel.getInstance();

    private static JsonArray setListOfSalary(JsonObject jsonObject, String pageGenType) {
        if (pageGenType.equalsIgnoreCase("productSalary")) {
            JsonArray jsonArray = new JsonArray();
            JsonArray productCityArr = jsonObject.has("Master") ? jsonObject.getAsJsonArray("Master") : new JsonArray();
            for (JsonElement pageJsonElement : productCityArr) {
                JsonObject pageJsonObj = pageJsonElement.getAsJsonObject();
                String currentSalary = pageJsonObj.has("salary") ? pageJsonObj.get("salary").getAsString() : StringUtils.EMPTY;
                jsonArray.add(currentSalary);
            }
            return jsonArray;
        }
        return new JsonArray();
    }

    @Override
    public JsonObject getMdmApiCall(String mdmHostUrl) {
        try {
            URIBuilder uriBuilder = new URIBuilder(mdmHostUrl);
            log.debug("Product City Api Uri :{}", uriBuilder);
            HttpClientBuilder builder = httpFactory.newBuilder();
            RequestConfig requestConfig = RequestConfig.custom()
                    .setConnectTimeout(15000)
                    .setSocketTimeout(15000)
                    .build();
            builder.setDefaultRequestConfig(requestConfig);
            CloseableHttpClient client = httpFactory.newBuilder().build();
            HttpGet get = new HttpGet(uriBuilder.build());
            HttpResponse httpResponse = client.execute(get);
            log.debug("Status Code :{}", httpResponse.getStatusLine().getStatusCode());
            BufferedReader br = new BufferedReader(new InputStreamReader((httpResponse.getEntity().getContent())));
            String output;
            StringBuilder responseJsonString = new StringBuilder();
            while ((output = br.readLine()) != null) {
                responseJsonString.append(output);
            }
            log.debug("Response Json String Size:{}", responseJsonString.length());
            return JsonParser.parseString(responseJsonString.toString()).getAsJsonObject();
        } catch (IOException | URISyntaxException e) {
            log.error("Exception in ProductCityServiceImpl in getProductCityApi() method : {0}");
        }
        return new JsonObject();
    }

    @Override
    public Map<String, Integer> generatePages(JsonObject jsonObject, String templatePath, String[] pagesToDelete, String pageGenType) {
        try {
            int count = 0;
            Map<String, Integer> responseMessage = new HashMap<>();
            JsonArray listOfSalary = setListOfSalary(jsonObject, pageGenType);
            JsonArray productCityArr = jsonObject.has("Master") ? jsonObject.getAsJsonArray("Master") : new JsonArray();
            log.debug("Total Data Size For Product Api : {}", productCityArr.size());
            ResourceResolver resourceResolver = resHelper.getResourceResolver();
            Session session = resourceResolver.adaptTo(Session.class);
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            listOfPagesToDelete(pagesToDelete, resourceResolver, session, pageGenType);
            if (Objects.nonNull(session)) {
                for (JsonElement pageJsonElement : productCityArr) {
                    JsonObject pageJsonObj = pageJsonElement.getAsJsonObject();
                    String productCode = pageJsonObj.has("productcode") ? pageJsonObj.get("productcode").getAsString() : StringUtils.EMPTY;
                    String productCity = pageJsonObj.has("cityname") ? pageJsonObj.get("cityname").getAsString() : StringUtils.EMPTY;
                    String productSalary = pageJsonObj.has("salary") ? pageJsonObj.get("salary").getAsString() : StringUtils.EMPTY;
                    String productTitle = pageJsonObj.has("product-title") ? pageJsonObj.get("product-title").getAsString() : StringUtils.EMPTY;
                    String productDesc = pageJsonObj.has("product-description") ? pageJsonObj.get("product-description").getAsString() : StringUtils.EMPTY;
                    String rootPath = Objects.nonNull(configModel.getValue(productCode)) ? configModel.getValue(productCode).toString() : StringUtils.EMPTY;
                    String finalPageName = createPageName(rootPath, productCity, productSalary, pageGenType);
                    log.debug("Product City Page Name : {}", finalPageName);
                    if (session.itemExists(rootPath) && StringUtils.isNotEmpty(finalPageName) && !session.itemExists(rootPath.concat("/").concat(finalPageName))) {
                        Page newPage = pageManager.create(rootPath, finalPageName, templatePath, productTitle);
                        count++;
                        pageProperties(newPage, productSalary, productCity, session, listOfSalary, pageGenType,productDesc);
                    }
                }
                responseMessage.put("Received Count Of Data", productCityArr.size());
                responseMessage.put("Total Page Generated", count);
            }
            log.debug("Pages Generated {} out of {}", count, productCityArr.size());
            return responseMessage;
        } catch (Exception e) {
            log.error("Exception in ProductCityServiceImpl in createProductCityPage() : {}", e.getMessage());
        }
        return new HashMap<>();
    }

    private void pageProperties(Page newPage, String salary, String cityName, Session session, JsonArray jsonArray, String pageGenType,String productDesc) throws RepositoryException {
        Node newNode = newPage.adaptTo(Node.class);
        if (newNode != null) {
            Node pageProperties = newNode.hasNode("jcr:content") ? newNode.getNode("jcr:content") : null;
            if (pageProperties != null) {
                if (pageGenType.equalsIgnoreCase("productSalary")) {
                    pageProperties.setProperty("currentSalary", salary);
                    pageProperties.setProperty("listOfSalary", String.valueOf(jsonArray));
                    pageProperties.setProperty("dynamiclyGenerated", "Yes");
                    session.save();
                } else if (pageGenType.equalsIgnoreCase("productCity")) {
                    pageProperties.setProperty("cityName", cityName);
                    pageProperties.setProperty("jcr:description", productDesc);
                    pageProperties.setProperty("dynamiclyGenerated", "Yes");
                    session.save();

                }
            }
        }
    }

    private String createPageTitle(String pageName) {
        if (StringUtils.isNotEmpty(pageName)) {
            String pageTitle = Arrays.stream(pageName.split("-")).map(str -> str.substring(0, 1).toUpperCase().concat(str.substring(1)).concat(" ")).collect(Collectors.joining());
            log.debug("Page Title : {}", pageTitle);
            return pageTitle;
        } else {
            log.error("PageName is Empty or Null : {0}");
        }
        return StringUtils.EMPTY;
    }

    public String createPageName(String rootPath, String cityName, String salary, String pageGenType) {
        try {
            if (StringUtils.isNotEmpty(rootPath) && StringUtils.isNotEmpty(salary) && pageGenType.equalsIgnoreCase("productSalary")) {
                String pageName = rootPath.split("/")[4] + "-for-".concat(salary).concat("-salary");
                String finalPageName = JcrUtil.createValidName(pageName);
                log.debug("Final Page Name : {}", finalPageName);
                return finalPageName;
            } else if (StringUtils.isNotEmpty(rootPath) && StringUtils.isNotEmpty(cityName) && pageGenType.equalsIgnoreCase("productCity")) {
                String pageName = rootPath.split("/")[4] + "-in-".concat(cityName);
                String finalPageName = JcrUtil.createValidName(pageName);
                log.debug("Final Page Name : {}", finalPageName);
                return finalPageName;
            } else {
                log.error("RootPath or CityName is Empty or Null : {0}");

            }
        } catch (ArrayIndexOutOfBoundsException e) {
            log.error("Exception in ProductCityServiceImpl in createPageName() : {}", e.getMessage());
        }catch (Exception e){
            log.error("Exception Occured : {}",e.getMessage());
        }
        return StringUtils.EMPTY;
    }

    public void deletePages(ResourceResolver resourceResolver, Session session, String pageType, String productRootPath) {
        try {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            if (session.itemExists(productRootPath)) {
                Resource sourcePath = resourceResolver.getResource(productRootPath);
                Page containingPage = pageManager.getContainingPage(sourcePath);
                Iterator<Page> pageIterator = containingPage.listChildren();
                while (pageIterator.hasNext()) {
                    Page page = pageIterator.next();
                    if (page.getProperties().containsKey("dynamiclyGenerated") && page.getProperties().containsKey("currentSalary") && pageType.equalsIgnoreCase("productSalary")) {
                        session.removeItem(page.getPath());
                        session.save();
                    } else if (page.getProperties().containsKey("dynamiclyGenerated") && page.getProperties().containsKey("cityName") && pageType.equalsIgnoreCase("productCity")) {
                        session.removeItem(page.getPath());
                        session.save();
                    }

                }
            }
        } catch (Exception ex) {
            log.error("Exception in Product Page Gen Service Impl : {0}");
        }


    }

    private void listOfPagesToDelete(String[] pagesToDelete, ResourceResolver resourceResolver, Session session, String pageGenType) {
        for (String rootPath : pagesToDelete) {
            deletePages(resourceResolver, session, pageGenType, rootPath);
        }
    }

}

