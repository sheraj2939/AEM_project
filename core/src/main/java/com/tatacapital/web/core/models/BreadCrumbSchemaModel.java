package com.tatacapital.web.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.JsonObject;
import com.tatacapital.web.core.constants.TataCapitalWebConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BreadCrumbSchemaModel {

    Logger logger = LoggerFactory.getLogger(BreadCrumbSchemaModel.class);

    @Inject
    @Source("sling-object")
    ResourceResolver resourceResolver;

    @ScriptVariable
    Page currentPage;

    public List<JsonObject> getBreadCrumbList() {
        logger.info("In BreadCrumbSchemaModel in init()");
        List<JsonObject> breadCrumbList = new ArrayList<>();
        if (Objects.nonNull(currentPage) && Objects.nonNull(resourceResolver)) {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            String currentPagePath = currentPage.getPath();
            logger.info("Current Page Path In BreadCrumbSchemaModel :{}", currentPagePath);
            String currentPageTitle = Objects.nonNull(currentPage.getTitle()) ? currentPage.getTitle() : currentPage.getPageTitle();
            logger.info("Current Page Title In BreadCrumbSchemaModel :{}", currentPageTitle);
            String nestedPageName = currentPagePath.replace(TataCapitalWebConstants.ROOT_PATH, "");
            String[] innerPageArr = nestedPageName.split(TataCapitalWebConstants.FORWARD_SLASH);
            int count = innerPageArr.length==0 ? 1: innerPageArr.length;
            JsonObject breadCrumbObj = breadcrumbStructureJson(currentPagePath, currentPageTitle, count);
            breadCrumbList.add(breadCrumbObj);
            String tempPagePath = currentPagePath;
            for (int index = count-1 ; index >= 1; index--) {
                String pageTitle = Objects.nonNull(pageManager.getPage(tempPagePath).getParent()) ? pageManager.getPage(tempPagePath).getParent().getTitle() : StringUtils.EMPTY;
                String pagePath = Objects.nonNull(pageManager.getPage(tempPagePath).getParent()) ? pageManager.getPage(tempPagePath).getParent().getPath() : StringUtils.EMPTY;
                tempPagePath = pagePath;
                JsonObject jsonObject = breadcrumbStructureJson(pagePath, pageTitle, index);
                breadCrumbList.add(jsonObject);
            }
        } else {
            logger.error("currentPage instance of Page Object is Injecting Null in BreadCrumbSchemaModel : {0}");
        }
        Collections.reverse(breadCrumbList);
        return breadCrumbList;
    }

    public JsonObject breadcrumbStructureJson(String pagePath, String currentPageName, int count) {
        JsonObject breadcrumbJson = new JsonObject();
        String finalPagePath = Objects.nonNull(pagePath) ? pagePath.replace(TataCapitalWebConstants.ROOT_PATH.concat("en"), TataCapitalWebConstants.DOMAIN_NAME):StringUtils.EMPTY;
        breadcrumbJson.addProperty("@type", "ListItem");
        breadcrumbJson.addProperty("position", count);
        JsonObject currentItemObject = new JsonObject();
        currentItemObject.addProperty("@id", finalPagePath);
        currentItemObject.addProperty("name", currentPageName);
        breadcrumbJson.add("item", currentItemObject);
        return breadcrumbJson;
    }

}
