package chatbot_chatgpt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"chatbot_chatgpt", "Service", "Configuration", "controller"})
public class ChatbotChatgptApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatbotChatgptApplication.class, args);
	}

}
