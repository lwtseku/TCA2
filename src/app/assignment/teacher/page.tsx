"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function TeacherAssignmentPage() {
  const { data: session } = useSession();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (session?.user?.user_id) {
      axios
        .get(`/api/submissions?teacherId=${session.user.user_id}`)
        .then((res) => setSubmissions(res.data));
    }
  }, [session]);

  const handleScoreChange = async (id: string, score: number) => {
    await axios.patch(`/api/submissions/${id}`, { score });
    alert("Үнэлгээ өглөө!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">📥 Ирсэн даалгаврууд</h1>
      <div className="space-y-6">
        {submissions.map((s: any) => (
          <div key={s.id} className="bg-[#374848] p-4 rounded-lg shadow">
            <p className="font-semibold">
              {s.student.school_year}-5 {s.student.name}
            </p>
            <a
              href={s.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              📎 Файл харах
            </a>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                placeholder="Оноо"
                defaultValue={s.score || ""}
                className="w-24 px-2 py-1 bg-[#2e3d3e] text-white border border-gray-600 rounded"
                onBlur={(e) =>
                  handleScoreChange(s.id, parseInt(e.target.value, 10))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
