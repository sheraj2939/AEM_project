/*******************************************API Config Module - Start******************************************************/
(function (_global) {
    var _apiConfig = (function (jsHelper) {
        if (exceptionUtility) {
            exceptionUtility.dependencyCheck([jsHelper], "API Config");
        }
        /**
         * API Constant Values
         */
        var GOOGLE_SIGN_IN = "GOOGLE_SIGN_IN";
        var DOWNNLOAD_APP_SMS = "DOWNNLOAD_APP_SMS";
        var NEWS_LETTER = "NEWS_LETTER";
        var GENERATE_OTP = "GENERATE_OTP";
        var VERIFY_OTP = "VERIFY_OTP";
        var ONCALL_OTP = "ONCALL_OTP";
        var WHATSAPP_LEAD = "WHATSAPP_LEAD";
        var BRANCH_LOCATOR = "BRANCH_LOCATOR";
        var BRANCH_LOCATOR_SMS = "BRANCH_LOCATOR_SMS";
        var FETCH_OFFERS = "FETCH_OFFERS";
        var VALID_OFFERS = "VALID_OFFERS";
        var PRE_APPROVED_OFFER_MASTER = "PRE_APPROVED_OFFER_MASTER";
        var CONVERT_TO_OPPORTUINITY = "CONVERT_TO_OPPORTUINITY";
        var CITY_PRODUCT_MASTER = "CITY_PRODUCT_MASTER";
        var VEHICLE_VARIANT_MASTER = "VEHICLE_VARIANT_MASTER";
        var VEHICLE_VARIANT_MASTER_NEW = "VEHICLE_VARIANT_MASTER_NEW";
        var TWO_WHEELER_VARIANT_MASTER = "TWO_WHEELER_VARIANT_MASTER";
        var APPLY_NOW_LEAD_GENERATE = "APPLY_NOW_LEAD_GENERATE";
        var COUNTRY_MASTER = "COUNTRY_MASTER";
        var CUSTOMER_SPEAK = "CUSTOMER_SPEAK";
        var COMPANY_LIST = "COMPANY_LIST";
        var LOAN_MITRA = "LOAN_MITRA";
        var CUSTOMER_GRIEVANCES = "CUSTOMER_GRIEVANCES";
        var OFFER_REGISTER = "OFFER_REGISTER";
        var TOP_UP = "TOP_UP";
        var GET_OFFERS = "GET_OFFERS";
        var PINCODEMASTER = "PINCODEMASTER";
        var TSSS_LEAD_GENERATE = "TSSS_LEAD_GENERATE";
        var TSSS_EMAIL = "TSSS_EMAIL";
        var TSSS_COMPANY = "TSSS_COMPANY";
        var TSSS_DESIGNATION = "TSSS_DESIGNATION";
        var GET_OFFERS = "GET_OFFERS";

        var CUSTOMER_FEEDBACK = "CUSTOMER_FEEDBACK";
        var WTS_WHATSAPP = "WTS_WHATSAPP";
        var CONTACT_US = "CONTACT_US"; 
        var APPROVED_PROJECTS = "APPROVED_PROJECTS";

        var COMPANY_NAME_CAMPAIGN = "COMPANY_NAME_CAMPAIGN"; 
        var AGGREGATOR_LEAD_GENERATION = "AGGREGATOR_LEAD_GENERATION"; 
        var CITY_PRODUCT_MASTER_CAMPAIGN = "CITY_PRODUCT_MASTER_CAMPAIGN";
        var SUGAM_CAMPAIGN = "SUGAM_CAMPAIGN";
        var ASSET_DISPOSAL_MIS = "ASSET_DISPOSAL_MIS";
        var UPCOMING_PROPERTIES = "UPCOMING_PROPERTIES"
        var PROP_REGISTRATION = "PROP_REGISTRATION";
        var BOOK_INSPECTION = "BOOK_INSPECTION";
        var INTERESTED_BROKER = "INTERESTED_BROKER";
        var PROP_REGISTRATION_TCFSL = "PROP_REGISTRATION_TCFSL";
        var BOOK_INSPECTION_TCFSL = "BOOK_INSPECTION_TCFSL";
        var INTERESTED_BROKER_TCFSL = "INTERESTED_BROKER_TCFSL";

        var PARTNER_WITH_US = "PARTNER_WITH_US";
        var VALID_EMAIL= "VALID_EMAIL";
        var EMI_PART_PAYMENT = "EMI_PART_PAYMENT";
        var PRE_POLULATE_EPP = "PRE_POLULATE_EPP";
        var EMI_PART_PAYMENT_GET = "EMI_PART_PAYMENT_GET";
        var EDUCATION_LOAN_STATECITY = "EDUCATION_LOAN_STATECITY";
        var EDUCATION_LOAN_COUNTRYLIST = "EDUCATION_LOAN_COUNTRYLIST";
        var EDUCATION_LOAN_COURSES = "EDUCATION_LOAN_COURSES";
        var EDUCATION_LOAN_FIELDLIST = "EDUCATION_LOAN_FIELDLIST";
        var EDUCATION_LOAN_ALLUNIVERSITIES = "EDUCATION_LOAN_ALLUNIVERSITIES";
        var EDUCATION_LOAN_PINCODE = "EDUCATION_LOAN_PINCODE";
        var CIBIL_GET = "CIBIL_GET";
        var CIBIL_GET_1 = "CIBIL_GET_1";
        var CIBIL_POST = "CIBIL_POST";
        var OFFLINE_QUICK_CASH_GET = "OFFLINE_QUICK_CASH_GET";
        var OFFLINE_QUICK_CASH_GET_1 = "OFFLINE_QUICK_CASH_GET_1";
        var OFFLINE_QUICK_CASH_POST = "OFFLINE_QUICK_CASH_POST";
        var PRE_APPROVED_TOP_UP_GET = "PRE_APPROVED_TOP_UP_GET";
        var PRE_APPROVED_TOP_UP_GET_1 = "PRE_APPROVED_TOP_UP_GET_1";
        var PRE_APPROVED_TOP_UP_POST = "PRE_APPROVED_TOP_UP_POST";
        var CLOSE_CASES_GET = "CLOSE_CASES_GET";
        var CLOSE_CASES_GET_1 = "CLOSE_CASES_GET_1";
        var CLOSE_CASES_POST = "CLOSE_CASES_POST";
        var TCCL_DOWNLOAD_REPORT = "TCCL_DOWNLOAD_REPORT";
        var HL_BT_TOPUP_GET = "HL_BT_TOPUP_GET";
        var HL_BT_TOPUP_POST = "HL_BT_TOPUP_POST";
        var HL_BT_TOPUP = "HL_BT_TOPUP";
        var HL_BT_TOPUP_INTERNAL_GET = "HL_BT_TOPUP_INTERNAL_GET";
        var HL_BT_TOPUP_INTERNAL_POST = "HL_BT_TOPUP_INTERNAL_POST";
        var HL_BT_TOPUP_INTERNAL = "HL_BT_TOPUP_INTERNAL";
        var TCHFL_VENDOR_DATA_GET = "TCHFL_VENDOR_DATA_GET";
        var TCHFL_VENDOR_DATA_POST = "TCHFL_VENDOR_DATA_POST";
        var GET_RESULT_POST = "GET_RESULT_POST";
        var WEALTH_NEWSLATTER = "WEALTH_NEWSLATTER";
        var CUSTOMER_GRIEVANCES_NEW = "CUSTOMER_GRIEVANCES_NEW"
        var WHATSAPP_MSG_API = "WHATSAPP_MSG_API";
        var BT_CONVERT_OFFER_TO_OPPORTUNITY_POST = "BT_CONVERT_OFFER_TO_OPPORTUNITY_POST";
        var SARFAESI_PROPERTIES = "SARFAESI_PROPERTIES";
        var WEALTH_EXISTINGCUSTOMER = 'WEALTH_EXISTINGCUSTOMER';
        var REFERRALCUSTOMER = 'REFERRALCUSTOMER';
        var CITY_MASTER_WEALTH = "CITY_MASTER_WEALTH";
        var WEALTHWHATSAPPMESSAGE = 'WEALTHWHATSAPPMESSAGE';
        var SARFAESI_PROPERTIES_TCL = "SARFAESI_PROPERTIES_TCL";
        var BT_CONVERT_OFFER_TO_OPPORTUNITY_POST = "BT_CONVERT_OFFER_TO_OPPORTUNITY_POST";
        var FINANCIAL_INSTITUTE = "FINANCIAL_INSTITUTE";
        var WEALTH_INSURANCE_CITY_MASTER = "WEALTH_INSURANCE_CITY_MASTER";
        var LANGUAGE_INFO = "LANGUAGE_INFO";
        var DATA_ENRICHMENT_FETCH = "DATA_ENRICHMENT_FETCH";
        var DATA_ENRICHMENT_UPDATE = "DATA_ENRICHMENT_UPDATE";

        /**
         * API Constants 
         */

        var apiConstants = {};
        apiConstants[GOOGLE_SIGN_IN] = GOOGLE_SIGN_IN;
        apiConstants[DOWNNLOAD_APP_SMS] = DOWNNLOAD_APP_SMS;
        apiConstants[NEWS_LETTER] = NEWS_LETTER;
        apiConstants[GENERATE_OTP] = GENERATE_OTP;
        apiConstants[VERIFY_OTP] = VERIFY_OTP;
        apiConstants[ONCALL_OTP] = ONCALL_OTP;
        apiConstants[WHATSAPP_LEAD] = WHATSAPP_LEAD;
        apiConstants[BRANCH_LOCATOR] = BRANCH_LOCATOR;
        apiConstants[BRANCH_LOCATOR_SMS] = BRANCH_LOCATOR_SMS;
        apiConstants[FETCH_OFFERS] = FETCH_OFFERS;
        apiConstants[VALID_OFFERS] = VALID_OFFERS;
        apiConstants[PRE_APPROVED_OFFER_MASTER] = PRE_APPROVED_OFFER_MASTER;
        apiConstants[CONVERT_TO_OPPORTUINITY] = CONVERT_TO_OPPORTUINITY;
        apiConstants[CITY_PRODUCT_MASTER] = CITY_PRODUCT_MASTER;
        apiConstants[VEHICLE_VARIANT_MASTER] = VEHICLE_VARIANT_MASTER;
        apiConstants[VEHICLE_VARIANT_MASTER_NEW] = VEHICLE_VARIANT_MASTER_NEW;
        apiConstants[TWO_WHEELER_VARIANT_MASTER] = TWO_WHEELER_VARIANT_MASTER;
        apiConstants[APPLY_NOW_LEAD_GENERATE] = APPLY_NOW_LEAD_GENERATE;
        apiConstants[COUNTRY_MASTER] = CITY_PRODUCT_MASTER;
        apiConstants[CUSTOMER_SPEAK] = CUSTOMER_SPEAK;
        apiConstants[COMPANY_LIST] = COMPANY_LIST;
        apiConstants[LOAN_MITRA] = LOAN_MITRA;
        apiConstants[CUSTOMER_GRIEVANCES] = CUSTOMER_GRIEVANCES;
        apiConstants[OFFER_REGISTER] = OFFER_REGISTER;
        apiConstants[TOP_UP] = TOP_UP;
        apiConstants[GET_OFFERS] = GET_OFFERS;
        apiConstants[PINCODEMASTER] = PINCODEMASTER;
        apiConstants[TSSS_LEAD_GENERATE] = TSSS_LEAD_GENERATE;
        apiConstants[TSSS_EMAIL] = TSSS_EMAIL;
        apiConstants[TSSS_COMPANY] = TSSS_COMPANY;
        apiConstants[TSSS_DESIGNATION] = TSSS_DESIGNATION;

        apiConstants[CUSTOMER_FEEDBACK] = CUSTOMER_FEEDBACK;
        apiConstants[WTS_WHATSAPP] = WTS_WHATSAPP;
        apiConstants[CONTACT_US] = CONTACT_US;
        apiConstants[APPROVED_PROJECTS] = APPROVED_PROJECTS;
        apiConstants[COMPANY_NAME_CAMPAIGN] = COMPANY_NAME_CAMPAIGN;
        apiConstants[AGGREGATOR_LEAD_GENERATION] = AGGREGATOR_LEAD_GENERATION;
        apiConstants[CITY_PRODUCT_MASTER_CAMPAIGN] = CITY_PRODUCT_MASTER_CAMPAIGN;
        apiConstants[SUGAM_CAMPAIGN] = SUGAM_CAMPAIGN;
        apiConstants[ASSET_DISPOSAL_MIS] = ASSET_DISPOSAL_MIS;
        apiConstants[UPCOMING_PROPERTIES] = UPCOMING_PROPERTIES;
        apiConstants[PROP_REGISTRATION] = PROP_REGISTRATION;
        apiConstants[BOOK_INSPECTION] = BOOK_INSPECTION;
        apiConstants[INTERESTED_BROKER] = INTERESTED_BROKER;
        apiConstants[PROP_REGISTRATION_TCFSL] = PROP_REGISTRATION_TCFSL;
        apiConstants[BOOK_INSPECTION_TCFSL] = BOOK_INSPECTION_TCFSL;
        apiConstants[INTERESTED_BROKER_TCFSL] = INTERESTED_BROKER_TCFSL;
        apiConstants[PARTNER_WITH_US] = PARTNER_WITH_US;
        apiConstants[EMI_PART_PAYMENT] = EMI_PART_PAYMENT;
        apiConstants[PRE_POLULATE_EPP] = PRE_POLULATE_EPP;
        apiConstants[EMI_PART_PAYMENT_GET] = EMI_PART_PAYMENT_GET;
        apiConstants[VALID_EMAIL] = VALID_EMAIL;
        apiConstants[EDUCATION_LOAN_STATECITY] = EDUCATION_LOAN_STATECITY;
        apiConstants[EDUCATION_LOAN_COUNTRYLIST] = EDUCATION_LOAN_COUNTRYLIST;
        apiConstants[EDUCATION_LOAN_COURSES] = EDUCATION_LOAN_COURSES;
        apiConstants[EDUCATION_LOAN_FIELDLIST] = EDUCATION_LOAN_FIELDLIST;
        apiConstants[EDUCATION_LOAN_ALLUNIVERSITIES] = EDUCATION_LOAN_ALLUNIVERSITIES;
        apiConstants[EDUCATION_LOAN_PINCODE] = EDUCATION_LOAN_PINCODE;
        apiConstants[GET_RESULT_POST] = GET_RESULT_POST;
        apiConstants[WEALTH_NEWSLATTER] = WEALTH_NEWSLATTER;
        apiConstants[WHATSAPP_MSG_API] = WHATSAPP_MSG_API;
        apiConstants[WEALTH_EXISTINGCUSTOMER] = WEALTH_EXISTINGCUSTOMER;
        apiConstants[REFERRALCUSTOMER] = REFERRALCUSTOMER;

        apiConstants[WHATSAPP_MSG_API] = WHATSAPP_MSG_API
        apiConstants[CITY_MASTER_WEALTH] = CITY_MASTER_WEALTH;
        apiConstants[CIBIL_GET] = CIBIL_GET;
        apiConstants[CIBIL_GET_1] = CIBIL_GET_1;
        apiConstants[CIBIL_POST] = CIBIL_POST;
        apiConstants[OFFLINE_QUICK_CASH_GET] = OFFLINE_QUICK_CASH_GET;
        apiConstants[OFFLINE_QUICK_CASH_GET_1] = OFFLINE_QUICK_CASH_GET_1;
        apiConstants[OFFLINE_QUICK_CASH_POST] = OFFLINE_QUICK_CASH_POST;
        apiConstants[PRE_APPROVED_TOP_UP_GET] = PRE_APPROVED_TOP_UP_GET;
        apiConstants[PRE_APPROVED_TOP_UP_GET_1] = PRE_APPROVED_TOP_UP_GET_1;
        apiConstants[PRE_APPROVED_TOP_UP_POST] = PRE_APPROVED_TOP_UP_POST;
        apiConstants[CLOSE_CASES_GET] = CLOSE_CASES_GET;
        apiConstants[CLOSE_CASES_GET_1] = CLOSE_CASES_GET_1;
        apiConstants[CLOSE_CASES_POST] = CLOSE_CASES_POST;
        apiConstants[TCCL_DOWNLOAD_REPORT] = TCCL_DOWNLOAD_REPORT;
        apiConstants[HL_BT_TOPUP_GET] = HL_BT_TOPUP_GET;
        apiConstants[HL_BT_TOPUP_POST] = HL_BT_TOPUP_POST;
        apiConstants[HL_BT_TOPUP] = HL_BT_TOPUP;
        apiConstants[HL_BT_TOPUP_INTERNAL_GET] = HL_BT_TOPUP_INTERNAL;
        apiConstants[HL_BT_TOPUP_INTERNAL_POST] = HL_BT_TOPUP_INTERNAL;
        apiConstants[HL_BT_TOPUP_INTERNAL] = HL_BT_TOPUP_INTERNAL;
        apiConstants[TCCL_DOWNLOAD_REPORT] = TCCL_DOWNLOAD_REPORT;
        apiConstants[TCHFL_VENDOR_DATA_GET]= TCHFL_VENDOR_DATA_GET;
        apiConstants[TCHFL_VENDOR_DATA_POST]= TCHFL_VENDOR_DATA_POST;
        apiConstants[CUSTOMER_GRIEVANCES_NEW] = CUSTOMER_GRIEVANCES_NEW;
        apiConstants[BT_CONVERT_OFFER_TO_OPPORTUNITY_POST] = BT_CONVERT_OFFER_TO_OPPORTUNITY_POST;
        apiConstants[SARFAESI_PROPERTIES] = SARFAESI_PROPERTIES;
        apiConstants[WEALTHWHATSAPPMESSAGE] = WEALTHWHATSAPPMESSAGE;
        apiConstants[SARFAESI_PROPERTIES_TCL] = SARFAESI_PROPERTIES_TCL;
        apiConstants[FINANCIAL_INSTITUTE] = FINANCIAL_INSTITUTE;
        apiConstants[WEALTH_INSURANCE_CITY_MASTER] = WEALTH_INSURANCE_CITY_MASTER;
        apiConstants[LANGUAGE_INFO] = LANGUAGE_INFO;
        apiConstants[DATA_ENRICHMENT_FETCH] = DATA_ENRICHMENT_FETCH;
        apiConstants[DATA_ENRICHMENT_UPDATE] = DATA_ENRICHMENT_UPDATE;


        /**
         * API Selectors
         */

        var apiSelectors = {};
        apiSelectors[GOOGLE_SIGN_IN] = "/authenticator/identifier/partner";
        apiSelectors[DOWNNLOAD_APP_SMS] = "/nli-sms/send-sms/partner";
        apiSelectors[NEWS_LETTER] = "/subscribe-newsletter";
        apiSelectors[GENERATE_OTP] = "/nli-otp/shaft-generate-otp/partner";
        apiSelectors[VERIFY_OTP] = "/nli-otp/shaft-validate-otp/partner";
        apiSelectors[ONCALL_OTP] = "/nli-otp/on-call-otp/partner";
        apiSelectors[WHATSAPP_LEAD] = "/nli-whatsapp/whatsapp-lead/partner";
        apiSelectors[BRANCH_LOCATOR] = "/export/branchlocatormaster.json";
        apiSelectors[BRANCH_LOCATOR_SMS] = "/nli-sms/send-sms/partner";
        apiSelectors[FETCH_OFFERS] = "/nli-sfdc/fetch-offers/partner";
        apiSelectors[VALID_OFFERS] = "/nli-sfdc/is-valid-pre-approved-offer/partner";
        apiSelectors[PRE_APPROVED_OFFER_MASTER] = "/export/preapprovedoffermaster.json";
        apiSelectors[CONVERT_TO_OPPORTUINITY] = "/nli-sfdc/offer-to-opportunity/partner";
        apiSelectors[CITY_PRODUCT_MASTER] = "/export/cityproductmaster.json";
        apiSelectors[VEHICLE_VARIANT_MASTER] = "/export/vehiclevariantsmaster.json";
        apiSelectors[VEHICLE_VARIANT_MASTER_NEW] = "/export/vehiclevariantsmaster-nli.json";
        apiSelectors[TWO_WHEELER_VARIANT_MASTER] = "/export/twowheelerloanmaster.json";
        apiSelectors[APPLY_NOW_LEAD_GENERATE] = "/nli-sfdc/lead-generation/partner";
        apiSelectors[COUNTRY_MASTER] = "/export/countrymaster.json";
        apiSelectors[CUSTOMER_SPEAK] = "/export/customer-speak.json";
        apiSelectors[COMPANY_LIST] = "/db-channel/get-pl-eligibility-comapany-list/partner";
        apiSelectors[LOAN_MITRA] = "/nli-db/nli-website-loan-mitra/partner";
        apiSelectors[CUSTOMER_GRIEVANCES] = "/nli-internal/file-user-complaint/partner";
        apiSelectors[OFFER_REGISTER] = "/nli-authenticator/get-register-offer-details/partner";
        apiSelectors[TOP_UP] = "/nli-internal/nli-bt-calculator/partner";
        apiSelectors[PINCODEMASTER] = "/export/pincodestdmaster.json";
        apiSelectors[TSSS_LEAD_GENERATE] = "/nli-sfdc/tsss-lead-journey/partner";
        apiSelectors[TSSS_EMAIL] = "/notification/email-notification/partner";
        apiSelectors[TSSS_COMPANY] = "/db-channel/fetch-company-name/partner";
        apiSelectors[TSSS_DESIGNATION] = "/db-channel/fetch-designation-name/partner";
        apiSelectors[CUSTOMER_FEEDBACK] = "/customer-speak";
        apiSelectors[WTS_WHATSAPP] = "/nli-whatsapp/whatsapp-self-service/partner";
        apiSelectors[CONTACT_US] = "/nli-db/nli-contact-us/partner";
        apiSelectors[APPROVED_PROJECTS] = "/export/approved-projects.json";
        apiSelectors[COMPANY_NAME_CAMPAIGN] = "/export/email-campaign-company-list.json";
        apiSelectors[AGGREGATOR_LEAD_GENERATION] = "/nli-sfdc/aggregator-lead-generation/partner";
        apiSelectors[CITY_PRODUCT_MASTER_CAMPAIGN] = "/export/cityproductmaster.json";
        apiSelectors[SUGAM_CAMPAIGN] = "/sugam-leads";
        apiSelectors[GET_OFFERS] = "/nli-sfdc/get-offers/partner";
        apiSelectors[PARTNER_WITH_US] = '/partner-with-us';
        apiSelectors[EMI_PART_PAYMENT] = '/emi-part-payment-campaign';
        apiSelectors[PRE_POLULATE_EPP] = '/export/pre-populate-epp.json';
        apiSelectors[EMI_PART_PAYMENT_GET] = '/export/emi-part-payment-campaign.json';


        apiSelectors[ASSET_DISPOSAL_MIS] = "/export/assetdisposalmis.json";
        apiSelectors[UPCOMING_PROPERTIES] = "/export/upcoming-properties.json";
        apiSelectors[PROP_REGISTRATION] = "/prop-registration";
        apiSelectors[BOOK_INSPECTION] = "/book-inspection";
        apiSelectors[INTERESTED_BROKER] = "/intressted-broker";
        apiSelectors[PROP_REGISTRATION_TCFSL] = "/prop-regist-tcfsl";
        apiSelectors[BOOK_INSPECTION_TCFSL] = "/inspection-tcfsl";
        apiSelectors[INTERESTED_BROKER_TCFSL] = "/broker-tcfsl";
        apiSelectors[PARTNER_WITH_US] = '/partner-with-us';
        apiSelectors[EMI_PART_PAYMENT] = '/emi-part-payment-campaign';
        apiSelectors[PRE_POLULATE_EPP] = '/export/pre-populate-epp.json';
        apiSelectors[EMI_PART_PAYMENT_GET] = '/export/emi-part-payment-campaign.json';

        apiSelectors[VALID_EMAIL] = '/export/email-validation.json';
        apiSelectors[EDUCATION_LOAN_STATECITY] = '/export/edu-statecity.json';
        apiSelectors[EDUCATION_LOAN_COUNTRYLIST] = '/export/edu-countrylist.json';
        apiSelectors[EDUCATION_LOAN_COURSES] = '/export/edu-courses.json';
        apiSelectors[EDUCATION_LOAN_FIELDLIST] = '/export/edu-fieldlist.json';
        apiSelectors[EDUCATION_LOAN_ALLUNIVERSITIES] = '/export/edu-alluniversities.json';
        apiSelectors[EDUCATION_LOAN_PINCODE] = '/export/edu-pincode.json';
        apiSelectors[CIBIL_GET_1] = '/export/new-cibil-tcl.json';
        apiSelectors[CIBIL_GET] = '/export/cibil.json';
        apiSelectors[CIBIL_POST] = '/cibil';
        apiSelectors[OFFLINE_QUICK_CASH_GET_1] = '/export/offline-quick-cash.json';
        apiSelectors[OFFLINE_QUICK_CASH_GET] = '/export/offline.json';
        apiSelectors[OFFLINE_QUICK_CASH_POST] = '/offline-quick-cash-post';
        apiSelectors[PRE_APPROVED_TOP_UP_GET] = '/export/preapproved.json';
        apiSelectors[PRE_APPROVED_TOP_UP_GET_1] = '/export/pre-approved.json';
        apiSelectors[PRE_APPROVED_TOP_UP_POST] = '/preapproved';
        apiSelectors[CLOSE_CASES_GET] = '/export/closecases.json';
        apiSelectors[CLOSE_CASES_GET_1] = '/export/close-cases.json';
        apiSelectors[CLOSE_CASES_POST] = '/closecases';
        apiSelectors[TCCL_DOWNLOAD_REPORT] = '/pdf-download-report';
        apiSelectors[HL_BT_TOPUP_GET] = '/export/hl-bt-topup.json';
        apiSelectors[HL_BT_TOPUP_POST] = '/hl-bt-topup-post';
        apiSelectors[HL_BT_TOPUP] = '/export/hl-bt-topup-post.json';
        apiSelectors[HL_BT_TOPUP_INTERNAL_GET] = '/export/bt-topup-internal.json';
        apiSelectors[HL_BT_TOPUP_INTERNAL_POST] = '/bt-topup-internal-post';
        apiSelectors[HL_BT_TOPUP_INTERNAL] = '/export/bt-topup-internal-post.json';
        apiSelectors[TCCL_DOWNLOAD_REPORT] = '/pdf-download-report';
        apiSelectors[TCHFL_VENDOR_DATA_GET] = '/export/vendor-data.json';
        apiSelectors[TCHFL_VENDOR_DATA_POST] = '/nli-internal/upload-procurement-audit-doc/partner';
        apiSelectors[GET_RESULT_POST] = '/wealth-calc-db';
        apiSelectors[WEALTH_NEWSLATTER] = '/wealth-subscription';
        apiSelectors[CUSTOMER_GRIEVANCES_NEW] = '/nli-sfdc/sfdc-customer-grievances/partner';
        apiSelectors[WHATSAPP_MSG_API] = '/nli-whatsapp/wealth-calc/partner';
        apiSelectors[BT_CONVERT_OFFER_TO_OPPORTUNITY_POST] = '/nli-sfdc/bt-offer-to-opportunity/partner';
        apiSelectors[SARFAESI_PROPERTIES] = '/export/rbi-sarfaesi-db.json';
        apiSelectors[WEALTH_EXISTINGCUSTOMER] = '/export/wealth-existing-customer.json';
        apiSelectors[REFERRALCUSTOMER] = '/referralcustomer';
        apiSelectors[CITY_MASTER_WEALTH] = '/export/cityproductmaster.json';
        apiSelectors[WEALTHWHATSAPPMESSAGE] = '/nli-whatsapp/wealth-home/partner';
        apiSelectors[SARFAESI_PROPERTIES_TCL] = '/export/rbi-sarfaesi-db-tcl.json';
        apiSelectors[BT_CONVERT_OFFER_TO_OPPORTUNITY_POST] = '/nli-sfdc/bt-offer-to-opportunity/partner';
        apiSelectors[FINANCIAL_INSTITUTE] = '/export/financial-institute.json';
        apiSelectors[WEALTH_INSURANCE_CITY_MASTER] = '/export/beyound-form-cities.json';
        apiSelectors[LANGUAGE_INFO] = "/nli-db/language-info/partner";
        apiSelectors[DATA_ENRICHMENT_FETCH] = '/nli-db/fetch-data-enrichment-details/partner';
        apiSelectors[DATA_ENRICHMENT_UPDATE] = '/nli-db/update-data-enrichment-flag/partner';


        /**
         * API Domain
         */

        var apiDomain = {};
        apiDomain[GOOGLE_SIGN_IN] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[DOWNNLOAD_APP_SMS] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[NEWS_LETTER] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[GENERATE_OTP] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[VERIFY_OTP] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[ONCALL_OTP] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[WHATSAPP_LEAD] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[BRANCH_LOCATOR] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[BRANCH_LOCATOR_SMS] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[FETCH_OFFERS] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[VALID_OFFERS] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[PRE_APPROVED_OFFER_MASTER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[CONVERT_TO_OPPORTUINITY] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[CITY_PRODUCT_MASTER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[VEHICLE_VARIANT_MASTER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[VEHICLE_VARIANT_MASTER_NEW] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[TWO_WHEELER_VARIANT_MASTER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[APPLY_NOW_LEAD_GENERATE] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[COUNTRY_MASTER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[CUSTOMER_SPEAK] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[COMPANY_LIST] = window.osgiConfigObj.postApiDomain+"/api2/shaft";
        apiDomain[LOAN_MITRA] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[CUSTOMER_GRIEVANCES] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[OFFER_REGISTER] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[TOP_UP] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[PINCODEMASTER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[TSSS_LEAD_GENERATE] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[TSSS_EMAIL] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[TSSS_COMPANY] = window.osgiConfigObj.postApiDomain+"/api2/shaft";
        apiDomain[TSSS_DESIGNATION] = window.osgiConfigObj.postApiDomain+"/api2/shaft";
        apiDomain[CUSTOMER_FEEDBACK] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[WTS_WHATSAPP] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[CONTACT_US] =  window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[APPROVED_PROJECTS] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[COMPANY_NAME_CAMPAIGN] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[AGGREGATOR_LEAD_GENERATION] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[CITY_PRODUCT_MASTER_CAMPAIGN] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[SUGAM_CAMPAIGN] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[GET_OFFERS] =  window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[PARTNER_WITH_US] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[EMI_PART_PAYMENT] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[PRE_POLULATE_EPP] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[EMI_PART_PAYMENT_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        
        apiDomain[ASSET_DISPOSAL_MIS] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[UPCOMING_PROPERTIES] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[PROP_REGISTRATION] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[BOOK_INSPECTION] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[INTERESTED_BROKER] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[PROP_REGISTRATION_TCFSL] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[BOOK_INSPECTION_TCFSL] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[INTERESTED_BROKER_TCFSL] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[PARTNER_WITH_US] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[EMI_PART_PAYMENT] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[PRE_POLULATE_EPP] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[EMI_PART_PAYMENT_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[VALID_EMAIL] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[CIBIL_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[CIBIL_GET_1] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[CIBIL_POST] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[OFFLINE_QUICK_CASH_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[OFFLINE_QUICK_CASH_GET_1] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[OFFLINE_QUICK_CASH_POST] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[PRE_APPROVED_TOP_UP_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[PRE_APPROVED_TOP_UP_GET_1] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[PRE_APPROVED_TOP_UP_POST] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[CLOSE_CASES_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[CLOSE_CASES_GET_1] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[CLOSE_CASES_POST] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[TCCL_DOWNLOAD_REPORT] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[HL_BT_TOPUP_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[HL_BT_TOPUP_POST] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[HL_BT_TOPUP] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[HL_BT_TOPUP_INTERNAL_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[HL_BT_TOPUP_INTERNAL_POST] = window.osgiConfigObj.postApiDomain+"/api/mdm";
        apiDomain[HL_BT_TOPUP_INTERNAL] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[TCHFL_VENDOR_DATA_GET] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[TCHFL_VENDOR_DATA_POST] = window.osgiConfigObj.domainUrlApi+"/api/shaft";
        apiDomain[GET_RESULT_POST] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[WEALTH_NEWSLATTER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[WHATSAPP_MSG_API] = window.osgiConfigObj.domainUrlApi+"/api/shaft";
        apiDomain[WEALTH_EXISTINGCUSTOMER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[REFERRALCUSTOMER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[CITY_MASTER_WEALTH] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[WEALTHWHATSAPPMESSAGE] = window.osgiConfigObj.domainUrlApi+"/api/shaft";
        
        apiDomain[EDUCATION_LOAN_STATECITY] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[EDUCATION_LOAN_COURSES] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[EDUCATION_LOAN_COUNTRYLIST] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[EDUCATION_LOAN_FIELDLIST] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[EDUCATION_LOAN_ALLUNIVERSITIES] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[EDUCATION_LOAN_PINCODE] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[CUSTOMER_GRIEVANCES_NEW] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[BT_CONVERT_OFFER_TO_OPPORTUNITY_POST] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[SARFAESI_PROPERTIES] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[SARFAESI_PROPERTIES_TCL] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[FINANCIAL_INSTITUTE] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[WEALTH_INSURANCE_CITY_MASTER] = window.osgiConfigObj.domainUrlApi+"/api/mdm";
        apiDomain[LANGUAGE_INFO] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[DATA_ENRICHMENT_FETCH] = window.osgiConfigObj.postApiDomain+"/api/shaft";
        apiDomain[DATA_ENRICHMENT_UPDATE] = window.osgiConfigObj.postApiDomain+"/api/shaft";


        /**
         * API Extension object
         */

        var apiExtension = {};
        var productCode = productCodeId;
        if (productCode == "LAP" || productCode == "LAPOD" || productCode == 'bt') {
            productCode = "HE";
        }
        if ((productCode == 'TW101') || (productCode == 'MO101') || (productCode == 'PR105') || (productCode == 'SITR107') || (productCode == 'HE103') || (productCode == 'HE104') || (productCode == 'HE105') || (productCode == 'WS101') || (productCode == 'WP101') || (productCode == 'HA101') || (productCode == 'HA101') || (productCode == 'HC101') || (productCode == 'CS101') || (productCode == 'PE101') || (productCode == 'RS101') || (productCode == 'CP101') || (productCode == 'TR102') || (productCode == 'TR102') || (productCode == 'TR102') || (productCode == 'CIS101') || (productCode == "HO104")) {
            productCode = "INSURANCE";
        }
        if(productCode=="LOC" || productCode=="SBICARDS"){
          productCode = "UCL"
        }
        apiExtension[CITY_PRODUCT_MASTER] = "?product="+productCode;
        /**
         * API Config Object to expose
         */


        var apiConfig = {};
        Object.keys(apiConstants).forEach(function (eachApiConstant) {
            apiConfig[eachApiConstant] = jsHelper.freezeObj({
                "name": apiConstants[eachApiConstant],
                "selector": apiSelectors[eachApiConstant],
                "domain": apiDomain[eachApiConstant],
                "apiExtension": apiExtension[eachApiConstant]
            });
        });
        return jsHelper.freezeObj(apiConfig);
    })(_global.jsHelper);
    _global.jsHelper.defineReadOnlyObjProp(_global, 'apiConfig', _apiConfig);
})(this);
