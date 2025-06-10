package Service;

import dto.PromptRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.beans.factory.annotation.Value;

import java.sql.PreparedStatement;

@Service
public class ChatGPTService {
    //
    @Autowired
    private final RestClient restClient;

    public ChatGPTService(RestClient restClient) {
        this.restClient = restClient;
    }

    @Value("${openapi.api,key}")
    private String model;

    @Value("${openapi.api.model}")
    private String openaiModel;

    //method
    public String getResponse(PromptRequest promptRequest){

    }
}
