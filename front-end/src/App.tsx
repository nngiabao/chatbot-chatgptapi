import React, { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const actionButtons = [
  { label: "Copy", icon: "📋" },
  { label: "Like", icon: "👍" },
  { label: "Dislike", icon: "👎" },
  { label: "Sound", icon: "🔊" },
  { label: "Edit", icon: "✏️" },
  { label: "Retry", icon: "🔄" },
];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    
    try {
      // Call your Spring Boot API
      const response = await fetch('http://localhost:8080/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          input: input.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      
      // API returns just a string, use it directly
      const assistantResponse = data || "Sorry, I couldn't process your request.";
      
      // Add assistant response to the chat
      setMessages(prev => [...prev, { 
        content: assistantResponse, 
        role: "assistant", 
        id: Date.now().toString() + "_response" 
      }]);
      
      // Show feedback box after first assistant message
      if (messages.filter(m => m.role === "assistant").length === 0) {
        setShowFeedback(true);
      }
      
    } catch (error: any) {
      console.error("API error details:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      let errorMessage = "Sorry, there was an error connecting to the chatbot. Please try again.";
      
      if (error.message?.includes('Failed to fetch')) {
        errorMessage = "Cannot connect to the API. Make sure your Spring Boot server is running on http://localhost:8080";
      } else if (error.message?.includes('CORS')) {
        errorMessage = "CORS error. Please configure CORS in your Spring Boot API.";
      } else if (error.message?.includes('404')) {
        errorMessage = "API endpoint not found. Check if /api/chatgpt exists.";
      }
      
      // Add error message to chat
      setMessages(prev => [...prev, { 
        content: errorMessage, 
        role: "assistant", 
        id: Date.now().toString() + "_error" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <header className="flex justify-end items-center py-4 px-6">
        <button
          className={`px-4 py-2 rounded-full transition-colors ${
            dark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
          } shadow-sm`}
          onClick={() => setDark((d) => !d)}
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Chat Area - Centered */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl">
          <div className="space-y-6">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-lg">
                Start the conversation!
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={msg.id} className="space-y-3">
                {/* Message Bubble */}
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-2xl px-6 py-4 rounded-3xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-gray-200 text-gray-900"
                        : `${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} border border-gray-200`
                    }`}
                  >
                    <div className="text-base leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>

                {/* Action Buttons for Assistant Messages */}
                {msg.role === "assistant" && (
                  <div className="flex gap-2 justify-start">
                    {actionButtons.map((btn) => (
                      <button
                        key={btn.label}
                        title={btn.label}
                        className={`p-2 rounded-lg transition-all hover:scale-105 ${
                          dark 
                            ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                            : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <span className="text-lg">{btn.icon}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Feedback Box */}
                {showFeedback && 
                 msg.role === "assistant" && 
                 idx === messages.findIndex(m => m.role === "assistant") && (
                  <div className={`max-w-md rounded-xl px-5 py-3 shadow-sm border ${
                    dark 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        Do you like this personality?
                      </span>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 rounded-lg hover:bg-green-100 transition-colors">
                          <span className="text-lg">👍</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-100 transition-colors">
                          <span className="text-lg">👎</span>
                        </button>
                        <button 
                          className={`p-2 rounded-lg transition-colors ${
                            dark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                          onClick={() => setShowFeedback(false)}
                        >
                          <span className="text-gray-400">✕</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className={`px-6 py-4 rounded-3xl ${
                  dark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-500"
                } shadow-sm border border-gray-200`}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="px-6 pb-4">
        <div className="max-w-4xl mx-auto">
          <form
            className={`flex items-center gap-3 px-5 py-4 rounded-3xl shadow-lg border ${
              dark 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            }`}
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <button 
              type="button" 
              className={`p-2 rounded-full transition-colors ${
                dark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">➕</span>
            </button>
            
            <input
              className={`flex-1 px-3 py-2 bg-transparent border-none outline-none text-base ${
                dark 
                  ? "text-white placeholder-gray-400" 
                  : "text-gray-900 placeholder-gray-500"
              }`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              disabled={loading}
            />
            
            <button 
              type="button" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                dark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <span className="text-lg">⚙️</span>
              <span className="text-sm font-medium">Tools</span>
            </button>
            
            <button 
              type="button" 
              className={`p-2 rounded-full transition-colors ${
                dark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">🎤</span>
            </button>
            
            <button 
              type="button" 
              className={`p-2 rounded-full transition-colors ${
                dark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">📊</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !input.trim()}
            >
              <span>Send ➤</span>
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-4">
        <p className="text-xs text-gray-500">
          ChatGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

export default App;
