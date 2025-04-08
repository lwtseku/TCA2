// api/home-timetable/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db"; // Prisma client

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get("teacher_id");
    const schoolYear = searchParams.get("school_year");

    console.log("teacherId:", teacherId, "schoolYear:", schoolYear);

    // Ensure both are provided
    if (!teacherId && !schoolYear) {
      return NextResponse.json(
        { error: "teacher_id or school_year is required" },
        { status: 400 }
      );
    }

    // Fetch timetable based on the available data
    const timetable = await db.timetable.findMany({
      where: {
        ...(teacherId && { teacher_id: teacherId }),
        ...(schoolYear && { school_year: parseInt(schoolYear) }),
      },
      include: {
        lesson: true, // Ensure lesson details are included
        teacher: true, // Ensure teacher details are included
      },
    });

    if (timetable.length === 0) {
      return NextResponse.json(
        { error: "No timetable found for the given teacher or school year" },
        { status: 404 }
      );
    }

    return NextResponse.json(timetable);
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return NextResponse.json(
      { error: "Failed to fetch timetable" },
      { status: 500 }
    );
  }
}
