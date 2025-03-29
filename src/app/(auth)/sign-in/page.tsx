import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, signIn } from "@/lib/auth";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Нэвтрэх</h1>

      {/* Email/Password Sign In */}
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";
          await executeAction({
            actionFn: async () => {
              await signIn("credentials", formData);
            },
          });
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
          placeholder="Нууц үг"
          type="password"
          required
          autoComplete="current-password"
        />

        <Button className="w-full" type="submit">
          Нэвтрэх
        </Button>
      </form>
    </div>
  );
};

export default Page;
