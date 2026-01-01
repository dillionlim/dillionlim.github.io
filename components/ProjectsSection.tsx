import React, { useState } from 'react';
import { projects } from '../constants';
import { Project } from '../types';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.carouselImages && project.carouselImages.length > 0 
    ? project.carouselImages 
    : [project.image];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Carousel */}
          <div className="relative aspect-video bg-gray-100 dark:bg-black rounded-lg overflow-hidden group">
            <img 
              src={images[currentImageIndex]} 
              alt={`${project.title} screenshot`} 
              className="w-full h-full object-contain"
            />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white">About the Project</h4>
              <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {project.moreInfo || project.description}
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded border border-blue-100 dark:border-blue-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.linkable && project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium w-full justify-center"
                >
                  Visit Website <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="group bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
            onClick={() => setSelectedProject(project)}
          >
            <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-xs font-medium text-slate-500 dark:text-slate-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}