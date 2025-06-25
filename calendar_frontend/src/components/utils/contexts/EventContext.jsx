import { createContext, useContext, useEffect, useState, useCallback } from "react";
import dayjs from "dayjs"; 
import defaultEvents from "../../../data/events.json";

const EventContext = createContext();

// EventContext.js
export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem("custom-events");
      return stored ? JSON.parse(stored) : defaultEvents;
    } catch {
      return defaultEvents;
    }
  });

  const setAllEvents = useCallback((newEvents) => {
    setEvents(newEvents); // ✅ triggers re-render
    localStorage.setItem("custom-events", JSON.stringify(newEvents));
  }, []);

  const addEvent = useCallback((newEvent) => {
    setEvents((prev) => {
      const updated = [...prev, newEvent];
      localStorage.setItem("custom-events", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem("custom-events", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateEvent = useCallback((updatedEvent) => {
    setEvents((prev) => {
      const updated = prev.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      );
      localStorage.setItem("custom-events", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <EventContext.Provider
      value={{ events, setAllEvents, addEvent, deleteEvent, updateEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}