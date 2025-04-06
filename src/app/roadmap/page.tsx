import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RoadmapPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  // Updated courses array with ids
  const courses = [
    { school_year: "1", name: "1-р курс" },
    { school_year: "2", name: "2-р курс" },
    { school_year: "3", name: "3-р курс" },
    { school_year: "4", name: "4-р курс" },
    { school_year: "5", name: "5-р курс" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-gray-100 to-white text-gray-900 px-6 py-10">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Roadmap</h1>
      <p className="text-lg text-center max-w-2xl mb-10 leading-relaxed">
        Оюутнуудад мэргэжлээ сонгоход нь туслах, суралцахад туслах замын зураг,
        гарын авлага болон агуулгыг бий болгох юм.
      </p>

      {/* Course Links */}
      <div className="grid grid-cols-1 gap-6 w-full max-w-3xl sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course.school_year}
            href={`/roadmap/${course.school_year}`} // Use course.id in the URL
            className="px-6 py-4 bg-white shadow-md border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-center font-medium"
          >
            {course.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
