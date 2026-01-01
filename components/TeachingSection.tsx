import React, { useState } from 'react';
import { teachingMaterials } from '../constants';
import { BookOpen, Calendar, Download, FileText, ChevronLeft, FlaskConical, Code, Terminal, Heart, Presentation, ArrowRight } from 'lucide-react';

// Metadata mapping for courses to provide rich visuals and descriptions
const COURSE_METADATA: Record<string, { description: string, icon: React.ElementType, color: string }> = {
  "Chemistry Olympiad": {
    description: "Original problems I have set for Chemistry Olympiads.",
    icon: FlaskConical,
    color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30"
  },
  "CS1010X AY2025/26 Sem 2": {
    description: "CS1010X (Programming Methodology I) AY2025/26 Sem 2 notes.",
    icon: Code,
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
  },
  "Competitive Programming": {
    description: "Problem I have authored for competitive programming contests.",
    icon: Terminal,
    color: "text-green-500 bg-green-100 dark:bg-green-900/30"
  }
};

export default function TeachingSection() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Group materials by course
  const courses = Array.from(new Set(teachingMaterials.map(m => m.course)));

  // View: Selected Course Details
  if (selectedCourse) {
    const courseMaterials = teachingMaterials.filter(m => m.course === selectedCourse);
    const meta = COURSE_METADATA[selectedCourse] || { description: "Teaching materials.", icon: BookOpen, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" };
    const Icon = meta.icon;

    // Group materials by sections if it's Chemistry Olympiad
    const isChemistry = selectedCourse === "Chemistry Olympiad";
    
    // Define section order for Chemistry
    const chemistrySections = [
      "Competition Papers",
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Physical Chemistry",
      "Spectroscopy"
    ];

    // Helper to get section for a material (defaults to "Other" if no match)
    const getSection = (material: typeof teachingMaterials[0]) => {
      if (!isChemistry) return "All Materials";
      for (const section of chemistrySections) {
        if (material.tags?.includes(section)) return section;
      }
      return "Other";
    };

    // Grouping logic
    const groupedMaterials = courseMaterials.reduce((acc, material) => {
      const section = getSection(material);
      if (!acc[section]) acc[section] = [];
      acc[section].push(material);
      return acc;
    }, {} as Record<string, typeof teachingMaterials>);

    // Get sections to render (preserve order for Chemistry)
    const sectionsToRender = isChemistry 
      ? ["Competition Papers", "Inorganic Chemistry", "Organic Chemistry", "Physical Chemistry", "Spectroscopy"].filter(s => groupedMaterials[s]?.length > 0)
      : ["All Materials"];

    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-500 mb-8 transition-colors group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Courses
        </button>

        <div className="text-center mb-12">
           <div className={`mx-auto w-16 h-16 rounded-2xl ${meta.color} flex items-center justify-center mb-4`}>
              <Icon size={32} />
           </div>
           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{selectedCourse}</h1>
           <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg">
             {meta.description}
           </p>
        </div>

        <div className={isChemistry ? "flex flex-col gap-12" : "space-y-12"}>
          {isChemistry && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectionsToRender.map((section) => (
                <div 
                  key={section} 
                  className={`flex flex-col h-full ${
                    section === "Inorganic Chemistry" ? "md:col-span-2 lg:col-span-2" : 
                    section === "Organic Chemistry" ? "" : ""
                  }`}
                >
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                    {section}
                  </h2>
                  <div className={`grid gap-6 ${
                    section === "Inorganic Chemistry" ? "md:grid-cols-2" : "grid-cols-1"
                  }`}>
                    {groupedMaterials[section].map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col gap-4 group h-full"
                      >
                         <div className="flex-grow flex flex-col h-full">
                            <div className="flex flex-col gap-1 mb-2">
                              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-500 transition-colors line-clamp-2">{item.title}</h2>
                              <div className="flex items-center text-slate-500 text-sm flex-shrink-0">
                                 <Calendar size={14} className="mr-1.5" />
                                 {item.date}
                              </div>
                            </div>
                            
                            {item.description && (
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                {item.description}
                              </p>
                            )}
    
                            <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 flex-grow">
                               <div className="flex gap-2 flex-wrap content-end">
                                  {item.tags?.map(tag => (
                                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded font-medium">
                                          {tag}
                                      </span>
                                  ))}
                               </div>
                               
                               {item.link && (
                                  <a 
                                    href={item.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium w-full justify-center mt-auto"
                                  >
                                    {item.link.endsWith('.pdf') ? <Download size={16} /> : <FileText size={16} />}
                                    {item.link.endsWith('.pdf') ? 'Download PDF' : 'View Materials'}
                                  </a>
                               )}
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isChemistry && sectionsToRender.map((section) => (
            <div key={section}>
              <div className="grid gap-6">
                {groupedMaterials[section].map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 group"
                  >
                     <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-500 transition-colors">{item.title}</h2>
                          <div className="flex items-center text-slate-500 text-sm flex-shrink-0">
                             <Calendar size={14} className="mr-1.5" />
                             {item.date}
                          </div>
                        </div>
                        
                        {item.description && (
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                           <div className="flex gap-2">
                              {item.tags?.filter(t => !chemistrySections.includes(t)).map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded font-medium">
                                      {tag}
                                  </span>
                              ))}
                           </div>
                           
                           {item.link && (
                              <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                              >
                                {item.link.endsWith('.pdf') ? <Download size={16} /> : <FileText size={16} />}
                                {item.link.endsWith('.pdf') ? 'Download PDF' : 'View Materials'}
                              </a>
                           )}
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // View: Course Grid
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Teaching</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg">
          Resources, notes, and materials from my teaching experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => {
            const count = teachingMaterials.filter(m => m.course === course).length;
            const meta = COURSE_METADATA[course] || { description: "Various teaching materials", icon: BookOpen, color: "text-gray-500 bg-gray-100 dark:bg-gray-800" };
            const Icon = meta.icon;

            return (
                <button 
                    key={course}
                    onClick={() => setSelectedCourse(course)}
                    className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-2xl p-8 hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 text-left group flex flex-col h-full"
                >
                    <div className={`w-14 h-14 rounded-xl ${meta.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                        {course}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed flex-grow">
                        {meta.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 w-full mt-auto">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-500">
                            {count} Resource{count !== 1 ? 's' : ''}
                        </span>
                        <span className="text-blue-500 flex items-center gap-1 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                            View Materials <ArrowRight size={16} />
                        </span>
                    </div>
                </button>
            )
        })}
      </div>
    </div>
  );
}