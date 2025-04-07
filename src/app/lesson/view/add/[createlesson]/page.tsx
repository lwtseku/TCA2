// app/lesson/view/add/[createlesson]/page.tsx
import UploadLessonClient from "./UploadLessonClient";
import { auth } from "@/lib/auth";

export default async function CreateLessonPage({
  params,
}: {
  params: { createlesson: string };
}) {
  // Option 1: Destructure directly in the parameter signature
  const { createlesson } = await params; // <-- This might still trigger the warning

  // Option 2: Explicitly await the params (wrap in Promise.resolve to quiet the linter)
  // const { createlesson } = await Promise.resolve(params);

  const session = await auth();

  return (
    <UploadLessonClient
      lessonCode={createlesson}
      teacherId={session?.user?.user_id || ""}
    />
  );
}
