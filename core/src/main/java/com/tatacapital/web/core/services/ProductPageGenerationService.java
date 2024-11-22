package com.tatacapital.web.core.services;

import com.google.gson.JsonObject;

import java.util.Map;

public interface ProductPageGenerationService {

    JsonObject getMdmApiCall(String apiUrl);

    Map<String, Integer> generatePages(JsonObject jsonObject, String templatePath,String[] pagesToDelete, String pageGenType);

}
