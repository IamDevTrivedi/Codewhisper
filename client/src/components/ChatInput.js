import React from "react";
import { Send } from "lucide-react";


export function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="relative flex items-center">
      <textarea
        value={value}
        id="chat-input"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled}
        className="w-full resize-none rounded-lg bg-neutral-900 px-4 py-3 pr-12 text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border focus:border-neutral-700 border border-neutral-800"
        rows={1}
        style={{ minHeight: "2.75rem" }}
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="absolute right-2 rounded-md text-neutral-200 transition-colors hover:bg-blue-500 p-2 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neutral-500"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
}
