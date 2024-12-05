import React from "react";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <LogoutButton /> {/* Logout button is now part of the Dashboard */}
    </div>
  );
};

export default Dashboard;
