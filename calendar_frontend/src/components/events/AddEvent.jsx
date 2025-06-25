import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { showSuccess, showError, showWarning } from '../toast/toast';

const colorOptions = [
  { name: 'Blue', value: '#2563EB', className: 'bg-blue-600' },
  { name: 'Green', value: '#16A34A', className: 'bg-green-600' }, 
  { name: 'Red', value: '#DC2626', className: 'bg-red-600' },     
  { name: 'Yellow', value: '#CA8A04', className: 'bg-yellow-600' },
  { name: 'Purple', value: '#7C3AED', className: 'bg-purple-600' },
  { name: 'Indigo', value: '#4338CA', className: 'bg-indigo-600' }, 
];

export default function AddEventForm({ defaultDate = dayjs().format('YYYY-MM-DD'), onSuccess }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [color, setColor] = useState(colorOptions[0].value);

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !startTime || !endTime || !color) {
      showWarning("Please fill in all fields.")
      return;
    }

    const startDateTime = dayjs(`${date}T${startTime}`);
    const endDateTime = dayjs(`${date}T${endTime}`);

    if (endDateTime.isBefore(startDateTime) || endDateTime.isSame(startDateTime)) {
    //   alert('End time must be after start time.');
      showWarning("End time must be after start time.")

      return;
    }

    const newEvent = {
      id: dayjs().valueOf(), 
      date,
      startTime,
      endTime,
      color,
      title,
    };

    try {
      const stored = localStorage.getItem("custom-events");
      let currentEvents = [];
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            currentEvents = parsed;
          }
        } catch (err) {
          console.warn("Error parsing existing events from localStorage:", err);
        }
      }

      const updatedEvents = [...currentEvents, newEvent];
      localStorage.setItem("custom-events", JSON.stringify(updatedEvents));

      onSuccess(newEvent);
      showSuccess("Event Added Successfully")
      setTitle('');
      setDate(defaultDate); 
      setStartTime('09:00');
      setEndTime('10:00');
      setColor(colorOptions[0].value);

    } catch (err) {
      console.error("Error saving event to localStorage:", err);
      showError("Failed to Add Events")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 dark:text-gray-200">
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Add New Event</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Event Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium mb-1">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium mb-1">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium mb-1">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-8 h-8 rounded-full border-2 ${option.className} ${
                color === option.value
                  ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: option.value }}
              onClick={() => setColor(option.value)}
              title={option.name}
            ></button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Add Event
      </button>
    </form>
  );
}