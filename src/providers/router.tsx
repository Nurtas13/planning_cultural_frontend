import { createBrowserRouter, Navigate } from "react-router-dom";
import { Welcome } from "../components/layout/Welcome";
import { LoginPage } from "../components/layout/LoginPage";
import { HomePage } from "../components/layout/HomePage";
import { Events } from "../components/layout/Events";
import { EventDetail } from "../components/layout/EventDetail";
import { ProfileScreen } from "../components/layout/ProfileScreen";
import { Main } from "../components/main/Main";
import { AllEvents } from "../components/layout/AllEvents";
import { SignUpPage } from "../components/layout/SignUpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/app",
    element: <Main />,
    children: [
      { index: true, element: <Navigate to="/app/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "events", element: <AllEvents /> },
      { path: "create", element: <Events /> },
      { path: "events/:id", element: <EventDetail /> },
      { path: "profile", element: <ProfileScreen /> },
    ],
  },
]);