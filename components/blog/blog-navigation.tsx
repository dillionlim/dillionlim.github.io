'use client';

import Link from 'next/link';

export function BlogNavigation({
  prevPost,
  nextPost,
}: {
  prevPost: any | null;
  nextPost: any | null;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="sticky bottom-0 bg-white dark:bg-gray-900 shadow z-10">
      <div className="container mx-auto pt-4 px-6">
        <div className="flex flex-col items-center mb-4">
          <div className="flex justify-between w-full gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm md:text-base max-w-[45%]"
              >
                <span>&larr;</span>
                <span>{prevPost.title}</span>
              </Link>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed text-sm md:text-base max-w-[45%]"
              >
                <span>&larr;</span>
                <span>Previous</span>
              </button>
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm md:text-base max-w-[45%]"
              >
                <span>{nextPost.title}</span>
                <span>&rarr;</span>
              </Link>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed text-sm md:text-base max-w-[45%]"
              >
                <span>Next</span>
                <span>&rarr;</span>
              </button>
            )}
          </div>

          <div className="text-center mt-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Lim Dillion
          </div>
        </div>
      </div>
    </footer>
  );
}
