/*******************************************API Utility Module - Start******************************************************/
(function (_global) {
    var _apiUtility = (function fnApiUtility(
        jsHelper,
        appConfig,
        apiConfig,
        ajaxUtility
    ) {
        if (exceptionUtility) {
            exceptionUtility.dependencyCheck(
                [jsHelper, appConfig, apiConfig, ajaxUtility],
                "API Utility"
            );
        }
        var apiUtilityObj = {};
        var call = function callApi(eachApiConfig, data) {
            return new Promise(function (resolve, reject) {
                var domain = jsHelper.isDef(eachApiConfig.domain)
                    ? eachApiConfig.domain
                    : appConfig.domain;

                var apiExtension = jsHelper.isDef(eachApiConfig.apiExtension)
                    ? eachApiConfig.apiExtension
                    : "";

                // var apiUrl = appConfig.apiRoot + "." + eachApiConfig.selector + appConfig.apiExtension;
                var apiUrl = domain + eachApiConfig.selector + apiExtension;

                ajaxUtility
                    .postJson(apiUrl, data)
                    .then(function (responseText) {
                        resolve(responseText);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };

        var getcall = function callApi(eachApiConfig, data) {
            return new Promise(function (resolve, reject) {
                var domain = jsHelper.isDef(eachApiConfig.domain)
                    ? eachApiConfig.domain
                    : appConfig.domain;

                var apiExtension = jsHelper.isDef(eachApiConfig.apiExtension)
                    ? eachApiConfig.apiExtension
                    : "";
                //var apiUrl = appConfig.apiRoot + "." + eachApiConfig.selector + appConfig.apiExtension;
                var apiUrl = domain + eachApiConfig.selector + apiExtension;
                ajaxUtility
                    .getJson(apiUrl, data)
                    .then(function (responseText) {
                        resolve(responseText);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };

        /***********POST DEMO API**********/
        var demoPostApi = function demoPostApi(data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.DEMO, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.demoPostApi = demoPostApi;

        /***********POST DEMO API**********/

        /***********GET DEMO API**********/

        var demoGetApi = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.demo, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.demoGetApi = demoGetApi;

        /***********GET DEMO API**********/

        /***********DOWNLOAD APP SMS API**********/

        var downLoadAppSms = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.DOWNNLOAD_APP_SMS, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.downLoadAppSms = downLoadAppSms;

        /***********DOWNLOAD APP SMS API**********/

        /***********Google Sign in API**********/

        var googleSignIn = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.GOOGLE_SIGN_IN, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.googleSignIn = googleSignIn;

        /***********News Letter API**********/

        var newsLetter = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.NEWS_LETTER, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.newsLetter = newsLetter;

        /***********News Letter API**********/

        /***********Generate Otp API**********/

        var generateOtp = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.GENERATE_OTP, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.generateOtp = generateOtp;

        /***********Generate Otp API**********/

        /***********Verify Otp API**********/

        var verifyOtp = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.VERIFY_OTP, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.verifyOtp = verifyOtp;
       /***********Verify Otp API**********/

        /***********onCall Otp API**********/
        var onCallOtp = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.ONCALL_OTP, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.onCallOtp = onCallOtp;
       /***********onCall Otp API**********/

        /***********Whatsapp Lead API**********/

        var whatsAppLead = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.WHATSAPP_LEAD, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.whatsAppLead = whatsAppLead;

        /***********Whatsapp Lead API**********/

        /***********Branch Locator API**********/

        var branchLocator = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.BRANCH_LOCATOR, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.branchLocator = branchLocator;

        /***********Branch Locator API**********/

        /***********Branch Locator SMS API**********/

        var branchLocatorSMS = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.BRANCH_LOCATOR_SMS, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.branchLocatorSMS = branchLocatorSMS;

        /***********Branch Locator SMS API**********/

        /***********Fetch Offers APi**********/

        var fetchOffers = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.FETCH_OFFERS, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
/*
        apiUtilityObj.branchLocatorSMS = branchLocatorSMS;
*/

        /***********Branch Locator SMS API**********/
        apiUtilityObj.fetchOffers = fetchOffers;

        /***********Fetch Offers APi**********/
        /***********Valid Offers APi**********/

        var validOffers = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.VALID_OFFERS, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.validOffers = validOffers;

        /***********Valid Offers APi**********/
        /***********Pre Approved Offer Master**********/

        var preApprovedOfferMaster = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.PRE_APPROVED_OFFER_MASTER, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.preApprovedOfferMaster = preApprovedOfferMaster;

        /***********Pre Approved Offer Master**********/
        /***********Convert Offer to Opportuinity APi**********/

        var convertToOpportuinity = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.CONVERT_TO_OPPORTUINITY, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.convertToOpportuinity = convertToOpportuinity;

        /***********Convert Offer to Opportuinity APi**********/

        /***********CITY PRODUCT MASTER**********/

        var cityProductMaster = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.CITY_PRODUCT_MASTER, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.cityProductMaster = cityProductMaster;

        /***********CITY PRODUCT MASTER**********/

        /***********VEHICLE VARIANT MASTER**********/

        var vehicleVariantMaster = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.VEHICLE_VARIANT_MASTER, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.vehicleVariantMaster = vehicleVariantMaster;

        /***********VEHICLE VARIANT MASTER**********/

        /***********VEHICLE VARIANT MASTER NEW**********/

        var vehicleVariantMasterNew = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.VEHICLE_VARIANT_MASTER_NEW, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.vehicleVariantMasterNew = vehicleVariantMasterNew;

        /***********VEHICLE VARIANT MASTER NEW**********/

        /***********TWO WHEELER LOAN MASTER**********/

        var twoWheelerVariantMaster = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.TWO_WHEELER_VARIANT_MASTER, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.twoWheelerVariantMaster = twoWheelerVariantMaster;

        /***********TWO WHEELER LOAN MASTER**********/

        /***********Apply Now Lead Generation APi**********/

        var applyNowLeadGenerate = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.APPLY_NOW_LEAD_GENERATE, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.applyNowLeadGenerate = applyNowLeadGenerate;

        /***********Apply Now Lead Generation APi**********/

        /***********COUNTRY MASTER**********/

        var countryMaster = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.COUNTRY_MASTER, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.countryMaster = countryMaster;

        /***********COUNTRY MASTER**********/
        /***********CUSTOMER SPEAK**********/

        var customerSpeak = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.CUSTOMER_SPEAK, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.customerSpeak = customerSpeak;

        /***********CUSTOMER SPEAK**********/
         /***********COMPANY LIST **********/

         var companyList = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.COMPANY_LIST, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.companyList = companyList;

        /***********COMPANY LIST **********/
        /*********** Loan Mitra **********/

        var loanMitra = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.LOAN_MITRA, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.loanMitra = loanMitra;

        /*********** Loan Mitra **********/

        /*********** Offer Register **********/

        var offerRegister = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.OFFER_REGISTER, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.offerRegister = offerRegister;

        /*********** Offer Register **********/
        
        /*********** Customer Grievances **********/

        var customerGrievances = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.CUSTOMER_GRIEVANCES, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.customerGrievances = customerGrievances;

        /*********** Customer Grievances **********/
        /*********** Top Up **********/

        var topUp = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.TOP_UP, data)      .then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    apiUtilityObj.topUp = topUp;

    /*********** Top Up **********/
    /***********PIN CODE MASTER**********/

    var pinCodeMaster = function (data) {
        return new Promise(function (resolve, reject) {
            getcall(apiConfig.PINCODEMASTER, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };
    apiUtilityObj.pinCodeMaster = pinCodeMaster;

    /***********PIN CODE MASTER**********/
     /*********** TSSS LEAD GENERATE **********/

     var tsssLeadGenerate = function (data) {
        return new Promise(function (resolve, reject) {
            call(apiConfig.TSSS_LEAD_GENERATE, data)
            .then(function (response) {
                if (jsHelper.isStr(response)) {
                    response = jsHelper.parseJson(response);
                }
                resolve(response);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};
apiUtilityObj.tsssLeadGenerate = tsssLeadGenerate;

   /*********** TSSS LEAD GENERATE **********/
   /*********** TSSS EMAIL **********/

   var tsssEmail = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.TSSS_EMAIL, data)
        .then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
        .catch(function (err) {
            reject(err);
        });
});
};
apiUtilityObj.tsssEmail = tsssEmail;

/*********** TSSS EMAIL **********/
/*********** TSSS COMPANY LIST **********/

var tsssCompanyList = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.TSSS_COMPANY, data)
        .then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
        .catch(function (err) {
            reject(err);
        });
});
};
apiUtilityObj.tsssCompanyList = tsssCompanyList;

/*********** TSSS COMPANY LIST **********/
/*********** TSSS DESIGNATION LIST **********/

var tsssDesignationList = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.TSSS_DESIGNATION, data)
        .then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
        .catch(function (err) {
            reject(err);
        });
});
};
apiUtilityObj.tsssDesignationList = tsssDesignationList;

/*********** TSSS DESIGNATION LIST **********/
        /*********** Customer Grievances **********/

        var customerFeedback = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.CUSTOMER_FEEDBACK, data)
                .then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    apiUtilityObj.customerFeedback = customerFeedback;

        /*********** Customer Grievances **********/
        
        /*********** Ways To Service Whatsapp **********/

        var wtsWhatsapp = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.WTS_WHATSAPP, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.wtsWhatsapp = wtsWhatsapp;

        /*********** Ways To Service Whatsapp **********/

        /*********** Contact Us Api **********/

        var contactUs = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.CONTACT_US, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.contactUs = contactUs;

        /*********** Contact Us Api **********/
        /***********APPROVED_PROJECTS**********/

        var approvedProjects = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.APPROVED_PROJECTS, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };
    apiUtilityObj.approvedProjects = approvedProjects;

    /***********APPROVED_PROJECTS**********/
        /***********COMPANY NAME CAMPAIGN**********/

        var companyNameCampaign = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.COMPANY_NAME_CAMPAIGN, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.companyNameCampaign = companyNameCampaign;

        /***********COMPANY NAME CAMPAIGN**********/
        /***********Aggregator Lead Generation APi(email campaign)**********/

        var aggregatorLeadGeneration = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.AGGREGATOR_LEAD_GENERATION, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.aggregatorLeadGeneration = aggregatorLeadGeneration;

        /***********Aggregator Lead Generation APi(email campaign)**********/
        /***********CITY PRODUCT MASTER without product code**********/

        var cityProductMasterCampaign = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.CITY_PRODUCT_MASTER_CAMPAIGN, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.cityProductMasterCampaign = cityProductMasterCampaign;

        /***********CITY PRODUCT MASTER without product code**********/      
               /*********** Sugam campaign **********/

        var sugamCampaign = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.SUGAM_CAMPAIGN, data).then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
        apiUtilityObj.sugamCampaign = sugamCampaign;

    /*********** Sugam campaign **********/ 

    /*********** GET OFFERS **********/ 
    var getOffers = function (data) {
        return new Promise(function (resolve, reject) {
            call(apiConfig.GET_OFFERS, data)
                .then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    apiUtilityObj.getOffers = getOffers; 
    /*********** GET OFFERS **********/  
     /***********GET ASSET DISPOSAL MIS API */

     var assetDisposalMis = function (data) {
        return new Promise(function (resolve, reject) {
            getcall(apiConfig.ASSET_DISPOSAL_MIS, data)
                .then(function (response) {
                    resolve(response);
                }).catch(function (error) {
                    reject(error);
                });
        })
    }
    apiUtilityObj.assetDisposalMis = assetDisposalMis;

    /***********GET ASSET DISPOSAL MIS API */ 
    
    
    /*********** GET ASSET DISPOSAL MIS CALL WITH QUERY STRING [START] ************/
        var getCall_QueryString = function getCall_MIS(eachApiConfig, data, queryString) {
            return new Promise(function (resolve, reject) {
                var domain = jsHelper.isDef(eachApiConfig.domain) ? eachApiConfig.domain : appConfig.domain;
                var apiExtension = jsHelper.isDef(eachApiConfig.apiExtension) ? eachApiConfig.apiExtension: "";
                var apiUrl = domain + eachApiConfig.selector + apiExtension + queryString || "";
                
                ajaxUtility
                    .getJson(apiUrl, data)
                    .then(function (responseText) {
                        resolve(responseText);
                    }).catch(function (error) {
                        reject(error);
                    });

            });

        }

    /*********** GET ASSET DISPOSAL MIS CALL WITH QUERY STRING [END] ************/

    /*********** GET ASSET DISPOSAL MIS FILTER WTH QUERY STRING [START] ************/

        var getAssetDisposalMISFilter = function getAssetDisposalMISFilter(data, queryString) {
            return new Promise(function (resolve, reject) {
                getCall_QueryString(apiConfig.ASSET_DISPOSAL_MIS, data, queryString)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    }).catch(function (err) {
                        reject(err);
                    });
            });

        }

        apiUtilityObj.getAssetDisposalMISFilter = getAssetDisposalMISFilter;

        /*********** GET ASSET DISPOSAL MIS FILTER WTH QUERY STRING END ************/
        /*********** POST ASSET DISPOSAL PROP REGISTRATION **********/

    /***********UPCOMING PROPERTIES************/

     var upcomingPropertiesFilter = function (data) {
        return new Promise(function (resolve, reject) {
            getcall(apiConfig.UPCOMING_PROPERTIES, data)
                .then(function (response) {
                    resolve(response);
                }).catch(function (error) {
                    reject(error);
                });
        })
    }
    apiUtilityObj.upcomingPropertiesFilter = upcomingPropertiesFilter;

    /***********UPCOMING PROPERTIES************/

        var propRegistration = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.PROP_REGISTRATION, data).then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    apiUtilityObj.propRegistration = propRegistration;

        /*********** POST ASSET DISPOSAL PROP REGISTRATION **********/
        /*********** POST ASSET DISPOSAL BOOK INSPECTION **********/

        var bookInspection = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.BOOK_INSPECTION, data).then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.bookInspection = bookInspection;

        /*********** POST ASSET DISPOSAL BOOK INSPECTION **********/
        /*********** POST ASSET DISPOSAL INTERESTED BROKER **********/

        var interstedBroker = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.INTERESTED_BROKER, data).then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.interstedBroker = interstedBroker;
        /*********** POST ASSET DISPOSAL INTERESTED BROKER **********/

/*********** POST ASSET DISPOSAL PROP REGISTRATION TCFSL **********/
var propRegistrationTcfsl = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.PROP_REGISTRATION_TCFSL, data).then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
        .catch(function (err) {
            reject(err);
        });
});
};
apiUtilityObj.propRegistrationTcfsl = propRegistrationTcfsl;

/*********** POST ASSET DISPOSAL PROP REGISTRATION TCFSL**********/
/*********** POST ASSET DISPOSAL BOOK INSPECTION TCFSL**********/

var bookInspectionTcfsl = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.BOOK_INSPECTION_TCFSL, data).then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
            .catch(function (err) {
                reject(err);
            });
    });
};
apiUtilityObj.bookInspectionTcfsl = bookInspectionTcfsl;

/*********** POST ASSET DISPOSAL BOOK INSPECTION TCFSL**********/
/*********** POST ASSET DISPOSAL INTERESTED BROKER TCFSL**********/

var interstedBrokerTcfsl = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.INTERESTED_BROKER_TCFSL, data).then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
            .catch(function (err) {
                reject(err);
            });
    });
};
apiUtilityObj.interstedBrokerTcfsl = interstedBrokerTcfsl;

/*********** POST ASSET DISPOSAL INTERESTED BROKER TCFSL**********/
 /*********** Partner With Us **********/
 var partnerWithUs = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.PARTNER_WITH_US, data).then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
            .catch(function (err) {
                reject(err);
            });
        });
        };
        apiUtilityObj.partnerWithUs = partnerWithUs;

    /*********** Partner With Us **********/ 
    /*********** EMI PART PAYMENT **********/
    var emiPartPayment = function (data) {
        return new Promise(function (resolve, reject) {
            call(apiConfig.EMI_PART_PAYMENT, data).then(function (response) {
                if (jsHelper.isStr(response)) {
                    response = jsHelper.parseJson(response);
                }
                resolve(response);
            })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    apiUtilityObj.emiPartPayment = emiPartPayment;

 /*********** EMI PART PAYMENT **********/   
 /***********PRE POLULATE EPP**********/

 var prePopulateEpp = function (data) {
    return new Promise(function (resolve, reject) {
        getcall(apiConfig.PRE_POLULATE_EPP, data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};
apiUtilityObj.prePopulateEpp = prePopulateEpp;

/***********PRE POLULATE EPP**********/
/*********** EMI PART PAYMENT GET **********/
var emiPartPaymentCampaignGet = function (data) {
    return new Promise(function (resolve, reject) {
        getcall(apiConfig.EMI_PART_PAYMENT_GET, data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};
apiUtilityObj.emiPartPaymentCampaignGet = emiPartPaymentCampaignGet;

/*********** EMI PART PAYMENT POST **********/

        /***********Valid Email code start**********/

        var validEmails = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.VALID_EMAIL, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.validEmails = validEmails;

        /***********Valid Email code start end**********/ 
      

        /**********Eduction loan state city api ******************/

        var eductionLoanStateCity = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.EDUCATION_LOAN_STATECITY, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.eductionLoanStateCity = eductionLoanStateCity;

        /**********Eduction loan state city api ******************/

        /**********Eduction loan countrylist api ******************/

        var educationLoanCountrylist = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.EDUCATION_LOAN_COUNTRYLIST, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.educationLoanCountrylist = educationLoanCountrylist;

        /**********Eduction loan countrylist api ******************/

        /**********Eduction loan courses api ******************/

        var educationLoanCourses = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.EDUCATION_LOAN_COURSES, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.educationLoanCourses = educationLoanCourses;

        /**********Eduction loan courses api ******************/

        /**********Eduction loan field list api ******************/

        var educationLoanFieldlist = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.EDUCATION_LOAN_FIELDLIST, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };
    apiUtilityObj.educationLoanFieldlist = educationLoanFieldlist;

    /**********Eduction loan field list api ******************/

    /**********Eduction loan all universities api ******************/

    var educationLoanAlluniversities = function (data) {
        return new Promise(function (resolve, reject) {
            getcall(apiConfig.EDUCATION_LOAN_ALLUNIVERSITIES, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };
    apiUtilityObj.educationLoanAlluniversities = educationLoanAlluniversities;

    /**********Eduction loan all universities api ******************/

    /**********Eduction loan pincode api ******************/

    var educationLoanPincode = function (data) {
        return new Promise(function (resolve, reject) {
            getcall(apiConfig.EDUCATION_LOAN_PINCODE, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };
    apiUtilityObj.educationLoanPincode = educationLoanPincode;

    /**********Eduction loan pincode api ******************/
            /***********cIBIL**********/

            var cibilGet = function (data) {
                return new Promise(function (resolve, reject) {
                    getcall(apiConfig.CIBIL_GET_1, data)
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        });
                });
            };
            apiUtilityObj.cibilGet = cibilGet;
    
            /***********cIBIL**********/
            /***********cIBIL**********/

            var cibil = function (data) {
                return new Promise(function (resolve, reject) {
                    getcall(apiConfig.CIBIL_GET, data)
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        });
                });
            };
            apiUtilityObj.cibil = cibil;
    
            /***********cIBIL**********/
            /***********cIBIL**********/

            var cibilPost = function (data) {
                return new Promise(function (resolve, reject) {
                    call(apiConfig.CIBIL_POST, data)
                        .then(function (response) {
                            if (jsHelper.isStr(response)) {
                                response = jsHelper.parseJson(response);
                            }
                            resolve(response);
                        })
                        .catch(function (err) {
                            reject(err);
                        });
                });
            };
            apiUtilityObj.cibilPost = cibilPost;
    
            /***********cIBIL**********/
                /***********Offline Quick Cash GET**********/

        var offlineQuickCash = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.OFFLINE_QUICK_CASH_GET, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.offlineQuickCash = offlineQuickCash;

        /***********Offline Quick Cash GET**********/ 
        /***********Offline Quick Cash GET**********/

        var offlineQuickCashGet = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.OFFLINE_QUICK_CASH_GET_1, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.offlineQuickCashGet = offlineQuickCashGet;

        /***********Offline Quick Cash GET**********/ 
        /***********Offline Quick Cash POST**********/

        var offlineQuickCashPost = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.OFFLINE_QUICK_CASH_POST, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
            })
                .catch(function (err) {
                    reject(err);
                });

        };
        apiUtilityObj.offlineQuickCashPost = offlineQuickCashPost;

/***********Offline Quick Cash POST**********/
                 
       

        /*********** POST REFERRAL CUSTOMER **********/

        var referralCustomer = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.REFERRALCUSTOMER, data).then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.referralCustomer = referralCustomer;

/*********** POST REFERRAL CUSTOMER **********/

        /*********** Wealth Newslatter **********/
        var wealthWhatsappMessage = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.WEALTHWHATSAPPMESSAGE, data).then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.wealthWhatsappMessage = wealthWhatsappMessage;

        /***********Wealth Newslatter **********/

               
            /***********Pre Approved Top up**********/

            var preApproved = function (data) {
                return new Promise(function (resolve, reject) {
                    getcall(apiConfig.PRE_APPROVED_TOP_UP_GET, data)
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        });
                });
            };
            apiUtilityObj.preApproved = preApproved;
    
            /***********Pre Approved Top up**********/
            /***********Pre Approved Top up**********/

            var preApprovedPost = function (data) {
                return new Promise(function (resolve, reject) {
                    call(apiConfig.PRE_APPROVED_TOP_UP_POST, data)
                        .then(function (response) {
                            if (jsHelper.isStr(response)) {
                                response = jsHelper.parseJson(response);
                            }
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        });
                });
            };
            apiUtilityObj.preApprovedPost = preApprovedPost;
    
            /***********Pre Approved Top up**********/
            /***********Pre Approved Top up**********/

            var preApprovedGet = function (data) {
                return new Promise(function (resolve, reject) {
                    getcall(apiConfig.PRE_APPROVED_TOP_UP_GET_1, data)
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        });
                });
            };
            apiUtilityObj.preApprovedGet = preApprovedGet;
    
            /***********Pre Approved Top up**********/
                       /***********Close cases**********/

                        var closeCases = function (data) {
                            return new Promise(function (resolve, reject) {
                                getcall(apiConfig.CLOSE_CASES_GET, data)
                                    .then(function (response) {
                                        resolve(response);
                                    })
                                    .catch(function (error) {
                                        reject(error);
                                    });
                            });
                        };
                        apiUtilityObj.closeCases = closeCases;
                
                        /***********Close cases**********/
                        /***********Close cases**********/
            
                        var closeCasesPost = function (data) {
                            return new Promise(function (resolve, reject) {
                                call(apiConfig.CLOSE_CASES_POST, data)
                                    .then(function (response) {
                                        if (jsHelper.isStr(response)) {
                                            response = jsHelper.parseJson(response);
                                        }
                                        resolve(response);
                                    })
                                    .catch(function (error) {
                                        reject(error);
                                    });
                            });
                        };
                        apiUtilityObj.closeCasesPost = closeCasesPost;
                
                        /***********Close cases**********/
                        /***********Close cases**********/
            
                        var closeCasesGet = function (data) {
                            return new Promise(function (resolve, reject) {
                                getcall(apiConfig.CLOSE_CASES_GET_1, data)
                                    .then(function (response) {
                                        resolve(response);
                                    })
                                    .catch(function (error) {
                                        reject(error);
                                    });
                            });
                        };
                        apiUtilityObj.closeCasesGet = closeCasesGet;
                
                        /***********Close cases**********/

        /*********** POST TCCL DOWNLOAD REPORT **********/

        var downloadReport = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.TCCL_DOWNLOAD_REPORT, data).then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.downloadReport = downloadReport;

        /*********** POST TCCL DOWNLOAD REPORT **********/
                          /***********HL BT TOPUP GET**********/

                          var hlBtTopupGet = function (data,queryString) {
                            return new Promise(function (resolve, reject) {
                                getCall_QueryString(apiConfig.HL_BT_TOPUP_GET, data, queryString)
                                    .then(function (response) {
                                        resolve(response);
                                    })
                                    .catch(function (error) {
                                        reject(error);
                                    });
                            });
                        };
                        apiUtilityObj.hlBtTopupGet = hlBtTopupGet;
                
                        /***********HL BT TOPUP GET**********/
                        /***********HL BT TOPUP POST**********/
            
                        var hlBtTopupPost = function (data) {
                            return new Promise(function (resolve, reject) {
                                call(apiConfig.HL_BT_TOPUP_POST, data)
                                .then(function (response) {
                                    if (jsHelper.isStr(response)) {
                                        response = jsHelper.parseJson(response);
                                    }
                                    resolve(response);
                                })
                                .catch(function (error) {
                                    reject(error);
                                });
                        });
                    };
                        apiUtilityObj.hlBtTopupPost = hlBtTopupPost;
                
                        /***********HL BT TOPUP POST**********/
                        /***********HL BT TOPUP**********/
            
                        var hlBtTopup = function (data) {
                            return new Promise(function (resolve, reject) {
                                getcall(apiConfig.HL_BT_TOPUP, data)
                                .then(function (response) {
                                    resolve(response);
                                })
                                .catch(function (error) {
                                    reject(error);
                                });
                        });
                    };
                    apiUtilityObj.hlBtTopup = hlBtTopup;
                
                    /***********HL BT TOPUP**********/

                    /***********HL BT TOPUP INTERNA GETL**********/
        
                    var hlBtTopupInternalGet = function (data,queryString) {
                        return new Promise(function (resolve, reject) {
                            getCall_QueryString(apiConfig.HL_BT_TOPUP_INTERNAL_GET, data,queryString)
                                .then(function (response) {
                                    resolve(response);
                                })
                                .catch(function (error) {
                                    reject(error);
                                });
                        });
                    };
                    apiUtilityObj.hlBtTopupInternalGet = hlBtTopupInternalGet;
            
                    /***********HL BT TOPUP GET**********/
                    /***********HL BT TOPUP INTERNAL POST**********/
        
                    var hlBtTopupInternalPost = function (data) {
                        return new Promise(function (resolve, reject) {
                            call(apiConfig.HL_BT_TOPUP_INTERNAL_POST, data)  .then(function (response) {
                                if (jsHelper.isStr(response)) {
                                    response = jsHelper.parseJson(response);
                                }
                                resolve(response);
                            })
                            .catch(function (error) {
                                reject(error);
                            });
                    });
                };

                            apiUtilityObj.hlBtTopupInternalPost = hlBtTopupInternalPost;
            
                            /***********HL BT TOPUP INERNAL POST**********/
                            /***********HL BT TOPUP INTERNAL**********/
                
                            var hlBtTopupInternal = function (data) {
                                return new Promise(function (resolve, reject) {
                                    getcall(apiConfig.HL_BT_TOPUP_INTERNAL, data)
                                        .then(function (response) {
                                            resolve(response);
                                        })
                                        .catch(function (error) {
                                            reject(error);
                                        });
                                });
                            };
                            apiUtilityObj.hlBtTopupInternal = hlBtTopupInternal;
                    
                            /***********HL BT TOPUP**********/
            /*********** POST TCCL DOWNLOAD REPORT **********/
    
            var downloadReport = function (data) {
                return new Promise(function (resolve, reject) {
                    call(apiConfig.TCCL_DOWNLOAD_REPORT, data).then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                        .catch(function (err) {
                            reject(err);
                        });
                });
            };
            apiUtilityObj.downloadReport = downloadReport;
    
            /*********** POST TCCL DOWNLOAD REPORT **********/
                         /***********TCHFL Vendor Data Get**********/
            
                         var tchflVendorDataGet = function (data, getPara) {
                            return new Promise(function (resolve, reject) {
                                getCall_QueryString(apiConfig.TCHFL_VENDOR_DATA_GET, data, getPara)
                                    .then(function (response) {
                                        resolve(response);
                                    })
                                    .catch(function (error) {
                                        reject(error);
                                    });
                            });
                        };
                       
                        apiUtilityObj.tchflVendorDataGet = tchflVendorDataGet;
                
                        /***********TCHFL Vendor Data Get**********/
                        /***********TCHFL Vendor Data Post**********/
            
                        var tchflVendorDataPost = function (data) {
                            return new Promise(function (resolve, reject) {
                                call(apiConfig.TCHFL_VENDOR_DATA_POST, data)
                                    .then(function (response) {
                                        if (jsHelper.isStr(response)) {
                                            response = jsHelper.parseJson(response);
                                        }
                                        resolve(response);
                                    })
                                    .catch(function (error) {
                                        reject(error);
                                    });
                            });
                        };
                       
                        apiUtilityObj.tchflVendorDataPost = tchflVendorDataPost;
                
                        /***********TCHFL Vendor Data Post**********/
                        /***********HL BT TOPUP**********/
                        /*********** GET OFFERS **********/ 
                             var getOffers = function (data) {
                                     return new Promise(function (resolve, reject) {
                                         call(apiConfig.GET_OFFERS, data)
                                         .then(function (response) {
                                              if (jsHelper.isStr(response)) {
                                                 response = jsHelper.parseJson(response);
                                              }
                                            resolve(response);
                                     })
                                 .catch(function (err) {
                                      reject(err);
                                  });
                               });
                          };
                           apiUtilityObj.getOffers = getOffers; 
                        /*********** GET OFFERS **********/
                         /***********BT CONVERT OFFER TO OPPORTUNITY POST**********/
            
                        var btConvertOfferToOpportunityPost = function (data) {
                            return new Promise(function (resolve, reject) {
                                call(apiConfig.BT_CONVERT_OFFER_TO_OPPORTUNITY_POST, data)
                                    .then(function (response) {
                                        if (jsHelper.isStr(response)) {
                                            response = jsHelper.parseJson(response);
                                        }
                                        resolve(response);
                                    })
                                    .catch(function (error) {
                                        reject(error);
                                    });
                            });
                        };
                        apiUtilityObj.btConvertOfferToOpportunityPost = btConvertOfferToOpportunityPost;
                
                        /***********BT CONVERT OFFER TO OPPORTUNITY POST**********/
                        /***********bt topup financial Institute**********/
                               var financialInstitute = function (data) {
                                   return new Promise(function (resolve, reject) {
                                       getcall(apiConfig.FINANCIAL_INSTITUTE, data)
                                           .then(function (response) {
                                                resolve(response);
                                            }).catch(function (error) {
                                                 reject(error);
                                            });
                                        })
                                    }
                        apiUtilityObj.financialInstitute = financialInstitute;
                       /***********bt topup financial Institute**********/
                       /***********CUSTOMER GRIEVANCES POST**********/
            
                       var customerGrievancesNew = function (data) {
                        return new Promise(function (resolve, reject) {
                            call(apiConfig.CUSTOMER_GRIEVANCES_NEW, data)
                            .then(function (response) {
                                if (jsHelper.isStr(response)) {
                                    response = jsHelper.parseJson(response);
                                }
                                resolve(response);
                            })
                            .catch(function (error) {
                                reject(error);
                            });
                    });
                };
                apiUtilityObj.customerGrievancesNew = customerGrievancesNew;
        
                /***********CUSTOMER GRIEVANCES POST**********/

            
        /***********CITY PRODUCT MASTER without product code**********/ 

 var getResult = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.GET_RESULT_POST, data).then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
            .catch(function (err) {
                reject(err);
            });
    });
};
apiUtilityObj.getResult = getResult;

/*********** POST ASSET DISPOSAL INTERESTED BROKER **********/
 /*********** Wealth Newslatter **********/
 var wealthNewsLatter = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.WEALTH_NEWSLATTER, data).then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
            .catch(function (err) {
                reject(err);
            });
    });
};
        apiUtilityObj.wealthNewsLatter = wealthNewsLatter;

    /***********Wealth Newslatter **********/ 

     /*********** POST ASSET DISPOSAL INTERESTED BROKER **********/

 var whatsappMsgApi = function (data) {
    return new Promise(function (resolve, reject) {
        call(apiConfig.WHATSAPP_MSG_API, data).then(function (response) {
            if (jsHelper.isStr(response)) {
                response = jsHelper.parseJson(response);
            }
            resolve(response);
        })
            .catch(function (err) {
                reject(err);
            });
    });
};
apiUtilityObj.whatsappMsgApi = whatsappMsgApi;

/*********** POST ASSET DISPOSAL INTERESTED BROKER **********/
        /***********GET SARFAESI_PROPERTIES API */

        var sarfaesiProperties = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.SARFAESI_PROPERTIES, data)
                    .then(function (response) {
                        resolve(response);
                    }).catch(function (error) {
                        reject(error);
                    });
            })
        }
        apiUtilityObj.sarfaesiProperties = sarfaesiProperties;

        /***********GET SARFAESI_PROPERTIES API */
        /***********GET SARFAESI_PROPERTIES TCL API */

         var sarfaesiPropertiesTcl = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.SARFAESI_PROPERTIES_TCL, data)
                    .then(function (response) {
                        resolve(response);
                    }).catch(function (error) {
                        reject(error);
                    });
            })
        }
        apiUtilityObj.sarfaesiPropertiesTcl = sarfaesiPropertiesTcl;

        /***********GET SARFAESI_PROPERTIES TCL API */

        /*********** GET WEALTH REFEREARN EXISTING CUSTOMER WTH QUERY STRING [START] ************/

        var wealthReferearnExistingCustomer = function wealthReferearnExistingCustomer(data, queryString) {
            return new Promise(function (resolve, reject) {
                getCall_QueryString(apiConfig.WEALTH_EXISTINGCUSTOMER, data, queryString)
                .then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                }).catch(function (err) {
                    reject(err);
                });
        });

    }
    apiUtilityObj.wealthReferearnExistingCustomer = wealthReferearnExistingCustomer;

    /*********** GET WEALTH_REFEREARN EXISTING CUSTOMER WTH QUERY STRING END ************/
        /*********** PRODUCT CITY MASTER FOR WEALTH ************/

        var cityMasterWealth = function cityMasterWealth(data, queryString) {
            return new Promise(function (resolve, reject) {
                getCall_QueryString(apiConfig.CITY_MASTER_WEALTH, data, queryString)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    }).catch(function (err) {
                        reject(err);
                    });
            });

        }
        apiUtilityObj.cityMasterWealth = cityMasterWealth;

        /*********** PRODUCT CITY MASTER FOR WEALTH ************/

        /**********WEALTH INSURANCE GET CITY******************/

        var wealthInsuranceCity = function (data) {
            return new Promise(function (resolve, reject) {
                getcall(apiConfig.WEALTH_INSURANCE_CITY_MASTER, data)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        };
        apiUtilityObj.wealthInsuranceCity = wealthInsuranceCity;

        /**********WEALTH INSURANCE GET CITY******************/
            
         /***********language info API**********/
         var languageInfo = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.LANGUAGE_INFO, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.languageInfo = languageInfo;
       /***********language info API**********/
            
       /***********DATA ENRICHMENT FETCH API**********/

       var dataEnrichmentFetch = function (data) {
        return new Promise(function (resolve, reject) {
            call(apiConfig.DATA_ENRICHMENT_FETCH, data)
                .then(function (response) {
                    if (jsHelper.isStr(response)) {
                        response = jsHelper.parseJson(response);
                    }
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    apiUtilityObj.dataEnrichmentFetch = dataEnrichmentFetch;

    /***********DATA ENRICHMENT FETCH API**********/

    /***********DATA ENRICHMENT UPDATE API**********/

        var dataEnrichmentUpdate = function (data) {
            return new Promise(function (resolve, reject) {
                call(apiConfig.DATA_ENRICHMENT_UPDATE, data)
                    .then(function (response) {
                        if (jsHelper.isStr(response)) {
                            response = jsHelper.parseJson(response);
                        }
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
        apiUtilityObj.dataEnrichmentUpdate = dataEnrichmentUpdate;

    /***********DATA ENRICHMENT UPDATE API**********/
     
        return jsHelper.freezeObj(apiUtilityObj);
    })(
        _global.jsHelper,
        _global.appConfig,
        _global.apiConfig,
        _global.ajaxUtility
    );
    _global.jsHelper.defineReadOnlyObjProp(_global, "apiUtility", _apiUtility);
})(this);
/*******************************************API Utility Module - End******************************************************/
