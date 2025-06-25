import { PlusOutlined } from "@ant-design/icons";

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-15 w-15 h-15 flex items-center justify-center right-10 z-50 bg-blue-200 hover:bg-blue-300 text-blue-600 p-4 rounded-full shadow-lg transition duration-300"
      title="Add Event"
    >
      <PlusOutlined style={{ fontSize: "20px" }} />
    </button>
  );
}
