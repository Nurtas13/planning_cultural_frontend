import { Outlet, Link } from "react-router-dom";

export const Main = () => {
  return (
    <div style={{ display: "flex" }}>
      
      {/* SIDEBAR / MENU */}
      <div style={{ width: "200px", padding: "10px" }}>
        <nav>
          <ul>
            <li>
              <Link to="/app/home">Home</Link>
            </li>
            <li>
              <Link to="/app/events">Events</Link>
            </li>
            <li>
              <Link to="/app/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
};