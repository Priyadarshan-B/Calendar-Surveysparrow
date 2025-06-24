import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function CalendarHeader({ currentMonth, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center ">
      <button
        onClick={onPrev}
        className="p-2 cursor-pointer "
        title="Previous Month"
      >
        <LeftOutlined />
      </button>
      <h2 className="text-xl font-semibold">
        {currentMonth.format("MMMM YYYY")}
      </h2>
      <button
        onClick={onNext}
        className="p-2 cursor-pointer "
        title="Next Month"
      >
        <RightOutlined />
      </button>
    </div>
  );
}
