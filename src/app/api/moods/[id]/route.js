import { NextResponse } from 'next/server';
import { createClient } from 'redis';

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL
});

// Connect to Redis
redis.connect().catch(console.error);

// DELETE /api/moods/[id] - Delete a specific mood entry
export async function DELETE(request, { params }) {
  try {
    const moodId = parseInt(params.id);

    const moods = await redis.get('moods');
    const moodArray = moods ? JSON.parse(moods) : [];
    const updatedMoods = moodArray.filter(mood => mood.id !== moodId);

    if (moodArray.length === updatedMoods.length) {
      return NextResponse.json(
        { error: 'Mood entry not found' },
        { status: 404 }
      );
    }

    await redis.set('moods', JSON.stringify(updatedMoods));

    return NextResponse.json(
      { message: 'Mood entry deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting mood entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete mood entry' },
      { status: 500 }
    );
  }
} 