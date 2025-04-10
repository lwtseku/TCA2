import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "student") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const assignmentId = formData.get("assignmentId") as string;
  const file = formData.get("file") as File;

  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    select: { teacherId: true },
  });

  if (!assignment) {
    return new NextResponse("Assignment not found", { status: 404 });
  }

  const fileUrl = "https://fakeupload.com/" + file.name; // Stub for upload

  const submission = await prisma.submission.create({
    data: {
      assignmentId,
      studentId: session.user.user_id,
      teacherId: assignment.teacherId,
      fileUrl,
    },
  });

  return NextResponse.json(submission);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get("teacherId");

  if (!teacherId) {
    return new NextResponse("Missing teacherId", { status: 400 });
  }

  const submissions = await prisma.submission.findMany({
    where: { teacherId },
    include: {
      student: true,
      assignment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(submissions);
}
