import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(weekday);
dayjs.extend(isToday);

export default function CalendarGrid({ currentMonth, events }) {
  const startDay = currentMonth.startOf("month").weekday(0);
  const days = [];

  for (let i = 0; i < 42; i++) {
    const day = startDay.add(i, "day");
    const dayEvents = events.filter(e => dayjs(e.date).isSame(day, 'day'));
    days.push(
      <div key={i} className="border-gray-200 border p-2 rounded-md h-32 overflow-auto">
        <div className={`text-sm font-medium ${day.isToday() ? "text-red-500" : "text-gray-800"}`}>{day.date()}</div>
        {dayEvents.map((event, idx) => (
          <div
            key={idx}
            className="mt-1 px-1 rounded text-xs text-white truncate overflow-y-auto"
            style={{ backgroundColor: event.color }}
            title={`${event.title} (${event.startTime} - ${event.endTime})`}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-2 bg-white">
      {weekdays.map((day) => (
        <div key={day} className="text-center font-bold rounded-md bg-gray-100 py-2">
          {day}
        </div>
      ))}
      {days}
    </div>
  );
}