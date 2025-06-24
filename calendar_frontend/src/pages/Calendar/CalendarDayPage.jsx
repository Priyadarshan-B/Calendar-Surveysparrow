import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import CalendarView from "../../components/calendar/CalendarCollapse";
import CalendarSelect from "../../components/select/CustomSelect";

export default function CalendarDayPage() {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ? dayjs(dateParam) : dayjs();

  return (
    <div className="h-full  p-4">
      <div className="flex items-center justify-between mb-4">
        <CalendarSelect />
      </div>
      <CalendarView currentDate={selectedDate} />
    </div>
  );
}
