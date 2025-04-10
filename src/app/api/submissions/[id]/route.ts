// 📁 app/api/submissions/[id]/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || session.user.role !== "teacher") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { score } = await req.json();

  const submission = await prisma.submission.update({
    where: { id: params.id },
    data: { score },
  });

  return NextResponse.json(submission);
}
