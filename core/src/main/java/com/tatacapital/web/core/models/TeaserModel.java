package com.tatacapital.web.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TeaserModel {

    @Inject
    @Default
    @Named("jcr:description")
    String description;

    @Inject
    @Default
    String fileReference;

    @Inject
    @Default
    @Named("jcr:title")
    String title;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getFileReference() {
        return fileReference;
    }

   /* @PostConstruct
    public void init()
    {
        getDescription();
        getFileReference();
        getTitle();
    }*/

}
