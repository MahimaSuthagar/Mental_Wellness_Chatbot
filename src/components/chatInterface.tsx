import React, { useState, useRef, useEffect } from "react";
import type { Message } from "../types";
import { geminiService } from "../services/geminiService";
import { Icons } from "../constants";

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello, I'm Serenity. I'm here to listen and support you in any way I can. How are you feeling today?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await geminiService.sendMessage(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: "I'm having a little trouble connecting right now. Please check your internet or try again in a moment.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-1 overflow-y-auto px-4 py-8 md:px-12 space-y-6 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] rounded-3xl p-4 md:p-5 shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                msg.role === "user"
                  ? "bg-teal-600 text-white rounded-tr-none"
                  : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {msg.text}
              </p>
              <div
                className={`mt-2 text-[10px] opacity-60 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Fixed incorrect '2-numeric' to '2-digit' for timestamp formatting */}
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-3xl rounded-tl-none p-5 flex items-center space-x-2 animate-pulse shadow-sm">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Tell Serenity how you're feeling..."
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none max-h-40 custom-scrollbar text-sm md:text-base"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-4 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-teal-100 active:scale-95 flex items-center justify-center"
          >
            <Icons.Send />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-3 uppercase tracking-wider font-semibold">
          Confidential & Supportive • Not a substitute for professional help
        </p>
      </div>
    </div>
  );
};
