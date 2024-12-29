import React, { useState } from "react";
import TimelineItem from "@/components/experience-section/timeline-item";

interface Experience {
    year: string;
    title: string;
    company: string;
    description: string[];
    skills?: string[];
    awards?: string[];
    yOffset?: number;
  }

export default function PastExperiencesSection() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  const workExperiences: Experience[] = [
    {
      year: "July 2024 - Present",
      title: "Robotics / AI Engineer",
      company: "RSAF Agile Innovation and Digital (RAiD)",
      description: [
        "Conceptualised and engineered an end-to-end, high-fidelity reinforcement learning simulation 3D environment for drone training in realistic environments;",
        "Developed cutting-edge Proof-Of-Concept technologies as part of the Air Emerging Technologies, High-Speed Experimentation and Research (AETHER) team;",
        "Collaborated with leading universities, NUS and SUTD to transform research into innovative solutions, blending academic expertise with industry needs;",
        "Conducted extensive research on application of large language models (LLMs) for efficient searching and ranking in local and private code databases, with search results having a user-rated relevance of 82%."
      ],
      skills: ["ROS", "C++", "Unreal Engine 5", "Colosseum", "Cesium", "Large Language Models (LLMs)"],
      yOffset: 70,
    },
    {
      year: "March 2023 - Present",
      title: "Full-Time National Serviceman",
      company: "Republic of Singapore Air Force (RSAF)",
      description: [
        "Rapidly developed web applications for Exercise Wallaby 2024, including one used by the whole SAF transport formation to process and modify mileage data, and another for automating RSAF fuel receipt tallying with the Shell web portal. Achieved 100% uptime while handling 10,000+ monthly edits and 1,000+ fuel receipts.",
        "Developed a scalable Telegram bot for Exercise Wallaby 2023-2024 using FormSG and Telegram APIs to aggregate form responses. Achieved more than 99.9% uptime while processing 10,000+ monthly responses."
      ],
      skills: ["Next.js", "Cloudflare Functions (Node.js)", "Cloud Firestore Database", "Cloudflare D1 Database"],
    },
    {
      year: "January - March 2023",
      title: "Intern",
      company: "Defence Science and Technology Agency (DSTA)",
      description: [
        "Developed an approximation algorithm with 95% accuracy for an efficient, polynomial-time solution to the maximum coverage optimization problem (NP-hard) using linear programming.",
        "Integrated the algorithm into both a ROS1 and ROS2 package and implemented it on a robotic fleet.",
        "Integrated this package with visual simultaneous localization and mapping (SLAM) and navigation packages for an autonomous robot distribution solution."
      ],
      skills: ["Python", "Gurobi API", "Linear Programming", "ROS"],
      yOffset: -10,
    },
  ];

  const educationExperiences: Experience[] = [
    {
      year: "Aug 2025",
      title: "Double Degree Program: Bachelor of Computing in Computer Science and Bachelor of Science in Mathematics",
      company: "National University of Singapore (NUS)",
      description: [
        "Incoming Freshman in National University of Singapore (NUS);",
        "Receipient of the NUS Global Merit Scholarship"
      ],
    },
    {
      year: "2021-2022",
      title: "General Certificate of Education Advanced Level (GCE A-Level)",
      company: "Hwa Chong Institution",
      description: [
        "Perfect UAS of 90 with H3 Distinction (AAAA/AA + Distinction);",
        "Offered direct admission into the Science and Mathematics Talent Programme (SMTP), rigorously teaching concepts beyond the normal syllabus;",
        "Activities I/C for the Students' Science Research Club;",
        "Activities Committee Head for the International Science Youth Forum 2022;",
        "Organising Team for Operation Einstein, which provides tutoring for underprivileged children in mathematics and sciences (project has been featured in the news)."
      ],
      awards: [
        "HCI Academic Awards: Top in H2 Chemistry, Outstanding Student Award",
        "Represented Singapore in the International Science and Engineering Fair (ISEF) 2021 - 4th in Chemistry Category",
        "Singapore Science and Engineering Fair (SSEF) 2021 - Gold in Environmental Engineering Category",
        "Xylem Global Student Innovation Challenge 2021 - 4th place in category and People's Choice Award",
        "Singapore Physics League (SPhL) 2021 - Silver",
        "Awarded the Hwa Chong Diploma - Distinction"
      ]
    },
    {
      year: "2017-2020",
      title: "Integrated Program",
      company: "Hwa Chong Institution (High School Section)",
      description: [
        "Perfect Mean Subject Grade of 1.0, with 2 High Distinctions and 1 Distinction for Higher Papers;",
        "Part of the Science and Mathematics Talent Programme (SMTP), rigorously teaching concepts beyond the normal syllabus;",
        "Trainer for the Advanced C++ Sabbatical, teaching concepts such as dynamic programming and advanced data structures;",
        "Student Conductor and Section Leader (Percussion) for the HCI Chinese Orchestra."
      ],
      awards: [
        "HCI Academic Awards: Outstanding Student Award (2020), 3rd in Level (2019), Annie Tan (Mrs Wan Boo Sow) Bilingual Award (2019), Top in Social Studies (2019), Xue Yong Shu Model Student Award (2018), Top in Integrated Mathematics (2017)",
        "Singapore Science and Engeering Fair (SSEF) - Junior Scientist Award and Broadcom MASTERS Award (2019), Silver (2020)",
        "International Young Scientists Innovation Exhibition (IYSIE) 2019 - Gold Placing",
        "Singapore Mathematical Olympiad 2020 - Bronze (2019), Silver (2020)",
        "A*Star Science Award (Upper Secondary) (2019)"
      ]
    },
  ];

  const experiences = activeTab === "work" ? workExperiences : educationExperiences;

  return (
    <section className="min-h-screen bg-background px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Past Experiences</h2>

      <div className="flex justify-center gap-4 md:gap-8 mb-12">
        <button
          onClick={() => setActiveTab("work")}
          className={`px-4 md:px-6 py-2 text-base md:text-lg font-semibold transition-all duration-300 ${
            activeTab === "work" 
              ? "text-blue-600 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-300" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Work
        </button>
        <button
          onClick={() => setActiveTab("education")}
          className={`px-4 md:px-6 py-2 text-base md:text-lg font-semibold transition-all duration-300 ${
            activeTab === "education" 
              ? "text-blue-600 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-300" 
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Education
        </button>
      </div>

      <div 
        className="hidden md:block max-w-6xl mx-auto relative"
        style={{
          paddingTop: activeTab === "work" ? "20px" : "32px", 
          paddingBottom: activeTab === "work" ? "16px" : "10rem"
        }}
      >
        <div
          className={`absolute left-1/2 w-[2px] bg-gray-200 -translate-x-1/2 transition-all duration-300`}
          style={{
            top: activeTab === "work" ? "-2rem" : "0rem", 
            bottom: activeTab === "work" ? "-4rem" : "-2rem",
          }}
        />
        
        <div className="hidden md:block space-y-8 md:space-y-0">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              year={exp.year}
              title={exp.title}
              company={exp.company}
              description={exp.description}
              index={index}
              skills={exp.skills}
              awards={exp.awards}
              yOffset={exp.yOffset}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Mobile layout: Cards */}
        <div className="grid gap-8 md:hidden">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`
                p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md
                border border-gray-200 dark:border-gray-700
                transition-transform duration-300
                hover:shadow-lg hover:scale-105
              `}
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {exp.title}
              </h3>
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                {exp.company} | {exp.year}
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 ml-5">
                {exp.description.map((point, i) => (
                  <li key={i} className="list-disc text-sm">
                    {point}
                  </li>
                ))}
              </ul>
              {exp.skills && exp.skills.length > 0 && (
                <div className="mt-4">
                  <span className="font-semibold">Skills: </span>
                  <span className="text-gray-900 dark:text-gray-200">
                    {exp.skills.join(", ")}
                  </span>
                </div>
              )}
              {exp.awards && exp.awards.length > 0 && (
                <div className="mt-4">
                  <span className="font-semibold">Awards: </span>
                  <br />
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 ml-5">
                    {exp.awards.map((award, i) => (
                      <li key={i} className="list-disc text-sm">
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}