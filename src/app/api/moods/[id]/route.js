import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// DELETE /api/moods/[id] - Delete a specific mood entry
export async function DELETE(request, { params }) {
  try {
    const moodId = parseInt(params.id);

    const moods = await kv.get('moods') || [];
    const updatedMoods = moods.filter(mood => mood.id !== moodId);

    if (moods.length === updatedMoods.length) {
      return NextResponse.json(
        { error: 'Mood entry not found' },
        { status: 404 }
      );
    }

    await kv.set('moods', updatedMoods);

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