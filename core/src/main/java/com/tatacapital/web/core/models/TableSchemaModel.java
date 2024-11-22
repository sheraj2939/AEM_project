package com.tatacapital.web.core.models;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.Iterator;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TableSchemaModel {

    private static final Logger logger = LoggerFactory.getLogger(TableSchemaModel.class);

    private final JsonArray jsonArray = new JsonArray();

    @Self
    private Resource currentResource;

    @PostConstruct
    public void init() {
        try {
            logger.info("In TableSchemaModel in init()");

            Resource headingResource = currentResource.getChild("table").getChild("item0").getChild("theading");
            JsonObject headingObject = processResource(headingResource, "name", "value", true);
            jsonArray.add(headingObject);


            Resource dataRow = currentResource.getChild("table").getChild("item0").getChild("tableRow");
            Iterator<Resource> resourceIterator = dataRow.listChildren();
            while (resourceIterator.hasNext()) {
                JsonObject dataObject = processResource(resourceIterator.next().getChild("trowdata"), "name", "value", false);
                if (!dataObject.has("rowDescription")) {
                    jsonArray.add(dataObject);
                }
            }
        } catch (Exception e) {
            logger.error("Error occurred while processing in TableSchemaModel: {}", e.getMessage(), e);
        }
    }


    private JsonObject processResource(Resource resource, String nameProperty, String valueProperty, boolean isHeading) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("@type", "PropertyValue");
        StringBuilder stringBuilder = new StringBuilder();

        Iterator<Resource> listChildren = resource.listChildren();
        while (listChildren.hasNext()) {
            Resource childRes = listChildren.next();
            if (isHeading) {
                String headingData = childRes.getValueMap().get("thdata", String.class);
                if (childRes.getName().equalsIgnoreCase("item0")) {
                    jsonObject.addProperty(nameProperty, headingData);
                } else {
                    stringBuilder.append(headingData);
                    if (childRes.getName().equalsIgnoreCase("item1")) {
                        stringBuilder.append(", ");
                    } else if (childRes.getName().equalsIgnoreCase("item2")) {
                        jsonObject.addProperty(valueProperty, stringBuilder.toString());
                    }
                }

            } else {
                String thdata = childRes.getValueMap().get("trData", String.class);
                String rowDes = childRes.getValueMap().get("rowDescription", String.class);
                String dataProperty = StringUtils.isNotEmpty(thdata) ? valueProperty : "rowDescription";
                if (childRes.getName().equalsIgnoreCase("item0")) {
                    jsonObject.addProperty(nameProperty, thdata);
                } else {
                    stringBuilder.append(thdata);
                    if (childRes.getName().equalsIgnoreCase("item1")) {
                        stringBuilder.append(" (Salaried), ");
                    } else if (childRes.getName().equalsIgnoreCase("item2")) {
                        stringBuilder.append(" (Self-Employed)");
                        jsonObject.addProperty(dataProperty, stringBuilder.toString());
                    }
                }

            }

        }
        return jsonObject;
    }

    public String getData() {
        return jsonArray.toString();
    }
}
