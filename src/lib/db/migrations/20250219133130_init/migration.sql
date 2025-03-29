-- CreateTable
CREATE TABLE "Lesson_list" (
    "lesson_code" TEXT NOT NULL PRIMARY KEY,
    "lesson_name" TEXT,
    "credits" INTEGER NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "teacher_id" TEXT NOT NULL,
    CONSTRAINT "Lesson_list_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_list_lesson_code_key" ON "Lesson_list"("lesson_code");
