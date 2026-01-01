import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import BlogSection from './components/BlogSection';
import SkillsSection from './components/SkillsSection';
import TeachingSection from './components/TeachingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

export type ViewState = 'home' | 'blog' | 'teaching';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handler to hide loader
    const handleLoad = () => {
      // Ensure the loader stays for at least a small moment for smoothness
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const navigateTo = (view: ViewState, sectionId?: string) => {
    setCurrentView(view);
    
    // If navigating to a section on home, wait for render then scroll
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      
      <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar currentView={currentView} onNavigate={navigateTo} />
        <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
          
          {currentView === 'home' && (
            <div className="space-y-24">
              <section id="about" className="pt-20">
                <Hero />
              </section>
              <section id="experience" className="scroll-mt-24">
                <ExperienceSection />
              </section>
              <section id="skills" className="scroll-mt-24">
                <SkillsSection />
              </section>
              <section id="projects" className="scroll-mt-24">
                <ProjectsSection />
              </section>
              <section id="contact" className="scroll-mt-24">
                <ContactSection />
              </section>
            </div>
          )}

          {currentView === 'blog' && (
            <div className="pt-20 fade-in">
              <BlogSection />
            </div>
          )}

          {currentView === 'teaching' && (
            <div className="pt-20 fade-in">
              <TeachingSection />
            </div>
          )}

        </main>
        <Footer />
      </div>
    </>
  );
}