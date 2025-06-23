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
      <SideBar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        collapsed={sidebarCollapsed}
        toggleCollapsed={toggleSidebarCollapsed}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          toggleSidebar={toggleSidebar} 
          toggleSidebarCollapsed={toggleSidebarCollapsed} 
        />
        <main className="p-4 overflow-y-auto flex-1">
          {body}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;