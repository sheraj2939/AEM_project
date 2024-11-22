package com.tatacapital.web.core.models;

import com.day.cq.dam.api.Asset;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Objects;

@Model(adaptables = Resource.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SEOModel {

    @Inject
    @Default(values = "")
    String imgPath;

    @Inject
    @Source("sling-object")
    ResourceResolver resourceResolver;

    Logger logger = LoggerFactory.getLogger(getClass());

    private String imageLength;
    private String imageWidth;

    @PostConstruct
    public void init()
    {
        logger.info("In SeoModel in init() :{0}");
        if(Objects.nonNull(resourceResolver))
        {
            Resource resource = resourceResolver.getResource(imgPath);
            Asset asset = resource.adaptTo(Asset.class);
            if(Objects.nonNull(asset)) {
                imageWidth = Objects.nonNull(asset.getMetadataValue("tiff:ImageWidth")) ? asset.getMetadataValue("tiff:ImageWidth") : StringUtils.EMPTY;
                imageLength = Objects.nonNull(asset.getMetadataValue("tiff:ImageLength")) ? asset.getMetadataValue("tiff:ImageLength"):StringUtils.EMPTY;
                logger.info("ImageWidth value Of Image in SeoModel :{}",imageWidth);
                logger.info("imageLength value Of Image in SeoModel :{}",imageLength);
            } else {
                logger.error("Asset Resource is adapted Null :{0}");
            }
        } else {
            logger.error("Resource Object is Injected Null :{0}");
        }
      }

    public String getImageLength() {
        return imageLength;
    }

    public String getImageWidth() {
        return imageWidth;
    }
}
