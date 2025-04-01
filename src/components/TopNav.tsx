import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const TopNav: React.FC = () => {
  return (
    <div className="bg-[--color-gray-bg] px-6 py-4 flex justify-between items-center border-b border-[--color-gray]">
      <div className="flex items-center space-x-3 text-[--color-gray]">
        <FaSearch />
        <input
          type="text"
          placeholder="Search..."
          className="bg-[--color-default-bg] text-[--color-gray] p-2 rounded"
        />
      </div>

      <div className="flex items-center space-x-4 text-[--color-gray]">
        <FaBell />
        <FaUserCircle size={24} />
      </div>
    </div>
  );
};

export default TopNav;
