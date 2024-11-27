import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => navigate("/users")}>Users</li>
          <li onClick={() => navigate("/roles")}>Roles</li>
          <li onClick={() => navigate("/permissions")}>Permissions</li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Dashboard;
