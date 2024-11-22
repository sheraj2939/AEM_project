package com.tatacapital.web.core.schedulers;

import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.Replicator;
import com.google.gson.JsonObject;
import com.tatacapital.web.core.constants.TataCapitalWebConstants;
import com.tatacapital.web.core.services.PropertyDisposalService;
import com.tatacapital.web.core.services.ResourceHelper;
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
import java.util.Map;
import java.util.Objects;

@Designate(ocd = PropertyDisposalScheduler.Config.class)
@Component(service = Runnable.class, immediate = true)
public class PropertyDisposalScheduler implements Runnable{

    @Reference
    PropertyDisposalService propertyDisposalService;

    @Reference
    Replicator replicator;

    @Reference
    ResourceHelper resourceHelper;

    Logger logger = LoggerFactory.getLogger(getClass());

    @ObjectClassDefinition(name = "Property Disposal Page Generation Scheduler", description = "Property Disposal Page Generation Scheduler")
    public @interface Config {

        @AttributeDefinition(name = "Scheduler Expression",description = "Enter the chron expression to execute the task")
        String scheduler_expression() default "00 00 12 * * ?";

        @AttributeDefinition(name = "Concurrent task", description = "Whether or not to schedule this task concurrently")
        boolean scheduler_concurrent() default false;

        @AttributeDefinition(name = "MDM API URI FOR PROPERTY DISPOSAL", description = "ENTER MDM API URI FOR PROPERTY DISPOSAL")
        String mdm_api_uri() default "https://tclu.tatacapital.com/web/api/mdm/export/assetdisposalmis.json";

        @AttributeDefinition(name = "PROPERTY DISPOSAL DETAIL PAGE ROOTPATH", description = "ENTER PROPERTY DISPOSAL DETAIL PAGE ROOTPATH")
        String property_dispoal_detail_page_rootpath() default "/content/tata-capital-web/en/property-disposal/property-listing";

        @AttributeDefinition(name = "PROPERTY DISPOSAL DETAIL PAGE TEMPLATE PATH", description = "ENTER PROPERTY DISPOSAL DETAIL PAGE TEMPLATE PATH")
        String property_disposal_detail_page_template_path() default "/conf/tata-capital-web/settings/wcm/templates/asset-disposal-housing-details-template";

        @AttributeDefinition(name = "MDM Auth Token",description = "Enter Mdm Auth Token Here")
        String mdm_auth_token() default "zJGbDCkArv31rqf7sTzNYIcbWb8TcbvZPKV6qOiKs4A6CJ1VDjLijMSVJH7tTMR1yRs/JVsOAyeS1JbTvVHjMw==";

        @AttributeDefinition(name = "Scheduler Start & Stop", description = "Whether to start or stop the schedule this task")
        boolean scheduler_start() default false;

    }

    boolean startScheduler;
    String mdmApiUri;
    String rootPathForPageGeneration;
    String mdmAuthToken;
    String propertyDisposalDetailPageTemplatePath;

    @Activate
    @Modified
    protected void activate( Config config) {
        startScheduler = config.scheduler_start();
        mdmApiUri = config.mdm_api_uri();
        rootPathForPageGeneration = config.property_dispoal_detail_page_rootpath();
        propertyDisposalDetailPageTemplatePath = config.property_disposal_detail_page_template_path();
        mdmAuthToken = config.mdm_auth_token();
    }

    @Override
    public void run() {
        logger.info("In Property Disposal Scheduler :{0}");
        long schedulerStartTime = System.currentTimeMillis();
        if (startScheduler) {
            try {
                ResourceResolver resourceResolver = resourceHelper.getResourceResolver();
                if (Objects.nonNull(resourceResolver)) {
                    Session session = resourceResolver.adaptTo(Session.class);
                    if (Objects.nonNull(session)) {
                        String sitemapPath = TataCapitalWebConstants.PROPERTY_DISPOSAL_LISTING_ROOT_PATH;
                        JsonObject apiJsonObject = propertyDisposalService.fetchApi(mdmApiUri,mdmAuthToken);
                        Map<String, Integer> propertyDisposalPage = propertyDisposalService.createPropertyDisposalPage(apiJsonObject, rootPathForPageGeneration, propertyDisposalDetailPageTemplatePath);
                        logger.info("Property Disposal Response Map : {}", propertyDisposalPage);
                        if (!propertyDisposalPage.isEmpty()) {
                            replicator.replicate(session, ReplicationActionType.ACTIVATE, "/content/tata-capital-web/en/property-disposal/property-listing");
                            logger.info("Replication done for Property Disposal Page Gen : {}", sitemapPath);
                            long schedulerEndTime = System.currentTimeMillis();
                            logger.info("Replication Process Done For Property Disposal : {} => {}", schedulerEndTime, (schedulerEndTime - schedulerStartTime));
                        } else {
                            logger.error("Replication Failed For Property Disposal : {0}");
                        }
                    } else {
                        logger.error("In Property Disposal Scheduler Session object is getting Null : {0}");
                    }
                } else {
                    logger.error("In Property Disposal Scheduler Resource object is getting Null : {0}");
                }
            } catch (Exception e) {
                logger.error("Exception in Property Disposal Scheduler :{1}", e);
            }

        }

    }
}
