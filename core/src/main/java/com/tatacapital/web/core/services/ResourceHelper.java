package com.tatacapital.web.core.services;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;

public interface ResourceHelper {
    ResourceResolver getResourceResolver() throws LoginException;
}
