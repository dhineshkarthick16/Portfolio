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
  slug: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
}

export interface Achievement {
  title: string;
  organization: string;
  result: string;
  id?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badge?: string;
  skills?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  type: "project" | "experience";
  date: string;
  summary: string;
  readingTime?: string;
  relatedSlug?: string;
  tags?: string[];
}
