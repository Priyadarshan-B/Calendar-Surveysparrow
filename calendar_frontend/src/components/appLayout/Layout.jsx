import React, { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import UploadPopupWrapper from "../popup/uploadPopup";

function AppLayout({ body }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapsed = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="h-screen w-screen box-border fixed overflow-hidden flex flex-col">
      <TopBar
        toggleSidebar={toggleSidebar}
        toggleSidebarCollapsed={toggleSidebarCollapsed}
      />

      <div className="flex flex-1 overflow-hidden">
        <SideBar
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          collapsed={sidebarCollapsed}
          toggleCollapsed={toggleSidebarCollapsed}
        />

        <main className="flex-1 bg-gray-100 dark:bg-gray-900 pb-10">
          {body}
           <UploadPopupWrapper />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
