import React from "react";
import { NavLink } from "react-router-dom";
import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">Welcome, Admin</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span> */}
        </button>
        <div className="flex items-center space-x-2">
          <NavLink to="/admin/profile">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
