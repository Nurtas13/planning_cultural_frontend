import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../components/layout/LoginPage";
import { Welcome } from "../components/layout/Welcome";
import { HomePage } from "../components/layout/HomePage";
import { Events } from "../components/layout/Events";
import { EventDetail } from "../components/layout/EventDetail";
import { ProfileScreen } from "../components/layout/ProfileScreen";
import { Main } from "../components/main/Main";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/app",
    element: <Main />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventDetail /> },
      { path: "profile", element: <ProfileScreen /> },
    ],
  },
]);