import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// GET /api/moods - Retrieve all mood entries
export async function GET() {
  try {
    const moods = await kv.get('moods') || [];
    return NextResponse.json(moods);
  } catch (error) {
    console.error('Error fetching moods:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mood entries' },
      { status: 500 }
    );
  }
}

// POST /api/moods - Create a new mood entry
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.type || body.moodLevel === undefined || !body.date || !body.time) {
      return NextResponse.json(
        { error: 'Missing required fields: type, moodLevel, date, time' },
        { status: 400 }
      );
    }

    const newMood = {
      id: Date.now(),
      type: body.type,
      moodLevel: body.moodLevel,
      moodEmoji: body.moodEmoji,
      moodLabel: body.moodLabel,
      date: body.date,
      time: body.time,
      timestamp: new Date().toISOString()
    };

    const moods = await kv.get('moods') || [];
    moods.unshift(newMood); // Add to beginning of array

    await kv.set('moods', moods);

    return NextResponse.json(newMood, { status: 201 });
  } catch (error) {
    console.error('Error creating mood entry:', error);
    return NextResponse.json(
      { error: 'Failed to create mood entry' },
      { status: 500 }
    );
  }
} 