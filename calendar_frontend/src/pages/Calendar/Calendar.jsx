import { useState } from "react";
import CalendarView from "../../components/calendar/CalendarCollapse";
import Calendar from "../../components/calendar/calendar";
import dayjs from "dayjs";
import { UnorderedListOutlined, ExpandOutlined } from "@ant-design/icons";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="inline-flex items-center gap-2 px-3 py-1 border rounded bg-white hover:bg-gray-100 text-sm shadow"
        >
          {collapsed ? <ExpandOutlined className="text-base" /> : <UnorderedListOutlined className="text-base" />}
          {collapsed ? "Collapse View" : "Month View"}
        </button>
      </div>
      {collapsed ? (
        <CalendarView currentDate={selectedDate} />
      ) : (
        <Calendar />
      )}
    </div>
  );
}