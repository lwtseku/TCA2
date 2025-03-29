-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson_list" (
    "lesson_code" TEXT NOT NULL PRIMARY KEY,
    "lesson_name" TEXT,
    "credits" INTEGER NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "teacher_id" TEXT NOT NULL
);
INSERT INTO "new_Lesson_list" ("credits", "description", "lesson_code", "lesson_name", "teacher_id", "year") SELECT "credits", "description", "lesson_code", "lesson_name", "teacher_id", "year" FROM "Lesson_list";
DROP TABLE "Lesson_list";
ALTER TABLE "new_Lesson_list" RENAME TO "Lesson_list";
CREATE UNIQUE INDEX "Lesson_list_lesson_code_key" ON "Lesson_list"("lesson_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
