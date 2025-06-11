package Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class OpenAIConfiguration {
    @Value("${openai.api.url}")
    private String openaiApiUrl;

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Value( "${openai.api.model}")
    private String openaiModel;

    @Bean
    public RestClient restClient() {
        return RestClient.builder()
                .baseUrl(openaiApiUrl)
                .build();
    }
}
