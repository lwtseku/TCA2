"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LessonsPage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState<any[]>([]);
  const [newLesson, setNewLesson] = useState({
    lesson_code: "",
    lesson_name: "",
    credits: 0,
    description: "",
    teacher_id: "",
  });
  const [editLesson, setEditLesson] = useState<any | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch("/api/lessons");
      const data = await res.json();
      setLessons(data);
    };
    fetchLessons();
  }, []);

  const handleAddLesson = async () => {
    const res = await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLesson),
    });

    const data = await res.json();
    setLessons((prevLessons) => [...prevLessons, data]);
    setNewLesson({
      lesson_code: "",
      lesson_name: "",
      credits: 0,
      description: "",
      teacher_id: "",
    });
  };

  const handleEditLesson = async () => {
    const res = await fetch("/api/lessons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editLesson),
    });

    const data = await res.json();
    setLessons((prevLessons) =>
      prevLessons.map((lesson) => (lesson.id === data.id ? data : lesson))
    );
    setEditLesson(null);
  };

  const handleDeleteLesson = async (id: string) => {
    const res = await fetch(`/api/lessons?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data) {
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson.id !== id)
      );
    }
  };

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          ← Буцах
        </Button>
        <h1 className="text-3xl font-bold text-center text-gray-800">
          📚 Хичээлийн жагсаалт
        </h1>
        <div className="w-24" />
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl p-8 mb-12">
        <table className="w-full border-collapse text-sm md:text-base table-auto">
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase tracking-wide">
            <tr>
              <th className="border px-4 py-2 text-left">Код</th>
              <th className="border px-4 py-2 text-left">Нэр</th>
              <th className="border px-4 py-2 text-left">Кредит</th>
              <th className="border px-4 py-2 text-left">Багш</th>
              <th className="border px-4 py-2 text-center">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{lesson.lesson_code}</td>
                <td className="border px-4 py-2">{lesson.lesson_name}</td>
                <td className="border px-4 py-2">{lesson.credits}</td>
                <td className="border px-4 py-2">{lesson.teacher?.name}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditLesson(lesson)}
                  >
                    Засах
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    Устгах
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg mb-12 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          ➕ Шинэ хичээл нэмэх
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            value={newLesson.lesson_code}
            onChange={(e) =>
              setNewLesson({ ...newLesson, lesson_code: e.target.value })
            }
            placeholder="Хичээлийн код"
          />
          <Input
            value={newLesson.lesson_name}
            onChange={(e) =>
              setNewLesson({ ...newLesson, lesson_name: e.target.value })
            }
            placeholder="Хичээлийн нэр"
          />
          <Input
            value={newLesson.credits}
            onChange={(e) =>
              setNewLesson({
                ...newLesson,
                credits: parseInt(e.target.value),
              })
            }
            placeholder="Кредит"
            type="number"
          />
          <Input
            value={newLesson.teacher_id}
            onChange={(e) =>
              setNewLesson({ ...newLesson, teacher_id: e.target.value })
            }
            placeholder="Багшийн ID"
          />
          <div className="md:col-span-2">
            <Input
              value={newLesson.description}
              onChange={(e) =>
                setNewLesson({ ...newLesson, description: e.target.value })
              }
              placeholder="Тайлбар"
            />
          </div>
          <div className="md:col-span-2">
            <Button onClick={handleAddLesson} className="w-full mt-2">
              Хичээл нэмэх
            </Button>
          </div>
        </div>
      </div>

      {editLesson && (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            ✏️ Хичээл засах
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              value={editLesson.lesson_code}
              onChange={(e) =>
                setEditLesson({
                  ...editLesson,
                  lesson_code: e.target.value,
                })
              }
              placeholder="Хичээлийн код"
            />
            <Input
              value={editLesson.lesson_name}
              onChange={(e) =>
                setEditLesson({
                  ...editLesson,
                  lesson_name: e.target.value,
                })
              }
              placeholder="Хичээлийн нэр"
            />
            <Input
              value={editLesson.credits}
              onChange={(e) =>
                setEditLesson({
                  ...editLesson,
                  credits: parseInt(e.target.value),
                })
              }
              placeholder="Кредит"
              type="number"
            />
            <Input
              value={editLesson.teacher_id}
              onChange={(e) =>
                setEditLesson({
                  ...editLesson,
                  teacher_id: e.target.value,
                })
              }
              placeholder="Багшийн ID"
            />
            <div className="md:col-span-2">
              <Input
                value={editLesson.description}
                onChange={(e) =>
                  setEditLesson({
                    ...editLesson,
                    description: e.target.value,
                  })
                }
                placeholder="Тайлбар"
              />
            </div>
            <div className="md:col-span-2 flex gap-4">
              <Button onClick={handleEditLesson} className="w-full">
                Хадгалах
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditLesson(null)}
                className="w-full"
              >
                Болих
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
