import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function ContactSection() {
  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex flex-col items-center justify-center">
        <div className="text-center w-full max-w-lg bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-8 md:p-12 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Contact Me</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Feel free to reach out via email or connect with me on LinkedIn and GitHub!
          </p>
          <div className="space-y-4 flex flex-col items-center">
            <a
              href="mailto:dillionlim2004@gmail.com"
              className="flex items-center gap-3 text-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
              </div>
              <span className="font-medium">dillionlim2004@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/dillion-lim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
               <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Linkedin size={20} />
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>
            <a
              href="https://github.com/dillionlim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
               <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Github size={20} />
              </div>
              <span className="font-medium">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}