package com.tatacapital.web.core.models;

import com.day.cq.wcm.api.Page;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;

@Model(adaptables = SlingHttpServletRequest.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PLCitySchema {

    @ScriptVariable
    Page currentPage;

    Logger logger = LoggerFactory.getLogger(getClass());

    ConfigModel configModel = ConfigModel.getInstance();


    private String cityName;
    private String pageUrl;
    private String postalCode;


    @PostConstruct
    public void init() {
        logger.info("In init method of PLCitySchema :{0}");
        cityName = currentPage.getProperties().containsKey("cityName") ? currentPage.getProperties().get("cityName").toString(): StringUtils.EMPTY;
        postalCode = currentPage.getProperties().containsKey("postalCode") ? currentPage.getProperties().get("postalCode").toString():StringUtils.EMPTY;
        String websiteDomain = configModel.getValue("websiteDomain").toString();
        pageUrl= currentPage.getPath().replaceAll("/content/tata-capital-web/en/",websiteDomain).concat(".html");
    }

    public String getCityName() {
        return cityName;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public String getPostalCode() {
        return postalCode;
    }
}
