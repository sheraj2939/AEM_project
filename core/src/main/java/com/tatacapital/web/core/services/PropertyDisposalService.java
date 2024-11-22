package com.tatacapital.web.core.services;

import com.google.gson.JsonObject;

import java.util.Map;

public interface PropertyDisposalService {

    JsonObject fetchApi(String api,String mdmAuthToken);

    Map<String,Integer> createPropertyDisposalPage(JsonObject jsonObject, String rootPath, String templatePath ) ;

}
