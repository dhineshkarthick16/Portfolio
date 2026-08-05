import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project } from "@/types";

const projectsDir = path.join(process.cwd(), "content/projects");

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
