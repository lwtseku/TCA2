"use client";
import React, { useState } from "react";

const UserProfile: React.FC = () => {
  const today = new Date();
  const currentDate = today.getDate(); // Get current date for highlighting
  const [month, setMonth] = useState<number>(11); // December (month is zero-indexed)
  const year = 2021;

  // Array to hold the days of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = (): void => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = (): void => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  return (
    <div className="max-w-xs mx-auto p-5 bg-white border rounded-lg shadow-lg">
      {/* Profile Header */}
      <div className="text-center">
        <img
          src="/path_to_your_image.jpg"
          alt="Profile"
          className="w-16 h-16 rounded-full mx-auto object-cover"
        />
        <h2 className="mt-3 text-xl font-semibold">Maiety Prajapati</h2>
        <p className="text-sm text-gray-500">College Student</p>
        <span className="mt-2 inline-block text-green-500">✔</span>
      </div>

      {/* Calendar Section */}
      <div className="mt-6">
        <h3 className="text-lg font-medium">December 2021</h3>
        <div className="mt-4">
          <div className="flex justify-between">
            <button
              onClick={handlePrevMonth}
              className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              ←
            </button>
            <button
              onClick={handleNextMonth}
              className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              return (
                <div
                  key={day}
                  className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                    day === currentDate
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
