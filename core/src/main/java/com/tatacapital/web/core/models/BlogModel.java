package com.tatacapital.web.core.models;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.tatacapital.web.core.constants.TataCapitalWebConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.inject.Inject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BlogModel {

    @OSGiService
    HttpClientBuilderFactory httpClientBuilderFactory;

    ConfigModel configModel = ConfigModel.getInstance();

    private static final Logger logger = LoggerFactory.getLogger(BlogModel.class);

    List<Map<String, String>> blogList;

    @Inject
    @Default
    String perPage;

    @Inject
    @Default
    String categoryId;

    public List<Map<String, String>> getBlogDetails() {
        logger.info("Inside BlogModel in getBlogDetails Method :{0}");
        this.blogList = new ArrayList<>();
        URIBuilder builder;
        try {
            builder = new URIBuilder(configModel.getValue(TataCapitalWebConstants.BLOG_API_URL).toString());
            if (StringUtils.isNotEmpty(perPage) && StringUtils.isNotEmpty(categoryId)) {
                builder.addParameter(TataCapitalWebConstants.PER_PAGE, perPage);
                if (!categoryId.equals("0")) {
                    builder.addParameter("categories", categoryId);
                }

            } else if (StringUtils.isNotEmpty(perPage) && StringUtils.isEmpty(categoryId)) {
                builder.addParameter(TataCapitalWebConstants.PER_PAGE, perPage);
            } else {
                return Collections.EMPTY_LIST;
            }
            logger.info("Api Uri Builder : {}", builder.toString());
            HttpClient client = httpClientBuilderFactory.newBuilder().build();
            HttpGet get = new HttpGet(builder.build());
            get.addHeader(TataCapitalWebConstants.USER_AGENT, "*");
            HttpResponse httpResponse = client.execute(get);
            logger.info("Blog Api Response Status Code : {}", httpResponse.getStatusLine().getStatusCode());
            BufferedReader br = new BufferedReader(new InputStreamReader((httpResponse.getEntity().getContent())));
            String output;
            StringBuilder responseJsonString = new StringBuilder();
            while ((output = br.readLine()) != null) {
                responseJsonString.append(output);
            }
            logger.debug("Blog Api Response In String format :{}", responseJsonString.toString());
            JsonArray responseJsonArr = JsonParser.parseString(responseJsonString.toString()).getAsJsonArray();
            responseJsonArr.forEach(jsonElement -> {
                Map<String, String> blogDetailMap = new LinkedHashMap<>();
                JsonObject jsonObject = jsonElement.getAsJsonObject();
                if (StringUtils.isEmpty(categoryId) || categoryId.equals("0")) {
                    String blogLink = jsonObject.get("link").getAsString();
                    logger.info("Blog link in Json Object :{}", blogLink);
                    String blogName = Objects.nonNull(blogLink) ? blogLink.split("/")[4].replaceAll("-", " ")
                            : StringUtils.EMPTY;
                    logger.info("Blog Name in Json Object :{}", blogName);
                    blogDetailMap.put("blogProductName", blogName);
                } else {
                    blogDetailMap.put("blogProductName",
                            Objects.nonNull(configModel.getValue(categoryId))
                                    ? configModel.getValue(categoryId).toString()
                                    : StringUtils.EMPTY);
                }
                JsonObject titleObj = jsonObject.has("title") ? jsonObject.get("title").getAsJsonObject()
                        : new JsonObject();
                String blogTitle = Objects.nonNull(titleObj.get("rendered")) ? titleObj.get("rendered").getAsString()
                        : StringUtils.EMPTY;
                blogDetailMap.put("blogTitle", blogTitle);
                String blogDate = Objects.nonNull(jsonObject.get("date")) ? jsonObject.get("date").getAsString()
                        : StringUtils.EMPTY;
                blogDetailMap.put("blogDate", getDateInFormat(blogDate));
                String blogLink = Objects.nonNull(jsonObject.get("link")) ? jsonObject.get("link").getAsString()
                        : StringUtils.EMPTY;
                blogDetailMap.put("blogLink", blogLink);
                String blogImagePath = Objects.nonNull(jsonObject.get("featured_image_url"))
                        ? jsonObject.get("featured_image_url").getAsString()
                        : StringUtils.EMPTY;
                blogDetailMap.put("blogImage", blogImagePath);
                blogList.add(blogDetailMap);
            });
            logger.debug("List of Blogs Returning : {}", blogList.toString());
            return blogList;
        } catch (URISyntaxException | IOException e) {
            logger.error("Exception in BlogModel in getBlogDetailsMethod :{}", e.getMessage());
        }

        return Collections.EMPTY_LIST;
    }

    public String getDateInFormat(String dateElement) {
        if(StringUtils.isNotEmpty(dateElement)) {
            DateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            DateFormat outputFormat = new SimpleDateFormat("dd MMMM, yyyy");
            Date date = null;
            try {
                date = inputFormat.parse(dateElement);
            } catch (ParseException e) {
                logger.error("Exception in Blog Model in getDateInFormat method :{}", e.getMessage());
            }
            return outputFormat.format(date);
        }else {
            return StringUtils.EMPTY;
        }
    }

}
