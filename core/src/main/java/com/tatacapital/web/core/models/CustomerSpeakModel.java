package com.tatacapital.web.core.models;

import com.day.cq.wcm.api.Page;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.tatacapital.web.core.constants.TataCapitalWebConstants;
import com.tatacapital.web.core.models.pojo.CustomerSpeakModelPojo;
import com.tatacapital.web.core.utils.HttpCallUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustomerSpeakModel {

    private static final Logger log = LoggerFactory.getLogger(CustomerSpeakModel.class);
    public List<CustomerSpeakModelPojo> customerTestimonialData;
    public List<CustomerSpeakModelPojo> customerTestimonialInLatestOrder;
    @OSGiService
    HttpClientBuilderFactory httpClientBuilderFactory;
    @Inject
    @Default
    String productName;
    @ScriptVariable
    Page currentPage;
    ConfigModel configModel = ConfigModel.getInstance();

    public List<CustomerSpeakModelPojo> getCustomerData() {

        log.info("Inside CustomerSpeakModel in getCustomerData method :{0}");

        this.customerTestimonialData = new ArrayList<>();

        String responseJsonString = HttpCallUtils.getHttpCall(configModel.getValue(TataCapitalWebConstants.CUSTOMER_SPEAK_MDM_URL).toString(), httpClientBuilderFactory, productName);

        if (StringUtils.isNotEmpty(responseJsonString)) {

            JsonArray responseJsonArr = JsonParser.parseString(responseJsonString).getAsJsonObject().get("Master").getAsJsonArray();

            if (!responseJsonArr.isEmpty()) {

                responseJsonArr.forEach((jsonElement -> {
                    CustomerSpeakModelPojo customerSpeakModelPojo = new CustomerSpeakModelPojo();

                    JsonObject customerObj = jsonElement.getAsJsonObject();

                    if (customerObj.has("approval") && customerObj.get("approval").getAsString().equalsIgnoreCase("yes")) {
                        boolean showVideo = false;
                        String customerName = customerObj.has("customername") ?
                                customerObj.get("customername").getAsString() : StringUtils.EMPTY;

                        customerSpeakModelPojo.setCustomerName(customerName);

                        String videoUrl = customerObj.has("videourl") ?
                                customerObj.get("videourl").getAsString() : StringUtils.EMPTY;

                        customerSpeakModelPojo.setVideourl(videoUrl);

                        String thumbnailUrl = customerObj.has("thumbnailurl") ?
                                customerObj.get("thumbnailurl").getAsString() : StringUtils.EMPTY;

                        customerSpeakModelPojo.setThumbnailurl(thumbnailUrl);

                        if (StringUtils.isNotEmpty(videoUrl) && StringUtils.isNotEmpty(thumbnailUrl)) {
                            showVideo = true;
                        }

                        customerSpeakModelPojo.setShowVideo(showVideo);

                        String reviewDescription = customerObj.has("testimonialtext") ?
                                customerObj.get("testimonialtext").getAsString() : StringUtils.EMPTY;

                        customerSpeakModelPojo.setReviewDescription(reviewDescription);

                        String starRating = customerObj.has("ratings") ?
                                customerObj.get("ratings").getAsString() : StringUtils.EMPTY;

                        customerSpeakModelPojo.setStarRating(starRating);

                        String date = customerObj.has("testimonialdate") ?
                                customerObj.get("testimonialdate").getAsString() : StringUtils.EMPTY;

                        customerSpeakModelPojo.setDate(getDateInFormat(date));
                        customerSpeakModelPojo.setDateSequence(date);

                        String approval = customerObj.has("approval") ?
                                customerObj.get("approval").getAsString() : StringUtils.EMPTY;

                        customerSpeakModelPojo.setApproval(approval);

                        String productName = customerObj.has("products") ?
                                customerObj.get("products").getAsString() : StringUtils.EMPTY;

                        customerSpeakModelPojo.setProductName(productName);

                        customerTestimonialData.add(customerSpeakModelPojo);
                    }
                }));
            } else {
                log.error("Response Json Array is Empty : {}", responseJsonArr);
            }
        } else {
            return Collections.emptyList();
        }

        Collections.sort(customerTestimonialData, new Comparator<CustomerSpeakModelPojo>() {
            DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");

            @Override
            public int compare(CustomerSpeakModelPojo o1, CustomerSpeakModelPojo o2) {
                try {
                    return dateFormat.parse(o2.getDateSequence()).compareTo(dateFormat.parse(o1.getDateSequence()));
                } catch (ParseException e) {
                    throw new IllegalArgumentException(e);
                }
            }
        });
        this.customerTestimonialInLatestOrder = customerTestimonialData.size() > 9 ? customerTestimonialData.subList(0, 9) : customerTestimonialData.subList(0, customerTestimonialData.size());
        log.debug("Customer Testimonial list in latest order :{}", customerTestimonialInLatestOrder);
        return customerTestimonialInLatestOrder;
    }

    public JsonArray getTestimonialSchema() {
        log.info("Inside CustomerSpeakModel in getTestimonialSchema method :{0}");
        JsonArray reviewJsonArray = new JsonArray();
        customerTestimonialInLatestOrder.forEach(element -> {

            JsonObject parentJson = new JsonObject();
            parentJson.addProperty("@type", "Review");

            JsonObject authourJson = new JsonObject();

            authourJson.addProperty("@type", "Person");
            authourJson.addProperty("name", element.getCustomerName());

            parentJson.add("author", authourJson);
            parentJson.addProperty("datePublished", element.getDate());
            parentJson.addProperty("reviewBody", element.getReviewDescription());

            JsonObject reviewRating = new JsonObject();
            reviewRating.addProperty("@type", "Rating");
            reviewRating.addProperty("bestRating", "5");
            reviewRating.addProperty("ratingValue", element.getStarRating());
            reviewRating.addProperty("worstRating", "1");

            parentJson.add("reviewRating", reviewRating);

            reviewJsonArray.add(parentJson);
        });
        return reviewJsonArray;
    }

    public String getDateInFormat(String dateElement) {
        if (StringUtils.isNotEmpty(dateElement)) {
            DateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
            DateFormat outputFormat = new SimpleDateFormat("dd MMM, yyyy");
            Date date = null;
            try {
                date = inputFormat.parse(dateElement);
            } catch (ParseException e) {
                log.error("Exception in Customer Speak Model in getDateFormat method :{}", e.getMessage());
            }
            return outputFormat.format(date);
        } else {
            return StringUtils.EMPTY;
        }
    }

    public String getRatingValue() {
        List<Double> ratingValueList = new ArrayList<>();
        if (Objects.nonNull(customerTestimonialInLatestOrder)) {
            customerTestimonialInLatestOrder.forEach(number -> ratingValueList.add(Double.parseDouble(number.getStarRating())));
            Double averageRatingValue = ratingValueList.stream().reduce(0.0, Double::sum) / ratingValueList.size();
            return String.format("%.1f", averageRatingValue);
        } else {
            return StringUtils.EMPTY;
        }
    }

    public String getTotalAvgRatingValue() {
        DecimalFormat df = new DecimalFormat("0.00");
        List<Double> ratingValueList = new ArrayList<>();
        if (Objects.nonNull(customerTestimonialData)) {
            customerTestimonialData.forEach(number -> ratingValueList.add(Double.parseDouble(number.getStarRating())));

            double averageRatingValue = ratingValueList.stream().reduce(0.0, Double::sum) / ratingValueList.size();
            averageRatingValue = (double) averageRatingValue;
            log.info("averageRatingValue : {}", averageRatingValue);
            //String stringValue =  df.format(averageRatingValue);
            //log.info("averageRatingValue String value: {}",df.format(stringValue));
            String logValue = String.format("%.1f", averageRatingValue);
            log.info("String averageRatingValue value : {}", logValue);
            return logValue;
            //return stringValue;

        } else {
            return StringUtils.EMPTY;
        }
    }

    public String getTitle() {
        return Objects.nonNull(currentPage.getTitle()) ? currentPage.getTitle() : StringUtils.EMPTY;
    }

    public String getDescription() {
        return Objects.nonNull(currentPage.getDescription()) ? currentPage.getDescription() : StringUtils.EMPTY;
    }

    public String getSize() {
        return Objects.nonNull(customerTestimonialInLatestOrder) ? String.valueOf(customerTestimonialInLatestOrder.size()) : StringUtils.EMPTY;
    }

    public String getTotalCountOfReviews() {
        return Objects.nonNull(customerTestimonialData) ? String.valueOf(customerTestimonialData.size()) : StringUtils.EMPTY;
    }
}
