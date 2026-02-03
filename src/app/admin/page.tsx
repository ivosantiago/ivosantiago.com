'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
}

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog?includeUnpublished=true');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Admin Dashboard
        </h1>
        <Button onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            Blog Posts
          </h2>
          <Button href="/admin/posts/new">New Post</Button>
        </div>

        {loading ? (
          <div className="mt-6 text-zinc-600 dark:text-zinc-400">
            Loading...
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-6 text-zinc-600 dark:text-zinc-400">
            No posts yet. Create your first post!
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/posts/${post.slug}`}
                        className="text-lg font-medium text-zinc-800 hover:text-teal-500 dark:text-zinc-100 dark:hover:text-teal-400"
                      >
                        {post.title}
                      </Link>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          post.published
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    {post.description && (
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {post.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                      {formatDate(post.date)}
                    </p>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <Button
                      href={`/admin/posts/${post.slug}`}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
