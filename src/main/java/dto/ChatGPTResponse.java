package dto;

public record ChatGPTResponse() {
    public static record Choice(String message, String finishReason) {
        public static record Message(String role, String content) {

        }
    }

}
