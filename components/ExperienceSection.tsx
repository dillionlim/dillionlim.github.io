import React, { useState } from 'react';
import { workExperiences, educationExperiences } from '../constants';
import { Experience } from '../types';
import { Briefcase, GraduationCap } from 'lucide-react';

interface ExperienceCardProps {
  exp: Experience;
  align: 'left' | 'right';
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, align }) => (
  <div className={`relative flex flex-col md:w-1/2 ${align === 'left' ? 'md:items-end md:pr-12' : 'md:items-start md:pl-12 md:ml-auto'}`}>
    
    {/* Connector Line & Dot (Desktop) */}
    <div className={`hidden md:flex absolute top-6 ${align === 'left' ? '-right-[5px]' : '-left-[5px]'} w-2.5 h-2.5 bg-blue-500 rounded-full z-10 ring-4 ring-white dark:ring-darkbg`}></div>
    
    {/* Mobile Timeline Logic */}
    <div className="md:hidden absolute left-[-29px] top-6 w-2.5 h-2.5 bg-blue-500 rounded-full z-10 ring-4 ring-white dark:ring-darkbg"></div>

    <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow w-full">
      <span className="inline-block py-1 px-2.5 rounded text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3">
        {exp.year}
      </span>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exp.title}</h3>
      <h4 className="text-md font-medium text-slate-600 dark:text-slate-300 mb-4">{exp.company}</h4>
      
      <ul className="space-y-2 mb-4">
        {exp.description.map((item, idx) => (
          <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex items-start">
            <span className="mr-2 mt-1.5 w-1 h-1 bg-slate-400 rounded-full flex-shrink-0"></span>
            {item}
          </li>
        ))}
      </ul>

      {exp.skills && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700/50">
          {exp.skills.map(skill => (
            <span key={skill} className="px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-slate-600 dark:text-slate-400 text-xs rounded border border-gray-200 dark:border-gray-700">
              {skill}
            </span>
          ))}
        </div>
      )}
      
      {exp.awards && (
           <div className="mt-4 pt-3 border-t border-dashed border-gray-200 dark:border-gray-700">
            <h5 className="font-semibold text-amber-600 dark:text-amber-500 mb-2 text-xs uppercase">Awards</h5>
            <ul className="space-y-1">
              {exp.awards.map((award, idx) => (
                <li key={idx} className="text-xs text-slate-500 dark:text-slate-400 flex items-start">
                   <span className="mr-1.5 text-amber-500">★</span> {award}
                </li>
              ))}
            </ul>
           </div>
        )}
    </div>
  </div>
);

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  const data = activeTab === 'work' ? workExperiences : educationExperiences;

  return (
    <div className="w-full">
       <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Past Experiences</h2>
        
        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 dark:bg-darkcard rounded-lg border border-gray-200 dark:border-darkborder">
          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'work'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Briefcase size={16} /> Work
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'education'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <GraduationCap size={16} /> Education
          </button>
        </div>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* Center Vertical Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-darkborder -translate-x-1/2"></div>
        
        {/* Left Vertical Line (Mobile) */}
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-darkborder"></div>

        <div className="space-y-12">
          {data.map((exp, index) => (
            <ExperienceCard 
              key={index} 
              exp={exp} 
              align={index % 2 === 0 ? 'left' : 'right'} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}