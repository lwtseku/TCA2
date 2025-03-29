import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const initialClasses = await prisma.lesson_list.findMany({
  select: { lesson_name: true },
});
const name = await prisma.lesson_list.findMany({
  where: {
    teacher_id: "99119911",
  },
  select: { lesson_name: true },
});
console.log(name);

const initialClasse1s = [
  { id: "1", name: "Math", color: "bg-blue-500 text-blue-500" },
  { id: "2", name: "English", color: "bg-green-500 text-green-500" },
  { id: "3", name: "Science", color: "bg-yellow-500 text-yellow-500" },
  { id: "4", name: "History", color: "bg-red-500 text-red-500" },
  { id: "5", name: "Art", color: "bg-purple-500 text-purple-500" },
  { id: "6", name: "Music", color: "bg-pink-500 text-pink-500" },
  { id: "7", name: "PE", color: "bg-indigo-500 text-indigo-500" },
  { id: "8", name: "Geography", color: "bg-gray-500 text-gray-500" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timesMorning = ["8:50", "10:20", "11:50M"];

const timesAfternoon = ["2:00", "3:30"];

function Timetable() {
  return (
    <div className="h-full bg-gray-100 dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 shadow-lg">
        <div className="md:col-span-4 bg-white dark:bg-gray-700 shadow-lg p-4 rounded-md">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2"></th>
                {days.map((day) => (
                  <th key={day} className="px-4 py-2 ">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timesMorning.map((time) => (
                <tr key={time}>
                  <th className="px-4 py-2 ">{time}</th>
                  {days.map((day) => (
                    <td
                      key={day}
                      className="px-4 py-2 border border-gray-300"
                    ></td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-4 py-2" />
                <td
                  colSpan={days.length}
                  className="text-center font-bold border border-gray-300 px-4 py-2"
                >
                  Noon Break
                </td>
              </tr>
              {timesAfternoon.map((time) => (
                <tr key={time}>
                  <th className="px-4 py-2">{time}</th>
                  {days.map((day) => (
                    <td
                      key={day}
                      className="px-4 py-2 border border-gray-300"
                    ></td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-4 py-2 " />
                <td
                  colSpan={days.length}
                  className="text-center font-bold border border-gray-300 px-4 py-2 "
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Timetable;
