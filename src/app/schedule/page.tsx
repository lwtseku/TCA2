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
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

const PREVIEW_COUNT = 2;

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
    <div className="bg-[#0f181e] min-h-screen py-10 px-4 md:px-10 font-sans text-[#d6faff]">
      <h1 className="text-3xl font-bold text-center bg-[#13272e] text-white py-4 rounded-xl shadow-sm mb-5">
        Жилийн хуанли
      </h1>

      {loading ? (
        <div className="flex justify-center mt-5">
          <span className="text-lg text-gray-400">Уншиж байна...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scheduleGroups.map((group, monthIndex) => {
            const isExpanded = expanded[monthIndex];
            const schedulesToShow = isExpanded
              ? group.schedules
              : group.schedules.slice(0, PREVIEW_COUNT);

            return (
              <div
                key={group.month}
                className="bg-[#13272e] rounded-2xl shadow-xl border border-[#24ffa530] overflow-hidden flex flex-col justify-between"
              >
                <div className="bg-[#0f181e] text-white px-4 py-3 font-semibold text-lg border-b border-[#24ffa530]">
                  {monthNames[group.month - 1]}
                </div>

                <ul className="divide-y divide-[#24ffa520] px-4 py-4 flex-1">
                  {schedulesToShow.length > 0 ? (
                    schedulesToShow.map((schedule) => {
                      const date = new Date(schedule.date);
                      const day = date.getDate();

                      return (
                        <li
                          key={schedule.id}
                          className="py-3 flex justify-between items-start"
                        >
                          <div>
                            <p className="text-sm text-gray-400">
                              {day}-ны өдөр
                            </p>
                            <p className="font-medium text-[#24ffa5]">
                              {schedule.event}
                            </p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-gray-500 italic py-3">
                      Тухайн сард үйл явдал байхгүй
                    </li>
                  )}
                </ul>

                {group.schedules.length > PREVIEW_COUNT && (
                  <div className="text-center mt-auto pb-4">
                    <button
                      onClick={() => toggleExpand(monthIndex)}
                      className="bg-[#24ffa5] text-[#0f181e] py-2 px-4 rounded-xl text-sm font-semibold hover:bg-[#20e699] transition-all"
                    >
                      {isExpanded ? "Буцаах" : "Илүү ихийг үзэх"}
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
