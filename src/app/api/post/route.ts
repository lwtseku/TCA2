import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Өгөгдөл авахаар formData ашиглах
    const formData = await req.formData();
    const school_year = formData.get("school_year") as string;
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    // Бүх талбар зөв авсан эсэхийг шалгах
    if (!title || !school_year || !body) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Хэрэглэгчийн нэвтрэх сессийг шалгах
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }

    // Хэрэглэгчийн имэйл
    const email = session.user.email!;
    if (!email) {
      throw new Error("Email is required");
    }

    const currentUser = await prisma.users.findUnique({
      where: { email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Сургалтын жил (school_year)-ийг тоон төрөлд хөрвүүлэх
    const parsedSchoolYear = parseInt(school_year, 10);
    if (isNaN(parsedSchoolYear)) {
      return NextResponse.json(
        { error: "Invalid school_year format" },
        { status: 400 }
      );
    }

    // Шинэ пост үүсгэх
    const newPost = await prisma.post.create({
      data: {
        teacher_id: currentUser.user_id, // Нэвтэрсэн хэрэглэгчийн user_id ашиглана
        title,
        body,
        school_year: parsedSchoolYear, // Сургалтын жил хадгалагдана
      },
    });

    return NextResponse.redirect(
      new URL(`/communicate/teacher_post?year=${parsedSchoolYear}`, req.url)
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error saving post" }, { status: 500 });
  }
}
