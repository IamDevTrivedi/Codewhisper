import React from "react";
import { Bot, User, Copy } from "lucide-react";
import { message as msg } from 'antd';
import MarkdownMessage from "./MarkdownMessage";

export function ChatMessage({ message }) {
  const isAssistant = message.role === "assistant";

  // Function to copy the message content to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    msg.success("Copied to Clipboard");
  };

  return (
    <div
      className={`flex ${isAssistant ? "justify-start" : "justify-end"} my-4`}
    >
      <div
        className={`flex items-start gap-4 ${isAssistant ? "flex-row" : "flex-row-reverse"
          }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md shadow-md ${isAssistant ? "bg-neutral-800" : "bg-indigo-600"
            }`}
        >
          {isAssistant ? (
            <Bot className="h-5 w-5 text-neutral-200" />
          ) : (
            <User className="h-5 w-5 text-neutral-200" />
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`group relative max-w-2xl flex-1 rounded-xl px-4 py-3 shadow-lg transition-all ${isAssistant
            ? "bg-neutral-950/70 border border-neutral-800 text-neutral-100 rounded-tl-none"
            : "bg-gradient-to-br bg-blue-900/30 border border-blue-800 rounded-tr-none backdrop-blur-sm text-neutral-50"
            }`}
        >
          {/* Message Content */}
          <MarkdownMessage content={message.content} who={isAssistant} />

          {/* Timestamp and Copy Button */}
          <div className="mt-2 gap-3 flex items-center justify-between text-xs text-neutral-400">
            <span>
              {new Date(message.timestamp).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
              aria-label="Copy message"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
