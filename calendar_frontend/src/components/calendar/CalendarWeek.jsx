import dayjs from "dayjs";
import { useState, useMemo } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import CustomPopup from "../popup/CustomPopup";
import Timeline from "../timeline/TimeLine";
dayjs.extend(isBetween);
dayjs.extend(isToday);

export default function WeekCalendar({eventsData=[]}) {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => currentWeek.add(i, "day")),
    [currentWeek]
  );

  const events = useMemo(() => {
    return eventsData.filter((event) =>
      dayjs(event.date).isBetween(currentWeek.startOf("week"), currentWeek.endOf("week"), null, "[]")
    );
  }, [currentWeek]);

  const getEventsForDay = (day) =>
    events.filter((e) => dayjs(e.date).isSame(day, "day"));

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsPopupOpen(true);
  };

  const goToPrevWeek = () => setCurrentWeek((prev) => prev.subtract(1, "week"));
  const goToNextWeek = () => setCurrentWeek((prev) => prev.add(1, "week"));

  return (
    <div className="p-4 h-screen overflow-y-auto dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPrevWeek} className="p-2">
          <LeftOutlined />
        </button>
        <h2 className="text-lg font-semibold text-center">
          Week of {currentWeek.format("MMMM , YYYY")}
        </h2>
        <button onClick={goToNextWeek} className="p-2">
          <RightOutlined />
        </button>
      </div>

      <Timeline weekDays={weekDays} getEventsForDay={getEventsForDay} />

      <CustomPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        day={selectedDay}
        events={getEventsForDay(selectedDay)}
      />
    </div>
  );
}
