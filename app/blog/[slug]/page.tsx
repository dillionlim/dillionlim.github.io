import { getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { BlogPostContent } from '@/components/blog/blog-post-content';
import { BlogNavigation } from '@/components/blog/blog-navigation';
import NavBar from '@/components/navbar';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const posts = getAllPosts();
  const postIndex = posts.findIndex((p) => p.slug === params.slug);
  const post = posts[postIndex];

  if (!post) {
    notFound();
  }

  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  if (post.htmlPath) {
    const htmlContent = fs.readFileSync(
      path.join(process.cwd(), 'content', post.htmlPath),
      'utf8'
    );

    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <BlogPostContent post={post} htmlContent={htmlContent} />
        <BlogNavigation prevPost={prevPost} nextPost={nextPost} />
      </div>
    );
  }

  return null;
}
