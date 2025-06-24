import React, { useState } from "react";
import ThemeToggle from "./toggleTheme";

function TopBar({ toggleSidebar, toggleSidebarCollapsed }) {
  const [open, setOpen] = useState(false);
  const user = {
    name: "Profile",
    email: "profile@gmail.com",
    image: "https://i.pravatar.cc/40?img=11",
  };

  return (
    <header
      className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30
                       dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg"
    >
      <div className="flex items-center gap-4 w-full">
        <button
          className="md:hidden text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <button
          className="hidden md:block text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors
                     text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={toggleSidebarCollapsed}
          aria-label="Toggle Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-gray-900 dark:text-gray-100"
          >
            <img
              src={user.image}
              alt="profile"
              className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600"
            />
            <span className="hidden md:block text-sm font-medium">
              {user.name}
            </span>
            
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
