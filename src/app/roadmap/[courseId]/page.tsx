"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Define the course structure
const courseData = {
  "1st-course": {
    title: "1-р курс",
    description: "Намар, Хавар улиралд судлах хичээлүүд.",
    semesters: [
      {
        name: "Намар",
        courses: {
          "Суурь/Ерөнхий": [1, 2, 3, 4, 5, 6],
          "Мэргэжлийн суурь": [
            { name: "Тоон хэлхээ", info: "This is a digital circuits course." },
            { name: "Математик I", info: "Advanced Mathematics course." },
          ],
        },
      },
      {
        name: "Хавар",
        courses: {
          "Суурь/Ерөнхий": [1, 2, 3, 4, 5],
          "Мэргэжлийн суурь": [
            { name: "Програмчлал I", info: "Introduction to programming." },
            { name: "Алгоритм", info: "Advanced algorithms." },
          ],
        },
      },
    ],
  },
  "2nd-course": {
    title: "2-р курс",
    description: "2-р курсын оюутнуудад зориулсан хичээлүүд.",
    semesters: [
      {
        name: "Намар",
        courses: {
          "Мэргэжлийн суурь": [
            { name: "Програмчлал II", info: "Intermediate programming." },
            {
              name: "Өгөгдлийн бүтэц",
              info: "Data structures and algorithms.",
            },
          ],
        },
      },
    ],
  },
};

export default function CoursePage() {
  const { courseId } = useParams();
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  // Fetch course data based on courseId
  useEffect(() => {
    if (courseId && courseData[courseId]) {
      setSelectedCourse(courseData[courseId]);
    } else {
      setSelectedCourse(null); // Handle invalid courseId
    }
  }, [courseId]);

  if (!selectedCourse) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500">Хичээл олдсонгүй!</h1>
      </div>
    );
  }

  const { title, description, semesters } = selectedCourse;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-6">{description}</p>

      {/* Semester Sections */}
      <div className="space-y-8">
        {semesters.map((semester, index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">{semester.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(semester.courses).map(([category, items]) => (
                <div key={category} className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">{category}</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    {items.map((item, index) =>
                      typeof item === "object" ? (
                        <li key={index} className="text-gray-700">
                          <strong>{item.name}</strong> - {item.info}
                        </li>
                      ) : (
                        <li key={index} className="text-gray-700">
                          Class {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
