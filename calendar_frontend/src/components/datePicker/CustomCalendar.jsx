import dayjs from "dayjs";
import { useState } from "react";

export default function CustomCalendar({ value, onChange }) {
  const [displayDate, setDisplayDate] = useState(value.startOf("month"));

  const daysInMonth = displayDate.daysInMonth();
  const startOfMonth = displayDate.startOf("month");
  const monthNames = dayjs.months();
  const years = Array.from({ length: 50 }, (_, i) => dayjs().year() - 25 + i); 

  const generateDays = () => {
    const days = [];
    const dayOfWeekOffset = startOfMonth.day(); 
    for (let i = 0; i < dayOfWeekOffset; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8 m-1" />);
    }

    for (let i = 0; i < daysInMonth; i++) {
      const current = startOfMonth.add(i, "day");
      days.push(
        <button
          key={i}
          onClick={() => {
            onChange(current);
            setDisplayDate(current.startOf("month"));
          }}
          className={`w-8 h-8 rounded-full text-sm m-1 transition
            ${current.isSame(value, "day")
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
          {current.date()}
        </button>
      );
    }
    return days;
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setDisplayDate(displayDate.month(newMonth));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setDisplayDate(displayDate.year(newYear));
  };

  return (
    <div className="p-4 dark:border-gray-700">
    
      <div className="flex items-center justify-between mb-3">
        <select
          value={displayDate.month()}
          onChange={handleMonthChange}
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
        >
          {monthNames.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={displayDate.year()}
          onChange={handleYearChange}
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-7 gap-1 bg-white dark:bg-gray-800 rounded p-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-xs font-semibold text-center text-gray-500 dark:text-gray-400"
          >
            {d}
          </div>
        ))}

        {generateDays()}
      </div>
    </div>
  );
}