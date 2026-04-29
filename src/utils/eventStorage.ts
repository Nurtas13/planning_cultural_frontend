import { culturalEvents } from "../data/events";

const SAVED_EVENTS_KEY = "saved_event_ids";

export const getSavedEventIds = (): number[] => {
  try {
    const data = localStorage.getItem(SAVED_EVENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    localStorage.removeItem(SAVED_EVENTS_KEY);
    return [];
  }
};

export const isEventSaved = (eventId: number): boolean => {
  return getSavedEventIds().includes(eventId);
};

export const toggleSavedEvent = (eventId: number): boolean => {
  const savedIds = getSavedEventIds();

  if (savedIds.includes(eventId)) {
    const updated = savedIds.filter((id) => id !== eventId);
    localStorage.setItem(SAVED_EVENTS_KEY, JSON.stringify(updated));
    return false;
  }

  const updated = [...savedIds, eventId];
  localStorage.setItem(SAVED_EVENTS_KEY, JSON.stringify(updated));
  return true;
};

export const getSavedEvents = () => {
  const savedIds = getSavedEventIds();
  return culturalEvents.filter((event) => savedIds.includes(event.id));
};