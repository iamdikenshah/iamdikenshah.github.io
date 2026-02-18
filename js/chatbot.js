/**
 * AI Chatbot - Portfolio Assistant
 * Powered by Agentic AI with RAG
 */

class AIChatbot {
  constructor() {
    // API Configuration
    this.apiEndpoint = "http://localhost:5000/api/chat"; // Update for production
    this.useRealAPI = false; // Set to true when backend is ready
    this.messages = [];
    this.isTyping = false;
    this.sessionId = this.generateSessionId();
    this.touchStartY = 0; // For touch scroll handling
    this.savedScrollY = 0; // For restoring scroll position

    // Quick suggestions
    this.suggestions = [
      "Tell me about your AI experience",
      "What projects have you built?",
      "Your iOS development skills?",
      "How can I contact you?",
      "Show me your certifications",
    ];

    this.init();
  }

  generateSessionId() {
    return (
      "session-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)
    );
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
    this.showWelcomeMessage();
  }

  createChatWidget() {
    const chatHTML = `
            <!-- Chat Button -->
            <button class="ai-chat-button" id="chatButton" aria-label="Open AI Assistant">
                <i class="fas fa-robot"></i>
                <span class="chat-badge">AI</span>
            </button>

            <!-- Chat Container -->
            <div class="ai-chat-container" id="chatContainer">
                <!-- Header -->
                <div class="chat-header">
                    <div class="chat-header-info">
                        <img src="./images/diken_shah_optimized.jpg" alt="Diken Shah" class="chat-avatar">
                        <div class="chat-header-text">
                            <h3>Diken's AI Assistant</h3>
                            <div class="chat-status">
                                <span class="status-dot"></span>
                                <span>Online</span>
                            </div>
                        </div>
                    </div>
                    <button class="chat-close" id="chatClose" aria-label="Close chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Messages Area -->
                <div class="chat-messages" id="chatMessages">
                    <!-- Messages will be inserted here -->
                </div>

                <!-- Typing Indicator -->
                <div class="typing-indicator" id="typingIndicator">
                    <div class="message-avatar bot-avatar">
                        <i class="fas fa-brain"></i>
                    </div>
                    <div class="typing-bubble">
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="chat-input-area">
                    <input 
                        type="text" 
                        class="chat-input" 
                        id="chatInput" 
                        placeholder="Ask me anything about Diken..."
                        autocomplete="off"
                    >
                    <button class="chat-send-btn" id="chatSend" aria-label="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>

                <!-- Footer -->
                <div class="chat-footer">
                    Powered by <a href="#about-section">Agentic AI + RAG</a>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", chatHTML);
  }

  attachEventListeners() {
    const chatButton = document.getElementById("chatButton");
    const chatClose = document.getElementById("chatClose");
    const chatContainer = document.getElementById("chatContainer");
    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");
    const chatMessages = document.getElementById("chatMessages");

    // Toggle chat
    chatButton.addEventListener("click", () => this.toggleChat());
    chatClose.addEventListener("click", () => this.toggleChat());

    // Send message
    chatSend.addEventListener("click", () => this.handleSendMessage());
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.handleSendMessage();
      }
    });

    // Prevent touch events from propagating to main page when scrolling chat
    chatMessages.addEventListener("touchstart", (e) => {
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    chatMessages.addEventListener("touchmove", (e) => {
      const scrollTop = chatMessages.scrollTop;
      const scrollHeight = chatMessages.scrollHeight;
      const clientHeight = chatMessages.clientHeight;
      const touchY = e.touches[0].clientY;
      const isScrollingUp = touchY > this.touchStartY;
      const isScrollingDown = touchY < this.touchStartY;

      // At top and trying to scroll up, or at bottom and trying to scroll down
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
        e.preventDefault();
      }
    }, { passive: false });

    // Prevent scroll chaining to main page
    chatContainer.addEventListener("touchmove", (e) => {
      e.stopPropagation();
    }, { passive: true });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!chatContainer.contains(e.target) && !chatButton.contains(e.target)) {
        if (chatContainer.classList.contains("active")) {
          this.toggleChat();
        }
      }
    });
  }

  toggleChat() {
    const chatButton = document.getElementById("chatButton");
    const chatContainer = document.getElementById("chatContainer");

    chatButton.classList.toggle("active");
    chatContainer.classList.toggle("active");

    // Handle body scroll locking on mobile
    const isMobile = window.innerWidth <= 768;
    if (chatContainer.classList.contains("active")) {
      // Lock body scroll on mobile when chat is open
      if (isMobile) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.top = `-${window.scrollY}px`;
        this.savedScrollY = window.scrollY;
      }
      const badge = chatButton.querySelector(".chat-badge");
      if (badge) {
        setTimeout(() => badge.remove(), 300);
      }
      document.getElementById("chatInput").focus();
    } else {
      // Restore body scroll on mobile when chat is closed
      if (isMobile) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        if (this.savedScrollY !== undefined) {
          window.scrollTo(0, this.savedScrollY);
        }
      }
    }
  }

  showWelcomeMessage() {
    const welcomeHTML = `
            <div class="chat-welcome">
                <div class="chat-welcome-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <h4>Hi! I'm Diken's AI Assistant 👋</h4>
                <p>I can answer questions about Diken's experience, projects, skills, and more. Powered by Agentic AI with RAG!</p>
            </div>
        `;

    const messagesDiv = document.getElementById("chatMessages");
    messagesDiv.innerHTML = welcomeHTML;

    // Add welcome message and suggestions
    setTimeout(() => {
      this.addBotMessage(
        "Hello! I'm an AI assistant trained on Diken's portfolio. Ask me anything about his work, skills, or experience!",
        true,
      );
    }, 500);
  }

  handleSendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();

    if (!message || this.isTyping) return;

    // Add user message
    this.addUserMessage(message);
    input.value = "";

    // Send to API
    this.sendToAPI(message);
  }

  addUserMessage(text) {
    const time = this.getCurrentTime();
    const messageHTML = `
            <div class="message user">
                <div class="message-content">
                    <div class="message-bubble">${this.escapeHtml(text)}</div>
                    <div class="message-time">${time}</div>
                </div>
                <div class="message-avatar user-avatar">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        `;

    this.appendMessage(messageHTML);
    this.messages.push({ role: "user", content: text, time });
  }

  addBotMessage(text, showSuggestions = false) {
    const time = this.getCurrentTime();

    let suggestionsHTML = "";
    if (showSuggestions) {
      suggestionsHTML = `
                <div class="quick-suggestions">
                    ${this.suggestions
                      .map(
                        (s) =>
                          `<button class="suggestion-chip" onclick="chatbot.handleSuggestionClick('${this.escapeHtml(s)}')">${s}</button>`,
                      )
                      .join("")}
                </div>
            `;
    }

    const messageHTML = `
            <div class="message bot">
                <div class="message-avatar bot-avatar">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">${this.formatBotMessage(text)}</div>
                    <div class="message-time">${time}</div>
                    ${suggestionsHTML}
                </div>
            </div>
        `;

    this.appendMessage(messageHTML);
    this.messages.push({ role: "assistant", content: text, time });
  }

  handleSuggestionClick(suggestion) {
    const input = document.getElementById("chatInput");
    input.value = suggestion;
    this.handleSendMessage();
  }

  async sendToAPI(message) {
    this.showTyping();

    try {
      if (this.useRealAPI) {
        // Real API call to backend
        const response = await fetch(this.apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            session_id: this.sessionId,
          }),
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        this.hideTyping();
        this.addBotMessage(data.response);
      } else {
        // Mock API for demo (remove when real API is ready)
        const response = await this.mockAPI(message);

        setTimeout(() => {
          this.hideTyping();
          this.addBotMessage(response);
        }, 1500);
      }
    } catch (error) {
      this.hideTyping();
      this.addBotMessage("Sorry, I encountered an error. Please try again!");
      console.error("Chat API error:", error);
    }
  }

  // Mock API - Replace with actual LangChain/RAG implementation
  async mockAPI(message) {
    const lowerMsg = message.toLowerCase();

    // Simple keyword matching (replace with RAG)
    if (lowerMsg.includes("experience") || lowerMsg.includes("years")) {
      return "Diken has 13+ years of experience in software engineering, starting with iOS development and now specializing in Agentic AI. He's worked on 50+ products across banking, healthcare, e-commerce, and IoT.";
    } else if (
      lowerMsg.includes("ai") ||
      lowerMsg.includes("langchain") ||
      lowerMsg.includes("agentic")
    ) {
      return "Diken specializes in Agentic AI with expertise in LangChain, LangGraph, RAG (Retrieval-Augmented Generation), multi-agent systems, and vector databases like Pinecone and ChromaDB. He builds production-ready AI workflows, not just demos!";
    } else if (
      lowerMsg.includes("ios") ||
      lowerMsg.includes("swift") ||
      lowerMsg.includes("mobile")
    ) {
      return "Diken is an expert iOS developer with deep knowledge of Swift, SwiftUI, and Clean Architecture. He's built mobile apps for major banking platforms (Backbase), healthcare, and e-commerce companies.";
    } else if (lowerMsg.includes("project") || lowerMsg.includes("portfolio")) {
      return "Diken has built various projects including RAG-based systems, AI agents for automation, iOS banking apps, and IoT solutions. Check the Projects section on his portfolio to see more!";
    } else if (
      lowerMsg.includes("contact") ||
      lowerMsg.includes("hire") ||
      lowerMsg.includes("email")
    ) {
      return "You can reach Diken at shah.diken@gmail.com or connect on LinkedIn at linkedin.com/in/diken-shah/. He's open to Agentic AI and mobile projects!";
    } else if (
      lowerMsg.includes("certification") ||
      lowerMsg.includes("cert")
    ) {
      return "Diken holds certifications in Azure AI Fundamentals, HuggingFace NLP, Deep Learning Specialization, and is a Microsoft Certified Professional. He continuously upskills in AI and mobile technologies.";
    } else if (lowerMsg.includes("skill")) {
      return "Diken's core skills include: Agentic AI (LangChain, LangGraph, CrewAI), RAG pipelines, iOS development (Swift, SwiftUI), Python, mobile architecture, vector databases, and multi-agent systems. He bridges AI and mobile engineering!";
    } else if (lowerMsg.includes("blog") || lowerMsg.includes("article") || lowerMsg.includes("post") || lowerMsg.includes("read") || lowerMsg.includes("writing")) {
      const blogs = [
        {
          title: "Building a Simple RAG System",
          desc: "A practical guide to building Retrieval-Augmented Generation pipelines from scratch.",
          tag: "AI / RAG",
          time: "8 min read",
          url: "./blog/building-simple-rag.html"
        },
        {
          title: "HuggingFace Local Pipeline",
          desc: "Run powerful NLP models locally using HuggingFace pipelines — zero API cost.",
          tag: "AI / NLP",
          time: "6 min read",
          url: "./blog/huggingface-local-pipeline.html"
        },
        {
          title: "Clean Architecture in iOS",
          desc: "How to structure scalable iOS apps using Clean Architecture with Swift examples.",
          tag: "iOS Development",
          time: "12 min read",
          url: "./blog/clean-architecture-ios.html"
        },
        {
          title: "iOS Interview Q&A",
          desc: "30 iOS interview questions across beginner, intermediate and advanced levels.",
          tag: "iOS Development",
          time: "20 min read",
          url: "./blog/ios-interview-questions.html"
        }
      ];

      const cards = blogs.map(b => `
        <a href="${b.url}" target="_blank" style="display:block;text-decoration:none;color:inherit;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-top:10px;transition:background 0.2s;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='#f8fafc'">
          <div style="font-size:11px;color:#f97316;font-weight:600;margin-bottom:4px;">${b.tag} · ${b.time}</div>
          <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${b.title}</div>
          <div style="font-size:12px;color:#64748b;line-height:1.5;">${b.desc}</div>
          <div style="font-size:12px;color:#f97316;margin-top:6px;font-weight:600;">Read →</div>
        </a>
      `).join("");

      return `Here are Diken's latest blog articles:<br>${cards}`;
    } else {
      return "That's a great question! I'm an AI assistant trained on Diken's portfolio. You can ask me about his experience, skills, projects, certifications, or how to contact him. What would you like to know?";
    }
  }

  showTyping() {
    this.isTyping = true;
    document.getElementById("typingIndicator").classList.add("active");
    document.getElementById("chatSend").disabled = true;
    this.scrollToBottom();
  }

  hideTyping() {
    this.isTyping = false;
    document.getElementById("typingIndicator").classList.remove("active");
    document.getElementById("chatSend").disabled = false;
  }

  appendMessage(messageHTML) {
    const welcomeDiv = document.querySelector(".chat-welcome");
    if (welcomeDiv) {
      welcomeDiv.remove();
    }

    const messagesDiv = document.getElementById("chatMessages");
    messagesDiv.insertAdjacentHTML("beforeend", messageHTML);
    this.scrollToBottom();
  }

  scrollToBottom() {
    const messagesDiv = document.getElementById("chatMessages");
    setTimeout(() => {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 100);
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  formatBotMessage(text) {
    // Add basic formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize chatbot when DOM is ready
let chatbot;
document.addEventListener("DOMContentLoaded", () => {
  chatbot = new AIChatbot();
});
