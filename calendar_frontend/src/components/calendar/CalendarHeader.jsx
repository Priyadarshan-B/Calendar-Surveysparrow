export default function CalendarHeader({ currentMonth, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={onPrev} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Previous</button>
      <h2 className="text-xl font-semibold">
        {currentMonth.format("MMMM YYYY")}
      </h2>
      <button onClick={onNext} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
    </div>
  );
}
