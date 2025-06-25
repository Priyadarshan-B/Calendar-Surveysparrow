import { useEvents } from "../../components/utils/contexts/EventContext";
import CalendarSelect from "../../components/select/CustomSelect";
import WeekCalendar from "../../components/calendar/CalendarWeek";

export default function CalendarWeek() {
   const { events } = useEvents();

  return (
    <div className="flex  flex-col  p-4">
      <div className="flex float-left items-center justify-between ">
        <CalendarSelect />
      </div>
      <WeekCalendar eventsData={events} />
    </div>
  );
}
