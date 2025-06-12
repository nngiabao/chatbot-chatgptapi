package dto;

import java.util.*;

public record ChatGPTResponse(List<Choice> choices) {
    public static record Choice(Message message) {
        public static record Message(String role, String content) {

        }
    }
}
