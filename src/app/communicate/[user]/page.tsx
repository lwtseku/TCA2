import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ChatPage({
  params,
}: {
  params: { user: string };
}) {
  const session = await auth();
  if (!session || !session.user) redirect("/sign-in");

  const email = session.user.email!;
  const currentUser = await prisma.users.findUnique({ where: { email } });
  if (!currentUser) redirect("/sign-in");

  const selectedUserId = params.user;

  const selectedUser = await prisma.users.findUnique({
    where: { user_id: selectedUserId },
    select: { name: true },
  });

  const messages = await prisma.chat.findMany({
    where: {
      OR: [
        { sender_id: currentUser.user_id, reciever_id: selectedUserId },
        { sender_id: selectedUserId, reciever_id: currentUser.user_id },
      ],
    },
    orderBy: { created_at: "asc" },
  });

  const allUsers = await prisma.users.findMany({
    where: { user_id: { not: currentUser.user_id } },
    select: { user_id: true, name: true },
  });

  const selectedButton =
    currentUser.role === "teacher"
      ? "/communicate/teacher_post"
      : "/communicate/student_post";

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 overflow-hidden">

      {/* Main Layout */}
      <div className="flex w-full bg-gray-100 h-full">
        
        {/* Chat Section */}
        <div className="w-9/12 flex flex-col bg-gray-100  p-2 m-0 min-h-0">
          {/* Scrollable Chat Box */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4">
            <div className=" bg-gradient-to-br from-[#a0bbdf] from-40% to-[#c68c8c]  shadow-xl shadow-white rounded-md p-3 mb-3 flex items-center space-x-5">
              <img
                src="https://png.pngtree.com/png-vector/20220210/ourmid/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_4384273.png"
                className="w-14 ml-5 h-14 rounded-full border border-blue-500 shadow"
              />
              <h2 className="text-xl font-bold text-gray-100">
                {selectedUser?.name ?? "Хэрэглэгч"}
              </h2>
            </div>
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center pt-10">
                Мессеж алга байна.
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.chat_id}
                  className={`m-4 mb-0 ${
                    msg.sender_id === currentUser.user_id
                      ? "text-right"
                      : "text-left "
                  }`}
                >
                  <span className="inline-block bg-[#b6d0f2] text-center h-auto text-gray-700 w-auto px-3 py-2 rounded">
                    {msg.message}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <form
            action="/api/chat"
            method="POST"
            className="sticky bottom-0 rounded-lg z-10 mt-3 flex items-center mb-0  p-1"
          >
            <input type="hidden" name="senderId" value={currentUser.user_id} />
            <input type="hidden" name="receiverId" value={selectedUserId} />
            <input
              name="message"
              placeholder="Мессеж бичих..."
              className="flex-1 p-3 m-3 mb-0 px-9 border-4 border-white bg-gwhite rounded-s-lg text-gray-700 mr-0"
            />
            <button
              type="submit"
              className="px-4 m-2 ml-0 mb-0 py-3 border-4 border-white bg-[#5584c6] text-white font-semibold rounded-e-lg"
            >
              Илгээх
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center bg-white shadow-xl h-full pt-3 pl-10 ml-0 pr-6">
          <div className="flex flex-col bg-gradient-to-br from-[#a0bbdf] from-40% to-[#c68c8c]  p-6 w-[350px] h-[180px] rounded-xl items-center justify-center px-0 mt-3">
            <img
              src="https://png.pngtree.com/png-vector/20220210/ourmid/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_4384273.png"
              alt="User Profile"
              className="w-16 h-16 rounded-full mr-0 mb-4 shadow-md"
            />
            <div className="text-center">
              <h1 className="text-xl text-gray-100 font-semibold">
                {currentUser.name}
              </h1>
              <p className="text-md text-gray-200">
                {currentUser.role === "teacher" ? "Багш" : "Оюутан"}
              </p>
            </div>
          </div>
          {/* Sidebar */}
          <div className="bg-white rounded-xl overflow-y-auto pt-4 mt-8 mb-4">
            <ul className="space-y-5">
              {allUsers.map((user) => (
                <li
                  key={user.user_id}
                  className="flex items-center w-[330px] shadow space-x-3 p-2 ml-0 hover:bg-[#5584c6] rounded-full"
                >
                  <img
                    src="https://png.pngtree.com/png-vector/20220210/ourmid/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_4384273.png"
                    className="w-10 h-10 rounded-full shadow "
                  />
                  <Link
                    href={`/communicate/${user.user_id}`}
                    className="text-gray-700 hover:text-black text-lg font-semibold"
                  >
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
