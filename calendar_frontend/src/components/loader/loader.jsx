import './loader.css'
export default function PageLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <span className="loader"></span>
    </div>
  );
}