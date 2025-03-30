import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ⏰ Хугацааны слотын жагсаалт
const timeSlots = [
  "08:50 - 10:10",
  "10:20 - 11:40",
  "11:50 - 13:10",
  "14:00 - 15:20",
];

// 📅 Өдрүүдийн жагсаалт
const daysOfWeek = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];

// 🎓 Хичээлийн хуваарийг тодорхойлох интерфэйс
interface TimetableProps {
  userId: string;
  role: string;
}

// ✅ `getTimetable()` функцээр өгөгдлийг авах
const getTimetable = async (userId: string, role: string) => {
  let timetable = [];

  // 👩‍🏫 Хэрэв хэрэглэгч багш бол teacher_id-аар авна
  if (role === "teacher") {
    console.log("Fetching timetable for teacher...");
    timetable = await prisma.timetable.findMany({
      where: {
        teacher_id: userId,
      },
      include: {
        lesson: true,
      },
    });
  }
  // 👩‍🎓 Хэрэв хэрэглэгч оюутан бол school_year-аар авна
  else if (role === "student") {
    console.log("Fetching timetable for student...");
    const student = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (student?.school_year) {
      timetable = await prisma.timetable.findMany({
        where: {
          school_year: student.school_year,
        },
        include: {
          lesson: true,
        },
      });
    }
  }

  console.log("Fetched Timetable:", timetable);
  return timetable;
};

// 📚 Хичээлийн хуваарийн хүснэгт
const Timetable: React.FC<TimetableProps> = async ({ userId, role }) => {
  // 🔥 Хуваарийн өгөгдлийг авах
  const timetable = await getTimetable(userId, role);

  // 📝 Цагийн хуваарьт хичээлийг харуулах функц
  const getLessonForTimeSlot = (day: string, timeSlot: string) => {
    const startTime = timeSlot.split(" - ")[0]; // "08:50" гэх мэт
    const lesson = timetable.find(
      (entry: any) => entry.weekdays === day && entry.start_time === startTime
    );
    return lesson ? `${lesson.lesson.lesson_name}` : "";
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        {role === "teacher" ? "Багшийн хуваарь" : "Оюутны хуваарь"}
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-200 text-gray-700">
              <th className="px-4 py-2 border text-lg">Цаг</th>
              {daysOfWeek.map((day) => (
                <th key={day} className="px-4 py-2 border text-lg bg-pink-300">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot) => (
              <tr key={timeSlot}>
                <td className="px-4 py-2 border bg-blue-100 text-sm font-bold text-gray-700">
                  {timeSlot}
                </td>
                {daysOfWeek.map((day) => (
                  <td
                    key={`${day}-${timeSlot}`}
                    className="px-4 py-2 border bg-pink-100 text-center"
                  >
                    {getLessonForTimeSlot(day, timeSlot)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
