import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/CommonViews/Navbar"; // Adjust the import path as necessary

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
