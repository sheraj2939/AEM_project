package com.tatacapital.web.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ButtonModel {

    @Inject
    @Default
    @Named("jcr:title")
    String title;

    @Inject
    @Default
    String iconClass;

    public String getIconClass() {
        return iconClass;
    }

    public String getTitle() {
        return title;
    }

   /* @PostConstruct
    public void init()
    {
        getTitle();
        getIconClass();
    }*/
}
