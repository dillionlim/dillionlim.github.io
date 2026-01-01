import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { Calendar, Tag, ArrowLeft, ArrowRight, Clock, Loader2, AlertCircle, Filter } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="markdown-body text-slate-700 dark:text-slate-300">
      <ReactMarkdown
        remarkPlugins={[
          [remarkMath, { singleDollarTextMath: true }],
          remarkGfm
        ]}
        rehypePlugins={[
            [rehypeKatex, { 
                strict: false,
                trust: true,
                throwOnError: false
            }], 
            rehypeHighlight, 
            rehypeRaw
        ]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-white" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-white" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-5 mb-2 text-slate-900 dark:text-white" {...props} />,
          h4: ({node, ...props}) => <h4 className="text-lg font-bold mt-4 mb-2 text-slate-900 dark:text-white" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
          a: ({node, ...props}) => <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-slate-600 dark:text-slate-400" {...props} />,
          code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <code className={`${className} block overflow-x-auto rounded-lg p-4 my-4 bg-[#0d1117]`} {...props}>
                {children}
              </code>
            ) : (
              <code className="bg-gray-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200" {...props}>
                {children}
              </code>
            );
          },
          img: ({node, ...props}) => (
            <span className="block my-6 text-center">
                <img 
                    className="rounded-lg shadow-md max-w-full h-auto mx-auto dark:bg-white/90" 
                    {...props} 
                    alt={props.alt || ''}
                />
            </span>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const POSTS_PER_PAGE = 5;

// --- Main Component ---

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Initial Fetch of Post Index with Fallback
  useEffect(() => {
    fetch('/posts.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load post index');
        return res.json();
      })
      .then((data: BlogPost[]) => {
        const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sorted);
        setIsLoading(false);
      })
      .catch(err => {
        console.warn("Index fetch error:", err);
        // Fallback to static constants if JSON index is missing (e.g. dev environment)
        // const sorted = staticBlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        // setPosts(sorted);
        setIsLoading(false);
        setError(null); 
      });
  }, []);

  // Reset pagination when tag filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  // Fetch individual post content
  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      setError(null);
      
      // 1. If content is already present (from static constants), use it directly
      if (selectedPost.content) {
          setPostContent(selectedPost.content);
          setIsLoading(false);
          return;
      }

      // 2. Otherwise, fetch from path
      const path = selectedPost.path || `/content/${selectedPost.id}.md`;

      fetch(path)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load post file: ${path}`);
          return res.text();
        })
        .then(text => {
          // Remove Frontmatter
          const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---/, '').trim();
          setPostContent(contentWithoutFrontmatter);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Content fetch error:", err);
          setError(`Could not load article content. ${err.message}`);
          setIsLoading(false);
        });
    }
  }, [selectedPost]);

  const allTags = ['All', ...Array.from(new Set(posts.flatMap(post => post.tags)))];
  
  const filteredPosts = activeTag === 'All' 
    ? posts 
    : posts.filter(post => post.tags.includes(activeTag));

  // Pagination Logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of list
    const element = document.getElementById('blog-posts-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (selectedPost) {
    const currentIndex = filteredPosts.findIndex(p => p.id === selectedPost.id);
    const nextPost = currentIndex > 0 ? filteredPosts[currentIndex - 1] : null;
    const prevPost = currentIndex < filteredPosts.length - 1 ? filteredPosts[currentIndex + 1] : null;

    return (
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-500 mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Articles
        </button>
        
        <article>
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{selectedPost.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
              <span className="flex items-center gap-1"><Calendar size={14} /> {selectedPost.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
            </div>
          </header>
          
          <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-2xl p-8 md:p-12 shadow-sm min-h-[400px]">
             {isLoading ? (
                 <div className="flex flex-col items-center justify-center h-48 space-y-4">
                     <Loader2 className="animate-spin text-blue-500" size={32} />
                     <p className="text-slate-500">Loading article...</p>
                 </div>
             ) : error ? (
                 <div className="flex flex-col items-center justify-center h-48 text-red-500 space-y-2">
                     <AlertCircle size={32} />
                     <p className="font-semibold">Error Loading Post</p>
                     <p className="text-sm">{error}</p>
                 </div>
             ) : (
                 <MarkdownRenderer content={postContent} />
             )}
          </div>

          <div className="mt-8 flex gap-2">
            {selectedPost.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Tag size={12} /> {tag}
                </span>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-gray-200 dark:border-darkborder">
            {prevPost ? (
              <button
                onClick={() => {
                  setSelectedPost(prevPost);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-start gap-1 text-left max-w-[45%]"
              >
                <span className="text-sm text-slate-500 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                  <ArrowLeft size={14} /> Previous Post
                </span>
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </button>
            ) : (
               <div />
            )}

            {nextPost ? (
              <button
                onClick={() => {
                  setSelectedPost(nextPost);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-end gap-1 text-right max-w-[45%]"
              >
                <span className="text-sm text-slate-500 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                  Next Post <ArrowRight size={14} />
                </span>
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </button>
            ) : (
               <div />
            )}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Blog</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Thoughts on software engineering and mathematics.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-start">
        
        {/* Sidebar / Filters */}
        {!isLoading && !error && posts.length > 0 && (
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 mb-8 lg:mb-0">
             <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Filter size={16} />
                  Filter by Topic
                </h3>
                <div className="flex flex-row lg:flex-col flex-wrap gap-2">
                    {allTags.map(tag => (
                    <button 
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left flex justify-between items-center w-auto lg:w-full ${
                            activeTag === tag 
                            ? 'bg-blue-500 text-white shadow-md' 
                            : 'bg-gray-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                        }`}
                    >
                        <span>{tag}</span>
                    </button>
                    ))}
                </div>
             </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 w-full min-w-0">
            {isLoading && posts.length === 0 ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-blue-500" size={32} />
                </div>
            ) : error && posts.length === 0 ? (
                <div className="text-center p-12 text-slate-500 bg-gray-100 dark:bg-darkcard rounded-xl">
                    <AlertCircle className="mx-auto mb-4 text-amber-500" size={32} />
                    <p className="font-medium mb-2">No posts found.</p>
                    <p className="text-sm">Please run <code>node scripts/generate-content.js</code> to build the index.</p>
                </div>
            ) : (
                <div id="blog-posts-list" className="grid gap-6">
                {paginatedPosts.length > 0 ? (
                    <>
                    {paginatedPosts.map(post => (
                    <div 
                        key={post.id} 
                        onClick={() => setSelectedPost(post)}
                        className="group bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 md:p-8 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                            {post.title}
                        </h2>
                        <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{post.date}</span>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                        {post.excerpt || "Click to read more..."}
                        </p>

                        <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            {post.tags && post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded font-medium">
                                {tag}
                            </span>
                            ))}
                        </div>
                        <span className="text-blue-500 font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                            Read Article &rarr;
                        </span>
                        </div>
                    </div>
                    ))}
                    
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-8 pt-4">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-lg border border-gray-200 dark:border-darkborder ${
                            currentPage === 1 
                              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' 
                              : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-500'
                          }`}
                        >
                          <ArrowLeft size={20} />
                        </button>
                        
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          Page {currentPage} of {totalPages}
                        </span>

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-lg border border-gray-200 dark:border-darkborder ${
                            currentPage === totalPages
                              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' 
                              : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-500'
                          }`}
                        >
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    )}
                    </>
                ) : (
                    <div className="text-center py-12 text-slate-500 bg-white dark:bg-darkcard rounded-xl border border-gray-200 dark:border-darkborder">
                        <p className="mb-2">No posts found with tag "{activeTag}"</p>
                        <button onClick={() => setActiveTag('All')} className="text-blue-500 hover:underline text-sm font-medium">Clear filter</button>
                    </div>
                )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
