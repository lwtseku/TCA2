import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  // Redirect if user is not logged in
  if (!session) redirect("/sign-in");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        {/* User Info Section */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {session.user.name} role:{" "}
            <span className="font-bold text-blue-600">{session.user.role}</span>
          </h2>
        </div>

        {/* Navigation Button */}
        <Button
          asChild
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          <Link href="/role-redirect">Нэвтрэх</Link>
        </Button>

        {/* Sign Out Button */}
        <div className="mt-4 flex justify-center">
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default Page;
