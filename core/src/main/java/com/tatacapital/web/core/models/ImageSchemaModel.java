package com.tatacapital.web.core.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import javax.annotation.PostConstruct;
import java.util.Objects;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageSchemaModel {

    @Self
    Resource currentResource;

    ConfigModel configModel = ConfigModel.getInstance();

    String imageDescription;
    String imageSchema;
    String imageUrl;


    public String getImageDescription() {
        return imageDescription;
    }

    public String getImageSchema() {
        return imageSchema;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    @PostConstruct
    public void init() {

        if (Objects.nonNull(currentResource)) {
            imageDescription = currentResource.getValueMap().containsKey("imageDescription") ? currentResource.getValueMap().get("imageDescription").toString() : StringUtils.EMPTY;
            imageSchema = currentResource.getValueMap().containsKey("imageSchema") ? currentResource.getValueMap().get("imageSchema").toString() : StringUtils.EMPTY;
            imageUrl = currentResource.getValueMap().containsKey("imageUrl") ? configModel.getValue("websiteDomain").toString()+currentResource.getValueMap().get("imageUrl").toString() : StringUtils.EMPTY;
        }

    }
}


