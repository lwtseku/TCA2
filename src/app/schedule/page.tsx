"use client";

import { useEffect, useState } from "react";

interface Schedule {
  id: string;
  event: string;
  date: string;
}

interface MonthGroup {
  month: number;
  schedules: Schedule[];
}

const monthNames = [
  "Нэг дүгээр сар",
  "Хоёр дугаар сар",
  "Гурав  дугаар сар",
  "Дөрөв дүгээр сар",
  "Тав дугаар сар",
  "Зургаа дугаар сар",
  "Долоо дугаар сар",
  "Найм дугаар сар",
  "Ес дүгээр сар",
  "Арав дугаар сар",
  "Арван нэг дүгээр сар",
  "Арван хоёрдугаар сар",
];

const PREVIEW_COUNT = 2; // Эхний харагдах тоо

const UserSchedulePage = () => {
  const [scheduleGroups, setScheduleGroups] = useState<MonthGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      const res = await fetch("/api/schedule");
      const data = await res.json();
      setScheduleGroups(data);
      setExpanded(Array(data.length).fill(false));
      setLoading(false);
    };

    fetchSchedules();
  }, []);

  const toggleExpand = (monthIndex: number) => {
    const updated = [...expanded];
    updated[monthIndex] = !expanded[monthIndex];
    setExpanded(updated);
  };

  return (
    <div className="max-w-full mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Жилийн хуанли
      </h2>

      {loading ? (
        <div className="flex justify-center">
          <span className="text-lg text-gray-500">Уншиж байна...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {scheduleGroups.map((group, monthIndex) => {
            const isExpanded = expanded[monthIndex];
            const schedulesToShow = isExpanded
              ? group.schedules
              : group.schedules.slice(0, PREVIEW_COUNT);

            return (
              <div
                key={group.month}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gray-800 text-white p-4 font-semibold text-lg">
                  {monthNames[group.month - 1]}
                </div>

                <ul className="divide-y px-4 py-4">
                  {schedulesToShow.length > 0 ? (
                    schedulesToShow.map((schedule) => {
                      const date = new Date(schedule.date);
                      const day = date.getDate();

                      return (
                        <li
                          key={schedule.id}
                          className="py-3 flex justify-between items-center"
                        >
                          <div>
                            <p className="text-sm text-gray-600">
                              {day}-ны өдөр
                            </p>
                            <p className="font-medium text-gray-800">
                              {schedule.event}
                            </p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-gray-400 italic py-3">
                      Тухайн сард үйл явдал байхгүй
                    </li>
                  )}
                </ul>

                {/* Илүү ихийг үзэх / Буцаах товч */}
                {group.schedules.length > PREVIEW_COUNT && (
                  <div className="text-center mt-4 pb-4">
                    <button
                      onClick={() => toggleExpand(monthIndex)}
                      className="bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition-all"
                    >
                      {isExpanded ? "буцах" : "Илүү ихийг үзэх"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserSchedulePage;
