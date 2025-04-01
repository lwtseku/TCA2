import React from 'react';

const AssignmentFilter: React.FC = () => {
  return (
    <div className="bg-[--color-gray-bg] p-6 rounded-lg shadow mb-8 flex justify-between items-center w-full">
      {/* Course Filter */}
      <select className="bg-[--color-default-bg] text-[--color-gray] p-3 text-lg rounded-lg border border-[--color-gray] w-1/5">
        <option value="All Courses">All Courses</option>
        <option value="Wordpress">Wordpress</option>
        <option value="Diet & Meal Plan">Diet & Meal Plan</option>
      </select>

      {/* Sort Filter */}
      <select className="bg-[--color-default-bg] text-[--color-gray] p-3 text-lg rounded-lg border border-[--color-gray] w-1/5">
        <option value="DESC">DESC</option>
        <option value="ASC">ASC</option>
      </select>

      {/* Date Picker */}
      <input
        type="date"
        className="bg-[--color-default-bg] text-[--color-gray] p-3 text-lg rounded-lg border border-[--color-gray] w-1/5"
      />

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-[--color-default-bg] text-[--color-gray] p-3 text-lg rounded-lg border border-[--color-gray] w-1/3"
      />
    </div>
  );
};

export default AssignmentFilter;