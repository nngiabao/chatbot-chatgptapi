package Service;

import dto.ChatGPTRequest;
import dto.ChatGPTResponse;
import dto.PromptRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import java.util.*;


@Service
public class ChatGPTService {
    //
    private final RestClient restClient;

    public ChatGPTService(RestClient restClient) {
        this.restClient = restClient;
    }

    @Value("${openai.api.key}")
    private String key;

    @Value("${openai.api.model}")
    private String model;

    //method
    public String getResponse(PromptRequest promptRequest){
        ChatGPTRequest chatGPTRequest = new ChatGPTRequest(
                model,
                List.of(new ChatGPTRequest.Message("user",promptRequest.prompt()))
        );

        //request
        ChatGPTResponse chatGPTResponse =
                restClient.post().header("Authorization", "Bearer " + key)
                .header("Content-Type", "application/json")
                        .body(chatGPTRequest)
                        .retrieve()
                        .body(ChatGPTResponse.class);
        //
        return chatGPTResponse.choices().get(0).message().content();
    }
}
