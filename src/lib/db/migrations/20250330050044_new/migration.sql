/*
  Warnings:

  - You are about to drop the `Lesson_ppt_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson_video_files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lesson_ppt_files";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lesson_video_files";
PRAGMA foreign_keys=on;
