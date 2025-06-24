import dayjs from "dayjs";
import { Calendar, theme } from "antd"; 
import events from "../../data/events.json";
import { useState, useMemo } from "react"; 

export default function CalendarView({ currentDate }) {
  const [selectedDate, setSelectedDate] = useState(currentDate || dayjs());
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  };

  const processedDayEvents = useMemo(() => {
    const filteredEvents = events.filter(e => dayjs(e.date).isSame(selectedDate, 'day'))
      .map(event => ({
        ...event,
        parsedStart: parseTime(event.startTime),
        parsedEnd: parseTime(event.endTime),
        duration: parseTime(event.endTime) - parseTime(event.startTime)
      }))
      .sort((a, b) => a.parsedStart - b.parsedStart || a.duration - b.duration); 

    const laidOutEvents = [];
    let columns = []; 

    filteredEvents.forEach(event => {
      let placed = false;
      for (let i = 0; i < columns.length; i++) {
        const overlapsInColumn = columns[i].some(colEvent =>
          Math.max(event.parsedStart, colEvent.parsedStart) < Math.min(event.parsedEnd, colEvent.parsedEnd)
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
        laidOutEvents.push({ ...event, columnIndex: columns.length - 1, totalColumns: 0 });
      }
    });

    const finalEvents = laidOutEvents.map(event => {
   
      return { ...event, totalColumns: columns.length };
    });

    return finalEvents;
  }, [selectedDate, events]); 


  return (
    <div className="border rounded shadow bg-white flex h-full"> 

      <div className="p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">My Calendars</h2>
        <div style={wrapperStyle}>
          <Calendar
            fullscreen={false} 
            value={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
           
          />
        </div>
        
      </div>

      <div className="flex-1 flex flex-col"> 
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <span className="font-semibold text-gray-600">
            {selectedDate.format("dddd, MMMM D, YYYY")}
          </span>
        </div>

        <div className="flex flex-1 overflow-y-auto">
          <div className="w-20 bg-gray-100 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300 flex flex-col">
            {hours.map(hour => (
              <div key={hour} className="h-12 pl-1 pt-1 text-right pr-2 border-b border-gray-200 last:border-b-0">
                {hour}
              </div>
            ))}
          </div>

          <div className="flex-1 relative border-l overflow-y-auto">
            {hours.map(hour => (
              <div
                key={hour}
                className="h-12 border-b border-gray-200 relative"
              ></div>
            ))}

            {processedDayEvents.map((event) => {
              const top = event.parsedStart * 48; 
              const height = (event.parsedEnd - event.parsedStart) * 48; 

              const eventWidth = 100 / event.totalColumns;
              const leftPosition = event.columnIndex * eventWidth;

              return (
                <div
                  key={event.id}
                  className="absolute px-2 py-1 text-xs text-white rounded shadow "
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: event.color || '#3B82F6', 
                    left: `${leftPosition}%`, 
                    width: `${eventWidth}%`, 
                    minHeight: '20px', 
                    zIndex: 10 + event.columnIndex, 
                  }}
                >
                  <div className="font-semibold truncate">{event.title}</div>
                  <div>{event.startTime} - {event.endTime}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}