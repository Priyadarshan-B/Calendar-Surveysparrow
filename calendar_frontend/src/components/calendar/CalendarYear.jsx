import dayjs from "dayjs";
import { useState, useRef, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CustomPopup from "../popup/CustomPopup";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

export default function YearCalendar({ eventsData = [] }) {
  const [year, setYear] = useState(dayjs().year());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const containerRef = useRef(null);

  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs(`${year}-${i + 1}-01`)
  );

  const getEventsForDay = (day) =>
    eventsData.filter((e) => dayjs(e.date).isSame(day, "day"));

  const openPopup = (day) => {
    setSelectedDay(day);
    setIsPopupOpen(true);
  };

  const goToYear = (next) => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
    setYear((prev) => prev + next);
  };

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTo(0, 0);
  }, [year]);

  return (
    <div
      ref={containerRef}
      className="p-4 h-full overflow-y-auto dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-500"
    >
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => goToYear(-1)} className="p-2">
          <LeftOutlined />
        </button>
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          {year}
        </h2>
        <button onClick={() => goToYear(1)} className="p-2">
          <RightOutlined />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {months.map((month, idx) => {
          const daysInMonth = month.daysInMonth();
          const startOfMonth = month.startOf("month");

          const days = Array.from({ length: daysInMonth }, (_, i) =>
            startOfMonth.add(i, "day")
          );

          return (
            <div key={idx} className="bg-white dark:bg-gray-950 p-2 rounded shadow-sm">
              <h3 className="text-sm font-bold mb-2 text-center">
                {month.format("MMMM")}
              </h3>

              <div className="grid grid-cols-7 gap-1 text-[10px]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                  <div
                    key={`${d}-${i}`}
                    className="text-center font-medium text-gray-400 dark:text-gray-500"
                  >
                    {d[0]}
                  </div>
                ))}

                {days.map((day) => {
                  const isCurrent = day.isToday();
                  const dayEvents = getEventsForDay(day);

                  return (
                    <div
                      key={day.format("YYYY-MM-DD")}
                      onClick={() => openPopup(day)}
                      className={`flex items-center justify-center flex-col h-10 rounded-full cursor-pointer transition
                        ${
                          isCurrent
                            ? "bg-blue-500 text-white font-bold"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                    >
                      <span>{day.date()}</span>
                      {dayEvents.length > 0 && (
                        <span
                          className="w-1.5 h-1.5 mt-0.5 rounded-full"
                          style={{ backgroundColor: dayEvents[0].color || "#3B82F6" }}
                        ></span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <CustomPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        day={selectedDay || dayjs()}
        events={getEventsForDay(selectedDay || dayjs())}
      />
    </div>
  );
}
