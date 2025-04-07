import { PrismaClient, Semester, TypesGP } from "@prisma/client";

const prisma = new PrismaClient();

async function createLessonList() {
  try {
    await prisma.lesson.update({
      where: {
        lesson_code: "RC105", // Specify the lesson to update
      },
      data: {
        teacher_id: null, // Unlink teacher by setting the foreign key to null
      },
    });
  } catch (error) {
    console.error("Error creating Lesson List:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createLessonList();
