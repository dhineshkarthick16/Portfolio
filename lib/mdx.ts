import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project, BlogPost } from "@/types";

const projectsDir = path.join(process.cwd(), "content/projects");
const blogDir = path.join(process.cwd(), "content/blog");

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): { frontmatter: Project; content: string } {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  return { frontmatter: data as Project, content };
}

export function getAllProjects(): Project[] {
  return getAllProjectSlugs()
    .map((slug) => getProjectBySlug(slug).frontmatter)
    .sort((a, b) => {
      const order = { "In Progress": 0, Completed: 1, Future: 2 };
      return order[a.status] - order[b.status];
    });
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogPostBySlug(slug: string): { frontmatter: BlogPost; content: string } {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  return { frontmatter: data as BlogPost, content };
}

export function getAllBlogPosts(): BlogPost[] {
  return getAllBlogSlugs()
    .map((slug) => getBlogPostBySlug(slug).frontmatter)
    .filter((p) => p.type === "project" || p.type === "experience")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function hasBlogPost(slug: string): boolean {
  if (!fs.existsSync(blogDir)) return false;
  return fs.existsSync(path.join(blogDir, `${slug}.mdx`));
}

export function getBlogPostsByType(type: "project" | "experience"): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.type === type);
}
