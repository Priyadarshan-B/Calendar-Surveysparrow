import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/appLayout/Layout";
import CalendarPage from "./pages/Calendar/Calendar";
import CalendarDayPage from "./pages/Calendar/CalendarDayPage";
import ToastMessage from "./components/toast/toast";
import { EventProvider } from "./components/utils/contexts/EventContext";
import CalendarYear from "./pages/Calendar/CalendarYear";
import CalendarWeek from "./pages/Calendar/CalendarWeek";

import "./App.css";

function App() {

  return (
    <EventProvider>
 <BrowserRouter>
      <ToastMessage />
      <Routes>
        <Route path="/" element={<AppLayout body={<CalendarPage />} />} />
        <Route path="/calendar" element={<AppLayout body={<CalendarPage />} />} />
        <Route path="/calendar/day" element={<AppLayout body={<CalendarDayPage />} />} />
        <Route path="/calendar/week" element={<AppLayout body={<CalendarWeek />} />} />
        <Route path="/calendar/year" element={<AppLayout body={<CalendarYear />} />} />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
    </EventProvider>
  );
}

export default App;
