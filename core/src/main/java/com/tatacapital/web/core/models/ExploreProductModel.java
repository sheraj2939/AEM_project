package com.tatacapital.web.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExploreProductModel {

    @Inject
    @Default
    @Named("jcr:description")
    String description;

    @Inject
    @Default
    String fileReference;

    @Inject
    @Default
    String pretitle;

    public String getFileReference() {
        return fileReference;
    }

    public String getPretitle() {
        return pretitle;
    }

    public String getDescription() {
        return description;
    }

    /*@PostConstruct
    public void init()
    {
        getPretitle();
        getDescription();
        getFileReference();
    }*/

}
