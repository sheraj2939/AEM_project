package com.tatacapital.web.core.schedulers;


import com.google.gson.JsonObject;
import com.tatacapital.web.core.models.ConfigModel;
import com.tatacapital.web.core.services.ProductPageGenerationService;
import com.tatacapital.web.core.services.ResourceHelper;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Designate(ocd = ProductPageGenerationScheduler.Config.class)
@Component(service = Runnable.class, immediate = true)
public class ProductPageGenerationScheduler implements Runnable {

    @Reference
    ProductPageGenerationService productPageGenerationService;

    @Reference
    ResourceHelper resourceHelper;

    Logger logger = LoggerFactory.getLogger(getClass());
    private boolean startScheduler;
    private boolean startProductCityPageGen;
    private boolean startProductSalaryPageGen;
    private String mdmProductCityApiUri;
    private String productCityTemplatePath;
    private String productSalaryTemplatePath;
    private String mdmProductSalaryApiUri;
    private String[] listOfPagesToDelete;

    @Activate
    @Modified
    protected void activate(Config config) {
        Map<String, String> dataMap = new HashMap<>();
        startScheduler = config.scheduler_start();
        mdmProductCityApiUri = config.mdm_api_uri_city();
        String[] productRootPaths = Objects.nonNull(config.product_rootpath()) ? config.product_rootpath() : new String[]{};
        for (String rootPath : productRootPaths) {
            String key = rootPath.contains("=") ? rootPath.split("=")[0] : StringUtils.EMPTY;
            String value = rootPath.contains("=") ? rootPath.split("=")[1] : StringUtils.EMPTY;
            dataMap.put(key, value);
        }
        ConfigModel.getInstance().setConfigMap(dataMap);
        productCityTemplatePath = config.product_city_page_template_path();
        startProductCityPageGen = config.to_start_product_city_page_gen();
        startProductSalaryPageGen = config.to_start_product_salary_page_gen();
        mdmProductSalaryApiUri = config.mdm_api_uri_salary();
        productSalaryTemplatePath = config.product_salary_template_path();
        listOfPagesToDelete = config.delete_pages();
    }

    @Override
    public void run() {
        logger.info("In Product Page Generation Scheduler :{0}");
        try {
            if (startScheduler) {
                ResourceResolver resourceResolver = resourceHelper.getResourceResolver();
                if (Objects.nonNull(resourceResolver)) {
                    Session session = resourceResolver.adaptTo(Session.class);
                    if (Objects.nonNull(session)) {
                        if (startProductCityPageGen) {
                            executeThePageGenTask(mdmProductCityApiUri, productCityTemplatePath,listOfPagesToDelete, "productCity");
                        }
                        if (startProductSalaryPageGen) {
                            executeThePageGenTask(mdmProductSalaryApiUri, productSalaryTemplatePath,listOfPagesToDelete, "productSalary");
                        }

                    } else {
                        logger.error("In Scheduler Session object is getting Null : {0}");
                    }
                } else {
                    logger.error("In Scheduler Resource object is getting Null : {0}");
                }
            } else {
                logger.error("Please Enable the Scheduler to start the Page Generation");
            }
        } catch (Exception e) {
            logger.error("Exception in Page Generation Scheduler :{}", e.getMessage());
        }

    }

    private void executeThePageGenTask(String mdmApiUri, String templatePath,String[] pagesToDelete, String pageGenType) {
        JsonObject apiJsonObject = productPageGenerationService.getMdmApiCall(mdmApiUri);
        if (apiJsonObject.size() != 0) {
            Map<String, Integer> pageGenReport = productPageGenerationService.generatePages(apiJsonObject, templatePath,pagesToDelete, pageGenType);
            logger.info("Total Page Generation Results : {}", pageGenReport);
        }
    }

    @ObjectClassDefinition(name = "Product Page Generation Scheduler", description = "Product Page Generation Scheduler")
    public @interface Config {

        @AttributeDefinition(name = "Scheduler Expression", description = "Enter the chron expression to execute the task")
        String scheduler_expression() default "00 00 12 * * ?";

        @AttributeDefinition(name = "Concurrent task", description = "Whether or not to schedule this task concurrently")
        boolean scheduler_concurrent() default false;

        @AttributeDefinition(name = "Mdm Api Uri For Product City", description = "Enter Mdm Api Uri For Product City")
        String mdm_api_uri_city() default "https://tclu.tatacapital.com/web/api/mdm/export/pl_city.json";

        @AttributeDefinition(name = "Mdm Api Uri For Product Page Salary", description = "Enter Mdm Api Uri For Product Page Salary")
        String mdm_api_uri_salary() default "https://tclu.tatacapital.com/web/api/mdm/export/pl_salary.json";

        @AttributeDefinition(name = "Product Page Root Path", description = "Enter Product Page Root Path")
        String[] product_rootpath() default "pl=/content/tata-capital-web/en/personal-loan";

        @AttributeDefinition(name = "Pages To Delete", description = "Enter The Path Of Pages To Delete")
        String[] delete_pages() default "/content/tata-capital-web/en/personal-loan";

        @AttributeDefinition(name = "Product City Template Path", description = "Enter Product City Template Path")
        String product_city_page_template_path() default "/conf/tata-capital-web/settings/wcm/templates/product-city-page-generation";

        @AttributeDefinition(name = "Product Salary Template Path", description = "Enter Product Salary Template Path")
        String product_salary_template_path() default "/conf/tata-capital-web/settings/wcm/templates/personal-loan-salary";

        @AttributeDefinition(name = "Scheduler Start & Stop", description = "Whether to start or stop the schedule this task")
        boolean scheduler_start() default false;

        @AttributeDefinition(name = "Page Gen For Product City Page", description = "Tick the checkbox to generate product city pages")
        boolean to_start_product_city_page_gen() default false;

        @AttributeDefinition(name = "Page Gen For Product Salary Pages", description = "Tick the checkbox to generate product salary pages")
        boolean to_start_product_salary_page_gen() default false;

    }

}

