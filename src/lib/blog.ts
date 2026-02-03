import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export async function ensureContentDir(): Promise<void> {
  try {
    await fs.access(CONTENT_DIR);
  } catch {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
  }
}

export async function getAllPosts(includeUnpublished = false): Promise<BlogPostMeta[]> {
  await ensureContentDir();

  try {
    const files = await fs.readdir(CONTENT_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const slug = file.replace(/\.md$/, '');
        const post = await getPost(slug);
        if (!post) return null;

        const { content: _content, ...meta } = post;
        void _content;
        return meta;
      })
    );

    return posts
      .filter((post): post is BlogPostMeta => post !== null)
      .filter(post => includeUnpublished || post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  await ensureContentDir();

  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      published: data.published ?? false,
      content,
    };
  } catch {
    return null;
  }
}

export async function savePost(post: BlogPost): Promise<void> {
  await ensureContentDir();

  const filePath = path.join(CONTENT_DIR, `${post.slug}.md`);

  const frontmatter = {
    title: post.title,
    description: post.description,
    date: post.date,
    published: post.published,
  };

  const fileContent = matter.stringify(post.content, frontmatter);
  await fs.writeFile(filePath, fileContent, 'utf-8');
}

export async function deletePost(slug: string): Promise<void> {
  await ensureContentDir();

  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  await fs.unlink(filePath);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}
