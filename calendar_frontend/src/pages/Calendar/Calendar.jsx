import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import Calendar from "../../components/calendar/calendar";
import CalendarSelect from "../../components/select/CustomSelect";
import JsonUpload from "../../components/upload/JsonUpload";

export default function CalendarPage() {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ? dayjs(dateParam) : dayjs();

  return (
    <div className="h-full flex flex-col gap-1 overflow-y-auto p-1">
      <div className="flex mt-2 mr-3 gap-10 justify-end mb-1">
        <CalendarSelect />
        <JsonUpload />
      </div>
      <div>
        <Calendar />
      </div>
    </div>
  );
}
