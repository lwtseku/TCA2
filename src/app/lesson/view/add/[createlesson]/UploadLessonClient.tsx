"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadLessonClient({
  lessonCode,
  teacherId,
}: {
  lessonCode: string;
  teacherId: string;
}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schoolYear, setSchoolYear] = useState<number>();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [previewPdf, setPreviewPdf] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPdfFile(file || null);
    setPreviewPdf(file ? URL.createObjectURL(file) : null);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setVideoFile(file || null);
    setPreviewVideo(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teacherId) {
      alert("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("lessonCode", lessonCode);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("schoolYear", String(schoolYear));
    formData.append("teacherId", teacherId);
    if (pdfFile) formData.append("pdf", pdfFile);
    if (videoFile) formData.append("video", videoFile);

    const res = await fetch(`/lesson/view/add/${lessonCode}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push(`/lesson/view/${lessonCode}`);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Upload Lesson</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Lesson Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="School Year"
          value={schoolYear ?? ""}
          onChange={(e) => setSchoolYear(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
        <div>
          <label>Upload PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
          />
          {previewPdf && (
            <embed
              src={previewPdf}
              type="application/pdf"
              className="mt-2 w-full h-48"
            />
          )}
        </div>
        <div>
          <label>Upload Video:</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          {previewVideo && (
            <video src={previewVideo} controls className="mt-2 w-full h-48" />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
