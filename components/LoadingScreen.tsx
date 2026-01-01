import React from 'react';
import { Terminal } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-[#0f172a] transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-20 h-20 mb-4">
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-pulse"></div>
          <Terminal size={32} className="text-blue-500 relative z-10" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-widest animate-pulse">
            DILLION LIM
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
            Initializing System...
          </p>
        </div>
      </div>
    </div>
  );
}