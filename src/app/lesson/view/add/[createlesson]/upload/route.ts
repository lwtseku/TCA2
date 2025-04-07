import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mkdir } from "fs/promises";
import path from "path";
import { IncomingForm } from "formidable";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public/uploads");

export async function POST(req: NextRequest) {
  await mkdir(uploadDir, { recursive: true });

  // 🧠 Convert Web ReadableStream → Node ReadableStream
  const contentType = req.headers.get("content-type") || "";
  const contentLength = req.headers.get("content-length");

  if (!contentLength) {
    return NextResponse.json(
      { error: "Missing content-length" },
      { status: 411 }
    );
  }

  const bodyBuffer = await req.arrayBuffer();
  const stream = Readable.from(Buffer.from(bodyBuffer));

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024, // 100MB
  });

  return new Promise((resolve, reject) => {
    // 🧠 Patch: manually inject headers needed by formidable
    (stream as any).headers = {
      "content-type": contentType,
      "content-length": contentLength,
    };

    form.parse(stream, async (err, fields, files) => {
      if (err) {
        console.error("Upload error:", err);
        return resolve(
          NextResponse.json({ error: "Form parse error" }, { status: 500 })
        );
      }

      try {
        const lessonCode = fields.lessonCode?.[0];
        const title = fields.title?.[0];
        const description = fields.description?.[0];
        const schoolYear = Number(fields.schoolYear?.[0]);
        const teacherId = fields.teacherId?.[0];

        const pdf = files.pdf?.[0];
        const video = files.video?.[0];

        const pdfUrl = pdf ? `/uploads/${path.basename(pdf.filepath)}` : null;
        const videoUrl = video
          ? `/uploads/${path.basename(video.filepath)}`
          : null;

        await prisma.lesson.create({
          data: {
            lessonCode,
            title,
            description,
            school_year: schoolYear,
            teacherId,
            pdfUrl: pdfUrl ?? undefined,
            videoUrl: videoUrl ?? undefined,
          },
        });

        return resolve(NextResponse.json({ success: true }));
      } catch (err) {
        console.error("DB Error:", err);
        return resolve(
          NextResponse.json({ error: "DB save failed" }, { status: 500 })
        );
      }
    });
  });
}
