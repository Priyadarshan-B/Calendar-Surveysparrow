import { useLocation, useNavigate } from "react-router-dom";

export default function CalendarSelect() {
  const navigate = useNavigate();
  const location = useLocation();

  const selected = location.pathname.includes("/day") ? "day" : "month";

  const handleChange = (e) => {
    const view = e.target.value;

    if (view === "month") {
      navigate("/calendar");
    } else {
      navigate("/calendar/day");
    }
  };

  return (
    <div className="inline-block">
      <select
        value={selected}
        onChange={handleChange}
        className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm shadow-sm
                   dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="month">Month</option>
        <option value="day">Day</option>
      </select>
    </div>
  );
}
