package com.tatacapital.web.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TitleModel {


    @Inject
    @Default
    String boldTerm;

    @Inject
    @Default
    String singleLineTitle;

    @Inject
    @Default
    String bannerTitleNew;

    @Inject
    @Default
    String preApprovedFormTitle;

    @Inject
    @Default
    String newsletterTitle;

    @Inject
    @Default
    String liMainHeader;

    @Inject
    @Default
    String loanInformation;

    @Inject
    @Default
    String whyChoose;

    @Inject
    @Default
    String emiOptions;

    @Inject
    @Default
    String applyOnWhatsapp;

    @Inject
    @Default
    String bestDealsHeading;

    @Inject
    @Default
    @Named("jcr:title")
    String title;

    @Inject
    @Default
    String benefitsOfPrePay;

    public String getBoldTerm() {
        return boldTerm;
    }

    public String getBannerTitleNew() {
        return bannerTitleNew;
    }

    public String getPreApprovedFormTitle() {
        return preApprovedFormTitle;
    }

    public String getNewsletterTitle() {
        return newsletterTitle;
    }

    public String getLiMainHeader() {
        return liMainHeader;
    }

    public String getLoanInformation() {
        return loanInformation;
    }

    public String getWhyChoose() {
        return whyChoose;
    }

    public String getEmiOptions() {
        return emiOptions;
    }

    public String getApplyOnWhatsapp() {
        return applyOnWhatsapp;
    }

    public String getBestDealsHeading() {
        return bestDealsHeading;
    }

    public String getTitle() {
        return title;
    }

    public String getSingleLineTitle() {
        return singleLineTitle;
    }

    public String getBenefitsOfPrey() {
        return benefitsOfPrePay;
    }

    /*@PostConstruct
    public void init(){
        getTitle();
        getBoldTerm();
        getSingleLineTitle();
    }*/
}
