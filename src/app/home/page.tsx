import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import Timetable from "@/components/timetable";
const Home = async () => {
  const session = await auth();
  const userRole = session?.user.role;
  const timetableData = await prisma.timetable.findMany();
  if (!session) redirect("/sign-in");

  const timetableData1 = [
    {
      id: 1,
      lesson_code: "AI101",
      teacher_id: "95524453",
      weekdays: "Даваа",
      start_time: "8:50",
      end_time: "10:10",
      school_year: 5,
    },
    {
      id: 2,
      lesson_code: "KU103",
      teacher_id: "88118811",
      weekdays: "Даваа",
      start_time: "10:20",
      end_time: "11:40",
      school_year: 5,
    },
    {
      id: 3,
      lesson_code: "KU103",
      teacher_id: "88118811",
      weekdays: "Даваа",
      start_time: "11:50",
      end_time: "1:10",
      school_year: 5,
    },
    {
      id: 4,
      lesson_code: "RC105",
      teacher_id: "99119911",
      weekdays: "Даваа",
      start_time: "2:00",
      end_time: "3:20",
      school_year: 5,
    },
  ];

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = [
    "8:50 - 10:10",
    "10:20 - 11:40",
    "11:50 - 1:10",
    "2:00 - 3:20",
  ];

  return (
    <div className="p-10">
      <div className="mb-4 text-lg text-gray-700">
        {userRole === "student" && <p className="text-blue-500">Оюутан</p>}
        {userRole === "teacher" && <p className="text-green-500">Багш</p>}
        {userRole === "admin" && <p className="text-red-500">Админ</p>}
      </div>

      {/* User Info */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold">И-мэйл:</span> {session.user?.email}
        </p>
        <p>
          <span className="font-semibold">Оюутны код:</span>{" "}
          {session.user.user_id}
        </p>
        <p>
          <span className="font-semibold">Эрх:</span> {session.user?.role}
        </p>
        <p>
          <span className="font-semibold">Курс:</span>{" "}
          {session.user?.school_year || "Хоосон"}
        </p>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        {session.user?.email}
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">School Timetable</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Time Slot</th>
              {weekdays.map((day) => (
                <th key={day} className="border px-4 py-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{slot}</td>
                {weekdays.map((day) => (
                  <td key={day + slot} className="border px-4 py-2">
                    {timetableData.find(
                      (entry) =>
                        entry.weekdays === day &&
                        `${entry.start_time} - ${entry.end_time}` === slot
                    )?.lesson_code || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Timetable />
    </div>
  );
};

export default Home;
