/*
  Warnings:

  - Added the required column `semester` to the `Lesson_list` table without a default value. This is not possible if the table is not empty.
  - Made the column `lesson_name` on table `Lesson_list` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Timetable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lesson_code" TEXT NOT NULL,
    "weekdays" TEXT NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "school_year" INTEGER NOT NULL,
    CONSTRAINT "Timetable_lesson_code_fkey" FOREIGN KEY ("lesson_code") REFERENCES "Lesson_list" ("lesson_code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lesson_ppt_files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lesson_code" TEXT NOT NULL,
    "uploaded_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_path" TEXT NOT NULL,
    CONSTRAINT "Lesson_ppt_files_lesson_code_fkey" FOREIGN KEY ("lesson_code") REFERENCES "Lesson_list" ("lesson_code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lesson_video_files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lesson_code" TEXT NOT NULL,
    "uploaded_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "video_path" TEXT NOT NULL,
    CONSTRAINT "Lesson_video_files_lesson_code_fkey" FOREIGN KEY ("lesson_code") REFERENCES "Lesson_list" ("lesson_code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Posts" (
    "post_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "writer_id" TEXT NOT NULL,
    "lesson_code" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Posts_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Posts_lesson_code_fkey" FOREIGN KEY ("lesson_code") REFERENCES "Lesson_list" ("lesson_code") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chat" (
    "chat_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Chat_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Chat_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subjects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "year" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "description" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson_list" (
    "lesson_code" TEXT NOT NULL PRIMARY KEY,
    "lesson_name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    CONSTRAINT "Lesson_list_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Lesson_list" ("credits", "description", "lesson_code", "lesson_name", "teacher_id", "year") SELECT "credits", "description", "lesson_code", "lesson_name", "teacher_id", "year" FROM "Lesson_list";
DROP TABLE "Lesson_list";
ALTER TABLE "new_Lesson_list" RENAME TO "Lesson_list";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
