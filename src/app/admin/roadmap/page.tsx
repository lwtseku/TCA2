"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RoadmapPage = () => {
  const router = useRouter();

  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({
    lesson_code: "",
    lesson_name: "",
    credits: 0,
    type: "",
    semester: "",
    school_year: 0,
  });
  const [editItem, setEditItem] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/roadmap");
      const data = await res.json();
      setRoadmaps(data);
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    const res = await fetch("/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    const data = await res.json();
    setRoadmaps([...roadmaps, data]);
    setNewItem({
      lesson_code: "",
      lesson_name: "",
      credits: 0,
      type: "",
      semester: "",
      school_year: 0,
    });
  };

  const handleUpdate = async () => {
    const res = await fetch("/api/roadmap", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editItem),
    });
    const data = await res.json();
    setRoadmaps(roadmaps.map((item) => (item.id === data.id ? data : item)));
    setEditItem(null);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/roadmap?id=${id}`, { method: "DELETE" });
    setRoadmaps(roadmaps.filter((item) => item.id !== id));
  };

  const groupBySchoolYear = (items: any[]) => {
    return items.reduce((acc: Record<number, any[]>, item) => {
      const year = item.school_year || 0;
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0f181e] py-10 px-6 text-[#e3fef3] font-sans">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-center text-white border-b border-[#6be4b9] pb-4">
          📌 Roadmap Хичээлүүд
        </h1>
        <Button
          variant="outline"
          onClick={() => router.push("/sign-up")}
          className="text-[#0f181e] border-[#6be4b9] hover:bg-[#13272e] active:bg-[#6be4b9] active:text-[#0f181e]"
        >
          ← Буцах
        </Button>

        {/* Шинэ хичээл нэмэх */}
        <div className="bg-[#13272e] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#6be4b9] mb-4 text-center">
            ➕ Шинэ хичээл нэмэх
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              className="bg-[#0f181e] text-white border border-[#6be4b920]"
              placeholder="Код"
              value={newItem.lesson_code}
              onChange={(e) =>
                setNewItem({ ...newItem, lesson_code: e.target.value })
              }
            />
            <Input
              className="bg-[#0f181e] text-white border border-[#6be4b920]"
              placeholder="Нэр"
              value={newItem.lesson_name}
              onChange={(e) =>
                setNewItem({ ...newItem, lesson_name: e.target.value })
              }
            />
            <Input
              type="number"
              className="bg-[#0f181e] text-white border border-[#6be4b920]"
              placeholder="Кредит"
              value={newItem.credits}
              onChange={(e) =>
                setNewItem({ ...newItem, credits: parseInt(e.target.value) })
              }
            />
            <select
              className="bg-[#0f181e] text-white border border-[#6be4b920] px-3 py-2 rounded-md"
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            >
              <option value="">Төрөл</option>
              <option value="Pro">Pro</option>
              <option value="Gen">Gen</option>
            </select>
            <select
              className="bg-[#0f181e] text-white border border-[#6be4b920] px-3 py-2 rounded-md"
              value={newItem.semester}
              onChange={(e) =>
                setNewItem({ ...newItem, semester: e.target.value })
              }
            >
              <option value="">Семестер</option>
              <option value="Хавар">Хавар</option>
              <option value="Намар">Намар</option>
            </select>
            <select
              className="bg-[#0f181e] text-white border border-[#6be4b920] px-3 py-2 rounded-md"
              value={newItem.school_year}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  school_year: parseInt(e.target.value),
                })
              }
            >
              <option value={0}>Жил сонгох</option>
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  {year}-р курс
                </option>
              ))}
            </select>
          </div>
          <Button
            onClick={handleAdd}
            className="mt-6 w-full bg-[#6be4b9] hover:bg-[#0f181e] text-[#0f181e] font-semibold"
          >
            Нэмэх
          </Button>
        </div>

        {/* Хичээлүүдийн жагсаалт */}
        <div className="space-y-6">
          {Object.entries(groupBySchoolYear(roadmaps)).map(([year, items]) => (
            <div key={year} className="bg-[#13272e] p-6 rounded-xl shadow-2xl">
              <h3 className="text-xl text-[#6be4b9] font-bold mb-4">
                🎓 {year}-р курс ({items.length} хичээл)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm divide-y divide-[#6be4b920]">
                  <thead className="bg-[#6be4b9] text-[#0f181e]">
                    <tr>
                      <th className="py-3 px-4 text-left">Код</th>
                      <th className="py-3 px-4 text-left">Нэр</th>
                      <th className="py-3 px-4 text-left">Кредит</th>
                      <th className="py-3 px-4 text-left">Төрөл</th>
                      <th className="py-3 px-4 text-left">Семестер</th>
                      <th className="py-3 px-4 text-center">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-[#0f181e] transition duration-200"
                      >
                        <td className="px-4 py-2 text-[#6be4b9] font-semibold">
                          {item.lesson_code}
                        </td>
                        <td className="px-4 py-2 text-white">
                          {item.lesson_name}
                        </td>
                        <td className="px-4 py-2 text-white">{item.credits}</td>
                        <td className="px-4 py-2 text-white">{item.type}</td>
                        <td className="px-4 py-2 text-white">
                          {item.semester}
                        </td>
                        <td className="px-4 py-2 text-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-[#6be4b9] hover:bg-[#0f181e] text-[#0f181e] font-semibold"
                            onClick={() => setEditItem(item)}
                          >
                            Засах
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            Устгах
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Засах modal */}
        {editItem && (
          <div className="bg-[#13272e] fixed inset-0 z-50 m-auto max-w-screen-md p-6 shadow-xl rounded-xl overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#6be4b9] text-center">
              ✏️ Хичээл засах
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                className="bg-[#0f181e] text-white border border-[#6be4b920]"
                value={editItem.lesson_code}
                onChange={(e) =>
                  setEditItem({ ...editItem, lesson_code: e.target.value })
                }
                placeholder="Код"
              />
              <Input
                className="bg-[#0f181e] text-white border border-[#6be4b920]"
                value={editItem.lesson_name}
                onChange={(e) =>
                  setEditItem({ ...editItem, lesson_name: e.target.value })
                }
                placeholder="Нэр"
              />
              <Input
                type="number"
                className="bg-[#0f181e] text-white border border-[#6be4b920]"
                value={editItem.credits}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    credits: parseInt(e.target.value),
                  })
                }
                placeholder="Кредит"
              />
              <Input
                className="bg-[#0f181e] text-white border border-[#6be4b920]"
                value={editItem.type}
                onChange={(e) =>
                  setEditItem({ ...editItem, type: e.target.value })
                }
                placeholder="Төрөл"
              />
              <Input
                className="bg-[#0f181e] text-white border border-[#6be4b920]"
                value={editItem.semester}
                onChange={(e) =>
                  setEditItem({ ...editItem, semester: e.target.value })
                }
                placeholder="Семестер"
              />
              <Input
                type="number"
                className="bg-[#0f181e] text-white border border-[#6be4b920]"
                value={editItem.school_year}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    school_year: parseInt(e.target.value),
                  })
                }
                placeholder="Жил"
              />
              <div className="md:col-span-2 flex gap-2">
                <Button
                  onClick={handleUpdate}
                  className="w-full bg-[#6be4b9] hover:bg-[#0f181e] text-[#0f181e] font-semibold"
                >
                  Хадгалах
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditItem(null)}
                  className="w-full border-[#6be4b9] text-[#6be4b9] hover:bg-[#0f181e]"
                >
                  Болих
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;
