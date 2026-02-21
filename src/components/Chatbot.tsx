"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

const SUGGESTIONS = [
  "Tell me about your AI experience",
  "What projects have you built?",
  "Your iOS development skills?",
  "How can I contact you?",
  "Show me your blogs",
];

const BLOGS = [
  {
    title: "Building a Simple RAG System",
    desc: "A practical guide to building Retrieval-Augmented Generation pipelines from scratch.",
    tag: "AI / RAG",
    time: "8 min read",
    url: "/blog/building-simple-rag",
  },
  {
    title: "HuggingFace Local Pipeline",
    desc: "Run powerful NLP models locally using HuggingFace pipelines — zero API cost.",
    tag: "AI / NLP",
    time: "6 min read",
    url: "/blog/huggingface-local-pipeline",
  },
  {
    title: "Clean Architecture in iOS",
    desc: "How to structure scalable iOS apps using Clean Architecture with Swift examples.",
    tag: "iOS Development",
    time: "12 min read",
    url: "/blog/clean-architecture-ios",
  },
  {
    title: "iOS Interview Q&A",
    desc: "30 iOS interview questions across beginner, intermediate and advanced levels.",
    tag: "iOS Development",
    time: "20 min read",
    url: "/blog/ios-interview-questions",
  },
];

function mockResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("experience") || lowerMsg.includes("years")) {
    return "Diken has 13+ years of experience in software engineering, starting with iOS development and now specializing in Agentic AI. He's worked on 50+ products across banking, healthcare, e-commerce, and IoT.";
  } else if (lowerMsg.includes("ai") || lowerMsg.includes("langchain") || lowerMsg.includes("agentic")) {
    return "Diken specializes in Agentic AI with expertise in LangChain, LangGraph, RAG (Retrieval-Augmented Generation), multi-agent systems, and vector databases like Pinecone and ChromaDB. He builds production-ready AI workflows, not just demos!";
  } else if (lowerMsg.includes("ios") || lowerMsg.includes("swift") || lowerMsg.includes("mobile")) {
    return "Diken is an expert iOS developer with deep knowledge of Swift, SwiftUI, and Clean Architecture. He's built mobile apps for major banking platforms (Backbase), healthcare, and e-commerce companies.";
  } else if (lowerMsg.includes("project") || lowerMsg.includes("portfolio")) {
    return "Diken has built various projects including RAG-based systems, AI agents for automation, iOS banking apps, and IoT solutions. Check the Projects section on his portfolio to see more!";
  } else if (lowerMsg.includes("contact") || lowerMsg.includes("hire") || lowerMsg.includes("email")) {
    return "You can reach Diken at shah.diken@gmail.com or connect on LinkedIn at linkedin.com/in/diken-shah/. He's open to Agentic AI and mobile projects!";
  } else if (lowerMsg.includes("certification") || lowerMsg.includes("cert")) {
    return "Diken holds certifications in LangChain & LangGraph, RAG & Vector Databases, Backbase iOS Mobile Developer, Software Architecture, and Prompt Engineering. He continuously upskills in AI and mobile technologies.";
  } else if (lowerMsg.includes("skill")) {
    return "Diken's core skills include: Agentic AI (LangChain, LangGraph, CrewAI), RAG pipelines, iOS development (Swift, SwiftUI), Python, mobile architecture, vector databases, and multi-agent systems. He bridges AI and mobile engineering!";
  } else if (
    lowerMsg.includes("blog") ||
    lowerMsg.includes("article") ||
    lowerMsg.includes("post") ||
    lowerMsg.includes("read") ||
    lowerMsg.includes("writing")
  ) {
    const cards = BLOGS.map(
      (b) =>
        `<a href="${b.url}" style="display:block;text-decoration:none;color:inherit;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-top:10px;">` +
        `<div style="font-size:11px;color:#f97316;font-weight:600;margin-bottom:4px;">${b.tag} · ${b.time}</div>` +
        `<div style="font-weight:700;font-size:14px;margin-bottom:4px;">${b.title}</div>` +
        `<div style="font-size:12px;color:#64748b;line-height:1.5;">${b.desc}</div>` +
        `<div style="font-size:12px;color:#f97316;margin-top:6px;font-weight:600;">Read →</div>` +
        `</a>`,
    ).join("");
    return `Here are Diken's latest blog articles:<br>${cards}`;
  } else {
    return "That's a great question! I'm an AI assistant trained on Diken's portfolio. You can ask me about his experience, skills, projects, certifications, or how to contact him. What would you like to know?";
  }
}

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatMessage(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const toggleChat = () => {
    if (!open) {
      savedScrollY.current = window.scrollY;
      if (window.innerWidth <= 768) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollY.current}px`;
        document.body.style.width = "100%";
      }
      // Add welcome bot message on first open
      if (messages.length === 0) {
        setTimeout(() => {
          setShowWelcome(false);
          setMessages([
            {
              role: "assistant",
              content:
                "Hello! I'm an AI assistant trained on Diken's portfolio. Ask me anything about his work, skills, or experience!",
              time: getCurrentTime(),
            },
          ]);
        }, 500);
      }
    } else {
      if (window.innerWidth <= 768) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, savedScrollY.current);
      }
    }
    setOpen((prev) => !prev);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setShowWelcome(false);
    const userMsg: Message = { role: "user", content: text, time: getCurrentTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1500));
    const response = mockResponse(text);
    setIsTyping(false);
    setMessages((prev) => [...prev, { role: "assistant", content: response, time: getCurrentTime() }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <>
      {/* Chat Button */}
      <button className="ai-chat-button" id="chatButton" aria-label="Open AI Assistant" onClick={toggleChat}>
        <i className="fas fa-robot"></i>
        <span className="chat-badge">AI</span>
      </button>

      {/* Chat Container */}
      <div className={`ai-chat-container${open ? " active" : ""}`} id="chatContainer">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/diken_shah_optimized.jpg" alt="Diken Shah" className="chat-avatar" />
            <div className="chat-header-text">
              <h3>Diken&apos;s AI Assistant</h3>
              <div className="chat-status">
                <span className="status-dot"></span>
                <span>Online</span>
              </div>
            </div>
          </div>
          <button className="chat-close" aria-label="Close chat" onClick={toggleChat}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" id="chatMessages">
          {showWelcome && (
            <div className="chat-welcome">
              <div className="chat-welcome-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h4>Hi! I&apos;m Diken&apos;s AI Assistant 👋</h4>
              <p>
                I can answer questions about Diken&apos;s experience, projects, skills, and more. Powered by Agentic AI
                with RAG!
              </p>
            </div>
          )}

          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div key={i} className="message user">
                <div className="message-content">
                  <div className="message-bubble">{msg.content}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
                <div className="message-avatar user-avatar">
                  <i className="fas fa-user"></i>
                </div>
              </div>
            ) : (
              <div key={i} className="message bot">
                <div className="message-avatar bot-avatar">
                  <i className="fas fa-brain"></i>
                </div>
                <div className="message-content">
                  <div
                    className="message-bubble"
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />
                  <div className="message-time">{msg.time}</div>
                  {i === messages.length - 1 && msg.role === "assistant" && messages.length === 1 && (
                    <div className="quick-suggestions">
                      {SUGGESTIONS.map((s) => (
                        <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ),
          )}

          {isTyping && (
            <div className="typing-indicator active">
              <div className="message-avatar bot-avatar">
                <i className="fas fa-brain"></i>
              </div>
              <div className="typing-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask me anything about Diken..."
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <button
            className="chat-send-btn"
            aria-label="Send message"
            onClick={() => sendMessage(input)}
            disabled={isTyping}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
}
