import dayjs from "dayjs";

export default function Timeline({ weekDays, getEventsForDay, onEventClick }) {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );
  const now = dayjs();

  const parseTimeToFloat = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h + m / 60;
  };

  return (
    <div className="w-full">
      <div className="grid  grid-cols-[40px_repeat(7,1fr)] rounded-md bg-gray-200 dark:bg-gray-800 text-xs md:text-sm">
        <div className="bg-gray-200 rounded-md dark:bg-gray-800 px-1 py-2" />
        {weekDays.map((day) => {
          const isToday = day.isSame(now, "day");
          return (
            <div key={day.format("YYYY-MM-DD")} className="text-center py-2">
              <div
                className={`inline-block px-1 md:px-2 py-1 rounded-full font-medium ${
                  isToday
                    ? "bg-blue-500 text-white shadow"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {day.format("D")}
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-y-auto mt-1 rounded-md h-[calc(100vh-200px)] pb-15">
        <div className="grid  grid-cols-[40px_repeat(7,1fr)]">
          <div className="bg-gray-200  dark:bg-gray-800">
            {hours.map((h, i) => (
              <div
                key={i}
                className="h-12 border-b flex  items-center justify-center text-[10px] md:text-xs text-gray-600 dark:text-gray-400"
              >
                {h}
              </div>
            ))}
          </div>

          {weekDays.map((day) => {
            const events = getEventsForDay(day);
            return (
              <div
                key={day.format("YYYY-MM-DD")}
                className="relative border-r border-gray-200 dark:border-gray-700"
              >
                {hours.map((_, i) => (
                  <div
                    key={i}
                    className="h-12 border-b border-gray-200 dark:border-gray-700"
                  ></div>
                ))}

                {events.map((event, i) => {
                  const start = parseTimeToFloat(event.startTime || "0:00");
                  const end = parseTimeToFloat(event.endTime || "0:00");
                  const top = start * 48;
                  const height = (end - start) * 48;
                  const firstWord = event.title.split(" ")[0];

                  return (
                    <div
                      key={i}
                      className="absolute left-0 right-0 px-0.5 py-0.5 text-[10px] md:text-xs rounded text-white shadow cursor-pointer overflow-hidden"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: event.color || "#3B82F6",
                      }}
                      title={`${event.title} (${event.startTime} - ${event.endTime})`}
                      onClick={() => onEventClick?.(event, day)}
                    >
                      <div className="font-semibold truncate px-1">
                        {firstWord}
                      </div>
                      <div className="text-[9px] opacity-80 px-1 truncate">
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  );
                })}

                {day.isSame(now, "day") && (
                  <>
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-blue-500 z-20"
                      style={{
                        top: `${now.hour() * 48 + (now.minute() / 60) * 48}px`,
                      }}
                    />
                    <div
                      className="absolute w-2 h-2 bg-blue-500 rounded-full z-30 border-2 border-white"
                      style={{
                        top: `${
                          now.hour() * 48 + (now.minute() / 60) * 48 - 4
                        }px`,
                        right: "-4px",
                      }}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
