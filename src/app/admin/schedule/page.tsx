"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Schedule {
  id: string;
  event: string;
  date: string;
}

interface GroupedSchedule {
  month: number;
  schedules: Schedule[];
}

const monthNames = [
  "Нэгдүгээр сар",
  "Хоёрдугаар сар",
  "Гуравдугаар сар",
  "Дөрөвдүгээр сар",
  "Тавдугаар сар",
  "Зургаадугаар сар",
  "Долоодугаар сар",
  "Наймдугаар сар",
  "Есдүгээр сар",
  "Аравдугаар сар",
  "Арваннэгдүгээр сар",
  "Арванхоёрдугаар сар",
];

const AdminSchedulePage = () => {
  const router = useRouter();
  const [schedules, setSchedules] = useState<GroupedSchedule[]>([]);
  const [newSchedule, setNewSchedule] = useState({ event: "", date: "" });
  const [editSchedule, setEditSchedule] = useState<Schedule>({
    id: "",
    event: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      const res = await fetch("/api/schedule");
      const data = await res.json();
      setSchedules(data);
      setLoading(false);
    };
    fetchSchedules();
  }, []);

  const handleAdd = async () => {
    if (!newSchedule.event || !newSchedule.date) {
      alert("Үйл явдал болон огноо шаардлагатай.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSchedule),
    });

    const result = await res.json();
    if (res.ok) {
      const month = new Date(result.date).getMonth();
      setSchedules((prev) => {
        const updated = [...prev];
        if (!updated[month]) {
          updated[month] = { month: month + 1, schedules: [] };
        }
        updated[month].schedules.push(result);
        return updated;
      });
      setNewSchedule({ event: "", date: "" });
    } else {
      alert(result.error || "Нэмэхэд алдаа гарлаа.");
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const res = await fetch("/api/schedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editSchedule),
    });

    const result = await res.json();
    if (res.ok) {
      setSchedules((prev) =>
        prev.map((group) =>
          group.month === new Date(result.date).getMonth() + 1
            ? {
                ...group,
                schedules: group.schedules.map((item) =>
                  item.id === result.id ? result : item
                ),
              }
            : group
        )
      );
      setEditSchedule({ id: "", event: "", date: "" });
    } else {
      alert(result.error || "Засахад алдаа гарлаа.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return;
    setLoading(true);
    const res = await fetch(`/api/schedule?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setSchedules((prev) =>
        prev.map((group) => ({
          ...group,
          schedules: group.schedules.filter((s) => s.id !== id),
        }))
      );
    } else {
      alert("Устгахад алдаа гарлаа.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
        >
          ← Буцах
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-900 flex-grow">
          📅 Админ Хуваарь Удирдлага
        </h1>
        <div className="w-24" /> {/* Placeholder */}
      </div>

      {/* Add New */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          ➕ Хуваарь нэмэх
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Үйл явдлын нэр"
            value={newSchedule.event}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, event: e.target.value })
            }
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newSchedule.date}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, date: e.target.value })
            }
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition"
        >
          {loading ? "Нэмж байна..." : "Нэмэх"}
        </button>
      </div>

      {/* Edit */}
      {editSchedule.id && (
        <div className="mb-6 bg-yellow-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-yellow-700 mb-4">
            ✏️ Хуваарь засах
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editSchedule.event}
              onChange={(e) =>
                setEditSchedule({ ...editSchedule, event: e.target.value })
              }
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="date"
              value={editSchedule.date}
              onChange={(e) =>
                setEditSchedule({ ...editSchedule, date: e.target.value })
              }
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition"
            >
              {loading ? "Шинэчлэх..." : "Шинэчлэх"}
            </button>
            <button
              onClick={() => setEditSchedule({ id: "", event: "", date: "" })}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Болих
            </button>
          </div>
        </div>
      )}

      {/* All Schedules */}
      <div className="space-y-8">
        {schedules.map((group) => (
          <div key={group.month}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">
              {monthNames[group.month - 1]}
            </h2>
            <ul className="space-y-3">
              {group.schedules.map((s) => (
                <li
                  key={s.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{s.event}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(s.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditSchedule(s)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                    >
                      Засах
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Устгах
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSchedulePage;
