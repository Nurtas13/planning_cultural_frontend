export type SavedEvent = {
  id: number;
  title: string;
  description?: string;
  category: string;
  location: string;
  event_date: string;
  event_time?: string;
  image_url?: string | null;
  price?: number;
  max_participants?: number | null;
};

const SAVED_EVENTS_KEY = "savedEvents";

export const getSavedEvents = (): SavedEvent[] => {
  const saved = localStorage.getItem(SAVED_EVENTS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const isEventSaved = (eventId: number): boolean => {
  return getSavedEvents().some((event) => event.id === eventId);
};

export const toggleSavedEvent = (event: SavedEvent): boolean => {
  const savedEvents = getSavedEvents();
  const exists = savedEvents.some((item) => item.id === event.id);

  if (exists) {
    const updated = savedEvents.filter((item) => item.id !== event.id);
    localStorage.setItem(SAVED_EVENTS_KEY, JSON.stringify(updated));
    return false;
  }

  localStorage.setItem(
    SAVED_EVENTS_KEY,
    JSON.stringify([...savedEvents, event])
  );

  return true;
};