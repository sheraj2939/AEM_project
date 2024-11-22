package com.tatacapital.web.core.services.impl;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.tatacapital.web.core.constants.TataCapitalWebConstants;
import com.tatacapital.web.core.services.PropertyDisposalService;
import com.tatacapital.web.core.services.ResourceHelper;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
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
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component(service = PropertyDisposalService.class, immediate = true)
public class PropertyDisposalServiceImpl implements PropertyDisposalService {

    @Reference
    ResourceHelper resHelper;

    @Reference
    HttpClientBuilderFactory httpFactory;

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public JsonObject fetchApi(String mdmHostUrl, String mdmAuthToken) {
        try {
            URIBuilder builder = new URIBuilder(mdmHostUrl);
            log.info("Property Asset Disposal Api Uri :{}", builder);
            CloseableHttpClient client = httpFactory.newBuilder().build();
            HttpGet get = new HttpGet(builder.build());
            get.addHeader("Authorization", mdmAuthToken);
            HttpResponse httpResponse = client.execute(get);
            log.info("Property Asset Disposal Status Code :{}", httpResponse.getStatusLine().getStatusCode());
            BufferedReader br = new BufferedReader(new InputStreamReader((httpResponse.getEntity().getContent())));
            String output;
            StringBuilder responseJsonString = new StringBuilder();
            while ((output = br.readLine()) != null) {
                responseJsonString.append(output);
            }
            log.info("Response Json String Size:{}", responseJsonString.length());
            return JsonParser.parseString(responseJsonString.toString()).getAsJsonObject();
        } catch (IOException | URISyntaxException e) {
            log.error("Exception in PropertyDisposalServiceImpl in fetchApi() method : {0}");
        }
        return new JsonObject();
    }

    @Override
    public Map<String, Integer> createPropertyDisposalPage(JsonObject jsonObject, String rootPath, String templatePath) {
        try {
            int count = 0;
            Map<String, Integer> responseMessage = new HashMap<>();
            JsonArray propertyDisposalArr = jsonObject.getAsJsonArray("Master");
            log.info("PropertyDisposal Data count : {}", propertyDisposalArr.size());
            ResourceResolver resourceResolver = resHelper.getResourceResolver();
            Session session = resourceResolver.adaptTo(Session.class);
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            createAndBackup(resourceResolver, session);
            if (Objects.nonNull(session)) {
                for (JsonElement pageJsonElement : propertyDisposalArr) {
                    JsonObject pageJsonObj = pageJsonElement.getAsJsonObject();
                    String propertyName = pageJsonObj.get("property-name").getAsString().trim();
                    String contractNo = pageJsonObj.get("contract-no-").getAsString().trim();
                    String finalPageName = toHypenCase(propertyName).concat("-" + contractNo.toLowerCase());
                    try {
                        if (session.itemExists(rootPath)) {
                            Page newPage = pageManager.create(rootPath, finalPageName, templatePath, propertyName);
                            count++;
                            pageProperties(newPage, pageJsonObj, session);
                        }
                    } catch (Exception e) {
                        log.error("Exception in this Page : {}", finalPageName + " " + propertyName + " " + contractNo);
                    }
                }
                responseMessage.put("Received Count Of Data", propertyDisposalArr.size());
                responseMessage.put("Total Page Generated", count);
            }
            log.info("Pages Generated {} out of {}", count, propertyDisposalArr.size());
            return responseMessage;
        } catch (Exception e) {
            log.error("Exception in creating pages : {}", e.getMessage());
        }
        return new HashMap<>();
    }

    private void pageProperties(Page newPage, JsonObject pageJsonObject, Session session) throws RepositoryException {
        Node newNode = newPage.adaptTo(Node.class);
        if (newNode != null) {
            Node pageProperties = newNode.getNode("jcr:content");
            if (pageProperties != null) {
                for (Map.Entry<String, JsonElement> entry : pageJsonObject.entrySet()) {
                    String propKey = entry.getKey();
                    JsonElement jsonElement = entry.getValue();
                    if (jsonElement.isJsonPrimitive()) {
                        pageProperties.setProperty(propKey, jsonElement.getAsString());
                    } else {
                        pageProperties.setProperty(propKey, jsonElement.toString());
                    }
                }
            }
        }
        session.save();
    }


    public void createAndBackup(ResourceResolver resourceResolver, Session session) {
        log.info("****** Create Backup function called ******");
        try {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            if (session.itemExists(TataCapitalWebConstants.PROPERTY_DISPOSAL_BKP_LISTING_ROOT_PATH)) {
                log.info("****** Poperty Listing Backup page exist ******");
                pageManager.delete(pageManager.getPage(TataCapitalWebConstants.PROPERTY_DISPOSAL_BKP_LISTING_ROOT_PATH), false, true);
            }
            if (session.itemExists(TataCapitalWebConstants.PROPERTY_DISPOSAL_LISTING_ROOT_PATH)) {
                log.info("****** Poperty Listing Page exist ******");
                Page sourcePage = pageManager.getPage(TataCapitalWebConstants.PROPERTY_DISPOSAL_LISTING_ROOT_PATH);
                Resource sourcePath = resourceResolver.getResource(TataCapitalWebConstants.PROPERTY_DISPOSAL_LISTING_ROOT_PATH);
                Page containingPage = pageManager.getContainingPage(sourcePath);
                if (containingPage.listChildren().hasNext()) {
                    log.info("****** Poperty Listing Page exist ******");
                    Page mutualFundsBkpPage = pageManager.move(sourcePage, TataCapitalWebConstants.PROPERTY_DISPOSAL_BKP_LISTING_ROOT_PATH, null, false, false, null);
                    pageManager.copy(mutualFundsBkpPage, TataCapitalWebConstants.PROPERTY_DISPOSAL_LISTING_ROOT_PATH, null, true, false);
                }
                session.save();
            }
        } catch (WCMException e) {
            log.error("WCM Exception : {}", e.getMessage());
        } catch (Exception e) {
            log.error("Exception : {}", e.getMessage());
        }
    }

    public String toHypenCase(String propertyName) {
        String snakeCase = propertyName.replaceAll("[^a-zA-Z0-9]+", "-").replaceFirst("^-", "");
        snakeCase = snakeCase.replaceAll("^_+|_+$", "").toLowerCase();
        return snakeCase;
    }

}

