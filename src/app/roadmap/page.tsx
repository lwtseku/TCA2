import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RoadmapPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const courses = [
    { school_year: "1", name: "1-р курс", color: "bg-yellow-400" },
    { school_year: "2", name: "2-р курс", color: "bg-red-500" },
    { school_year: "3", name: "3-р курс", color: "bg-blue-500" },
    { school_year: "4", name: "4-р курс", color: "bg-teal-500" },
    { school_year: "5", name: "5-р курс", color: "bg-green-400" },
  ];

  // Milestone бүрийн translateY утга
  const yTranslations = [
    "translate-y-[-70px]",
    "translate-y-[-20px]",
    "translate-y-[-10px]",
    "translate-y-[-70px]",
    "translate-y-[+20px]",
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-16 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4 text-center">Roadmap</h1>
      <p className="text-center max-w-2xl text-gray-600 mb-12">
        Оюутнуудад мэргэжлээ сонгоход нь туслах, суралцахад чиглүүлэх замын зураг.
      </p>

      <div className="w-full overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1100px] relative px-8 pb-20 h-[300px]">

          {/* 🛣 Зам */}
          <svg viewBox="0 0 1100 200" className="w-full h-52 absolute top-14 left-0 z-0">
            <path
              d="M 0 100 Q 150 0, 300 100 T 600 100 T 900 100 T 1100 100"
              stroke="#334155"
              strokeWidth="22"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 0 100 Q 150 0, 300 100 T 600 100 T 900 100 T 1100 100"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="15,10"
            />
          </svg>

          {/* 📍 Milestones */}
          <div className="relative flex justify-between items-end z-10 h-full pt-16">
            {courses.map((course, index) => (
              <div
                key={course.school_year}
                className={`flex flex-col items-center w-24 text-center transition-all duration-300 ${yTranslations[index]}`}
              >
                <p className="text-sm font-medium text-gray-800 mb-2">{course.name}</p>
                <Link
                  href={`/roadmap/${course.school_year}`}
                  className={`w-16 h-16 rounded-full ${course.color} flex items-center justify-center
                    text-white font-bold text-lg shadow-lg border-4 border-white
                    hover:scale-110 hover:shadow-xl transition duration-300`}
                >
                  {course.school_year}
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
