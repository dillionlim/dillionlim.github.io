import { Experience, Project, Skill, BlogPost, TeachingMaterial } from './types';

export const workExperiences: Experience[] = [
  {
    year: "Jan 2025 – Aug 2025",
    title: "SWE / ML / Quantitative Trading Intern",
    company: "Almanak",
    description: [
      "Developed an agentic team pipeline, automating end-to-end development, testing and deployment of quantitative trading strategies in <5 minutes, reducing manual backtest workload by 85% (saving 250 man-hours per month).",
      "Optimized recursive file-tree diff algorithm, cutting dynamic update latency from >2s to <100 ms, reducing update times by over 95%.",
      "Implemented multithreaded execution for backtesting, strategy generation, and file-watching, boosting pipeline processing speeds by >75%."
    ],
    skills: ["NestJS", "LangGraph", "Kubernetes", "Web3", "Websockets", "Multiprocessing"],
  },
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
    skills: ["ROS", "C++", "Unreal Engine 6", "Colosseum", "Cesium", "Large Language Models (LLMs)"],
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
  },
];

export const educationExperiences: Experience[] = [
  {
    year: "Aug 2025 - Present",
    title: "Double Degree Program (B. Comp. in Computer Science and B. Sc. in Mathematics)",
    company: "National University of Singapore",
    description: [
      "Current GPA: 5.0 / 5.0",
      "Offered the NUS Global Merit Scholarship", 
      "Teaching Assistant for CS1010X (Programming Methodology I)"
    ],
  },
  {
    year: "2021-2022",
    title: "GCE A-Level",
    company: "Hwa Chong Institution",
    description: [
      "Perfect UAS of 90 with H3 Distinction (AAAA/AA + Distinction);",
      "Offered direct admission into the Science and Mathematics Talent Programme (SMTP), rigorously teaching concepts beyond the normal syllabus;",
      "Activities I/C for the Students' Science Research Club;",
      "Activities Committee Head for the International Science Youth Forum 2022;",
      "Organising Team for Operation Einstein, which provides tutoring for underprivileged children in mathematics and sciences."
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
      "HCI Academic Awards: Outstanding Student Award (2020), 3rd in Level (2019), Annie Tan (Mrs Wan Boo Sow) Bilingual Award (2019)",
      "Singapore Science and Engeering Fair (SSEF) - Junior Scientist Award and Broadcom MASTERS Award (2019), Silver (2020)",
      "International Young Scientists Innovation Exhibition (IYSIE) 2019 - Gold Placing",
      "Singapore Mathematical Olympiad 2020 - Bronze (2019), Silver (2020)",
      "A*Star Science Award (Upper Secondary) (2019)"
    ]
  },
];

export const technicalSkills: Skill[] = [
  { name: "C++", level: 90 },
  { name: "ROS", level: 85 },
  { name: "Rust", level: 85 },
  { name: "TypeScript", level: 85 },
  { name: "Python", level: 80 },
  { name: "Tailwind CSS", level: 80 },
  { name: "Next.js", level: 80 },
  { name: "React", level: 75 },
];

export const projects: Project[] = [
  {
    title: "Personal Website",
    description: "The website you are currently viewing!",
    tech: ["React", "Tailwind CSS", "Latex"],
    image: "/images/personal-website.png",
    moreInfo: "This is my personal website, showcasing various projects and skills. \n It is built with Next.js and Tailwind CSS.\n Additionally, due to the fact that I would like to include things like Tikz in my blog, I decided to use RMarkdown, which supports it. RMarkdown support static site generation to raw HTML, and I then built a wrapper around the static site generator and integrated it with Github workflows to make a fully functional blog feature.",
  },
  {
    title: "Singapore Chemistry League",
    description: "This is a contest management system for Singapore Chemistry League, a national level competition for students in junior college.",
    linkable: true,
    link: "https://www.sgchemleague.org/",
    tech: ["React", "MongoDB", "AWS"],
    image: "/images/schl.png",
    moreInfo: "The Singapore Chemistry League website is used to host the annual competition, where more than 200 teams come together to solve open-internet chemistry problems.\n The website was built with Next.js with MongoDB as a database.\n In particular, pre-warming on AWS elastic load balancing solves the problem arising from scaling instances appropriately with bursty traffic (such as at the start of the competition).",
    carouselImages: [
      "/images/schl-problems.jpg",
    ]
  },
  {
    title: "Fuel Tracking App",
    description: "A fuel tracking app to tally the fuel receipts submitted with the Shell web portal for Exercise Wallaby 2024.",
    tech: ["React", "Material UI", "Cloudflare D1 Database", "Cloudflare Functions (Node.js)"],
    image: "/images/fuel-tracker.png",
    moreInfo: "This fuel tracking app was rapidly developed in Exercise Wallaby 2024 to more accurately identify missing fuel receipt submissions, as well as tally the information provided by users.\n This greatly improved the accuracy of tracking fuel consumption and streamlined processes to account for missing fuel receipts.\n The app was used for RSAF-wide transport fuel tracking.",
    carouselImages: [
      "/images/fuel-tracker-add-submission.png",
      "/images/fuel-tracker-final-verification.png",
    ]
  },
  {
    title: "Mileage Editor App",
    description: "A companion app to aggregate information about mileage, and edit erroneous mileage data for Exercise Wallaby 2024.",
    tech: ["React", "Material UI", "Cloudflare D1 Database", "Cloudflare Functions (Node.js)", "Cloud Firestore"],
    image: "/images/mileage-editor.png",
    moreInfo: "This app was developed as a companion app to the mileage tracker used in Exercise Wallaby 2024.\n Noticing that commanders were unable to edit erroneously entered mileage data, as well as being unable to aggregate all data to perform statistics, this app was created to fulfil those roles. It also uses flags out potentially erroneous mileages for review.",
    carouselImages: [
      "/images/mileage-editor-modal.png",
    ]
  },
  {
    title: "Optimizing Coverage of a Robotic Fleet",
    description: "My internship project at DSTA, which involved writing a ROS2 package to optimize the coverage of a set of robots.",
    tech: ["ROS2", "Python", "Gurobi API"],
    image: "/images/maximum-coverage.png",
    moreInfo: "I made use of linear programming, together with some approximations to develop an approximation algorithm with over 95% accuracy to distribute a robotic fleet optimally.\n I then integrated this with a navigation stack and visual Simultaneous Localization and Mapping (SLAM), making use of only RGBD cameras.",
    carouselImages: [
      "/images/integrated-dynamic-obstacle-avoidance.png",
      "/images/maximum-coverage-algo.png",
    ]
  },
];

export const teachingMaterials: TeachingMaterial[] = [
  {
    id: "chem-an-interesting-equilibria",
    course: "Chemistry Olympiad",
    title: "An Interesting Equilibria",
    date: "2022",
    description: "",
    tags: ["Inorganic Chemistry"],
    link: "/teaching/chemistry/an-interesting-equilibria.pdf"
  },
  {
    id: "chem-an-organic-elucidation",
    course: "Chemistry Olympiad",
    title: "An Organic Elucidation",
    date: "2022",
    description: "",
    tags: ["Organic Chemistry"],
    link: "/teaching/chemistry/an-organic-elucidation.pdf"
  },
  {
    id: "chem-lighting-up-the-world",
    course: "Chemistry Olympiad",
    title: "Lighting Up The World",
    date: "2023",
    description: "",
    tags: ["Inorganic Chemistry", "Spectroscopy"],
    link: "/teaching/chemistry/lighting_up_the_world.pdf"
  },
  {
    id: "chem-metals-in-our-body",
    course: "Chemistry Olympiad",
    title: "Metals in Our Body",
    date: "2024",
    description: "",
    tags: ["Physical Chemistry", "Kinetics"],
    link: "/teaching/chemistry/metals-in-our-body.pdf"
  },
  {
    id: "chem-molecular-sensors",
    course: "Chemistry Olympiad",
    title: "Molecular Sensors",
    date: "2022",
    description: "",
    tags: ["Spectroscopy"],
    link: "/teaching/chemistry/molecular_sensors.pdf"
  },
  {
    id: "chem-onsens-bronze",
    course: "Chemistry Olympiad",
    title: "Onsens (Bronze)",
    date: "2025",
    description: "",
    tags: ["Inorganic Chemistry"],
    link: "/teaching/chemistry/onsens-bronze.pdf"
  },
  {
    id: "chem-onsens-silver",
    course: "Chemistry Olympiad",
    title: "Onsens (Silver)",
    date: "2025",
    description: "",
    tags: ["Inorganic Chemistry"],
    link: "/teaching/chemistry/onsens-silver.pdf"
  },
  {
    id: "chem-onsens-gold",
    course: "Chemistry Olympiad",
    title: "Onsens (Gold)",
    date: "2025",
    description: "",
    tags: ["Inorganic Chemistry", "Spectroscopy"],
    link: "/teaching/chemistry/onsens-gold.pdf"
  },
  {
    id: "chem-schl-problems",
    course: "Chemistry Olympiad",
    title: "SChL Problems",
    date: "2024",
    description: "",
    tags: ["Competition Papers"],
    link: "/teaching/chemistry/schl_problems.pdf"
  },
  {
    id: "chem-see-you",
    course: "Chemistry Olympiad",
    title: "See You",
    date: "2023",
    description: "",
    tags: ["Inorganic Chemistry"],
    link: "/teaching/chemistry/see_you.pdf"
  },
  {
    id: "chem-silver-chemistry",
    course: "Chemistry Olympiad",
    title: "Silver Chemistry",
    date: "2022",
    description: "",
    tags: ["Physical Chemistry", "Electrochemistry", "Equilibria", "Kinetics"],
    link: "/teaching/chemistry/silver_chemistry.pdf"
  },
  {
    id: "chem-wheels-on-molecules",
    course: "Chemistry Olympiad",
    title: "Wheels on Molecules",
    date: "2024",
    description: "",
    tags: ["Organic Chemistry"],
    link: "/teaching/chemistry/wheels_on_molecules.pdf"
  },
  {
    id: "chem-winter-competition",
    course: "Chemistry Olympiad",
    title: "Winter Competition",
    date: "2023",
    description: "",
    tags: ["Competition Papers"],
    link: "/teaching/chemistry/winter-competition.pdf"
  },
  {
    id: "cp-christmas-turkey-farm",
    course: "Competitive Programming",
    title: "Christmas Turkey Farm",
    date: "2020",
    description: "",
    tags: ["Data Structures", "Wavelet Tree", "Persistent Segment Tree"],
    link: "/teaching/comp-prog/christmasturkeyfarm.pdf"
  },
  {
    id: "cp-dice",
    course: "Competitive Programming",
    title: "Dice",
    date: "2021",
    description: "",
    tags: ["Math", "Primes", "Permutations and Combinations"],
    link: "/teaching/comp-prog/dice.pdf"
  },
  {
    id: "cs1010x-ch00-course-administration",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Course Administration",
    date: "2026",
    description: "Basic course administration for this iteration of CS1010X.",
    tags: ["CS1010X", "Course Administration"],
    link: "/teaching/cs1010x-202526-sem2/ch00-course-administration.pdf"
  },
  {
    id: "cs1010x-ch01-introduction-to-python",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 01: Introduction to Python",
    date: "2026",
    description: "Introduction to Python programming language basics.",
    tags: ["CS1010X", "Python"],
    link: "/teaching/cs1010x-202526-sem2/ch01-introduction-to-python.pdf"
  },
  {
    id: "cs1010x-ch02-functional-abstraction",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 02: Functional Abstraction",
    date: "2026",
    description: "Concepts of functional abstraction in programming.",
    tags: ["CS1010X", "Functional Abstraction"],
    link: "/teaching/cs1010x-202526-sem2/ch02-functional-abstraction.pdf"
  },
  {
    id: "cs1010x-ch03-wishful-thinking",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 03: Wishful Thinking",
    date: "2026",
    description: "The concept of wishful thinking in problem solving and algorithm design.",
    tags: ["CS1010X", "Wishful Thinking"],
    link: "/teaching/cs1010x-202526-sem2/ch03-wishful-thinking.pdf"
  },
  {
    id: "cs1010x-ch04-recursion-and-iteration",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 04: Recursion and Iteration",
    date: "2026",
    description: "Exploring recursion and iteration processes.",
    tags: ["CS1010X", "Recursion", "Iteration"],
    link: "/teaching/cs1010x-202526-sem2/ch04-recursion-and-iteration.pdf"
  },
  {
    id: "cs1010x-ch05-debugging",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 05: Debugging",
    date: "2026",
    description: "Techniques and strategies for debugging code.",
    tags: ["CS1010X", "Debugging"],
    link: "/teaching/cs1010x-202526-sem2/ch05-debugging.pdf"
  },
  {
    id: "cs1010x-ch06-higher-order-functions",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 06: Higher Order Functions",
    date: "2026",
    description: "Using higher-order functions for more expressive code.",
    tags: ["CS1010X", "Higher Order Functions"],
    link: "/teaching/cs1010x-202526-sem2/ch06-higher-order-functions.pdf"
  },
  {
    id: "cs1010x-ch07-data-abstractions",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 07: Data Abstractions",
    date: "2026",
    description: "Building and using data abstractions.",
    tags: ["CS1010X", "Data Abstractions"],
    link: "/teaching/cs1010x-202526-sem2/ch07-data-abstractions.pdf"
  },
  {
    id: "cs1010x-ch08-working-with-sequences",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 08: Working with Sequences",
    date: "2026",
    description: "Operations and algorithms for sequence data.",
    tags: ["CS1010X", "Sequences"],
    link: "/teaching/cs1010x-202526-sem2/ch08-working-with-sequences.pdf"
  },
  {
    id: "cs1010x-ch09-lists-searching-sorting",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 09: Lists, Searching, and Sorting",
    date: "2026",
    description: "List processing, searching, and sorting algorithms.",
    tags: ["CS1010X", "Lists", "Searching", "Sorting"],
    link: "/teaching/cs1010x-202526-sem2/ch09-lists-searching-sorting.pdf"
  },
  {
    id: "cs1010x-ch10-data-structures-and-multiple-representations",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 10: Data Structures and Multiple Representations",
    date: "2026",
    description: "Advanced data structures and handling multiple representations of data.",
    tags: ["CS1010X", "Data Structures"],
    link: "/teaching/cs1010x-202526-sem2/ch10-data-structures-and-multiple-representations.pdf"
  },
  {
    id: "cs1010x-ch11-data-directed-programming",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 11: Data Directed Programming",
    date: "2026",
    description: "Principles of data-directed programming.",
    tags: ["CS1010X", "Data Directed Programming"],
    link: "/teaching/cs1010x-202526-sem2/ch11-data-directed-programming.pdf"
  },
  {
    id: "cs1010x-ch12-object-oriented-programming",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 12: Object Oriented Programming",
    date: "2026",
    description: "Introduction to object-oriented programming concepts.",
    tags: ["CS1010X", "OOP"],
    link: "/teaching/cs1010x-202526-sem2/ch12-object-oriented-programming.pdf"
  },
  {
    id: "cs1010x-ch13-dynamic-programming",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 13: Dynamic Programming",
    date: "2026",
    description: "Introduction to dynamic programming algorithms.",
    tags: ["CS1010X", "Dynamic Programming"],
    link: "/teaching/cs1010x-202526-sem2/ch13-dynamic-programming.pdf"
  },
  {
    id: "cs1010x-ch14-intro-to-java",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 14: Introduction to Java",
    date: "2026",
    description: "Transitioning to Java programming.",
    tags: ["CS1010X", "Java"],
    link: "/teaching/cs1010x-202526-sem2/ch14-intro-to-java.pdf"
  },
  {
    id: "cs1010x-ch15-object-oriented-programming-in-java",
    course: "CS1010X AY2025/26 Sem 2",
    title: "Chapter 15: Object Oriented Programming in Java",
    date: "2026",
    description: "Applying OOP concepts in Java.",
    tags: ["CS1010X", "Java", "OOP"],
    link: "/teaching/cs1010x-202526-sem2/ch15-object-oriented-programming-in-java.pdf"
  },
];
