import React from "react";

export function LoadingDots({ size = 8 }) {
  return (
    <div className="flex items-center justify-center space-x-2 h-full">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-bounce rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <div
            className={`w-full h-full rounded-full animate-pulse
              ${i === 0 ? "bg-gradient-to-r from-blue-400 to-cyan-400" : ""}
              ${i === 1 ? "bg-gradient-to-r from-purple-400 to-pink-400" : ""}
              ${i === 2 ? "bg-gradient-to-r from-amber-400 to-orange-400" : ""}
              animate-gradient-xy`}
          />
        </div>
      ))}
      <span className="sr-only text-white">Loading...</span>
    </div>
  );
}
