'use client';

import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import katex from 'katex';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function BlogPostContent({ post, htmlContent }: { post: any; htmlContent: string }) {
  const [readingTime, setReadingTime] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const calculateReadingTime = () => {
      const text = new DOMParser().parseFromString(htmlContent, 'text/html').body.textContent || '';
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      const wordsPerMinute = 200;
      const time = Math.ceil(wordCount / wordsPerMinute);

      setReadingTime(time);
    };

    calculateReadingTime();
  }, [htmlContent]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      hljs.highlightAll();
      const mathElementsInline = document.querySelectorAll("span.math.inline");
      const mathElementsDisplay = document.querySelectorAll("span.math.display");
      mathElementsInline.forEach((el) => {
        try {
          const mathContent = el.innerHTML.trim();
          const cleanMath = mathContent.replace(/^\\\(/, '')
          .replace(/\\\)$/, '')
          .replace(/^\\\[/, '') 
          .replace(/\\\]$/, '');

          const element = el as HTMLElement;
          katex.render(cleanMath, element, {
            throwOnError: false,
          });

          element.style.zIndex = "1";
        } catch (error) {
          console.error("KaTeX rendering error:", error);
        }
      });
      mathElementsDisplay.forEach((el) => {
        try {
          const mathContent = el.innerHTML.trim();
          const cleanMath = mathContent.replace(/^\\\(/, '')
          .replace(/\\\)$/, '')
          .replace(/^\\\[/, '') 
          .replace(/\\\]$/, '');

          const element = el as HTMLElement;
          katex.render(cleanMath, element, {
            throwOnError: false,
            displayMode: true,
          });

          element.style.zIndex = "1";
        } catch (error) {
          console.error("KaTeX rendering error:", error);
        }
      });
    }
  }, [htmlContent, readingTime, theme]);

  useEffect(() => {
    const link = document.getElementById('hljs-theme') as HTMLLinkElement;
    if (link) {
      link.href =
        theme === 'dark'
          ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/dark.min.css'
          : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css';
    }
  }, [theme]);

  return (
    <main className="container mx-auto px-4">
      <link
        id="hljs-theme"
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css"
      />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css" />
      <div className="sticky top-16 py-4 bg-background w-full mt-16 z-10">
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <div className="flex justify-between items-center bg-background w-full">
            <h1 className="text-xl sm:text-5xl font-bold pt-2 mb-2">{post.title}</h1>
            <Link href="/blog">
              <button className="px-4 py-2 text-sm font-semibold bg-primary text-white dark:text-black rounded-md hover:bg-primary-dark">
                Back to Blog
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
            <time>{format(new Date(post.date), 'MMM d, yyyy')}</time>
            <span>·</span>
            <span>{readingTime ? `${readingTime} min read` : '1 min read'}</span>
            <span>·</span>
            <div className="flex gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </main>
  );
}
