import React, { useState, useEffect } from "react";
import Bracket from "@/components/intro-section/bracket";

const LoadingScreen = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 100);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative w-64 h-40">
        <Bracket 
          position="top-left" 
          translateXV="-translate-x-3"
          translateYV="translate-y-[4.1rem]"
          translateXH="-translate-x-12"
          translateYH="translate-y-16"
        />
        
        <Bracket 
          position="bottom-right" 
          translateXV="translate-x-2.5"
          translateYV="-translate-y-[3.25rem]"
          translateXH="translate-x-12"
          translateYH="-translate-y-[3.2rem]"
        />

        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-8xl font-bold text-primary tracking-widest px-8">
            <span>DL&#8203;</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;