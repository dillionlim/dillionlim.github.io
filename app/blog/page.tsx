'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { format } from 'date-fns';
import NavBar from '@/components/navbar';
import ScrollProgress from '@/components/scroll-progress';
import dynamic from 'next/dynamic';

const FaFolder = dynamic(() => import('react-icons/fa').then(mod => mod.FaFolder), { ssr: false });

async function fetchAllPosts(): Promise<BlogPost[]> {
  const response = await fetch('/api/posts');
  return response.json();
}

async function fetchAllTags(): Promise<string[]> {
  const response = await fetch('/api/tags');
  return response.json();
}

const POSTS_PER_PAGE = 5;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [postsData, tagsData] = await Promise.all([
          fetchAllPosts(),
          fetchAllTags(),
        ]);
        setPosts(postsData);
        setTags(tagsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary" />
          <p className="mt-4 text-primary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      <ScrollProgress />
      <NavBar />
      <div className="container mx-auto">
        <div className="sticky top-16 pt-8 bg-background w-full">
          <h1 className="text-4xl font-bold px-4 pb-4">Blog</h1>
        </div>

        <div className="flex px-4 gap-8 mt-8 flex-col-reverse lg:flex-row">
          <div className="lg:w-3/4 w-full">
            <div className="grid gap-6">
              {paginatedPosts.map((post) => {
                const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');
                return (
                  <Link href={`/blog/${post.slug}`} key={post.slug}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                            <CardDescription className="mb-0">
                              <div className="flex items-center">
                                <span>{formattedDate}</span>
                                <span className="mx-2">·</span>
                                <div className="flex items-center">
                                  <FaFolder className="h-5 w-5 text-gray-500" />
                                  <span className="ml-2">
                                    {post.tags.map((tag, index) => (
                                      <span key={tag}>
                                        <Link
                                          href={`/blog/tag/${encodeURIComponent(tag)}/1`}
                                          className="hover:underline"
                                        >
                                          {tag}
                                        </Link>
                                        {index < post.tags.length - 1 && ', '}
                                      </span>
                                    ))}
                                  </span>
                                </div>
                              </div>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="sticky bottom-0 bg-background py-4 z-10 mt-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-semibold rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary prose text-white dark:text-black hover:bg-primary-dark'
                  }`}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-semibold rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white dark:text-black hover:bg-primary-dark'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Tags */}
          <div className="hidden lg:block lg:w-1/4">
            <div
              className="sticky top-16 -mt-20"
              style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}
            >
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <Separator className="mb-4" />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    href={`/blog/tag/${encodeURIComponent(tag)}/1`}
                    key={tag}
                    className="cursor-pointer"
                  >
                    <Badge variant="outline" className="hover:bg-primary/10 hover:text-primary/80">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Tags */}
          <div className="lg:hidden -mt-10">
            <h2 className="text-xl font-semibold mb-4">Tags</h2>
            <Separator className="mb-4" />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  href={`/blog/tag/${encodeURIComponent(tag)}/1`}
                  key={tag}
                  className="cursor-pointer"
                >
                  <Badge variant="outline" className="hover:bg-primary/10 hover:text-primary/80">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
