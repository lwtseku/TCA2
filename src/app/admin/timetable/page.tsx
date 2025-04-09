"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TimetablePage = () => {
  const router = useRouter();

  const [timetable, setTimetable] = useState<any[]>([]);
  const [newTimetable, setNewTimetable] = useState({
    lesson_code: "",
    teacher_id: "",
    weekdays: "",
    start_time: "",
    end_time: "",
    school_year: 1,
  });
  const [editTimetable, setEditTimetable] = useState<any | null>(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      const res = await fetch("/api/timetable");
      const data = await res.json();
      setTimetable(data);
    };
    fetchTimetable();
  }, []);

  const handleAddTimetable = async () => {
    const res = await fetch("/api/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTimetable),
    });

    const data = await res.json();
    setTimetable((prev) => [...prev, data]);
    setNewTimetable({
      lesson_code: "",
      teacher_id: "",
      weekdays: "",
      start_time: "",
      end_time: "",
      school_year: 1,
    });
  };

  const handleEditTimetable = async () => {
    const res = await fetch("/api/timetable", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editTimetable),
    });

    const data = await res.json();
    setTimetable((prev) => prev.map((t) => (t.id === data.id ? data : t)));
    setEditTimetable(null);
  };

  const handleDeleteTimetable = async (id: string) => {
    await fetch(`/api/timetable?id=${id}`, {
      method: "DELETE",
    });
    setTimetable((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0f181e] text-white py-12 px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[#24ffa5] text-black hover:bg-white"
          >
            ← Буцах
          </Button>
          <h1 className="text-4xl font-bold text-[#24ffa5] text-center w-full">
            🗓️ Хичээлийн хуваарь
          </h1>
          <div className="w-24" />
        </div>

        {/* Table */}
        <div className="bg-[#13272e] divide-[#24ffa520] p-6 shadow-xl rounded-xl mb-12 w-full">
          <table className="w-full border-collapse text-sm">
            <thead className="text-[#24ffa5] border-b border-[#24ffa520]">
              <tr>
                <th className="px-4 py-3 text-left">Хичээл</th>
                <th className="px-4 py-3 text-left">Багш</th>
                <th className="px-4 py-3 text-left">Өдөр</th>
                <th className="px-4 py-3 text-center">Эхлэх цаг</th>
                <th className="px-4 py-3 text-center">Дуусах цаг</th>
                <th className="px-4 py-3 text-center">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((entry) => (
                <tr key={entry.id} className="hover:bg-[#24ffa520] transition">
                  <td className="px-4 py-3">{entry.lesson?.lesson_name}</td>
                  <td className="px-4 py-3">{entry.teacher?.name}</td>
                  <td className="px-4 py-3">{entry.weekdays}</td>
                  <td className="px-4 py-3 text-center">{entry.start_time}</td>
                  <td className="px-4 py-3 text-center">{entry.end_time}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-[#24ffa5] hover:bg-[#1de194] text-black"
                      onClick={() => setEditTimetable(entry)}
                    >
                      Засах
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteTimetable(entry.id)}
                    >
                      Устгах
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Form */}
        <div className="bg-[#13272e] p-6 shadow-lg rounded-xl mb-12 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-[#24ffa5] text-center">
            ➕ Шинэ хичээл нэмэх
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
              value={newTimetable.lesson_code}
              onChange={(e) =>
                setNewTimetable({
                  ...newTimetable,
                  lesson_code: e.target.value,
                })
              }
              placeholder="Хичээлийн код"
            />
            <Input
              className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
              value={newTimetable.teacher_id}
              onChange={(e) =>
                setNewTimetable({
                  ...newTimetable,
                  teacher_id: e.target.value,
                })
              }
              placeholder="Багшийн ID"
            />
            <Input
              className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
              value={newTimetable.weekdays}
              onChange={(e) =>
                setNewTimetable({
                  ...newTimetable,
                  weekdays: e.target.value,
                })
              }
              placeholder="Өдөр (ж: Даваа)"
            />
            <Input
              className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
              type="time"
              value={newTimetable.start_time}
              onChange={(e) =>
                setNewTimetable({
                  ...newTimetable,
                  start_time: e.target.value,
                })
              }
              placeholder="Эхлэх цаг"
            />
            <Input
              className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
              type="time"
              value={newTimetable.end_time}
              onChange={(e) =>
                setNewTimetable({
                  ...newTimetable,
                  end_time: e.target.value,
                })
              }
              placeholder="Дуусах цаг"
            />
            <Input
              className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
              type="number"
              value={newTimetable.school_year}
              onChange={(e) =>
                setNewTimetable({
                  ...newTimetable,
                  school_year: parseInt(e.target.value),
                })
              }
              placeholder="Төгсөх жил"
            />
            <div className="md:col-span-2">
              <Button
                onClick={handleAddTimetable}
                className="w-full bg-[#24ffa5] hover:bg-[#1de194] text-black"
              >
                Хуваарь нэмэх
              </Button>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {editTimetable && (
          <div className="bg-[#13272e] fixed inset-0 z-50 m-auto max-w-screen-md backdrop-blur-md p-6 shadow-lg rounded-xl overflow-y-auto text-white">
            <h2 className="text-2xl font-semibold mb-4 text-[#24ffa5] text-center">
              ✏️ Хуваарь засах
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                className="w-full bg-[#0f181e] text-white"
                value={editTimetable.lesson_code}
                disabled
              />
              <Input
                className="w-full bg-[#0f181e] text-white"
                value={editTimetable.teacher_id}
                disabled
              />
              <Input
                className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
                value={editTimetable.weekdays}
                onChange={(e) =>
                  setEditTimetable({
                    ...editTimetable,
                    weekdays: e.target.value,
                  })
                }
                placeholder="Өдөр"
              />
              <Input
                className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
                type="time"
                value={editTimetable.start_time}
                onChange={(e) =>
                  setEditTimetable({
                    ...editTimetable,
                    start_time: e.target.value,
                  })
                }
              />
              <Input
                className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
                type="time"
                value={editTimetable.end_time}
                onChange={(e) =>
                  setEditTimetable({
                    ...editTimetable,
                    end_time: e.target.value,
                  })
                }
              />
              <Input
                className="w-full bg-[#0f181e] border-[#24ffa520] text-white"
                type="number"
                value={editTimetable.school_year}
                onChange={(e) =>
                  setEditTimetable({
                    ...editTimetable,
                    school_year: parseInt(e.target.value),
                  })
                }
                placeholder="Төгсөх жил"
              />
              <div className="md:col-span-2 flex gap-2">
                <Button
                  onClick={handleEditTimetable}
                  className="w-full bg-[#24ffa5] hover:bg-[#1de194] text-black"
                >
                  Хадгалах
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditTimetable(null)}
                  className="w-full border-[#24ffa5] text-[#24ffa5] hover:bg-[#0f181e]"
                >
                  Цуцлах
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetablePage;
