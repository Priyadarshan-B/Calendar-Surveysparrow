import dayjs from "dayjs";
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import defaultEvents from "../../data/events.json";
import { useEvents } from "../utils/contexts/EventContext";

export default function CalendarMain() {
  const { events } = useEvents();
  const Events = events || defaultEvents;

  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  const handlePrev = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const handleNext = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  return (
    <div className="shadow-sm rounded-lg p-4">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <CalendarGrid currentMonth={currentMonth} events={Events} />
    </div>
  );
}
