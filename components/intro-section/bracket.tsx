import React, { useState, useEffect } from "react";

interface BracketProps {
  position: "top-left" | "bottom-right";
  translateXV: string; // Optional transform value (e.g., "translate-x-4")
  translateYV: string; // Optional transform value (e.g., "translate-y-4")
  translateXH: string; // Optional transform value (e.g., "translate-x-4")
  translateYH: string; // Optional transform value (e.g., "translate-y-4")
}

const Bracket = ({
  position,
  translateXV,
  translateYV,
  translateXH,
  translateYH,
}: BracketProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => prevStep + 1);
    }, 50); 
    
    setTimeout(() => clearInterval(interval), 2000);

    return () => clearInterval(interval);
  }, []);

  const isTopLeft = position === "top-left";
  const baseClasses = isTopLeft ? "top-0 left-0" : "bottom-0 right-0";

  const verticalLineClasses = `absolute ${isTopLeft ? "top-0 left-0" : "bottom-0 right-0"} w-1 bg-primary transition-all duration-500 origin-center 
    ${step > 0 ? "opacity-100 animate-draw-vertical" : "opacity-0"} 
    ${step > 10 ? `${translateXV} ${translateYV} -rotate-[60deg]` : ""}`;

  const horizontalLineClasses = `absolute ${isTopLeft ? "top-0 left-0" : "bottom-0 right-0"} h-1 bg-primary transition-all duration-500 origin-center ${
    step > 0 ? "opacity-100 animate-draw-horizontal" : "opacity-0"
  } ${step > 10 ? `${translateXH} ${translateYH} -rotate-[30deg]` : ""}`;

  return (
    <div className={`absolute ${baseClasses} h-20 w-20 transition-all duration-500`}>
      <div className={verticalLineClasses} />
      <div className={horizontalLineClasses} />
    </div>
  );
};

export default Bracket;
