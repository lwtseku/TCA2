import { PrismaClient, Semester, TypesGP } from "@prisma/client";

const prisma = new PrismaClient();

async function createLessonList() {
  try {
    const newLessonList = await prisma.lesson_list.createMany({
      data: [
        {
          lesson_code: "KIT101",
          lesson_name: "Мэдээллийн технологийн үндэс",
          credits: 2,
          school_year: 1,
          type: TypesGP.Pro,
          semester: Semester.Намар,
        },

        {
          lesson_code: "KEL101",
          lesson_name: "Бүтээх ухааны үндэс",
          credits: 1,
          school_year: 1,
          type: TypesGP.Pro,
          semester: Semester.Хавар,
        },
        {
          lesson_code: "KML101",
          lesson_name: "Монгол хэл",
          credits: 1,
          school_year: 1,
          type: TypesGP.Gen,
          semester: Semester.Намар,
        },
        {
          lesson_code: "KEN102",
          lesson_name: "Англи хэл I B",
          credits: 2,
          school_year: 1,
          type: TypesGP.Gen,
          semester: Semester.Намар,
        },
      ],
    });

    console.log("Lesson List Created:", newLessonList);
  } catch (error) {
    console.error("Error creating Lesson List:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createLessonList();
