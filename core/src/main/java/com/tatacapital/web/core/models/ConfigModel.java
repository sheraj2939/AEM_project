package com.tatacapital.web.core.models;


import java.util.Collections;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

public class ConfigModel {

    private Map<String, String> configMap;

    private static ConfigModel configModel = null;

    private ConfigModel() {
        this.configMap = new ConcurrentHashMap<>();
    }

    public static ConfigModel getInstance() {
        if (configModel == null) {
            configModel = new ConfigModel();
        }
        return configModel;
    }

    public Map<String, String> getConfigMap() {
        return Collections.unmodifiableMap(configMap);
    }

    public void setConfigMap(Map<String, String> configMap) {
        if(Objects.nonNull(configMap)) {
            this.configMap.putAll(configMap);
        }
    }

    public Object getValue(String key) {

        return configMap.get(key);
    }


}
