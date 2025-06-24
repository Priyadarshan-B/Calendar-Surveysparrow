import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import defaultEvents from "../../data/events.json";
import { useEvents } from "../utils/contexts/EventContext";

export default function Calendar() {
    const { events } = useEvents();
    const Events = events || defaultEvents;
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("date")
    ? dayjs(searchParams.get("date") + "-01")
    : dayjs();

  const [currentMonth, setCurrentMonth] = useState(initial);

  const handlePrev = () => {
    const prevMonth = currentMonth.subtract(1, "month");
    setCurrentMonth(prevMonth);
    setSearchParams({ date: prevMonth.format("YYYY-MM") });
  };

  const handleNext = () => {
    const nextMonth = currentMonth.add(1, "month");
    setCurrentMonth(nextMonth);
    setSearchParams({ date: nextMonth.format("YYYY-MM") });
  };

  return (
    <div className=" shadow-sm rounded-lg p-4">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <CalendarGrid currentMonth={currentMonth} events={Events} />
    </div>
  );
}
