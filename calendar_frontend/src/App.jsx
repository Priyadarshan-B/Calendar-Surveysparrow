import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/appLayout/Layout";
import Dashboard from "./pages/Dashboard/dashboard";
import CalendarPage from "./pages/Calendar/Calendar";
import ToastMessage from "./components/toast/toast";

import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <ToastMessage />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<AppLayout body={<Dashboard />} />} />
        <Route path="/calendar" element={<AppLayout body={<CalendarPage />} />} />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
