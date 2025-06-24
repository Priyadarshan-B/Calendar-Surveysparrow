import React, {useState} from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";
import CustomPopup from "../popup/CustomPopup";

dayjs.extend(weekday);
dayjs.extend(isToday);

export default function CalendarGrid({ currentMonth, events }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const startDay = currentMonth.startOf("month").weekday(0);
  const days = [];

  for (let i = 0; i < 42; i++) {
    const day = startDay.add(i, "day");
    const dayEvents = events.filter((e) => dayjs(e.date).isSame(day, "day"));

    const isCurrentMonth = day.month() === currentMonth.month();
    const isToday = day.isToday();

    days.push(
      <div
        key={i}
        onClick={() => {
          setSelectedDay(day);
          setSelectedEvents(dayEvents);
          setPopupOpen(true);
        }}
        className={`border p-2 rounded-md h-32 overflow-hidden transition cursor-pointer
          ${
            isCurrentMonth
              ? "bg-white dark:bg-gray-900"
              : "bg-gray-100 dark:bg-gray-800 opacity-50"
          }
          border-gray-300 dark:border-gray-700 hover:ring-2 hover:ring-blue-300`}
      >
        <div
          className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full 
            ${
              isToday
                ? "bg-blue-200 text-blue-600"
                : "text-gray-800 dark:text-gray-200"
            }`}
        >
          {day.date()}
        </div>

        {dayEvents.slice(0, 2).map((event, idx) => (
          <div
            key={idx}
            className="mt-1 px-2 py-1 rounded-full font-medium flex items-center justify-center text-xs text-white truncate shadow-sm"
            style={{ backgroundColor: event.color }}
            title={`${event.title} (${event.startTime} - ${event.endTime})`}
          >
            {event.title}
          </div>
        ))}

        {dayEvents.length > 2 && (
          <div className="mt-1 text-xs text-blue-600 dark:text-blue-400 font-semibold text-right">
            +{dayEvents.length - 2} more
          </div>
        )}
      </div>
    );
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className="grid grid-cols-7 gap-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center font-bold rounded-md bg-gray-100 dark:bg-gray-800 py-2 text-gray-700 dark:text-gray-200"
          >
            {day}
          </div>
        ))}
        {days}
      </div>

      <CustomPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        day={selectedDay}
        events={selectedEvents}
      />
    </>
  );
}
