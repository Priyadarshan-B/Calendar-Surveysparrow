import { useLocation, useNavigate } from "react-router-dom";

export default function CalendarSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentView = currentPath.includes("/week")
    ? "week"
    : currentPath.includes("/day")
    ? "day"
    : currentPath.includes("/year")
    ? "year"
    : "month"; 

  const views = ["month", "week", "day", "year"];

  const handleClick = (view) => {
    if (view === "month") navigate("/calendar");
    else navigate(`/calendar/${view}`);
  };

  return (
    <div className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-full shadow-sm">
      {views.map((view) => {
        const isActive = currentView === view;
        return (
          <button
            key={view}
            onClick={() => handleClick(view)}
            className={`capitalize px-3 py-1 text-sm rounded-full transition-colors duration-200
              ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"}`}
          >
            {view}
          </button>
        );
      })}
    </div>
  );
}
