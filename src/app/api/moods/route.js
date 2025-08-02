import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'moods.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(dataFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read mood data from file
const readMoodData = () => {
  try {
    ensureDataDir();
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading mood data:', error);
    return [];
  }
};

// Write mood data to file
const writeMoodData = (data) => {
  try {
    ensureDataDir();
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing mood data:', error);
    return false;
  }
};

// GET /api/moods - Retrieve all mood entries
export async function GET() {
  try {
    const moods = readMoodData();
    return NextResponse.json(moods);
  } catch (error) {
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

    const moods = readMoodData();
    moods.unshift(newMood); // Add to beginning of array
    
    if (writeMoodData(moods)) {
      return NextResponse.json(newMood, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save mood entry' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create mood entry' },
      { status: 500 }
    );
  }
} 