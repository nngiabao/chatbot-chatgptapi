package dto;

import java.util.*;

public record ChatGPTResponse(List<String> choices) {
    public static record Choice(Message message) {
        public static record Message(String role, String content) {

        }
    }
}
