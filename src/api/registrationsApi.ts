const API_URL = "http://192.168.8.110:8000";

export type UserRegistrationEvent = {
  registration_id: number;
  event_id: number;
  status: string;
  title: string;
  date: string;
  location: string;
  image_url: string | null;
};

export const createRegistration = async (userId: number, eventId: number) => {
  const res = await fetch(`${API_URL}/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      event_id: eventId,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to register");
  }

  return await res.json();
};

export const fetchUserRegistrations = async (
  userId: number
): Promise<UserRegistrationEvent[]> => {
  const res = await fetch(`${API_URL}/users/${userId}/registrations`);

  if (!res.ok) {
    throw new Error("Failed to fetch user registrations");
  }

  return await res.json();
};

export const deleteRegistration = async (registrationId: number) => {
  const res = await fetch(`${API_URL}/registrations/${registrationId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete registration");
  }

  return await res.json();
};