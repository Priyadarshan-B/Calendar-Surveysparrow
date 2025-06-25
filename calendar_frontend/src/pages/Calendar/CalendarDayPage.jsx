import CalendarView from "../../components/calendar/CalendarCollapse";
import CalendarSelect from "../../components/select/CustomSelect";
import { useEvents } from "../../components/utils/contexts/EventContext";
export default function CalendarDayPage() {
  const { events } = useEvents();

  return (
    <div className="flex flex-col h-full  p-1 sm:p-4">
      <div className="flex float-left items-center justify-between mb-4">
        <CalendarSelect />
      </div>
      <CalendarView events={events} />
    </div>
  );
}
