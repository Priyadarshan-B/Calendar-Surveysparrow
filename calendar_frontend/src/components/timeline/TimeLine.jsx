import dayjs from "dayjs";

export default function Timeline({ weekDays, getEventsForDay }) {
  const hours = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, "0")}:00`
  );
  const now = dayjs();

  const parseTimeToFloat = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h + m / 60;
  };

  return (
    <div className="overflow-x-auto rounded-md">
      <div className="min-w-[900px] grid grid-cols-[80px_repeat(7,1fr)] rounded-md dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 text-sm">
        <div className="bg-gray-100 dark:bg-gray-800 px-2 py-3 text-xs text-gray-500 dark:text-gray-400"></div>
        {weekDays.map((day) => {
          const isToday = day.isSame(now, "day");
          return (
            <div
              key={day.format("YYYY-MM-DD")}
              className="text-center py-3 relative"
            >
              <div
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium transition ${
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

      <div
        className="overflow-y-scroll max-h-[576px]"
        style={{ height: "calc(100vh - 200px)" }} 
      >
        <div className="min-w-[900px] grid grid-cols-[80px_repeat(7,1fr)] text-sm">
          <div className="bg-gray-100 rounded-md dark:bg-gray-800 sticky left-0 z-10">
            {hours.map((h, i) => (
              <div
                key={i}
                className="h-12 border-b  flex items-center justify-center border-r-2  px-2 py-1 text-xs text-gray-600 dark:text-gray-400"
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
                className="relative border-r border-gray-300 dark:border-gray-700"
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

                  return (
                    <div
                      key={i}
                      className="absolute left-1 right-1 px-2 py-1 text-xs rounded text-white shadow"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: event.color || "#3B82F6",
                      }}
                    >
                      <div className="font-semibold truncate">
                        {event.title}
                      </div>
                      <div className="text-[10px] opacity-80">
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  );
                })}

                {day.isSame(now, "day") && (
                  <div
                    className="absolute left-0 right-0 h-0.5 bg-blue-500 z-20"
                    style={{
                      top: `${
                        now.hour() * 48 + (now.minute() / 60) * 48
                      }px`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
