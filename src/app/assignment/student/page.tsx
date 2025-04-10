"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function StudentAssignmentPage() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState([]);
  const [fileMap, setFileMap] = useState<Record<string, File | null>>({});

  useEffect(() => {
    if (session?.user?.school_year) {
      axios
        .get(`/api/assignments?course=${session.user.school_year}`)
        .then((res) => setAssignments(res.data));
    }
  }, [session]);

  const handleFileChange = (assignmentId: string, file: File | null) => {
    setFileMap((prev) => ({ ...prev, [assignmentId]: file }));
  };

  const handleSubmit = async (assignmentId: string) => {
    const file = fileMap[assignmentId];
    if (!file) return alert("Файл сонгоно уу!");

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("file", file);

    await axios.post("/api/submissions", formData);
    alert("Илгээсэн!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">🎒 Хүлээгдэж буй даалгаврууд</h1>
      <div className="space-y-6">
        {assignments.map((a: any) => (
          <div key={a.id} className="bg-[#2e3d3e] p-4 rounded-lg shadow">
            <div className="text-lg font-semibold">{a.title}</div>
            <p className="text-sm text-gray-400">{a.description}</p>
            <input
              type="file"
              className="mt-2"
              onChange={(e) =>
                handleFileChange(a.id, e.target.files?.[0] || null)
              }
            />
            <button
              onClick={() => handleSubmit(a.id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Илгээх
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
