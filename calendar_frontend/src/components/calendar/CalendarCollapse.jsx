import dayjs from "dayjs";
import { Calendar, DatePicker, theme } from "antd";
import events from "../../data/events.json";
import { useState, useMemo } from "react";
import '../appLayout/antdStyles.css'

export default function CalendarView({ currentDate }) {
  const [selectedDate, setSelectedDate] = useState(currentDate || dayjs());
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const { token } = theme.useToken();
  const calendarWrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

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
      let maxOverlapsAtThisEventTime = 0;
      const overlappingEvents = filteredEvents.filter(
        (otherEvent) =>
          Math.max(event.parsedStart, otherEvent.parsedStart) <
          Math.min(event.parsedEnd, otherEvent.parsedEnd)
      );

      maxOverlapsAtThisEventTime = columns.length;


      return { ...event, totalColumns: maxOverlapsAtThisEventTime || 1 };
    });

    return finalEvents;
  }, [selectedDate, events]);


  const EVENT_HORIZONTAL_GAP_PX = 4;

  return (
    <div className="h-full flex border rounded shadow bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="hidden md:block p-4 border-r dark:border-gray-700 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          My Calendars
        </h2>
        <div style={calendarWrapperStyle} className="dark:bg-gray-800">
          <Calendar
            fullscreen={false}
            value={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
            className="ant-calendar-custom-dark"
          />
        </div>
        
      </div>

      <div className="flex-1 flex flex-col  overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
          <div className="md:hidden">
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              allowClear={false}
              picker="date"
              className="ant-picker-custom-dark" 
            />
          </div>
          <span className="font-semibold text-gray-600 dark:text-gray-300">
            {selectedDate.format("dddd, MMMM D, YYYY")}
          </span>
        </div>

        <div className="flex flex-1">
          <div className="w-20 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 flex flex-col">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-12 pl-1 pt-1  pr-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0 flex items-start" 
              >
                {hour}
              </div>
            ))}
          </div>

          <div className="flex-1 relative border-l dark:border-gray-700 ">
            {hours.map((hour, index) => (
              <div
                key={hour}
                className="absolute w-full h-12 border-b border-gray-200 dark:border-gray-700"
                style={{ top: `${index * 48}px` }} 
              ></div>
            ))}

            {processedDayEvents.map((event) => {
              const top = event.parsedStart * 48;
              const height = (event.parsedEnd - event.parsedStart) * 48;

              const totalAvailableWidth = 100; 
              const gapPercentage = (EVENT_HORIZONTAL_GAP_PX / document.querySelector('.flex-1.relative.border-l')?.offsetWidth) * 100 || 0; // Convert px gap to %
              const effectiveWidthPerColumn = (totalAvailableWidth - (event.totalColumns - 1) * gapPercentage) / event.totalColumns;

              const leftPosition = event.columnIndex * (effectiveWidthPerColumn + gapPercentage);
              const eventFinalWidth = effectiveWidthPerColumn;


              return (
                <div
                  key={event.id}
                  className="absolute px-1 py-1 text-xs text-white rounded shadow dark:shadow-lg
                             flex flex-col items-center justify-center text-center overflow-hidden" 
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: event.color || "#3B82F6",
                    left: `${leftPosition}%`,
                    width: `${eventFinalWidth}%`,
                    minHeight: "20px",
                    zIndex: 10 + event.columnIndex,
                  }}
                >
                  <div className="font-semibold truncate w-full px-1">{event.title}</div>
                  <div className="w-full px-1">
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}