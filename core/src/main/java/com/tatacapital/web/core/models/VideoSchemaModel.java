package com.tatacapital.web.core.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.annotation.PostConstruct;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Objects;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class VideoSchemaModel {

    Logger logger = LoggerFactory.getLogger(getClass());

    ConfigModel configModel = ConfigModel.getInstance();

    @Self
    Resource currentResource;

    String videoTitle;
    String videoDescription;
    String thumbnailUrl;
    String embedUrl;
    String youtubeUploadDate;
    String youtubeVideoTime;
    String contentUrl;

    Boolean isVideoPresent = false;

    public Boolean getVideoPresent() {
        return isVideoPresent;
    }

    public String getVideoTitle() {
        return videoTitle.replaceAll("\\<.*?\\>", "").replaceAll("\r\n", "").replaceAll("&nbsp;", "");
    }

    public String getVideoDescription() {
        return videoDescription.replaceAll("\\<.*?\\>", "").replaceAll("\r\n", "").replaceAll("&nbsp;", "");
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public String getEmbedUrl() {
        return embedUrl;
    }

    public String getYoutubeUploadDate() {
        return youtubeUploadDate;
    }

    public String getYoutubeVideoTime() {
        return youtubeVideoTime;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    @PostConstruct
    public void init() {
        logger.info("In VideoSchemaModel in init() :{0}");
        if (Objects.nonNull(currentResource)) {
            Boolean defaultCase=false;
            Boolean flag=false;
            if(Objects.nonNull(currentResource.getChild("videoMultifield").getChild("item0"))) {
                isVideoPresent=true;
                Resource videoResource = currentResource.getChild("videoMultifield").getChild("item0");
                flag = getVideoData(videoResource, defaultCase);
            }
            if(Objects.nonNull(currentResource.getChild("rightVideo"))) {
                isVideoPresent=true;
                Resource rightVideo = currentResource.getChild("rightVideo");
                Iterator<Resource> resourceIterator = rightVideo.listChildren();
                while (resourceIterator.hasNext()) {
                    Resource currentResource = resourceIterator.next();
                    flag = getVideoData(currentResource, defaultCase);
                }
            }
            Resource videoRes = currentResource.getChild("videoMultifield").getChild("item0");
            if(!flag && Objects.nonNull(videoRes)){
                isVideoPresent=true;
                defaultCase = true;
                getVideoData(videoRes,defaultCase);
            }
        } else {
            logger.error("Exception in VideoSchemaModel currentResourc is getting NUll :{0}");
        }
    }

    public String getDateInFormat(String dateElement) {
        if (StringUtils.isNotEmpty(dateElement)) {
            String dateInIsoFormat = "";
            try {
                String[] dateElementInArr = dateElement.split(" ");
                String formattedDate = dateElementInArr[0].replaceAll("(st|nd|rd|th)$", " ");
                formattedDate+=dateElementInArr[1]+" "+dateElementInArr[2];
                DateFormat inputFormat = new SimpleDateFormat("dd MMM yyyy");
                DateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date date = inputFormat.parse(formattedDate);
                dateInIsoFormat = outputFormat.format(date);
            } catch (ParseException e) {
                logger.error("Exception in VideoSchema Model in getDateInFormat method :{}", e.getMessage());
            }
            return dateInIsoFormat;
        } else {
            return StringUtils.EMPTY;
        }
    }

    public boolean getVideoData(Resource videoResource,Boolean defaultCase) {
        if (Objects.nonNull(videoResource)) {
            ValueMap nodeProperties = videoResource.adaptTo(ValueMap.class);
            if(nodeProperties.containsKey("latestVideo") && nodeProperties.get("latestVideo").equals("true") || defaultCase) {
                videoTitle = getPropertyValue(nodeProperties, "videotitle", "rightVideoHeading");
                embedUrl = getPropertyValue(nodeProperties, "embedUrl", "rightVideoLink");
                String videoTime = getPropertyValue(nodeProperties, "youtubeVideoTime", "videoDuration");
                if (StringUtils.isNotEmpty(videoTime)) {
                    try {
                        String[] splitTime = videoTime.replaceAll(":", " ").split(" ");
                        if (Integer.parseInt(splitTime[0]) < 10) {
                            youtubeVideoTime = "PT0" + splitTime[0] + "M" + splitTime[1] + "S";
                        } else {
                            youtubeVideoTime = "PT" + splitTime[0] + "M" + splitTime[1] + "S";
                        }
                    } catch (Exception e) {
                        logger.error("Exception in VideoSchema Model while fetching video duration :{}", e.getMessage());
                        youtubeVideoTime = videoTime;
                    }
                } else {
                    youtubeVideoTime = videoTime;
                }
                contentUrl = configModel.getValue("websiteDomain").toString()+getPageName()+".html";
                thumbnailUrl = getPropertyValue(nodeProperties, "thumnailUrl", "thumbnailImageRight");
                try {
                    String[] pageResource = this.currentResource.getParent().getPath().split("/jcr:content");
                    if (pageResource[0].endsWith("loan-against-property")) {
                        youtubeUploadDate = getPropertyValue(nodeProperties, "youtubeUploadDate", "videoDate");
                    } else {
                        youtubeUploadDate = getPropertyValue(nodeProperties, "youtubeUploadDate", "videoDate");
                        youtubeUploadDate = getDateInFormat(youtubeUploadDate);
                    }
                }catch (Exception e){
                    logger.error("Exception in VideoSchemaModel : {0}");
                }
                videoDescription = Objects.nonNull(videoResource.getValueMap().get("videodecsription")) ? videoResource.getValueMap().get("videodecsription").toString() : StringUtils.EMPTY;
                return true;
            }
        } else {
            logger.error("videoResource in VideoSchemaModel is getting NULL :{0}");
        }
        return false;
    }

    public static String getPropertyValue(ValueMap pageProperties, String propertyName,String rightVideoProperty) {
        if (Objects.nonNull(pageProperties) && pageProperties.containsKey(propertyName)) {
            return pageProperties.get(propertyName, String.class);
        } else if(Objects.nonNull(pageProperties) && pageProperties.containsKey(rightVideoProperty)){
            return pageProperties.get(rightVideoProperty, String.class);
        }else{
            return StringUtils.EMPTY;
        }
    }

    private String getPageName(){
        try {
            String[] pageResource = this.currentResource.getParent().getPath().split("/jcr:content");
            String[] pageArr = pageResource[0].split("/");
            return pageArr[pageArr.length - 1];
        }catch (Exception e){
            logger.error("Exception in getPageName method in VideoSchemaModel: {0}");
        }
        return StringUtils.EMPTY;
    }
}
