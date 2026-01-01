export interface Experience {
  year: string;
  title: string;
  company: string;
  description: string[];
  skills?: string[];
  awards?: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  moreInfo: string;
  linkable?: boolean;
  link?: string;
  carouselImages?: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content?: string; // Markdown content (optional if path is provided)
  path?: string; // Path to markdown file (optional if content is provided)
}

export interface TeachingMaterial {
  id: string;
  course: string;
  title: string;
  description: string;
  date: string;
  link?: string; // Path to PDF or resource
  tags?: string[];
}