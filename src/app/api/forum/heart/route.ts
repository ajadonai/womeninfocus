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
    const { postId, action } = await request.json();

    if (!postId || typeof postId !== 'string') {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }
    if (action !== 'like' && action !== 'unlike') {
      return NextResponse.json({ error: 'action must be "like" or "unlike"' }, { status: 400 });
    }
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const client = getWriteClient();
    const delta = action === 'like' ? 1 : -1;

    // Patch the hearts count — floor at 0
    const result = await client
      .patch(postId)
      .inc({ hearts: delta })
      .commit();

    // Ensure hearts never goes negative
    const hearts = Math.max(0, result.hearts || 0);
    if (hearts !== result.hearts) {
      await client.patch(postId).set({ hearts: 0 }).commit();
    }

    return NextResponse.json({ success: true, hearts }, { status: 200 });
  } catch (error) {
    console.error('Heart toggle error:', error);
    return NextResponse.json({ error: 'Failed to update heart' }, { status: 500 });
  }
}
