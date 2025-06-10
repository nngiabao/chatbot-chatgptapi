package Configuration;

import org.springframework.beans.factory.annotation.Value;

@Configuration
public class OpenAIConfiguration {
    @Value("${openai.api.url}")
    private String openaiApiUrl;

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Value( "${openai.api.model}")
    private String openaiModel;

    public String getOpenaiApiUrl() {
        return openaiApiUrl;
    }

    public void setOpenaiApiUrl(String openaiApiUrl) {
        this.openaiApiUrl = openaiApiUrl;
    }

    public String getOpenaiApiKey() {
        return openaiApiKey;
    }

    public void setOpenaiApiKey(String openaiApiKey) {
        this.openaiApiKey = openaiApiKey;
    }

    public String getOpenaiModel() {
        return openaiModel;
    }

    public void setOpenaiModel(String openaiModel) {
        this.openaiModel = openaiModel;
    }
}
