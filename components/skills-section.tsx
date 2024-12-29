import { FaPython, FaReact, FaRust } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiCplusplus } from "react-icons/si";
import { RiRobot2Fill } from "react-icons/ri";

export default function SkillsSection(): JSX.Element {
  return (
    <div className="py-16 px-8 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>

      <div className="mb-16">
        <h3 className="text-3xl font-semibold mb-8">Technical Skills</h3>
        <ul className="space-y-4">
          {[
            { icon: <SiCplusplus className="text-blue-500 text-2xl" />, skill: "C++", level: 90 },
            { icon: <RiRobot2Fill className="text-black dark:text-white text-2xl" />, skill: "ROS", level: 85 },
            { icon: <FaRust className="text-red-800 text-2xl" />, skill: "Rust", level: 85 },
            { icon: <SiTypescript className="text-blue-500 text-2xl" />, skill: "TypeScript", level: 85 },
            { icon: <FaPython className="text-blue-400 text-2xl" />, skill: "Python", level: 80 },
            { icon: <SiTailwindcss className="text-teal-500 text-2xl" />, skill: "Tailwind CSS", level: 80 },
            { icon: <SiNextdotjs className="text-black dark:text-white text-2xl" />, skill: "Next.js", level: 80 },
            { icon: <FaReact className="text-teal-400 text-2xl" />, skill: "React", level: 75 },
          ].map(({ icon, skill, level }, idx) => (
            <li key={idx} className="flex items-center space-x-4">
              <div className="w-10 flex justify-center">{icon}</div>
              <span className="w-36 font-medium text-lg text-left pl-4">{skill}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 relative">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                  style={{ width: `${level}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm text-gray-600 font-medium">{level}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h3 className="text-3xl font-semibold mb-8">Languages</h3>
          <ul className="space-y-6">
            {[
              { language: "English", level: "Native" },
              { language: "Mandarin", level: "Native" },
            ].map(({ language, level }, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-50 py-3 px-6 rounded-lg shadow-sm"
              >
                <span className="text-lg font-medium text-gray-800">{language}</span>
                <span className="text-sm font-medium text-gray-600">{level}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-3xl font-semibold mb-8">Certifications</h3>
          <ul className="space-y-6">
            {[
              { certification: "Cisco Certified Network Associate (CCNA)", date: "2024" },
            ].map(({ certification, date }, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-50 py-3 px-6 rounded-lg shadow-sm"
              >
                <span className="text-lg font-medium text-gray-800">{certification}</span>
                <span className="text-sm font-medium text-gray-600">{date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
