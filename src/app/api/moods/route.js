import { NextResponse } from 'next/server';
import { createClient } from 'redis';

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL
});

// Connect to Redis
redis.connect().catch(console.error);

// GET /api/moods - Retrieve all mood entries
export async function GET() {
  try {
    const moods = await redis.get('moods');
    return NextResponse.json(moods ? JSON.parse(moods) : []);
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

    const moods = await redis.get('moods');
    const moodArray = moods ? JSON.parse(moods) : [];
    moodArray.unshift(newMood); // Add to beginning of array
    
    await redis.set('moods', JSON.stringify(moodArray));
    
    return NextResponse.json(newMood, { status: 201 });
  } catch (error) {
    console.error('Error creating mood entry:', error);
    return NextResponse.json(
      { error: 'Failed to create mood entry' },
      { status: 500 }
    );
  }
} 