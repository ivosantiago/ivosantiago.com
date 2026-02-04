import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, savePost, generateSlug } from '@/lib/blog';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

    // Only include unpublished posts if authenticated
    if (includeUnpublished) {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const posts = await getAllPosts(includeUnpublished);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, content, published } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    const post = {
      slug,
      title,
      description: description || '',
      date: new Date().toISOString(),
      published: published ?? false,
      content: content || '',
    };

    await savePost(post);

    return NextResponse.json({ slug });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
