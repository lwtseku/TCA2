import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const Home = async () => {
  const session = await auth();

  // 🔐 Session байхгүй бол sign-in хуудас руу буцаана
  if (!session || !session.user) {
    redirect("/auth/sign-in");
    return null;
  }

  // 👤 Нэвтэрсэн хэрэглэгчийн мэдээллийг авах
  const user = await prisma.users.findUnique({
    where: { email: session.user.email },
  });

  // Хэрэв хэрэглэгч олдохгүй бол sign-in хуудас руу буцаах
  if (!user) {
    redirect("/auth/sign-in");
    return null;
  }

  // 📚 Хичээлийн хуваарийн өгөгдлийг авах
  const timetableData = await prisma.timetable.findMany({
    where:
      user.role === "teacher"
        ? { teacher_id: user.user_id } // 👩‍🏫 Багшийн хувьд
        : { school_year: user.school_year || undefined }, // 👨‍🎓 Оюутны хувьд
    include: {
      lesson: true,
    },
  });

  // 🕒 Цагийн хуваарь болон өдрүүд
  const weekdays = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];
  const timeSlots = [
    "8:50 - 10:10",
    "10:20 - 11:40",
    "11:50 - 13:10",
    "14:00 - 15:20",
  ];

  // 📝 Цагийн хуваарьт хичээлийг харуулах функц
  const getLessonForTimeSlot = (day: string, slot: string) => {
    const startTime = slot.split(" - ")[0]; // "8:50" гэх мэт
    const entry = timetableData.find(
      (entry) => entry.weekdays === day && entry.start_time === startTime
    );
    return entry ? entry.lesson.lesson_name : "";
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* ✅ Dashboard Wrapper */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 🎉 Header Section */}
        <div className="flex items-center space-x-4">
          <img
            src={user.image || "/images/default-avatar.png"}
            alt="User Profile"
            className="w-20 h-20 rounded-full border border-gray-300"
          />
          <div>
            <h1 className="text-3xl font-bold">Сайн байна уу, {user.name}!</h1>
            <p className="text-gray-500">
              {user.role === "teacher"
                ? "Багш"
                : user.role === "student"
                ? "Оюутан"
                : "Админ"}
            </p>
          </div>
        </div>

        {/* 📚 Хичээлийн мэдээлэл */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Хичээлүүд</h2>
            <p className="text-gray-500">
              Та нийт {timetableData.length} хичээлтэй байна.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Эрх</h2>
            <p className="text-gray-500">
              {user.role === "teacher" ? "Багш" : "Оюутан"}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Курс</h2>
            <p className="text-gray-500">{user.school_year || "Хоосон"}</p>
          </div>
        </div>

        {/* 📅 Хичээлийн хуваарь */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {user.role === "teacher"
              ? "Багшийн Хуваарь"
              : "Оюутны Хуваарь (Курс " + user.school_year + ")"}
          </h2>
          {timetableData.length === 0 ? (
            <p className="text-center text-red-500">Мэдээлэл олдсонгүй</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-200 text-gray-700">
                  <th className="border px-4 py-2">Цаг</th>
                  {weekdays.map((day) => (
                    <th key={day} className="border px-4 py-2 bg-pink-300">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 bg-blue-100">{slot}</td>
                    {weekdays.map((day) => (
                      <td
                        key={`${day}-${slot}`}
                        className="border px-4 py-2 bg-pink-100 text-center"
                      >
                        {getLessonForTimeSlot(day, slot) || "Хичээл байхгүй"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 📝 Сүүлийн үйл ажиллагаа */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Сүүлийн үйл ажиллагаа</h2>
          <ul className="list-disc ml-5 text-gray-500">
            <li>Хичээл AI-д шинэ материал нэмэгдсэн.</li>
            <li>Системд амжилттай нэвтэрсэн.</li>
            <li>Багшийн хуваарь шинэчлэгдсэн.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
