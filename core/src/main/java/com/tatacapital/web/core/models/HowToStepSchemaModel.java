package com.tatacapital.web.core.models;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Iterator;
import java.util.Objects;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HowToStepSchemaModel {
    Logger logger = LoggerFactory.getLogger(getClass());

    @Self
    Resource resource;

    @Inject
    @Source("sling-object")
    ResourceResolver resourceResolver;

    JsonArray jsonArray = new JsonArray();

    @PostConstruct
    public void init() {
        try {
            if (Objects.nonNull(resource) && Objects.nonNull(resourceResolver)) {
                getData();
            } else {
                logger.error("Resource or ResourceResolver Object is Null : {0}");
            }
        } catch (Exception e) {
            logger.error("Exception in HowToStepSchemaModel : {}", e.getMessage());
        }
    }

    public JsonArray getData() {
        try {
            Resource resourceChild = resource.getChild("container-main").getChild("customcontainer");
            if (Objects.isNull(resourceChild)) {
                resourceChild = resource.getChild("container-main");
            }
            if (Objects.nonNull(resourceChild)) {
                Iterator<Resource> resourceIterator = resourceChild.listChildren();
                while (resourceIterator.hasNext()) {
                    try {
                        JsonObject jsonObject = new JsonObject();
                        jsonObject.addProperty("@type", "HowToStep");
                        Resource resource = resourceIterator.next();
                        Resource childResource = resource.getChild("container-main1");
                        Resource heading = childResource.getChild("instant_loan_box_tit");
                        if (Objects.nonNull(heading)) {
                            String headingStr = heading.getValueMap().containsKey("jcr:title") ? heading.getValueMap().get("jcr:title").toString().replaceAll("\r\n|\r|\n", "").replaceAll("<[^>]*>", "") : StringUtils.EMPTY;
                            jsonObject.addProperty("name", headingStr);
                        }
                        Resource textResource = resource.getChild("container-main2").getChild("instant_loan_box_tex");
                        String titleStr = "";
                        if (Objects.nonNull(textResource)) {
                            if (textResource.getValueMap().containsKey("jcr:title")) {
                                titleStr = Objects.nonNull(textResource.getValueMap().get("jcr:title")) ? textResource.getValueMap().get("jcr:title").toString().replaceAll("\r\n|\r|\n", "").replaceAll("<[^>]*>", "") : StringUtils.EMPTY;
                            } else {
                                titleStr = Objects.nonNull(textResource.getValueMap().get("textRteInstantLoan")) ? textResource.getValueMap().get("textRteInstantLoan").toString().replaceAll("\r\n|\r|\n", "").replaceAll("<[^>]*>", "") : StringUtils.EMPTY;
                            }
                        }
                        jsonObject.addProperty("text", titleStr);
                        jsonArray.add(jsonObject);
                    } catch (Exception e) {
                        logger.error("Exception in PLHowToStepSchemaModel in getPLStepUpData() : {1}", e);
                    }
                }
            } else {
                logger.error("Resource is getting Null : {0}");
            }
        } catch (Exception e) {
            logger.error("Exception in PLHowToStepSchemaModel method : {1}", e);
        }
        return jsonArray;
    }

    public String getSchemaData() {
        logger.info("Size Of Data : {}", jsonArray.size());
        if (Objects.nonNull(resource) && jsonArray.size() != 0) {
            JsonObject finalObj = new JsonObject();
            String description = resource.getValueMap().containsKey("text") ? resource.getValueMap().get("text").toString() : StringUtils.EMPTY;
            description = description.replaceAll("\r\n|\r|\n", "").replaceAll("<[^>]*>", "");
            String title = resource.getChild("heading").getValueMap().containsKey("jcr:title") ? resource.getChild("heading").getValueMap().get("jcr:title").toString() : StringUtils.EMPTY;
            String boldTerm = resource.getChild("heading").getValueMap().containsKey("boldTerm") ? resource.getChild("heading").getValueMap().get("boldTerm").toString() : StringUtils.EMPTY;
            String name = title + " " + boldTerm;
            name = name.replaceAll("\r\n|\r|\n", "").replaceAll("<[^>]*>", "");
            finalObj.addProperty("@context", "https://schema.org/");
            finalObj.addProperty("@type", "HowTo");
            finalObj.addProperty("name", name);
            finalObj.addProperty("description", description);
            finalObj.add("step", jsonArray);

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String schemaStr = gson.toJson(finalObj);
            return schemaStr;
        }
        return "";
    }
}