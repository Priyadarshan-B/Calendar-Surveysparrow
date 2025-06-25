import { useEffect, useState } from "react";
import defaultEvents from "../../data/events.json";
import CalendarSelect from "../../components/select/CustomSelect";
import YearCalendar from "../../components/calendar/CalendarYear";

export default function CalendarYear() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("custom-events");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setEvents(Array.isArray(parsed) ? parsed : defaultEvents);
      } catch (err) {
        console.warn("Invalid JSON in localStorage:", err);
        setEvents(defaultEvents);
      }
    } else {
      setEvents(defaultEvents);
    }
  }, []);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex float-left items-center justify-between mb-4">
        <CalendarSelect />
      </div>
      <YearCalendar eventsData={events} />
    </div>
  );
}
