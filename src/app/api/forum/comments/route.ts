import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

function getWriteClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
}

function getReadClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }

    const comments = await getReadClient().fetch(
      `*[_type == "forumComment" && post._ref == $postId] | order(createdAt asc) {
        _id,
        displayName,
        body,
        createdAt
      }`,
      { postId }
    );

    return NextResponse.json({ comments: comments || [] }, { status: 200 });
  } catch (error) {
    console.error('Comments fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { postId, body, displayName } = await request.json();

    if (!postId || typeof postId !== 'string') {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }
    if (!body || typeof body !== 'string' || body.trim().length < 2) {
      return NextResponse.json({ error: 'Comment must be at least 2 characters' }, { status: 400 });
    }
    if (body.length > 1000) {
      return NextResponse.json({ error: 'Comment must be 1000 characters or less' }, { status: 400 });
    }
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    // Auto-publish comments (no moderation)
    const doc = await getWriteClient().create({
      _type: 'forumComment',
      post: { _type: 'reference', _ref: postId },
      displayName: displayName?.trim() || 'Anonymous',
      body: body.trim(),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      comment: {
        _id: doc._id,
        displayName: doc.displayName,
        body: doc.body,
        createdAt: doc.createdAt,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Comment submission error:', error);
    return NextResponse.json({ error: 'Failed to submit comment' }, { status: 500 });
  }
}
