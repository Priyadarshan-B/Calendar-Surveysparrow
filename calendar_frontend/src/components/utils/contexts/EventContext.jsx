import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("custom-events");
    return stored ? JSON.parse(stored) : null;
  });

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem("custom-events", JSON.stringify(newEvents));
  };

  return (
    <EventContext.Provider value={{ events, updateEvents }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
