import { useEvents } from "../utils/contexts/EventContext";
import { useRef } from "react";
import { showSuccess, showError } from "../toast/toast";

export default function JsonUpload() {
  const { updateEvents } = useEvents();
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        updateEvents(parsed);
        showSuccess("Events Added Successfully!");
      } else {
        showError("Invalid format");
      }
    } catch (err) {
      showError("Failed to load");
    }
  };

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
    </div>
  );
}
