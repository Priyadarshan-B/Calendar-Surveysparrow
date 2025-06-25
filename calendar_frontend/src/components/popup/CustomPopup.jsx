import { useEffect, useRef, useState, useCallback } from "react";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import { showSuccess } from "../toast/toast";
import AddEventForm from "../events/AddEvent";
import { useEvents } from "../utils/contexts/EventContext";

export default function CustomPopup({ isOpen, onClose, day, children }) {
  const [show, setShow] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const popupRef = useRef(null);
  const { events, addEvent, deleteEvent } = useEvents();

  const handleEventFormSuccess = useCallback(
    (newEvent) => {
      addEvent(newEvent);
      showSuccess("Event added successfully!");
      setShowAddForm(false);
    },
    [addEvent]
  );

  const handleDeleteEvent = useCallback(
    (eventId) => {
      deleteEvent(eventId);
      showSuccess("Event deleted successfully!");
    },
    [deleteEvent]
  );

  const eventsForDay = day
    ? events.filter((e) => dayjs(e.date).isSame(day, "day"))
    : [];

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setShowAddForm(false);
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen && !show) return null;

  const displayDay = day ? dayjs(day) : null;

  return (
    <div
  className={`fixed inset-0 m-2  bg-opacity-100 flex items-center justify-center z-50 transition-opacity duration-300 ${
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
  <div
    ref={popupRef}
    className={`bg-white dark:bg-gray-950  text-gray-800 dark:text-gray-200 rounded-lg shadow-lg w-96 max-w-full p-6 relative transform transition-transform duration-300 ${
      isOpen ? "scale-100" : "scale-95"
    }`}
  >
    <button
      onClick={onClose}
      className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-500 dark:hover:text-red-400 text-2xl leading-none p-1" 
      title="Close"
    >
      &times;
    </button>

    <div className="absolute top-3 left-3"> 
      <button
        onClick={() => setShowAddForm((prev) => !prev)}
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        {showAddForm ? "Back to Events" : "+ Add Event"}
      </button>
    </div>

    {displayDay && (
      <h2 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center mt-10"> 
        {showAddForm
          ? "New Event Details"
          : `Events on ${displayDay.format("MMMM D, YYYY")}`}
      </h2>
    )}

    <hr className="mb-4 border-gray-200 dark:border-gray-700" />

    {showAddForm ? (
      <AddEventForm
        defaultDate={dayjs(day).format("YYYY-MM-DD")}
        onSuccess={handleEventFormSuccess}
      />
    ) : children ? (
      <div className="space-y-2">{children}</div>
    ) : eventsForDay.length === 0 ? (
      <p className="text-sm text-gray-500 text-center">
        No events on this day. Click '+ Add Event' to add one.
      </p>
    ) : (
      <ul className="space-y-3 max-h-60 overflow-y-auto pr-2"> 
        {eventsForDay.map((event) => (
          <li
            key={event.id}
            className="border border-gray-300 dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-800 relative"
            style={{
              borderLeft: `5px solid ${event.color || "#ccc"}`,
            }}
          >
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
            <button
              onClick={() => handleDeleteEvent(event.id)}
              className="absolute top-1 right-1 p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors"
              title="Delete Event"
            >
              <DeleteOutlined />
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
  );
}
