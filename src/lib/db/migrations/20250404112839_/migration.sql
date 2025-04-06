-- CreateTable
CREATE TABLE "Roadmap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lesson_code" TEXT NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "type" TEXT,
    "semester" TEXT,
    "school_year" INTEGER
);
