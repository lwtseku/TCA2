import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RoadmapPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const courses = [
    { id: "1st-course", name: "1-р курс" },
    { id: "2nd-course", name: "2-р курс" },
    { id: "3rd-course", name: "3-р курс" },
    { id: "4th-course", name: "4-р курс" },
    { id: "5th-course", name: "5-р курс" },
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
            key={course.id}
            href={`/roadmap/${course.id}`}
            className="px-6 py-4 bg-white shadow-md border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-center font-medium"
          >
            {course.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
