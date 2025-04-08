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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">
          📘 Хичээлийн хуваарь
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          Буцах
        </Button>
      </div>

      {/* Хичээлийн хуваарийн жагсаалт */}
      <div className="bg-white p-6 shadow-lg rounded-xl overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          📋 Хуваарийн жагсаалт
        </h2>
        <table className="table-auto w-full border-collapse text-sm md:text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Хичээл</th>
              <th className="px-4 py-2">Багш</th>
              <th className="px-4 py-2">Өдөр</th>
              <th className="px-4 py-2">Эхлэх</th>
              <th className="px-4 py-2">Дуусах</th>
              <th className="px-4 py-2">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((entry) => (
              <tr key={entry.id} className="hover:bg-blue-50 border-b">
                <td className="px-4 py-2">{entry.lesson.lesson_name}</td>
                <td className="px-4 py-2">{entry.teacher.name}</td>
                <td className="px-4 py-2">{entry.weekdays}</td>
                <td className="px-4 py-2">{entry.start_time}</td>
                <td className="px-4 py-2">{entry.end_time}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <Button onClick={() => setEditTimetable(entry)}>
                    ✏️ Засах
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteTimetable(entry.id)}
                  >
                    🗑️ Устгах
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Шинэ хичээл нэмэх */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          ➕ Шинэ хичээл нэмэх
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Хичээлийн код"
            value={newTimetable.lesson_code}
            onChange={(e) =>
              setNewTimetable({ ...newTimetable, lesson_code: e.target.value })
            }
          />
          <Input
            placeholder="Багшийн ID"
            disabled
            value={newTimetable.teacher_id}
          />
          <Input
            placeholder="Өдөр"
            value={newTimetable.weekdays}
            onChange={(e) =>
              setNewTimetable({ ...newTimetable, weekdays: e.target.value })
            }
          />
          <Input
            placeholder="Эхлэх цаг"
            type="time"
            value={newTimetable.start_time}
            onChange={(e) =>
              setNewTimetable({ ...newTimetable, start_time: e.target.value })
            }
          />
          <Input
            placeholder="Дуусах цаг"
            type="time"
            value={newTimetable.end_time}
            onChange={(e) =>
              setNewTimetable({ ...newTimetable, end_time: e.target.value })
            }
          />
          <Input
            placeholder="Төгсөх жил"
            type="number"
            value={newTimetable.school_year}
            onChange={(e) =>
              setNewTimetable({
                ...newTimetable,
                school_year: parseInt(e.target.value),
              })
            }
          />
        </div>
        <Button className="mt-4 w-full md:w-auto" onClick={handleAddTimetable}>
          Хуваарь нэмэх
        </Button>
      </div>

      {/* Хуваарь засах */}
      {editTimetable && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
            ✏️ Хуваарь засах
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input value={editTimetable.lesson_code} disabled />
            <Input value={editTimetable.teacher_id} disabled />
            <Input
              value={editTimetable.weekdays}
              onChange={(e) =>
                setEditTimetable({ ...editTimetable, weekdays: e.target.value })
              }
              placeholder="Өдөр"
            />
            <Input
              type="time"
              value={editTimetable.start_time}
              onChange={(e) =>
                setEditTimetable({
                  ...editTimetable,
                  start_time: e.target.value,
                })
              }
              placeholder="Эхлэх цаг"
            />
            <Input
              type="time"
              value={editTimetable.end_time}
              onChange={(e) =>
                setEditTimetable({ ...editTimetable, end_time: e.target.value })
              }
              placeholder="Дуусах цаг"
            />
            <Input
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
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button onClick={handleEditTimetable}>Хадгалах</Button>
            <Button variant="outline" onClick={() => setEditTimetable(null)}>
              Цуцлах
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetablePage;
