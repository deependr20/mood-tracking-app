import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'moods.json');

// Read mood data from file
const readMoodData = () => {
  try {
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
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing mood data:', error);
    return false;
  }
};

// DELETE /api/moods/[id] - Delete a specific mood entry
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const moods = readMoodData();
    
    const moodIndex = moods.findIndex(mood => mood.id === parseInt(id));
    
    if (moodIndex === -1) {
      return NextResponse.json(
        { error: 'Mood entry not found' },
        { status: 404 }
      );
    }
    
    const deletedMood = moods.splice(moodIndex, 1)[0];
    
    if (writeMoodData(moods)) {
      return NextResponse.json(deletedMood);
    } else {
      return NextResponse.json(
        { error: 'Failed to delete mood entry' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete mood entry' },
      { status: 500 }
    );
  }
} 