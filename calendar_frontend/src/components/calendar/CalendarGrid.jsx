import React, { useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import CustomPopup from "../popup/CustomPopup";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(weekday);
dayjs.extend(localeData);

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
        className={`border p-1 sm:p-2 rounded h-24 sm:h-32 overflow-hidden cursor-pointer transition-all
    ${
      isCurrentMonth
        ? "bg-white dark:bg-gray-900"
        : "bg-gray-100 dark:bg-gray-800 opacity-50"
    }
    border-gray-300 dark:border-gray-700`}
      >
        <div
          className={`text-[10px] sm:text-sm font-medium w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full 
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
            className="mt-1 px-1 py-0.5 rounded-full font-medium text-[10px] sm:text-xs text-white truncate shadow-sm"
            style={{ backgroundColor: event.color }}
            title={`${event.title} (${event.startTime} - ${event.endTime})`}
          >
            {event.title.split(" ")[0]}
          </div>
        ))}

        {dayEvents.length > 2 && (
          <div className="mt-1 text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold text-right">
            +{dayEvents.length - 2} more
          </div>
        )}
      </div>
    );
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
  <>
    <div className="grid grid-cols-7 gap-[1px] sm:gap-2 rounded-t-md bg-gray-100 dark:bg-gray-800 sticky top-0 z-10 mb-2">
      {weekdays.map((day) => (
        <div
          key={day}
          className="text-center font-bold py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200"
        >
          {day}
        </div>
      ))}
    </div>

    <div className="grid grid-cols-7 gap-[1px] sm:gap-2 overflow-y-auto max-h-[calc(100vh-200px)] pb-10">
      {days}
    </div>

    {/* Popup */}
    <CustomPopup
      isOpen={popupOpen}
      onClose={() => setPopupOpen(false)}
      day={selectedDay}
      events={selectedEvents}
    />
  </>
);
}
