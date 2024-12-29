import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  htmlPath: string;
};

function getMetadataFromRmd(file: string): { title: string; date: string; tags: string[] } {
  const rmdFilePath = file.replace('.html', '.Rmd');
  if (fs.existsSync(rmdFilePath)) {
    const rmdContent = fs.readFileSync(rmdFilePath, 'utf8');
    const { data } = matter(rmdContent);
    return {
      title: data.title || path.basename(rmdFilePath, '.Rmd'),
      date: data.date || new Date().toISOString(),
      tags: data.tags || []
    };
  }
  return {
    title: path.basename(file, '.html'),
    date: new Date().toISOString(),
    tags: []
  };
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(contentDirectory);

  const posts = files
    .filter(file => file.endsWith('.html'))
    .map(file => {
      const filePath = path.join(contentDirectory, file);
      const metadata = getMetadataFromRmd(filePath);
      return {
        slug: file.replace('.html', ''),
        title: metadata.title,
        date: metadata.date,
        tags: metadata.tags,
        content: '',
        htmlPath: file
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}
