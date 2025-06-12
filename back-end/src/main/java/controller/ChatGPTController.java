package controller;

import Service.ChatGPTService;
import dto.PromptRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/chatgpt")
public class ChatGPTController {

    private final ChatGPTService chatGPTService;
    //
    public ChatGPTController(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }
    //
    @PostMapping
    public String chatGPT(@RequestBody PromptRequest promptRequest) {
        return "chatgpt";
    }

    @GetMapping
    public String chatGPT(){
        return "chatgpt";
    }
}
