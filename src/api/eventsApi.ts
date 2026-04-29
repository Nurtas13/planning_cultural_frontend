const API_URL = "http://127.0.0.1:8000";

export type EventCreatePayload = {
  title: string;
  description: string;
  category: string;
  location: string;
  event_date: string;
  event_time: string;
  image_url?: string | null;
  price?: number;
  max_participants?: number;
};

export const fetchEvents = async () => {
  try {
    const res = await fetch(`${API_URL}/events`);
    return await res.json();
  } catch (error) {
    console.error("Ошибка загрузки событий:", error);
    return [];
  }
};

export const createEvent = async (eventData: EventCreatePayload) => {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  return await res.json();
};

export const fetchEventById = async (id: number) => {
  const res = await fetch(`${API_URL}/events/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  return await res.json();
};