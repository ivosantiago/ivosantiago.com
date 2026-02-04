import { type Metadata } from 'next';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Card } from '@/components/Card';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on software development, technology, and life.',
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <SimpleLayout
      title="Blog"
      intro="Thoughts on software development, technology, and life."
    >
      {posts.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((post) => (
              <article key={post.slug} className="md:grid md:grid-cols-4 md:items-baseline">
                <Card className="md:col-span-3">
                  <Card.Title href={`/blog/${post.slug}`}>
                    {post.title}
                  </Card.Title>
                  <Card.Eyebrow
                    as="time"
                    dateTime={post.date}
                    className="md:hidden"
                    decorate
                  >
                    {formatDate(post.date)}
                  </Card.Eyebrow>
                  {post.description && (
                    <Card.Description>{post.description}</Card.Description>
                  )}
                  <Card.Cta>Read post</Card.Cta>
                </Card>
                <Card.Eyebrow
                  as="time"
                  dateTime={post.date}
                  className="mt-1 hidden md:block"
                >
                  {formatDate(post.date)}
                </Card.Eyebrow>
              </article>
            ))}
          </div>
        </div>
      )}
    </SimpleLayout>
  );
}
