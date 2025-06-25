import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function CalendarHeader({ currentMonth, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center ">
      <button
        onClick={onPrev}
        className="p-2 cursor-pointer dark:text-white "
        title="Previous Month"
      >
        <LeftOutlined />
      </button>
      <h2 className="text-xl dark:text-white font-semibold">
        {currentMonth.format("MMMM YYYY")}
      </h2>
      <button
        onClick={onNext}
        className="p-2 pt-0 cursor-pointer dark:text-white "
        title="Next Month"
      >
        <RightOutlined />
      </button>
    </div>
  );
}
