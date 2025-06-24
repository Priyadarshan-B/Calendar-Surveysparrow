export default function CustomPopup({ isOpen, onClose, day, events }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg w-96 max-w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
          Events on {day.format("MMMM D, YYYY")}
        </h2>

        {events.length === 0 ? (
          <p className="text-sm text-gray-500">No events on this day.</p>
        ) : (
          <ul className="space-y-3">
            {events.map((event, idx) => (
              <li key={idx} className="border border-gray-300 dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-800">
                <div className="font-semibold text-blue-500 dark:text-blue-300">
                  {event.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {event.startTime} - {event.endTime}
                </div>
                {event.description && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {event.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}