import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const Lesson = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const Teacherlessonlist = await prisma.lesson_list.findMany({
    where: { teacher_id: session?.user.user_id },
  });
  const Studentlessonlist = await prisma.lesson_list.findMany({
    where: { school_year: session?.user.school_year },
  });

  return (
    <div className="p-8 min-h-screen w-full space-y-4">
      {session.user.role === "teacher" && Teacherlessonlist.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Teacher's Lesson List</h1>
          {Teacherlessonlist.map((lesson) => (
            <div key={lesson.lesson_code}>
              <Link
                href={`/lesson/view/${lesson.lesson_code}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
              >
                <h1>Hicheel uzeh</h1>
                <h3 className="text-xl font-semibold">{lesson.lesson_name}</h3>
                <p className="text-gray-600">
                  {lesson.description || "No description available"}
                </p>
              </Link>
              <Link
                href={`/lesson/add/${lesson.lesson_code}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
              >
                <h1>Hicheel nemeh</h1>
                <h3 className="text-xl font-semibold">{lesson.lesson_name}</h3>
                <p className="text-gray-600">
                  {lesson.description || "No description available"}
                </p>
              </Link>
            </div>
          ))}
        </>
      ) : session.user.role === "student" && Studentlessonlist.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Student's Lesson List</h1>
          {Studentlessonlist.map((lesson) => (
            <div key={lesson.lesson_code}>
              <Link
                href={`/lesson/view/${lesson.lesson_code}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
              >
                <h1>Hicheel uzeh</h1>
                <h3 className="text-xl font-semibold">{lesson.lesson_name}</h3>
                <p className="text-gray-600">
                  {lesson.description || "No description available"}
                </p>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <p className="text-gray-500">No lessons found.</p>
      )}
    </div>
  );
};

export default Lesson;
