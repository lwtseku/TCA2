import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const ChatPage = async () => {
  const session = await auth();

  if (!session) return <p>Та эхлээд нэвтэрнэ үү.</p>;

  // 👥 Бүх хэрэглэгчийг DB-ээс татна
  const allUsers = await prisma.users.findMany({
    where: {
      NOT: {
        user_id: session.user.user_id, // өөрийг нь жагсаалтаас хасах
      },
    },
    select: {
      name: true,
      user_id: true,
    },
  });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Тавтай морил, {session.user.name}</h2>
      <p className="text-gray-500">Таны ID (sender): {session.user.user_id}</p>

      <div className="mt-6">
        <h3 className="font-semibold">Хэнд мессеж илгээх вэ?</h3>
        <ul className="space-y-2 mt-2">
          {allUsers.map((user) => (
            <li
              key={user.user_id}
              className="flex justify-between items-center border px-4 py-2 rounded"
            >
              <span>{user.name}</span>
              <span className="text-sm text-gray-500">ID: {user.user_id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
