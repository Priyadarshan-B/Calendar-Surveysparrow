import { useEvents } from "../../components/utils/contexts/EventContext";
import CalendarSelect from "../../components/select/CustomSelect";
import YearCalendar from "../../components/calendar/CalendarYear";

export default function CalendarYear() {
  const { events } = useEvents();

  return (
    <div className="flex flex-col h-full  p-1 sm:p-4">
      <div className="flex float-left items-center justify-between mb-4">
        <CalendarSelect />
      </div>
      <YearCalendar eventsData={events} />
    </div>
  );
}
