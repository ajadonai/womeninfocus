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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, story, displayName, topic } = body;

    // Validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!story || typeof story !== 'string' || story.trim().length < 20) {
      return NextResponse.json({ error: 'Story must be at least 20 characters' }, { status: 400 });
    }
    if (title.length > 100) {
      return NextResponse.json({ error: 'Title must be 100 characters or less' }, { status: 400 });
    }
    if (story.length > 2000) {
      return NextResponse.json({ error: 'Story must be 2000 characters or less' }, { status: 400 });
    }

    const validTopics = ['Salary', 'AI Tools', 'Strategy', 'Global', 'Support', 'Research'];
    if (!topic || !validTopics.includes(topic)) {
      return NextResponse.json({ error: 'Invalid topic' }, { status: 400 });
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Server not configured for submissions' }, { status: 500 });
    }

    // Create as draft in Sanity — Amala publishes from Studio
    const doc = await getWriteClient().create({
      _type: 'forumPost',
      title: title.trim(),
      body: story.trim(),
      displayName: displayName?.trim() || 'Anonymous',
      tag: topic,
      hearts: 0,
      publishedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: doc._id }, { status: 201 });
  } catch (error) {
    console.error('Forum submission error:', error);
    return NextResponse.json({ error: 'Failed to submit story' }, { status: 500 });
  }
}
