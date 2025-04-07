import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation"; // Helper to handle 404 errors if the record is not found

// Initialize Prisma client
const prisma = new PrismaClient();

// Server component: Fetch the lesson data based on the lesson_code from the URL
const LessonView = async ({ params }: { params: { lessonView: any } }) => {
  const { lessonView } = await params;
  const parsedLessonId = parseInt(lessonView, 10); // Parse the lessonId as an integer
  const Lesson = await prisma.lesson.findUnique({
    where: { id: parsedLessonId },
  });

  // If lesson is not found, return a 404 page

  return (
    <div className="p-8 min-h-screen w-full space-y-4">
      {Lesson?.description}
      {Lesson?.videoUrl ? (
        <video controls width="100%" src={Lesson.videoUrl}>
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video available</p> // Show this message if there is no video URL
      )}
      <embed
        src={Lesson.pdfUrl}
        type="application/pdf"
        width="100%"
        height="600px"
      />
    </div>
  );
};

export default LessonView;
