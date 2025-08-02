'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, User, Clock, Calendar, X, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, addDays } from 'date-fns';

// Mood data structure
const moodLevels = [
  { level: 5, emoji: '😊', label: 'Happy' },
  { level: 4, emoji: '🙂', label: 'Content' },
  { level: 3, emoji: '😐', label: 'Neutral' },
  { level: 2, emoji: '😥', label: 'Stressed' },
  { level: 1, emoji: '😔', label: 'Sad' },
  { level: 0, emoji: '😡', label: 'Angry' }
];

const moodTypes = [
  { id: 'daily', label: 'Daily Check-in', color: '#10B981' },
  { id: 'meditation', label: 'After Meditation', color: '#F59E0B' },
  { id: 'workout', label: 'After Workout', color: '#06B6D4' }
];

export default function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [selectedMoodType, setSelectedMoodType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(format(new Date(), 'HH:mm'));
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedView, setSelectedView] = useState('mood');

  // Load mood entries from API on component mount
  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const response = await fetch('/api/moods');
        if (response.ok) {
          const data = await response.json();
          setMoodEntries(data);
        }
      } catch (error) {
        console.error('Failed to fetch mood entries:', error);
        // Add sample data for demonstration if API fails
        const sampleData = [
          {
            id: 1,
            type: 'daily',
            moodLevel: 1,
            moodEmoji: '😔',
            moodLabel: 'Sad',
            date: '2025-01-20T00:00:00.000Z',
            time: '09:00',
            timestamp: '2025-01-20T09:00:00.000Z'
          },
          {
            id: 2,
            type: 'daily',
            moodLevel: 3,
            moodEmoji: '😐',
            moodLabel: 'Neutral',
            date: '2025-01-21T00:00:00.000Z',
            time: '09:00',
            timestamp: '2025-01-21T09:00:00.000Z'
          },
          {
            id: 3,
            type: 'daily',
            moodLevel: 2,
            moodEmoji: '😥',
            moodLabel: 'Stressed',
            date: '2025-01-22T00:00:00.000Z',
            time: '09:00',
            timestamp: '2025-01-22T09:00:00.000Z'
          },
          {
            id: 4,
            type: 'daily',
            moodLevel: 2,
            moodEmoji: '😥',
            moodLabel: 'Stressed',
            date: '2025-01-23T00:00:00.000Z',
            time: '09:00',
            timestamp: '2025-01-23T09:00:00.000Z'
          },
          {
            id: 5,
            type: 'daily',
            moodLevel: 3,
            moodEmoji: '😐',
            moodLabel: 'Neutral',
            date: '2025-01-24T00:00:00.000Z',
            time: '09:00',
            timestamp: '2025-01-24T09:00:00.000Z'
          },
          {
            id: 6,
            type: 'daily',
            moodLevel: 4,
            moodEmoji: '🙂',
            moodLabel: 'Content',
            date: '2025-01-25T00:00:00.000Z',
            time: '09:00',
            timestamp: '2025-01-25T09:00:00.000Z'
          },
          {
            id: 7,
            type: 'daily',
            moodLevel: 4,
            moodEmoji: '🙂',
            moodLabel: 'Content',
            date: '2025-01-26T00:00:00.000Z',
            time: '09:00',
            timestamp: '2025-01-26T09:00:00.000Z'
          },
          {
            id: 8,
            type: 'meditation',
            moodLevel: 3,
            moodEmoji: '😐',
            moodLabel: 'Neutral',
            date: '2025-01-20T00:00:00.000Z',
            time: '08:00',
            timestamp: '2025-01-20T08:00:00.000Z'
          },
          {
            id: 9,
            type: 'meditation',
            moodLevel: 5,
            moodEmoji: '😊',
            moodLabel: 'Happy',
            date: '2025-01-21T00:00:00.000Z',
            time: '08:00',
            timestamp: '2025-01-21T08:00:00.000Z'
          },
          {
            id: 10,
            type: 'meditation',
            moodLevel: 2,
            moodEmoji: '😥',
            moodLabel: 'Stressed',
            date: '2025-01-22T00:00:00.000Z',
            time: '08:00',
            timestamp: '2025-01-22T08:00:00.000Z'
          },
          {
            id: 11,
            type: 'meditation',
            moodLevel: 5,
            moodEmoji: '😊',
            moodLabel: 'Happy',
            date: '2025-01-23T00:00:00.000Z',
            time: '08:00',
            timestamp: '2025-01-23T08:00:00.000Z'
          },
          {
            id: 12,
            type: 'meditation',
            moodLevel: 5,
            moodEmoji: '😊',
            moodLabel: 'Happy',
            date: '2025-01-24T00:00:00.000Z',
            time: '08:00',
            timestamp: '2025-01-24T08:00:00.000Z'
          },
          {
            id: 13,
            type: 'meditation',
            moodLevel: 5,
            moodEmoji: '😊',
            moodLabel: 'Happy',
            date: '2025-01-25T00:00:00.000Z',
            time: '08:00',
            timestamp: '2025-01-25T08:00:00.000Z'
          },
          {
            id: 14,
            type: 'meditation',
            moodLevel: 5,
            moodEmoji: '😊',
            moodLabel: 'Happy',
            date: '2025-01-26T00:00:00.000Z',
            time: '08:00',
            timestamp: '2025-01-26T08:00:00.000Z'
          },
          {
            id: 15,
            type: 'workout',
            moodLevel: 4,
            moodEmoji: '🙂',
            moodLabel: 'Content',
            date: '2025-01-20T00:00:00.000Z',
            time: '18:00',
            timestamp: '2025-01-20T18:00:00.000Z'
          },
          {
            id: 16,
            type: 'workout',
            moodLevel: 3,
            moodEmoji: '😐',
            moodLabel: 'Neutral',
            date: '2025-01-21T00:00:00.000Z',
            time: '18:00',
            timestamp: '2025-01-21T18:00:00.000Z'
          },
          {
            id: 17,
            type: 'workout',
            moodLevel: 3,
            moodEmoji: '😐',
            moodLabel: 'Neutral',
            date: '2025-01-22T00:00:00.000Z',
            time: '18:00',
            timestamp: '2025-01-22T18:00:00.000Z'
          },
          {
            id: 18,
            type: 'workout',
            moodLevel: 4,
            moodEmoji: '🙂',
            moodLabel: 'Content',
            date: '2025-01-23T00:00:00.000Z',
            time: '18:00',
            timestamp: '2025-01-23T18:00:00.000Z'
          },
          {
            id: 19,
            type: 'workout',
            moodLevel: 4,
            moodEmoji: '🙂',
            moodLabel: 'Content',
            date: '2025-01-24T00:00:00.000Z',
            time: '18:00',
            timestamp: '2025-01-24T18:00:00.000Z'
          },
          {
            id: 20,
            type: 'workout',
            moodLevel: 5,
            moodEmoji: '😊',
            moodLabel: 'Happy',
            date: '2025-01-25T00:00:00.000Z',
            time: '18:00',
            timestamp: '2025-01-25T18:00:00.000Z'
          },
          {
            id: 21,
            type: 'workout',
            moodLevel: 4,
            moodEmoji: '🙂',
            moodLabel: 'Content',
            date: '2025-01-26T00:00:00.000Z',
            time: '18:00',
            timestamp: '2025-01-26T18:00:00.000Z'
          }
        ];
        setMoodEntries(sampleData);
      }
    };

    fetchMoodEntries();
  }, []);

  // Generate week data
  const generateWeekData = () => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return days.map((day, index) => {
      const date = addDays(startDate, index);
      const dayEntries = moodEntries.filter(entry =>
        format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );

      const data = {
        day,
        date: format(date, 'MMM dd'),
        daily: null,
        meditation: null,
        workout: null
      };

      dayEntries.forEach(entry => {
        data[entry.type] = entry.moodLevel;
      });

      return data;
    });
  };

  const handleMoodSelection = async (moodLevel) => {
    const newEntry = {
      type: selectedMoodType,
      moodLevel,
      moodEmoji: moodLevels.find(m => m.level === moodLevel)?.emoji,
      moodLabel: moodLevels.find(m => m.level === moodLevel)?.label,
      date: selectedDate.toISOString(),
      time: selectedTime
    };

    try {
      const response = await fetch('/api/moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        const savedEntry = await response.json();
        setMoodEntries(prev => [savedEntry, ...prev]);
        setShowMoodDialog(false);
        setSelectedMoodType('');
      } else {
        console.error('Failed to save mood entry');
      }
    } catch (error) {
      console.error('Error saving mood entry:', error);
    }
  };

  const openMoodDialog = (type) => {
    setSelectedMoodType(type);
    setShowMoodDialog(true);
  };

  const getMoodTypeLabel = (type) => {
    return moodTypes.find(t => t.id === type)?.label || type;
  };

  const formatEntryDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, dd MMM yyyy');
  };

  const formatEntryTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  const handleDeleteMood = async (moodId) => {
    try {
      const response = await fetch(`/api/moods/${moodId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMoodEntries(prev => prev.filter(entry => entry.id !== moodId));
      } else {
        console.error('Failed to delete mood entry');
      }
    } catch (error) {
      console.error('Error deleting mood entry:', error);
    }
  };

  const weekData = generateWeekData();

  // Custom dot to show emoji on each point
  const renderCustomDot = (typeId) => (props) => {
    const { cx, cy, value } = props;
    if (value == null) return null;
    const mood = moodLevels.find(m => m.level === value);
    return (
      <g>
        <circle cx={cx} cy={cy} r={14} fill="white" stroke="#ddd" strokeWidth={2} />
        <text x={cx} y={cy + 6} textAnchor="middle" fontSize="18">
          {mood?.emoji}
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold">Mood Trends</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => openMoodDialog('daily')}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation/Filters */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${selectedView === 'mood' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                onClick={() => setSelectedView('mood')}
              >
                Mood
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${selectedView === 'activity' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                onClick={() => setSelectedView('activity')}
              >
                Activity
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Period</span>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${selectedPeriod === 'week' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                onClick={() => setSelectedPeriod('week')}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${selectedPeriod === 'month' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                onClick={() => setSelectedPeriod('month')}
              >
                Month
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Mood Trend Graph */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Mood Trends</h2>

          {/* Y-axis labels and Chart */}
          <div className="flex mb-4">
            {/* Y-axis labels on the left */}
            <div className="w-20 flex-shrink-0 mr-4">
              {moodLevels.map((mood) => (
                <div key={mood.level} className="flex items-center h-8 text-sm text-gray-600">
                  <span className="mr-2">{mood.emoji}</span>
                  <span>{mood.label}</span>
                </div>
              ))}
            </div>

            {/* Chart on the right */}
            <div className="flex-1 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weekData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    hide={true}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-medium text-gray-900">{label}</p>
                            {payload.map((entry, index) => {
                              const mood = moodLevels.find(m => m.level === entry.value);
                              return (
                                <p key={index} className="text-sm font-medium flex items-center" style={{ color: entry.color }}>
                                  <span style={{ fontSize: 18, marginRight: 6 }}>{mood?.emoji}</span>
                                  {moodTypes.find(t => t.id === entry.dataKey)?.label}: {mood?.label}
                                </p>
                              );
                            })}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {moodTypes.map((type) => (
                    <Line
                      key={type.id}
                      type="monotone"
                      dataKey={type.id}
                      stroke={type.color}
                      strokeWidth={3}
                      dot={renderCustomDot(type.id)}
                      activeDot={{ r: 18, stroke: type.color, strokeWidth: 3 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-8 mt-6">
            {moodTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-sm font-medium text-gray-700">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Quick Add Mood</h3>
          <div className="flex space-x-4">
            {moodTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => openMoodDialog(type.id)}
                className="flex-1 py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {type.id === 'daily' && '📝'}
                    {type.id === 'meditation' && '🧘'}
                    {type.id === 'workout' && '💪'}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{type.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Entries */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Mood Entries</h2>
          {moodEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">😊</div>
              <p>No mood entries yet. Start tracking your mood!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {moodEntries.slice(0, 10).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{entry.moodEmoji}</span>
                    <div>
                      <div className="font-medium">
                        {getMoodTypeLabel(entry.type)}: {entry.moodLabel}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatEntryDate(entry.date)} • {formatEntryTime(entry.time)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMood(entry.id)}
                    className="p-2 hover:bg-red-100 rounded-full text-red-500 hover:text-red-700 transition-colors"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mood Selection Dialog */}
      {showMoodDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-[90vw]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Excellent!</h3>
              <button
                onClick={() => setShowMoodDialog(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              How are you feeling after {selectedMoodType === 'daily' ? 'today' :
                selectedMoodType === 'meditation' ? 'meditation/yoga' : 'workout'}?
            </p>

            {/* Date and Time Selection */}
            <div className="mb-6 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={format(selectedDate, 'yyyy-MM-dd')}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Mood Selection Grid */}
            <div className="grid grid-cols-3 gap-3">
              {moodLevels.map((mood) => (
                <button
                  key={mood.level}
                  onClick={() => handleMoodSelection(mood.level)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-2xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
