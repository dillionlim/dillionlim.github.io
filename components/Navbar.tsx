import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, FileText } from 'lucide-react';
import { ViewState } from '../App';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState, sectionId?: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (currentView !== 'home') return;
      
      const sections = ['about', 'experience', 'projects', 'contact'];
      
      // Check if we've scrolled to the bottom of the page
      // Increase threshold to be more forgiving
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      // Check which section is currently active based on scroll position
      // We check a point slightly down from the top (navbar height + buffer)
      const scrollPosition = window.scrollY + 250; 

      let current = sections[0]; // Default to first section

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // If we have scrolled past the top of this section, it is the current candidate
          if (element.offsetTop <= scrollPosition) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    if (link.type === 'external') return; // Allow default behavior

    e.preventDefault();
    setIsMenuOpen(false);
    
    if (link.type === 'view') {
      onNavigate(link.id as ViewState);
    } else {
      onNavigate('home', link.id);
    }
  };

  const navLinks = [
    { name: 'About', id: 'about', type: 'scroll' },
    { name: 'Experience', id: 'experience', type: 'scroll' },
    { name: 'Projects', id: 'projects', type: 'scroll' },
    { name: 'Teaching', id: 'teaching', type: 'view' },
    { name: 'Blog', id: 'blog', type: 'view' },
    { name: 'Contact', id: 'contact', type: 'scroll' },
    { name: 'Resume', href: '/resume.pdf', type: 'external' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-darkbg/80 backdrop-blur-md border-b border-gray-200 dark:border-darkborder transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('home', 'about'); }}
          className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
        >
          Dillion Lim
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            link.type === 'external' ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10"
              >
                <FileText size={14} />
                {link.name}
              </a>
            ) : (
              <button
                key={link.name}
                onClick={(e) => handleLinkClick(e, link)}
                className={`text-sm font-medium transition-colors ${
                  (currentView === link.id) || (currentView === 'home' && link.type === 'scroll' && activeSection === link.id) 
                  // Note: simple active state logic, can be refined based on scroll position if needed
                    ? 'text-slate-900 dark:text-slate-100' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-blue-500'
                }`}
              >
                {link.name}
              </button>
            )
          ))}
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-600 dark:text-slate-400"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
           <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-darkcard border-b border-gray-200 dark:border-darkborder p-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
               link.type === 'external' ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-base font-medium py-3 px-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-slate-600 dark:text-slate-300"
                >
                   <FileText size={16} />
                   {link.name}
                </a>
               ) : (
                <button
                    key={link.name}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="text-base font-medium py-3 px-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-left text-slate-600 dark:text-slate-300"
                >
                    {link.name}
                </button>
               )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}