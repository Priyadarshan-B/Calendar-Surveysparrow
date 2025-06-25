import { useEvents } from "../utils/contexts/EventContext";
import { useRef, useState } from "react";
import { showSuccess, showError } from "../toast/toast";

export default function JsonUpload({ onSuccess }) {
  const { setAllEvents } = useEvents();
  const inputRef = useRef();
  const [showSample, setShowSample] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        setAllEvents(parsed);
        showSuccess("Events Added Successfully!");
        if (onSuccess) onSuccess();
      } else {
        showError("Invalid format");
      }
    } catch (err) {
      showError("Failed to load");
    }
  };

  const sampleJson = [
    {
      date: "2025-06-23",
      startTime: "09:00",
      endTime: "10:00",
      color: "#1E88E5",
      title: "Morning Briefing",
    },
    {
      date: "2025-06-23",
      startTime: "14:00",
      endTime: "15:30",
      color: "#43A047",
      title: "Client Meeting",
    },
  ];

  return (
    <div className="mb-3 max-w-xs">
      <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-200">
        Upload Events (.json)
      </label>
      <input
        type="file"
        accept=".json"
        ref={inputRef}
        onChange={handleFileChange}
        className="block w-full text-xs file:mr-2 file:py-1 file:px-3
               file:rounded file:border-0
               file:text-xs file:font-medium
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100
               dark:file:bg-gray-700 dark:file:text-gray-100
               dark:hover:file:bg-gray-600
               bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100
               border border-gray-300 dark:border-gray-600 rounded"
      />
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Only JSON files are supported.
      </p>

      <button
        onClick={() => setShowSample(!showSample)}
        className="mt-2 text-xs text-blue-600 dark:text-blue-400 underline focus:outline-none"
      >
        {showSample ? "Hide" : "Show"} Sample JSON
      </button>

      {showSample && (
        <pre className="mt-2 p-2 text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded overflow-auto max-h-60">
{`[
  {
    "date": "2025-06-23",
    "startTime": "09:00",
    "endTime": "10:00",
    "color": "#1E88E5",
    "title": "Morning Briefing"
  },
  {
    "date": "2025-06-23",
    "startTime": "14:00",
    "endTime": "15:30",
    "color": "#43A047",
    "title": "Client Meeting"
  }
]`}
        </pre>
      )}
    </div>
  );
}
