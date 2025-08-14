import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white col-span-full min-h-[80vh]">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-black/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-black/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-black/50 rounded-full animate-bounce"></div>
    </div>
  );
}
