package grouphome.webapp.dto.mail;

import lombok.Data;
import org.thymeleaf.templatemode.TemplateMode;

import java.util.List;
import java.util.Map;

@Data
public class MailDetailsDto {

    private String[] to;
    private String[] cc;
    private String[] bcc;
    private String from;
    private String fromName;
    private String replyTo;
    private String subject;
    private String text;
    private List<String> attachmentPaths;
    private String template;
    private Map<String, Object> templateVariables;
    private TemplateMode templateMode = TemplateMode.TEXT;
    private Boolean isHtml = false;

}
