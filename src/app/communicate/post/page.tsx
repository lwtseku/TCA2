import { auth } from "@/lib/auth";
import prisma from "@/lib/db"
import { redirect } from "next/navigation";
 
 
export default async function PostPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/auth/sign-in");
  }
 
  const currentUser = await prisma.users.findUnique({
    where: { email: session.user.email },
  });
 
  if (!currentUser) {
    redirect("/auth/sign-in");
  }
 
  // Сонголт хийх боломжит сургалтын жилүүд
  const schoolYears = [1, 2, 3, 4, 5];
 
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Пост бичих</h1>
        <form action="/api/post" method="POST" className="space-y-4">
          <input
            type="hidden"
            name="teacher_id"
            value={currentUser.user_id ?? ""}
          />
         
          <div>
            <label htmlFor="school_year" className="block">Сургалтын жил</label>
            <select
              id="school_year"
              name="school_year"
              className="border rounded p-2"
            >
              {schoolYears.map((year) => (
                <option key={year} value={year}>
                  МКТК {year}-р анги
                </option>
              ))}
            </select>
          </div>
 
          <div>
            <input
              type="text"
              name="title"
              placeholder="Постын гарчиг"
              className="border rounded p-2 w-full"
              required
            />
          </div>
 
          <div>
            <textarea
              name="body"
              placeholder="Постын агуулга..."
              className="border rounded p-2 w-full"
              required
            />
          </div>
 
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Пост нэмэх
          </button>
        </form>
      </div>
    </div>
  );
}