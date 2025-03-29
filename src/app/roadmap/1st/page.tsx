"use client";
import { useState } from "react";

interface CourseCategoryProps {
  title: string;
  items: (string | { name: string; info: string })[];
}

interface Course {
  name: string;
  info: string;
}

export default function CourseLayout() {
  const semesters = [
    {
      name: "Намар",
      courses: {
        "Суурь/Ерөнхий": [1, 2, 3, 4, 5, 6],
        "Мэргэжлийн суурь": [
          ...[1, 2],
          { name: "Тоон хэлхээ", info: "This is a digital circuits course." },
          { name: "Тоон хэлхээ2", info: "Advanced digital circuits." },
          { name: "Тоон хэлхээ3", info: "Digital circuits project." },
        ],
      },
    },
    {
      name: "Хавар",
      courses: {
        "Суурь/Ерөнхий": [1, 2, 3, 4, 5, 6, 7],
        "Мэргэжлийн суурь": [
          1,
          2,
          { name: "Custom Course", info: "Custom info." },
        ],
      },
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Corrected type

  const CourseCategory: React.FC<CourseCategoryProps> = ({ title, items }) => (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) =>
          typeof item === "object" ? (
            <div
              key={index}
              className="bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300"
              onClick={() => setSelectedCourse(item)}
            >
              {item.name}
            </div>
          ) : (
            <div
              key={index}
              className="bg-amber-100 p-2 rounded"
              onClick={() =>
                setSelectedCourse({
                  name: `Class ${item}`,
                  info: `Details for Class ${item}`,
                })
              }
            >
              Class {item}
            </div>
          )
        )}
      </div>
    </div>
  );

  const SemesterSection = ({ name, courses }) => (
    <section className="space-y-4">
      <div className="bg-blue-500 text-white p-2 text-center rounded-md">
        {name}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(courses).map(([category, items]) => (
          <CourseCategory key={category} title={category} items={items} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 p-2 border rounded-lg inline-block text-black">
        1-р курс
      </h1>

      {/* Course Details Section */}
      {selectedCourse && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-100 shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">
            {selectedCourse.name || "Course Details"}
          </h2>
          <p>{selectedCourse.info || "No additional information available."}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => setSelectedCourse(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* Semester Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {semesters.map((semester, index) => (
          <SemesterSection
            key={index}
            name={semester.name}
            courses={semester.courses}
          />
        ))}
      </div>
    </div>
  );
}
