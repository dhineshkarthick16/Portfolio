export interface Project {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  techStack: string[];
  githubUrl: string;
  status: "Completed" | "In Progress" | "Future";
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  coursework?: string[];
}

export interface Experience {
  organization: string;
  role: string;
  duration: string;
  description: string;
}

export interface Achievement {
  title: string;
  organization: string;
  result: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
