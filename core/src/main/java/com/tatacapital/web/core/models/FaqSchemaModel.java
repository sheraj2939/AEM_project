package com.tatacapital.web.core.models;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.Objects;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FaqSchemaModel {

    @Self
    Resource resource;

    @Inject
    @Source("sling-object")
    ResourceResolver resourceResolver;

    Logger logger = LoggerFactory.getLogger(FaqSchemaModel.class);

    public String getPopularFaqSchemaString() {
        logger.info("In FaqSchemaModel in init method");
        if(Objects.nonNull(resource) && Objects.nonNull(resourceResolver)) {
            JsonArray popularFaqSchemaArr = new JsonArray();
            String componentPath = resource.getPath();
            Session session = resourceResolver.adaptTo(Session.class);
            if (Objects.nonNull(session)) {
                try {
                    Node popularFaqNode = session.getNode(componentPath);
                    NodeIterator nodeList = popularFaqNode.getNodes();
                    while (nodeList.hasNext()) {
                        Node nodeListNode = nodeList.nextNode();
                        String question = nodeListNode.hasProperty("cq:panelTitle") ? nodeListNode.getProperty("cq:panelTitle").getString() : StringUtils.EMPTY;
                        logger.debug("Question attribute value in faq schema :{}", question);
                        JsonObject faqQuestionSchema = new JsonObject();
                        faqQuestionSchema.addProperty("@type", "Question");
                        faqQuestionSchema.addProperty("name", question);
                        JsonObject faqAnsSchema = answerSchemaObj(nodeListNode);
                        faqQuestionSchema.add("acceptedAnswer", faqAnsSchema);
                        popularFaqSchemaArr.add(faqQuestionSchema);
                    }
                    return popularFaqSchemaArr.toString();
                } catch (NullPointerException e) {
                    logger.info("NullPointerException in FaqSchemaModel init()  :{}", e.getMessage());
                } catch (RuntimeException e) {
                    logger.info("RuntimeException in FaqSchemaModel init()  :{}", e.getMessage());
                } catch (Exception e) {
                    logger.info("Exception in FaqSchemaModel init() :{}", e.getMessage());
                }
            } else {
                logger.error("Session instance is getting Null in FaqSchemaModel in getPopularFaqSchemaString method : {0}");
            }
        }else {
            logger.error("In FaqSchemaModel Resource is getting Injected Null :{0}");
        }
        return StringUtils.EMPTY;
    }


    public JsonObject answerSchemaObj(Node nodeListNode) {
        try {
            StringBuilder faqAnswer = new StringBuilder();
            NodeIterator innerNode = nodeListNode.getNodes();
            while (innerNode.hasNext()) {
                Node answerNode = innerNode.nextNode();
                NodeIterator nodes = answerNode.getNodes();
                while (nodes.hasNext()) {
                    Node ansPropertyNode = nodes.nextNode();
                    if (ansPropertyNode.hasProperty("text")) {
                        faqAnswer.append(stringInFormat(ansPropertyNode.getProperty("text").getString().concat(" ")));
                    } else if (ansPropertyNode.hasProperty("jcr:title")) {
                        faqAnswer.append(stringInFormat(ansPropertyNode.getProperty("jcr:title").getString().concat(" ")));
                    } else if (ansPropertyNode.hasProperty("description")) {
                        faqAnswer.append(stringInFormat(ansPropertyNode.getProperty("description").getString().concat(" ")));
                    }
                }
                logger.debug("Answer list in faq: {}", faqAnswer.toString());
            }
            JsonObject faqAnsSchema = new JsonObject();
            faqAnsSchema.addProperty("@type", "Answer");
            faqAnsSchema.addProperty("text", faqAnswer.toString());
            return faqAnsSchema;
        } catch (RepositoryException e) {
            logger.error("Exception in FaqSchemaModel in answerSchemaObj method : {0}");
        }
        return new JsonObject();
    }

    public String stringInFormat(String answer) {
        return answer.replaceAll("\\<.*?\\>", "").replaceAll("\r\n", "").replaceAll("&nbsp;", "");
    }
}