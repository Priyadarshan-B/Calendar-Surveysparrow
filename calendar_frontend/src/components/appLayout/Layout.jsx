import React, { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

function AppLayout({ body }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapsed = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="h-screen flex bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Sidebar - Remains fixed on the left */}
      <SideBar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        collapsed={sidebarCollapsed}
        toggleCollapsed={toggleSidebarCollapsed}
      />

      {/* Main content area (TopBar + Body) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* TopBar - Stays at the top */}
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
        />

        {/* Main content body - Fills remaining space and scrolls if content overflows */}
        <main className="flex-1 overflow-y-auto">
          {body}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;