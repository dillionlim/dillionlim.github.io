import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 dark:text-slate-500 text-sm">
          © {new Date().getFullYear()} Dillion Lim.
        </p>
      </div>
    </footer>
  );
}