import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const sidebarItems = [
  { name: "Dashboard", path: "/dashboard", icon: DashboardOutlined },
  { name: "Calendar", path: "/calendar", icon: CalendarOutlined },
];

function SideBar({ open, toggleSidebar, collapsed, toggleCollapsed }) {
  const location = useLocation();

  return (
    <>
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0  bg-opacity-40 z-40 md:hidden transition-opacity ${
          open ? "block" : "hidden"
        }`}
      ></div>

      <aside
        className={`fixed z-50 top-0 left-0 h-screen bg-white shadow-md dark:bg-gray-950 dark:shadow-lg transform transition-all duration-300 ease-in-out 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          w-64 md:relative md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-64"}`}
      >
        <div
          className="p-4 border-b font-bold text-lg flex items-center justify-between
          bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700
          text-gray-900 dark:text-gray-100"
        >
          <div className="flex items-center gap-2 ">
            <CalendarOutlined style={{ fontSize: "1.5rem" }} />
            {(!collapsed || open) && <span>Calendar</span>}
          </div>

          <button
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {(!collapsed || open) && (
            <p className="text-xs text-gray-400 uppercase mb-2 dark:text-gray-500">
              Menu
            </p>
          )}
          {sidebarItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const IconComponent = item.icon;

            return (
              <Link
                to={item.path}
                key={item.path}
                onClick={() => {
                  if (open) toggleSidebar(); 
                }}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }
                  ${collapsed && !open ? "justify-center" : "justify-start"}`}
              >
                <div className="flex items-center gap-3">
                  {IconComponent && (
                    <IconComponent
                      className={`${
                        isActive
                          ? "text-blue-700 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      style={{ fontSize: "1.25rem" }}
                    />
                  )}
                  {(!collapsed || open) && <span>{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
