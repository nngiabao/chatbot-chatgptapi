package dto;

import java.util.*;

public record ChatGPTRequest(String model,List<String> messages) {
    public static record Message(String role, String content) {
        public static record promt(String content) {

        }
    }
}
