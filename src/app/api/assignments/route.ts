import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "teacher") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const course = Number(formData.get("course"));
  const file = formData.get("file") as File;

  const fileUrl = "https://fakeupload.com/" + file.name;

  const assignment = await prisma.assignment.create({
    data: {
      title,
      description,
      course,
      fileUrl,
      teacherId: session.user.user_id,
    },
  });

  return NextResponse.json(assignment);
}
