import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const interests = [
  "Backend Engineering",
  "Optimization and Algorithms",
  "Robotics",
];

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const i = loopNum % interests.length;
    const fullText = interests[i];

    const handleTyping = () => {
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      // Determine typing speed
      if (isDeleting) {
        setTypingSpeed(50); // Faster delete
      } else {
        setTypingSpeed(100); // Normal type
      }

      // Logic for switching states
      if (!isDeleting && text === fullText) {
        // Finished typing, pause before deleting
        setTimeout(() => setIsDeleting(true), 2000); 
      } else if (isDeleting && text === '') {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before starting next word
      }
    };

    // Only set timeout if we are strictly typing or deleting (not in the pause phase)
    // The pause logic is handled by the setTimeout inside the condition above, 
    // but to keep the loop running for character updates:
    if (!((!isDeleting && text === fullText) || (isDeleting && text === ''))) {
        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }
    
    // Fallback to trigger state change after pause if needed (handled by the setTimeouts inside handleTyping conceptually, 
    // but practically we need to ensure the effect dependencies trigger correctly)
    // Actually, simpler approach to avoid race conditions with multiple timers:
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Robust separate effect for the tick
  useEffect(() => {
    const i = loopNum % interests.length;
    const fullText = interests[i];

    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
       timer = setTimeout(() => {
         setText(fullText.substring(0, text.length - 1));
         if (text.length <= 1) { // Will be empty next
            setIsDeleting(false);
            setLoopNum(prev => prev + 1);
         }
       }, 50);
    } else {
       if (text === fullText) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
       } else {
          timer = setTimeout(() => {
            setText(fullText.substring(0, text.length + 1));
          }, 100);
       }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);


  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 lg:gap-24">
      <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Hi, I'm <span className="text-blue-500">Dillion</span>
        </h1>
        
        {/* Typewriter Effect */}
        <div className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400 h-8 flex items-center justify-center md:justify-start">
            <span className="mr-2">I am interested in</span>
            <span className="text-blue-500 font-bold">{text}</span>
            <span className="w-0.5 h-6 bg-slate-900 dark:bg-white ml-1 animate-pulse"></span>
        </div>

        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mx-auto md:mx-0">
          Passionate software engineer with a strong background in optimization, algorithms and mathematics. Proficient in developing scalable, high-performance applications. Ability to learn quickly and independently, and adapt to fast-paced environments.
          Currently pursuing a Double Degree in Computer Science and Mathematics at NUS.
        </p>
        
        <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-slate-700 dark:text-slate-300">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-slate-700 dark:text-slate-300">
            <Linkedin size={24} />
          </a>
          <a href="mailto:email@example.com" className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-slate-700 dark:text-slate-300">
            <Mail size={24} />
          </a>
        </div>
      </div>
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
        <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-3xl opacity-20 dark:opacity-30 animate-pulse"></div>
        <img 
          src="/images/photo.png" 
          alt="Dillion Lim" 
          className="relative w-full h-full object-cover object-center rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
}