import CalendarMain from "../../components/calendar/CalendarMain";
import CalendarSelect from "../../components/select/CustomSelect";
import JsonUpload from "../../components/upload/JsonUpload";

export default function CalendarPage() {


  return (
    <div className="h-full flex flex-col gap-1 overflow-y-auto p-1">
      <div className="flex mt-2 mr-3 gap-10 justify-end mb-1">
        <CalendarSelect />
        <JsonUpload />
      </div>
      <div>
        <CalendarMain />
      </div>
    </div>
  );
}
