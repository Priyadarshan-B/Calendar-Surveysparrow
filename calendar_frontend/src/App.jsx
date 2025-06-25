import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadableLayout from "./components/appLayout/LoadableLayout";
import CalendarPage from "./pages/Calendar/Calendar";
import CalendarDayPage from "./pages/Calendar/CalendarDayPage";
import CalendarWeek from "./pages/Calendar/CalendarWeek";
import CalendarYear from "./pages/Calendar/CalendarYear";
import ToastMessage from "./components/toast/toast";
import { EventProvider } from "./components/utils/contexts/EventContext";

import "./App.css";

function App() {
  return (
    <EventProvider>
      <BrowserRouter>
        <ToastMessage />
        <Routes>
          <Route path="/" element={<LoadableLayout body={<CalendarPage />} />} />
          <Route path="/calendar" element={<LoadableLayout body={<CalendarPage />} />} />
          <Route path="/calendar/day" element={<LoadableLayout body={<CalendarDayPage />} />} />
          <Route path="/calendar/week" element={<LoadableLayout body={<CalendarWeek />} />} />
          <Route path="/calendar/year" element={<LoadableLayout body={<CalendarYear />} />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </EventProvider>
  );
}
export default App; 