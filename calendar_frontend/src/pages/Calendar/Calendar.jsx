import CalendarMain from "../../components/calendar/CalendarMain";
import CalendarSelect from "../../components/select/CustomSelect";

export default function CalendarPage() {


  return (
    <div className=" flex flex-col  p-4">
      <div className="flex float-left items-center justify-between mb-4">
        <CalendarSelect />
      </div>
      <div>
        <CalendarMain />
      </div>
    </div>
  );
}
