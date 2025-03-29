/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson_ppt_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson_video_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subjects` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Lesson_list` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `semester` on the `Lesson_list` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Lesson_list` table. All the data in the column will be lost.
  - The required column `id` was added to the `Lesson_list` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `teacher_id` to the `Timetable` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `school_year` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Chat";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lesson_ppt_files";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lesson_video_files";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Posts";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Subjects";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson_list" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lesson_code" TEXT NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "description" TEXT,
    "teacher_id" TEXT NOT NULL,
    CONSTRAINT "Lesson_list_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lesson_list" ("credits", "description", "lesson_code", "lesson_name", "teacher_id") SELECT "credits", "description", "lesson_code", "lesson_name", "teacher_id" FROM "Lesson_list";
DROP TABLE "Lesson_list";
ALTER TABLE "new_Lesson_list" RENAME TO "Lesson_list";
CREATE UNIQUE INDEX "Lesson_list_lesson_code_key" ON "Lesson_list"("lesson_code");
CREATE TABLE "new_Timetable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lesson_code" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "weekdays" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "school_year" INTEGER NOT NULL,
    CONSTRAINT "Timetable_lesson_code_fkey" FOREIGN KEY ("lesson_code") REFERENCES "Lesson_list" ("lesson_code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Timetable_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Timetable" ("end_time", "id", "lesson_code", "school_year", "start_time", "weekdays") SELECT "end_time", "id", "lesson_code", "school_year", "start_time", "weekdays" FROM "Timetable";
DROP TABLE "Timetable";
ALTER TABLE "new_Timetable" RENAME TO "Timetable";
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "school_year" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("createdAt", "email", "emailVerified", "id", "image", "name", "password", "role", "school_year", "updatedAt", "user_id") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "password", "role", "school_year", "updatedAt", "user_id" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_user_id_key" ON "Users"("user_id");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
