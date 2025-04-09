import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in"); // Redirect if user is not logged in
  }

  const roleRoutes: Record<string, string> = {
    admin: "/sign-up",
    student: "/home",
    teacher: "/home",
  };

  // Redirect user based on their role
  redirect(roleRoutes[session.user.role] || "/");
}
