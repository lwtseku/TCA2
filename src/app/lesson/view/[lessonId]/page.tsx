import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation"; // Helper to handle 404 errors if the record is not found
import Lesson from "../../page";

// Initialize Prisma client
const prisma = new PrismaClient();

// Server component: Fetch the lesson data based on the lesson_code from the URL
const LessonView = async ({ params }: { params: { lessonId: string } }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const { lessonId } = await params;

  const addLesson = await prisma.lesson_list.findUnique({
    where: { lesson_code: lessonId },
  });
  const TeacherlessonList = await prisma.lesson.findMany({
    where: {
      lessonCode: lessonId,
      teacherId: session?.user.user_id, // Use the lesson_code from the URL
    },
  });
  const StudentlessonList = await prisma.lesson.findMany({
    where: {
      lessonCode: lessonId,
      school_year: session?.user.school_year, // Use the lesson_code from the URL
    },
  });

  // If lesson is not found, return a 404 page

  return (
    <div className="p-8 min-h-screen w-full space-y-4">
      {session.user.role === "teacher" && TeacherlessonList.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Teacher's Lesson List</h1>
          {TeacherlessonList.map((lesson) => (
            <div key={lesson.id}>
              <Link
                href={`/lesson/view/${lesson.lessonCode}/${lesson.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
              >
                <h3 className="text-xl font-semibol d">{lesson.title}</h3>
                <p className="text-gray-600">
                  {lesson.description || "No description available"}
                </p>
              </Link>
            </div>
          ))}
          <button>
            <Link href={`/lesson/view/add/${addLesson?.lesson_code}`}>
              Нэмэх
            </Link>
          </button>
        </>
      ) : session.user.role === "student" && StudentlessonList.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Student's Lesson List</h1>
          {StudentlessonList.map((lesson) => (
            <div key={lesson.id}>
              <Link
                href={`/lesson/view/${lesson.lessonCode}/${lesson.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
              >
                <h3 className="text-xl font-semibold">{lesson.title}</h3>
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

export default LessonView;
