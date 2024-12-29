"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight - 4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      const scrolled = window.scrollY;
      const progress = Math.max(0, (scrolled / scrollHeight) * 100);
      setProgress(progress);
    };
    
    updateProgress();
    
    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", () => {
      updateProgress();
    });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div 
      className="fixed right-0"
      style={{
        top: "4rem",
        height: `calc(100vh - 64px)`,
        width: "4px",
        backgroundColor: "var(--muted-color)",
      }}
    >
      <div
        className="bg-primary transition-all duration-200"
        style={{
          height: `${progress}%`,
          width: "100%",
        }}
      />
    </div>
  );
}