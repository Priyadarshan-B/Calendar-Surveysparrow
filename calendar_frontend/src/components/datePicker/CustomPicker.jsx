import dayjs from "dayjs";

export default function DatePicker({ value, onChange }) {
  return (
    <input
      type="date"
      value={value.format("YYYY-MM-DD")}
      onChange={(e) => onChange(dayjs(e.target.value))}
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 shadow-sm"
    />
  );
}
