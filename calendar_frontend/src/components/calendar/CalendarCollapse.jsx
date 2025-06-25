import dayjs from "dayjs";
import CustomCalendar from "../datePicker/CustomCalendar";
import { useMemo, useState } from "react";

export default function CalendarView({ events }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showPopup, setShowPopup] = useState(false);

  const updateDate = (date) => {
    setSelectedDate(date);
    setShowPopup(false);
  };

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  };

  const processedDayEvents = useMemo(() => {
    const filteredEvents = events
      .filter((e) => dayjs(e.date).isSame(selectedDate, "day"))
      .map((event) => ({
        ...event,
        parsedStart: parseTime(event.startTime),
        parsedEnd: parseTime(event.endTime),
        duration: parseTime(event.endTime) - parseTime(event.startTime),
      }))
      .sort((a, b) => a.parsedStart - b.parsedStart || a.duration - b.duration);

    const laidOutEvents = [];
    let columns = [];

    filteredEvents.forEach((event) => {
      let placed = false;
      for (let i = 0; i < columns.length; i++) {
        const overlapsInColumn = columns[i].some(
          (colEvent) =>
            Math.max(event.parsedStart, colEvent.parsedStart) <
            Math.min(event.parsedEnd, colEvent.parsedEnd)
        );

        if (!overlapsInColumn) {
          columns[i].push(event);
          laidOutEvents.push({ ...event, columnIndex: i, totalColumns: 0 });
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([event]);
        laidOutEvents.push({
          ...event,
          columnIndex: columns.length - 1,
          totalColumns: 0,
        });
      }
    });

    const finalEvents = laidOutEvents.map((event) => {
      const overlappingEvents = filteredEvents.filter(
        (otherEvent) =>
          Math.max(event.parsedStart, otherEvent.parsedStart) <
          Math.min(event.parsedEnd, otherEvent.parsedEnd)
      );
      return {
        ...event,
        totalColumns: Math.max(1, overlappingEvents.length),
      };
    });

    return finalEvents;
  }, [selectedDate, events]);

  return (
    <div className="h-full overflow-y-auto flex rounded shadow bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 relative">
      <div className="hidden md:block p-4 dark:border-gray-700 overflow-y-auto">
        <CustomCalendar value={selectedDate} onChange={updateDate} />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-2 dark:border-gray-700">
          <div className="md:hidden flex gap-2">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Show Calendar
            </button>
          </div>

          <span className="font-semibold text-gray-600 dark:text-gray-300">
            {selectedDate.format("dddd, MMMM D, YYYY")}
          </span>
        </div>

        <div className="flex flex-1">
          <div className="w-20 bg-gray-100 rounded dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 flex flex-col">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-12 pl-1 pt-1 pr-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0 flex items-start"
              >
                {hour}
              </div>
            ))}
          </div>

          <div className="flex-1 rounded relative dark:border-gray-700">
            {hours.map((hour, index) => (
              <div
                key={hour}
                className="absolute w-full h-12 border-b border-gray-200 dark:border-gray-700"
                style={{ top: `${index * 48}px` }}
              ></div>
            ))}
            {selectedDate.isSame(dayjs(), "day") && (
              <>
                <div
                  className="absolute left-0 right-0 w-full h-0.5 bg-blue-500 z-20"
                  style={{
                    top: `${
                      dayjs().hour() * 48 + (dayjs().minute() / 60) * 48
                    }px`,
                  }}
                />
                <div
                  className="absolute w-3 h-3 bg-blue-500 rounded-full z-30 border-2 border-white"
                  style={{
                    top: `${
                      dayjs().hour() * 48 + (dayjs().minute() / 60) * 48 - 6
                    }px`,
                    right: "-0px",
                  }}
                />
              </>
            )}

            {processedDayEvents.map((event, i) => {
              const top = event.parsedStart * 48;
              const height = (event.parsedEnd - event.parsedStart) * 48;
              const GAP_PX = 2;
              const totalColumns = event.totalColumns || 1;
              const gapTotal = GAP_PX * (totalColumns - 1);
              const containerWidth = 100;
              const widthPerEvent = (containerWidth - gapTotal) / totalColumns;
              const left = (widthPerEvent + GAP_PX) * event.columnIndex;

              return (
                <div
                  key={i}
                  className="absolute px-1 py-1 text-xs text-white rounded shadow dark:shadow-lg flex flex-col items-center justify-center text-center overflow-hidden"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: event.color || "#3B82F6",
                    left: `${left}%`,
                    width: `${widthPerEvent}%`,
                    minHeight: "20px",
                    zIndex: 10 + event.columnIndex,
                  }}
                >
                  <div className="font-semibold truncate w-full px-1">
                    {event.title}
                  </div>
                  <div className="w-full px-1">
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 md:hidden">
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-lg max-w-sm w-full relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 text-lg"
            >
              ✕
            </button>
            <CustomCalendar value={selectedDate} onChange={updateDate} />
          </div>
        </div>
      )}
    </div>
  );
}
