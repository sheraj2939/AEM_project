package com.tatacapital.web.core.utils;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.util.Locale;
import java.util.Objects;

public class HttpCallUtils {

    static Logger log = LoggerFactory.getLogger(HttpCallUtils.class);

    public static String getHttpCall(String apiUrl,HttpClientBuilderFactory httpClientBuilderFactory,String productName)
    {
        log.info("In HttpCallUtils getHttpCall method");
        CloseableHttpClient client = null;
        try {
            URIBuilder uriBuilder = new URIBuilder(apiUrl);
            if(StringUtils.isNotEmpty(productName)) {
                uriBuilder.addParameter("products", productName.toLowerCase());
            }
            log.info("API Url : {}", uriBuilder);
            client = httpClientBuilderFactory.newBuilder().build();
            HttpGet get = new HttpGet(uriBuilder.build());
            HttpResponse httpResponse = client.execute(get);
            log.info("Api Response : {}", httpResponse.getStatusLine().getStatusCode());
            BufferedReader br = new BufferedReader(new InputStreamReader((httpResponse.getEntity().getContent())));
            String output;
            StringBuilder responseJsonString = new StringBuilder();
            while ((output = br.readLine()) != null) {
                responseJsonString.append(output);
            }
            return responseJsonString.toString();
        } catch (URISyntaxException | IOException e) {
            log.error("Exception in HttpCallUtils in getHttpCall method : {0}");
        } finally {
            if(Objects.nonNull(client)) {
                try {
                    client.close();
                } catch (IOException e) {
                    log.error("Exception in HttpCallUtils in getHttpCall method :{}",e.getMessage());
                }
            }
        }
        return StringUtils.EMPTY;
    }
}
