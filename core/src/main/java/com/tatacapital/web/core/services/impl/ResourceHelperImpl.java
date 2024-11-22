package com.tatacapital.web.core.services.impl;

import com.tatacapital.web.core.services.ResourceHelper;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import java.util.HashMap;
import java.util.Map;

@Component(service = ResourceHelper.class, immediate = true)
public class ResourceHelperImpl implements ResourceHelper {

    @Reference
    ResourceResolverFactory resourceResolverFactory;

    @Override
    public ResourceResolver getResourceResolver() throws LoginException {

        Map<String,Object> map = new HashMap<>();
        map.put(ResourceResolverFactory.SUBSERVICE,"tata-capital");
        ResourceResolver resourceResolver =resourceResolverFactory.getServiceResourceResolver(map);
        return resourceResolver;
    }
}
