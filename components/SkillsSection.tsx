import React from 'react';
import { technicalSkills } from '../constants';
import { SiCplusplus, SiRos, SiRust, SiTypescript, SiPython, SiTailwindcss, SiNextdotjs, SiReact } from 'react-icons/si';

const iconMap: { [key: string]: React.ElementType } = {
  "C++": SiCplusplus,
  "ROS": SiRos,
  "Rust": SiRust,
  "TypeScript": SiTypescript,
  "Python": SiPython,
  "Tailwind CSS": SiTailwindcss,
  "Next.js": SiNextdotjs,
  "React": SiReact,
};

export default function SkillsSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {technicalSkills.map((skill) => {
          const Icon = iconMap[skill.name];
          return (
            <div key={skill.name} className="flex items-center gap-4">
              <div className="w-8 flex-shrink-0 flex justify-center">
                {Icon && <Icon className="text-2xl text-slate-700 dark:text-slate-300" />}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                  <span className="text-slate-500 dark:text-slate-500">{skill.level}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div>
           <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Languages</h2>
           <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex justify-between items-center h-24">
                <span className="text-slate-700 dark:text-slate-300 font-medium">English</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Native</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex justify-between items-center h-24">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Mandarin</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Native</span>
              </div>
           </div>
        </div>

        <div>
           <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Certifications</h2>
           <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg relative h-24 flex items-center">
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 pr-12 leading-tight">
                  Google Cloud Professional Machine Learning Engineer
                </h3>
                <span className="absolute bottom-4 right-4 text-xs text-slate-500 dark:text-slate-400">
                  2025
                </span>
             </div>
             <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg relative h-24 flex items-center">
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 pr-12 leading-tight">
                  Cisco Certified Network Associate (CCNA)
                </h3>
                <span className="absolute bottom-4 right-4 text-xs text-slate-500 dark:text-slate-400">
                  2024
                </span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}