import { useState } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import events from "../../data/events.json";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <CalendarHeader 
        currentMonth={currentMonth} 
        onPrev={handlePrev} 
        onNext={handleNext} 
      />
      <CalendarGrid currentMonth={currentMonth} events={events} />
    </div>
  );
}
