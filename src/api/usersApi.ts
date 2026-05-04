const API_URL = "https://planing-cultural-backend.onrender.com";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Login failed");
  }

  return res.json();
};

export const getUser = async (userId: number) => {
  const res = await fetch(`${API_URL}/users/${userId}`);

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
};

export const updateUser = async (
  userId: number,
  data: { full_name?: string; email?: string }
) => {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");

  return res.json();
};

export const registerUser = async (data: {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Registration failed");
  }

  return res.json();
};

export const deleteAccount = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/users/delete-account`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to delete account");
  }

  return res.json();
};

export const googleLogin = async (fullName: string, email: string) => {
  const res = await fetch(`${API_URL}/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: fullName,
      email,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Google login failed");
  }

  return res.json();
};