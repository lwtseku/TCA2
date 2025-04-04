-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson_list" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lesson_code" TEXT NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "description" TEXT,
    "teacher_id" TEXT,
    "school_year" INTEGER,
    "semester" TEXT,
    CONSTRAINT "Lesson_list_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lesson_list" ("credits", "description", "id", "lesson_code", "lesson_name", "school_year", "semester", "teacher_id") SELECT "credits", "description", "id", "lesson_code", "lesson_name", "school_year", "semester", "teacher_id" FROM "Lesson_list";
DROP TABLE "Lesson_list";
ALTER TABLE "new_Lesson_list" RENAME TO "Lesson_list";
CREATE UNIQUE INDEX "Lesson_list_lesson_code_key" ON "Lesson_list"("lesson_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
