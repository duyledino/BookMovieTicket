import React from "react";

const Loading = () => {
  return (
    <div className="fixed z-[99] h-screen w-full inset-0 bg-black/40 flex justify-center items-center">
      <span className="relative flex size-32">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <span className="absolute inline-flex size-32 animate-ping delay-500 rounded-[50%] bg-amber-500"></span>
        <span className="absolute inline-flex size-32 animate-ping delay-700 rounded-[50%] bg-amber-600"></span>
      </span>
    </div>
  );
};

export default Loading;
