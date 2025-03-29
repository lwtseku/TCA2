import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/actions";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  if (session.user.role !== "admin") redirect("/");
  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Оюутан нэмэх</h1>

      {/* Email/Password Sign Up */}
      <form
        className="space-y-4"
        action={async (formData: FormData) => {
          "use server";
          const res = await signUp(formData);
        }}
      >
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          autoComplete="new-password"
        />
        <Input
          name="user_id"
          placeholder="user_id"
          required
          autoComplete="new-user_id"
        />
        <Input
          name="school_year"
          placeholder="school_year"
          required
          autoComplete="new-school_year"
        />
        <Input
          name="role"
          placeholder="role"
          required
          autoComplete="new-role"
        />
        <Input
          name="name"
          placeholder="name"
          required
          autoComplete="new-name"
        />

        <Button className="w-full" type="submit">
          Нэмэх
        </Button>
      </form>
    </div>
  );
};

export default Page;
