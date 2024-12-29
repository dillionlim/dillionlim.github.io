"use client";

import { useEffect, useState } from "react";
import Script from 'next/script';
import Navbar from "@/components/navbar";
import IntroSection from "@/components/intro-section/intro-section";
import ProjectsSection from "@/components/projects-section";
import ScrollProgress from "@/components/scroll-progress";
import Loader from "@/components/intro-section/loading-screen";
import PastExperiencesSection from "@/components/experience-section/experience-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white text-black">
          <Loader />
        </div>
      ) : (
        <>
          <ScrollProgress />
          <Navbar />
          <div className="flex flex-col">
            <section className="min-h-screen flex items-center justify-center bg-background px-4">
              <IntroSection />
            </section>
            <section className="min-h-screen bg-background">
              <PastExperiencesSection />
            </section>
            <section className="min-h-screen bg-background px-4">
              <SkillsSection />
            </section>
            <section className="min-h-screen bg-background">
              <ProjectsSection />
            </section>
            <section className="min-h-screen bg-background px-4">
              <ContactSection />
            </section>
          </div>
        </>
      )}
    </main>
  );
}
