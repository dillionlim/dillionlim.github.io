import { getPostsByTag, getAllTags } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';

const POSTS_PER_PAGE = 5;

export async function generateStaticParams() {
  const tags = await getAllTags();
  const paths = [];

  for (const tag of tags) {
    const posts = await getPostsByTag(tag);
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    for (let page = 1; page <= totalPages; page++) {
      paths.push({
        tag: tag,
        page: page.toString(),
      });
    }
  }

  return paths;
}

export default async function TagPage({
  params,
}: {
  params: { tag: string; page: string };
}) {
  const decodedTag = decodeURIComponent(params.tag);
  const page = parseInt(params.page, 10) || 1;
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="sticky top-16 py-8 bg-background w-full">
          <div className="flex px-4 justify-between items-center bg-background w-full">
            <h1 className="text-4xl font-bold">Tag: {decodedTag}</h1>
            <Link href="/blog">
              <button className="px-4 py-2 text-sm font-semibold bg-primary text-white dark:text-black rounded-md hover:bg-primary-dark">
                Back to Blog
              </button>
            </Link>
          </div>
          <div className="px-4 bg-background w-full">
            <p className="text-muted-foreground">
              {posts.length} post{posts.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-16 px-4">
          {paginatedPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                      <CardDescription>
                        {format(new Date(post.date), 'MMMM d, yyyy')}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="sticky bottom-0 bg-background py-4 z-10 mt-4">
          <div className="flex justify-between items-center">
            <Link
              href={page > 1 ? `/blog/tag/${params.tag}/${page - 1}` : "#"}
              passHref
            >
              <button
                disabled={page === 1}
                className={`px-4 py-2 text-sm font-semibold rounded-md flex items-center justify-center ${
                  page === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white dark:text-black hover:bg-primary-dark'
                }`}
              >
                <span className="material-icons">Previous</span>
              </button>
            </Link>

            <span className="text-center">
              Page {page} of {totalPages}
            </span>

            {/* Next Button */}
            <Link
              href={page < totalPages ? `/blog/tag/${params.tag}/${page + 1}` : "#"}
              passHref
            >
              <button
                disabled={page === totalPages}
                className={`px-4 py-2 text-sm font-semibold rounded-md flex items-center justify-center ${
                  page === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white dark:text-black hover:bg-primary-dark'
                }`}
              >
                <span className="material-icons">Next</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
