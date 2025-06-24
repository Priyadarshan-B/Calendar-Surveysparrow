import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/appLayout/Layout";
import Dashboard from "./pages/Dashboard/dashboard";
import CalendarPage from "./pages/Calendar/Calendar";
import CalendarDayPage from "./pages/Calendar/CalendarDayPage";
import ToastMessage from "./components/toast/toast";
import { ConfigProvider, theme } from "antd";


import "./App.css";

function App() {

  return (
    <ConfigProvider
  theme={{
    algorithm: theme.darkAlgorithm, // enables AntD dark mode
  }}
>
    <BrowserRouter>
      <ToastMessage />
      <Routes>
        <Route path="/" element={<AppLayout body={<Dashboard />} />} />
        <Route path="/dashboard" element={<AppLayout body={<Dashboard />} />} />
        <Route path="/calendar" element={<AppLayout body={<CalendarPage />} />} />
        <Route path="/calendar/day" element={<AppLayout body={<CalendarDayPage />} />} />


        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
