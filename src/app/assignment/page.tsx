// app/assignment/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AssignmentRedirect = async () => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  if (session.user.role === "teacher") {
    redirect("/assignment/teacher");
  } else if (session.user.role === "student") {
    redirect("/assignment/student");
  } else {
    return <p>Unknown role</p>;
  }
};

export default AssignmentRedirect;
