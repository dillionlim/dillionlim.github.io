import React from "react";
import TypewriterEffect from "@/components/intro-section/typewriter-effect";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const interests = [
  "Backend Engineering",
  "Optimization and Algorithms",
  "Robotics",
];

export default function IntroSection () {
    return (
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                <div className="mb-10 flex items-center space-x-4">
                    <h1 className="text-4xl md:text-6xl font-bold">
                    Hi, I&apos;m Dillion Lim
                    </h1>
                    <h1 className="text-4xl md:text-6xl w-8 h-8 md:w-12 md:h-12 text-primary animate-wave">
                    👋
                    </h1>
                </div>
                </div>
                <div className="text-xl md:text-2xl text-muted-foreground">
                I am a passionate software engineer with a deep interest in
                </div>
                <div className="text-xl md:text-2xl">
                <TypewriterEffect words={interests} />
                </div>
                <div className="flex gap-x-6 mt-6 pt-6 md:py-6">
                    <a
                        href="mailto:dillionlim2004@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-24 sm:w-28 h-14 flex items-center justify-center border-2 border-primary text-primary rounded-lg p-3 hover:bg-primary/10 transition duration-300"
                    >
                        <FaEnvelope size={24} />
                        <span className="ml-2 text-sm sm:text-base inline">Email</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/dillion-lim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-28 sm:w-32 h-14 flex items-center justify-center border-2 border-primary text-primary rounded-lg p-3 hover:bg-primary/10 transition duration-300"
                    >
                        <FaLinkedin size={24} />
                        <span className="ml-2 text-sm sm:text-base inline">LinkedIn</span>
                    </a>
                    <a
                        href="https://github.com/dillionlim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-24 sm:w-28 h-14 flex items-center justify-center border-2 border-primary text-primary rounded-lg p-3 hover:bg-primary/10 transition duration-300"
                    >
                        <FaGithub size={24} />
                        <span className="ml-2 text-sm sm:text-base inline">GitHub</span>
                    </a>
                </div>
            </div>
            <div className="relative w-64 h-56 md:w-96 md:h-96 -mb-8">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-[url('/images/photo.png')] bg-cover bg-center" />
                </div>
            </div>
        </div>
    );
}
