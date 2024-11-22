package com.tatacapital.web.core.services.impl;

import com.tatacapital.web.core.services.TataCapitalWebConfiguration;
import com.tatacapital.web.core.constants.TataCapitalWebConstants;
import com.tatacapital.web.core.models.ConfigModel;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.LinkedHashMap;
import java.util.Map;

@Designate(ocd = TataCapitalWebConfigurationImpl.Config.class)
@Component(service = TataCapitalWebConfiguration.class, immediate = true)
public class TataCapitalWebConfigurationImpl implements TataCapitalWebConfiguration {

        public Map<String, String> serviceConfigMap;

        Logger logger = LoggerFactory.getLogger(getClass());

        ConfigModel configModel = ConfigModel.getInstance();

        @ObjectClassDefinition(name = "Tata Capital Web Configurations")
        public @interface Config {

                @AttributeDefinition(name = "Blog API URL", description = "Enter Blog API URL")
                String blog_api_url() default "https://www.tatacapital.com/blog/wp-json/wp/v2/posts";

                @AttributeDefinition(name = "Blog Product Name", description = "Enter Blog Product Name Here")
                String[] blog_product();

                @AttributeDefinition(name = "TC Chat Bot Host Url", description = "Enter The TC Chat Bot Host Url")
                String tc_chatbot_host_url() default "https://tiatwo.tatacapital.com/";

                @AttributeDefinition(name = "TC Chat Bot Host Domain", description = "Enter TC Chat Bot Host Domain")
                String tc_chatbot_host_domain() default "tiatwo.tatacapital.com";

                @AttributeDefinition(name = "Google Client ID", description = "Enter Google Client ID")
                String google_client_id() default "1052994805000-u5vabr2ibtfgu726ova8cjsnb5vgqamu.apps.googleusercontent.com";

                @AttributeDefinition(name = "Customer Speak MDM URL", description = "Enter Customer Speak MDM URL Here")
                String customer_speak_mdm_url() default "https://tclu.tatacapital.com/web/api/mdm/export/customer-speak.json";

                @AttributeDefinition(name = "Jocata Personal Loan URL", description = "Enter Jocata Personal Loan URL Here")
                String jocata_pl_url() default "https://loanuat.tatacapital.com:8080/online/loans/personal-loans/apply-now-personal-loan?dtls=";

                @AttributeDefinition(name = "Jocata Business Loan URL", description = "Enter Jocata Business Loan URL Here")
                String jocata_bl_url() default "https://loanuat.tatacapital.com:8083/online/loans/business-loans?dtls=";

                @AttributeDefinition(name = "Adobe Script URL", description = "Enter Adobe Script URL Here")
                String adobe_launch_script_url() default "https://assets.adobedtm.com/e4c76be5b9e7/ce966c77d63a/launch-ba3fccd69978-development.min.js";

                @AttributeDefinition(name = "MoEngage App Id", description = "Enter MoEngage App Id Here")
                String moEngage_app_id() default "YYPOH2RMX16ENTH66KE9LJ9O_DEBUG";

                @AttributeDefinition(name = "Wealth App Id", description = "Enter Wealth App Id Here")
                String wealth_app_id() default "9U9YTAXGRLCMVXK04EGTNLKP_DEBUG";

                @AttributeDefinition(name = "MoEngage Debug Log", description = "Enter MoEngage Debug Log Here")
                String moEngage_debug_log() default "1";

                @AttributeDefinition(name = "Api Domain", description = "Enter Api Domain Address Here")
                String api_domain() default "https://tclu.tatacapital.com/web";

                @AttributeDefinition(name = "Calculator Api Domain", description = "Enter Calculator Api Domain Address Here")
                String calculator_api_domain() default "https://tclu.tatacapital.com";

                @AttributeDefinition(name = "Website Domain", description = "Enter Website Domain Here")
                String website_domain() default "https://tclu.tatacapital.com";

                @AttributeDefinition(name = "SenseForth Script URL", description = "Enter SenseForth Script URL Here")
                String sense_forth_script_url() default "https://smartsearch.senseforth.com/TCLSmartSearch/TCL-SS/sf-smart-search-loader.js";

                @AttributeDefinition(name = "Approved Project Apply Now URL", description = "Enter Approved Project Apply Now URL Here")
                String approved_project_apply_now_url() default "https://www.tatacapital.com/online/loans/home-loans/apply-now-home-loan?sourceName=Website&cidparameter=#!";

                @AttributeDefinition(name = "SE Code for TSSS Form", description = "Enter Approved SE Code for TSSS Form Here")
                String se_code_tsss_form() default "91109131";

                @AttributeDefinition(name = "TCHFL Analytics Script", description = "Enter TCHFL Analytics Script Here")
                String tchfl_analytics_script() default "https://assets.adobedtm.com/e4c76be5b9e7/a557705c86af/launch-497cfdeadbf2-development.min.js";

                @AttributeDefinition(name = "Check Credit Score Domain Url", description = "Enter Check Credit Score Domain Url Here")
                String check_credit_score_domain_url() default "https://retail1.tatacapital.com";

                @AttributeDefinition(name = "Post Api Domain", description = "Enter Post Api Domain Here")
                String post_api_domain() default "https://retailonline.tatacapital.com/web";

                @AttributeDefinition(name = "TCFSL analytics Script", description = "Enter TCFSL Analytics Script Here")
                String tcfsl_analytics_script() default "https://assets.adobedtm.com/e4c76be5b9e7/98451609efde/launch-4699681837a7-development.min.js";

        }

        @Activate
        @Modified
        public void init(Config tataCapitalConfiguration) {
                this.serviceConfigMap = new LinkedHashMap<>();
                this.serviceConfigMap.put(TataCapitalWebConstants.BLOG_API_URL,
                                tataCapitalConfiguration.blog_api_url());
                this.serviceConfigMap.put(TataCapitalWebConstants.TC_CHAT_BOT_HOST_URL,
                                tataCapitalConfiguration.tc_chatbot_host_url());
                this.serviceConfigMap.put(TataCapitalWebConstants.TC_CHAT_BOT_HOST_DOMAIN,
                                tataCapitalConfiguration.tc_chatbot_host_domain());
                this.serviceConfigMap.put(TataCapitalWebConstants.GOOGLE_CLIENT_ID,
                                tataCapitalConfiguration.google_client_id());
                this.serviceConfigMap.put(TataCapitalWebConstants.CUSTOMER_SPEAK_MDM_URL,
                                tataCapitalConfiguration.customer_speak_mdm_url());
                String[] blogProducts = tataCapitalConfiguration.blog_product();
                for (String blogProduct : blogProducts) {
                        String categoryId = blogProduct.split("=")[0];
                        String blogProductName = blogProduct.split("=")[1];
                        this.serviceConfigMap.put(categoryId, blogProductName);
                }
                this.serviceConfigMap.put(TataCapitalWebConstants.JOCATA_PL_URL,
                                tataCapitalConfiguration.jocata_pl_url());
                this.serviceConfigMap.put(TataCapitalWebConstants.JOCATA_BL_URL,
                                tataCapitalConfiguration.jocata_bl_url());
                this.serviceConfigMap.put(TataCapitalWebConstants.ADOBE_LAUNCH_SCRIPT_URL,
                                tataCapitalConfiguration.adobe_launch_script_url());
                this.serviceConfigMap.put(TataCapitalWebConstants.MOENGAGE_APP_ID,
                                tataCapitalConfiguration.moEngage_app_id());
                this.serviceConfigMap.put(TataCapitalWebConstants.MOENGAGE_DEBUG_LOG,
                                tataCapitalConfiguration.moEngage_debug_log());
                this.serviceConfigMap.put(TataCapitalWebConstants.API_DOMAIN,
                                tataCapitalConfiguration.api_domain());
                this.serviceConfigMap.put(TataCapitalWebConstants.CALCULATOR_API_DOMAIN,
                        tataCapitalConfiguration.calculator_api_domain());
                this.serviceConfigMap.put(TataCapitalWebConstants.WEBSITE_DOMAIN,
                        tataCapitalConfiguration.website_domain());
                this.serviceConfigMap.put(TataCapitalWebConstants.SENSE_FORTH_SCRIPT_URL,
                        tataCapitalConfiguration.sense_forth_script_url());
                this.serviceConfigMap.put(TataCapitalWebConstants.APPROVED_PROJECT_APPLY_NOW_URL,
                        tataCapitalConfiguration.approved_project_apply_now_url());
                this.serviceConfigMap.put(TataCapitalWebConstants.SE_CODE_TSSS_FORM,
                        tataCapitalConfiguration.se_code_tsss_form());
                this.serviceConfigMap.put(TataCapitalWebConstants.TCHFL_ANALYTICS_SCRIPT,
                        tataCapitalConfiguration.tchfl_analytics_script());
                this.serviceConfigMap.put(TataCapitalWebConstants.CHECK_CREDIT_SCORE_DOMAIN_URL,
                        tataCapitalConfiguration.check_credit_score_domain_url());
                this.serviceConfigMap.put(TataCapitalWebConstants.WEALTH_APP_ID,
                        tataCapitalConfiguration.wealth_app_id());
                this.serviceConfigMap.put(TataCapitalWebConstants.POST_API_DOMAIN,
                        tataCapitalConfiguration.post_api_domain());
                this.serviceConfigMap.put(TataCapitalWebConstants.TCFSL_ANALYTICS_SCRIPT,
                        tataCapitalConfiguration.tcfsl_analytics_script());
                configModel.setConfigMap(serviceConfigMap);

                logger.info("Service Config Map values: {}",serviceConfigMap);
        }

        @Override
        public Map<String, String> getConfig() {
                return serviceConfigMap;
        }

}
