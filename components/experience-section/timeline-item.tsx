import React from "react";
import TimelineNode from "@/components/experience-section/timeline-node";

type TimelineItemProps = {
  year: string;
  title: string;
  company: string;
  description: string[];
  index: number;
  skills?: string[];
  awards?: string[];
  yOffset?: number;
};

export default function TimelineItem({ year, title, company, description, index, skills, awards, yOffset = 0 }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative min-h-[16rem] md:h-64">
      <div className="hidden md:block">
        <TimelineNode isLeft={isLeft} />
      </div>

      <div 
        className={`
          absolute top-1/2 
          w-[calc(100%-2rem)] md:w-[calc(50%-5rem)] 
          mx-4 md:mx-0
          ${isLeft ? 'md:left-0' : 'md:right-0'}
        `}
        style={{ transform: `translate(0, calc(-50% + ${yOffset}px))` }}
      >
        <div className={`
          bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md 
          transition-all duration-300 
          hover:-translate-y-1 hover:shadow-lg 
          text-left
        `}>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <div className="text-sm font-semibold text-blue-600 dark:text-blue-300 mb-3">
            {company} | {year}
          </div>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300 ml-5">
            {description.map((point, i) => (
              <li key={i} className="list-disc text-sm">
                {point}
              </li>
            ))}
          </ul>
          {skills && skills.length > 0 && (
            <div className="mt-4">
              <span className="font-semibold">Skills: </span>
              <span className="text-gray-900 dark:text-gray-200">
                {skills.join(", ")}
              </span>
            </div>
          )}
          {awards && awards.length > 0 && (
            <div className="mt-4">
              <span className="font-semibold">Awards: </span>
              <br/>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 ml-5">
                {awards.map((award, i) => (
                  <li key={i} className="list-disc text-sm">
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
