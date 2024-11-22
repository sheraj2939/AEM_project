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
import java.util.Objects;

@Model(adaptables = SlingHttpServletRequest.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductSchemaModel {

    @ScriptVariable
    Page currentPage;

    Logger logger = LoggerFactory.getLogger(getClass());

    private boolean showSchema = false;
    private boolean showProductSchema = false;
    private boolean showInsuranceSchema = false;

    public boolean isShowSchema() {
        return showSchema;
    }

    public void setShowSchema(boolean showSchema) {
        this.showSchema = showSchema;
    }

    public boolean isShowProductSchema() {
        return showProductSchema;
    }

    public void setShowProductSchema(boolean showProductSchema) {
        this.showProductSchema = showProductSchema;
    }

    public boolean isShowInsuranceSchema() {
        return showInsuranceSchema;
    }

    public void setShowInsuranceSchema(boolean showInsuranceSchema) {
        this.showInsuranceSchema = showInsuranceSchema;
    }

    @PostConstruct
    public void init()
    {
        logger.info("In init method of ProductSchemaModel :{0}");
        if(Objects.nonNull(currentPage)) {
            logger.info("Current Page Path in ProductSchemaModel :{}",currentPage.getPath());
            if (currentPage.getPath().contains("loan") || currentPage.getPath().contains("insurance")) {
                logger.info("Condition Satisfied to show Schema of Product or Insurance : {0}");
                setShowSchema(true);
            }
            if (currentPage.getPath().contains("loan")) {
                logger.info("Condition Satisfied to show Schema of Product : {0}");
                setShowProductSchema(true);
            } else if (currentPage.getPath().contains("insurance")) {
                logger.info("Condition Satisfied to show Schema of Insurance : {0}");
                setShowInsuranceSchema(true);
            }
        }else {
            logger.info("Page instance in ProductSchemaModel is initializing null :{0}");
        }

    }

    public String getPageTitle() {
        logger.info("In ProductSchemaModel in getPageTitle method :{0}");
        if(Objects.nonNull(currentPage)) {
            return Objects.nonNull(currentPage.getProperties().get("pageTitle")) ? currentPage.getProperties().get("pageTitle").toString() :
                    Objects.nonNull(currentPage.getProperties().get("jcr:title"))?currentPage.getProperties().get("jcr:title").toString():StringUtils.EMPTY;
        }
        return StringUtils.EMPTY;
    }

/*  For Future use if required we can use this method

  public String getProductImageUrl() {
        logger.info("In ProductSchemaModel in getProductImageUrl method :{0}");
        if(Objects.nonNull(currentPage)) {
            return Objects.nonNull(currentPage.getProperties().get("productImageUrl")) ? currentPage.getProperties().get("productImageUrl").toString() : StringUtils.EMPTY;
        }
        return StringUtils.EMPTY;
    }

*/

    public String getDescription() {
        logger.info("In ProductSchemaModel in getDescription method :{0}");
        if(Objects.nonNull(currentPage)) {
            return Objects.nonNull(currentPage.getProperties().get("jcr:description")) ? currentPage.getProperties().get("jcr:description").toString() : StringUtils.EMPTY;
        }
        return StringUtils.EMPTY;
    }

}

