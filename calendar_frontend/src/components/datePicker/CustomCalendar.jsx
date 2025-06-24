import dayjs from "dayjs";

export default function CustomCalendar({ value, onChange }) {
  const daysInMonth = value.daysInMonth();
  const startOfMonth = value.startOf("month");

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      const current = startOfMonth.add(i, "day");
      days.push(
        <button
          key={i}
          onClick={() => onChange(current)}
          className={`w-8 h-8 rounded-full text-sm m-1
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

  return (
    <div className="p-4 border-r dark:border-gray-700 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        My Calendars
      </h2>
      <div className="grid grid-cols-7 gap-1 bg-white dark:bg-gray-800 rounded p-2">
        {generateDays()}
      </div>
    </div>
  );
}
