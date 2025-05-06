import React from "react";
import { FaBook, FaList, FaCog } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-[--color-orange] mb-6">
        LMS Admin
      </h1>
      <nav className="space-y-4">
        <a
          href="#"
          className="flex items-center space-x-2 text-[--color-gray] hover:text-white"
        >
          <FaBook />
          <span>Courses</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-[--color-gray] hover:text-white"
        >
          <FaList />
          <span>Assignments</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-[--color-gray] hover:text-white"
        >
          <FaCog />
          <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
