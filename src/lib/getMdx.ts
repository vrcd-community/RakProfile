import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface PostMatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export async function getMdxFiles() {
  const blogDir = path.join(process.cwd(), 'src/blog');
  const files = await fs.readdir(blogDir);
  return files.filter(file => file.endsWith('.mdx'));
}

export async function validateMdxSlug(slug: string) {
  const files = await getMdxFiles();
  return files.some(file => file === `${slug}.mdx`);
}

export async function getPostMatter(slug: string): Promise<PostMatter> {
  const filePath = path.join(process.cwd(), 'src/blog', `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data } = matter(fileContent);
  
  return {
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description,
    tags: data.tags || []
  };
}