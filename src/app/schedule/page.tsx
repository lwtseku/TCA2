"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EventCard } from "@/components/scheduleEventCard";
import { YearCard } from "@/components/scheduleYearCard";

export type Events = {
  id: string | number;
  name: string;
  type: "event" | "exam" | "vacation";
  date: string;
  desc?: string;
};
const initialEvents: Events[] = [
  {
    id: 1,
    name: "Шинэ жилийн баяр",
    type: "event",
    date: "2024-01-01",
    desc: "Шинэ оныг угтаж баяр тэмдэглэе.",
  },
  {
    id: 2,
    name: "Өвлийн семинар",
    type: "exam",
    date: "2024-01-15",
    desc: "Өвлийн ур чадварыг сайжруулах семинар.",
  },
  {
    id: 3,
    name: "Цасны баяр",
    type: "event",
    date: "2024-01-25",
    desc: "Гадаа цасны тоглоом зохион байгуулагдана.",
  },
  {
    id: 4,
    name: "Их цэвэрлэгээ",
    type: "event",
    date: "2024-01-28",
    desc: "Хаврын өмнөх их цэвэрлэгээ.",
  },

  {
    id: 5,
    name: "Гэгээн Валентины өдөр",
    type: "event",
    date: "2024-02-14",
    desc: "Гэгээн Валентины өдрийг тэмдэглэе.",
  },
  {
    id: 6,
    name: "Математикийн шалгалт",
    type: "exam",
    date: "2024-02-15",
    desc: "Хагас жилийн математикийн шалгалт.",
  },
  {
    id: 7,
    name: "Цанаар гулгах өдөр",
    type: "event",
    date: "2024-02-20",
    desc: "Цанаар гулгаж хөгжилдөцгөөе.",
  },
  {
    id: 8,
    name: "Уран зохиолын өдөр",
    type: "event",
    date: "2024-02-25",
    desc: "Уран зохиол унших өдөрлөг.",
  },

  {
    id: 9,
    name: "Хаврын амралт эхэллээ",
    type: "vacation",
    date: "2024-03-10",
    desc: "Хаврын амралтаа сайхан өнгөрүүлээрэй.",
  },
  {
    id: 10,
    name: "Шинжлэх ухааны үзэсгэлэн",
    type: "event",
    date: "2024-03-25",
    desc: "Жил бүрийн шинжлэх ухааны үзэсгэлэн.",
  },
  {
    id: 11,
    name: "Сагсан бөмбөгийн тэмцээн",
    type: "event",
    date: "2024-03-15",
    desc: "Багуудын сагсан бөмбөгийн тэмцээн.",
  },
  {
    id: 12,
    name: "Хөгжмийн үдэш",
    type: "event",
    date: "2024-03-28",
    desc: "Амьд хөгжмийн тоглолт.",
  },

  {
    id: 13,
    name: "Соёлын баяр",
    type: "event",
    date: "2024-04-05",
    desc: "Соёлыг хамтдаа тэмдэглэе.",
  },
  {
    id: 14,
    name: "Түүхийн шалгалт",
    type: "exam",
    date: "2024-04-20",
    desc: "Хагас жилийн түүхийн шалгалт.",
  },
  {
    id: 15,
    name: "Цэцэрлэгжилтийн өдөр",
    type: "event",
    date: "2024-04-15",
    desc: "Мод тарих өдөрлөг.",
  },
  {
    id: 16,
    name: "Зураачдын үзэсгэлэн",
    type: "event",
    date: "2024-04-28",
    desc: "Зураачдын уран бүтээлийн үзэсгэлэн.",
  },

  {
    id: 17,
    name: "Зуны зуслан",
    type: "vacation",
    date: "2024-05-01",
    desc: "Зуны амралтаа зусланд өнгөрүүлээрэй.",
  },
  {
    id: 18,
    name: "Уран зохиолын шалгалт",
    type: "exam",
    date: "2024-05-15",
    desc: "Уран зохиол, урлагийн шалгалт.",
  },
  {
    id: 19,
    name: "Зуны баяр",
    type: "event",
    date: "2024-05-20",
    desc: "Зуныг угтаж баяр тэмдэглэе.",
  },
  {
    id: 20,
    name: "Цэцгийн үзэсгэлэн",
    type: "event",
    date: "2024-05-30",
    desc: "Цэцгийн үзэсгэлэн худалдаа.",
  },

  {
    id: 21,
    name: "Далайн эргийн аялал",
    type: "vacation",
    date: "2024-06-10",
    desc: "Далайн эрэгт амарч, амраарай.",
  },
  {
    id: 22,
    name: "Физикийн семинар",
    type: "event",
    date: "2024-06-25",
    desc: "Физикийн туршилт, хэлэлцүүлэг.",
  },
  {
    id: 23,
    name: "Тусгаар тогтнолын баяр",
    type: "event",
    date: "2024-07-04",
    desc: "Галын наадам болон баяр ёслол.",
  },
  {
    id: 24,
    name: "Жилийн дунд шалгалт",
    type: "exam",
    date: "2024-07-20",
    desc: "Жилийн дунд үеийн шалгалт.",
  },
  {
    id: 25,
    name: "Гадаа адал явдал",
    type: "vacation",
    date: "2024-08-10",
    desc: "Гадаа адал явдлыг мэдэрээрэй.",
  },
  {
    id: 26,
    name: "Оддын шөнө",
    type: "event",
    date: "2024-08-25",
    desc: "Оддыг ажиглаж, орон зайг судалъя.",
  },
  {
    id: 27,
    name: "Сургуульд бэлтгэх өдөр",
    type: "exam",
    date: "2024-09-05",
    desc: "Сургуулийн жилд бэлтгэх өдөр.",
  },
  {
    id: 28,
    name: "Намрын аялал",
    type: "vacation",
    date: "2024-09-20",
    desc: "Намрын өнгийг мэдрээрэй.",
  },
  {
    id: 29,
    name: "Хэллоуины баяр",
    type: "event",
    date: "2024-10-31",
    desc: "Хувцас өмсөж Хэллоуины баярыг тэмдэглэе.",
  },
  {
    id: 30,
    name: "Сургуулийн үзүүлбэрийн өдөр",
    type: "event",
    date: "2024-10-15",
    desc: "Авьяасаа харуулах өдөр.",
  },
  {
    id: 31,
    name: "Эцсийн шалгалт эхэлнэ",
    type: "exam",
    date: "2024-11-01",
    desc: "Эцсийн шалгалтууд эхэлнэ.",
  },
  {
    id: 32,
    name: "Талархлын баярын амралт",
    type: "vacation",
    date: "2024-11-25",
    desc: "Гэр бүлийнхэнтэйгээ баяр тэмдэглэе.",
  },
  {
    id: 33,
    name: "Зул сарын баяр",
    type: "vacation",
    date: "2024-12-24",
    desc: "Хайрт хүмүүстэйгээ Зул сарын баярыг тэмдэглээрэй.",
  },
  {
    id: 34,
    name: "Жилийн эцсийн үдэшлэг",
    type: "event",
    date: "2024-12-31",
    desc: "Жилийг үдэж үдэшлэг хийцгээе.",
  },
];

const monthNames = [
  "Нэгдүгээр сар", // January
  "Хоёрдугаар сар", // February
  "Гуравдугаар сар", // March
  "Дөрөвдүгээр сар", // April
  "Тавдугаар сар", // May
  "Зургадугаар сар", // June
  "Долоодугаар сар", // July
  "Наймдугаар сар", // August
  "Есдүгээр сар", // September
  "Аравдугаар сар", // October
  "Арваннэгдүгээр сар", // November
  "Арванхоёрдугаар сар", // December
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [filterYear, setFilterYear] = useState("2024");
  const [events, setEvents] = useState<Events[]>(initialEvents);
  const [groupedEvents, setGroupedEvents] = useState<
    Record<string, Record<string, Events[]>>
  >({});
  const [newEvent, setNewEvent] = useState<Events>({
    id: "",
    name: "",
    type: "event",
    date: "",
    desc: "",
  });
  const groupEventsByYearAndMonth = (events: Events[], filter: string) => {
    const grouped = events
      .filter((event) => filter === "all" || event.type === filter)
      .reduce((acc, event) => {
        const eventDate = new Date(event.date);
        const year = eventDate.getFullYear().toString();
        const monthIndex = eventDate.getMonth();
        const monthName = monthNames[monthIndex];

        if (!acc[year]) {
          acc[year] = {};
        }

        if (!acc[year][monthName]) {
          acc[year][monthName] = [];
        }

        acc[year][monthName].push(event);

        acc[year][monthName] = acc[year][monthName].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return acc;
      }, {} as Record<string, Record<string, Events[]>>);

    return grouped;
  };

  const handleAddEvent = () => {
    const newId = events.length
      ? Math.max(...events.map((event) => +event.id)) + 1
      : 1;
    setEvents([...events, { ...newEvent, id: newId }]);
    setNewEvent({ id: "", name: "", type: "event", date: "", desc: "" });
  };
  const handleDeleteEvent = (id: string | number) => {
    const updateEvent = events.filter((item) => item.id !== id);
    setEvents(updateEvent);
  };
  const handleEditEvent = (id: string | number, data: Events) => {
    const updatedEvents = events.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
    setEvents(updatedEvents);
  };
  useEffect(() => {
    const grouped = groupEventsByYearAndMonth(events, filter);
    setGroupedEvents(grouped);
  }, [filter, events]);

  return (
    <div className="w-full h-full p-6 ">
      <div className="w-full text-black border-b-2 border-b-blue-900 flex justify-between gap-8 mb-4 ">
        <div className="">
          <button
            onClick={() => setFilter("all")}
            className={`border-l border-t border-t-blue-900 border-l-blue-900 p-3 rounded-ss-sm ${
              filter === "all" ? "bg-blue-900 text-white" : "bg-gray-100"
            }`}
          >
            Бүгд
          </button>
          <button
            onClick={() => setFilter("exam")}
            className={`border-l border-t border-t-blue-900 border-l-blue-900 p-3 ${
              filter === "exam" ? "bg-blue-900 text-white" : "bg-gray-100"
            }`}
          >
            Шалгалт
          </button>
          <button
            onClick={() => setFilter("vacation")}
            className={`border-l border-t border-t-blue-900 border-l-blue-900 p-3 ${
              filter === "vacation" ? "bg-blue-900 text-white" : "bg-gray-100"
            }`}
          >
            Амралт
          </button>
          <button
            onClick={() => setFilter("event")}
            className={`border-l border-l-blue-900 border-t border-t-blue-900 border-r rounded-se-sm border-r-blue-900 p-3 ${
              filter === "event" ? "bg-blue-900 text-white" : "bg-gray-100"
            }`}
          >
            Бусад эвэнт
          </button>
        </div>
        <div className="flex items-center gap-1">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-[120px] p-[10px] border border-gray-300 rounded"
          >
            {Object.entries(groupedEvents).map(([year, groupedEvent]) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <AlertDialog>
            <AlertDialogTrigger className="bg-blue-900 rounded-md text-white p-[10px]">
              Засварлах
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-screen h-screen md:max-w-[calc(100%-48px)] md:h-[calc(100%-48px)] flex flex-col overflow-auto">
              <AlertDialogHeader className="flex-row justify-between">
                <AlertDialogTitle>Хуваарь засварлах</AlertDialogTitle>
                <AlertDialogCancel>Буцах</AlertDialogCancel>
              </AlertDialogHeader>
              <div className="flex flex-col gap-6">
                {events.map((item) => (
                  <EventCard
                    key={item.id} // Ensure the key is here
                    data={item}
                    edit
                    handleDelete={handleDeleteEvent}
                    handleEdit={handleEditEvent}
                  />
                ))}
              </div>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger className="bg-blue-900 rounded-md text-white p-[10px]">
              Нэмэх
            </AlertDialogTrigger>
            <AlertDialogContent className="w-1/2">
              <AlertDialogHeader>
                <AlertDialogTitle>Шинэ хуваарт нэмэх</AlertDialogTitle>
                <AlertDialogDescription>
                  Шинэ хуваарт нэмэхийн тулд доорх мэдээллийг бөглөөд нэмэх дээр
                  дарна уу.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="p-4">
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  className="p-2 w-full mb-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Нэр"
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name: e.target.value })
                  }
                  className="p-2 mb-2 border w-full border-gray-300 rounded"
                />
                <textarea
                  placeholder="Тайлбар"
                  value={newEvent.desc || ""}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, desc: e.target.value })
                  }
                  className="p-2 w-full mb-2 border border-gray-300 rounded"
                />
                <select
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      type: e.target.value as "event" | "exam" | "vacation",
                    })
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                >
                  <option value="exam">Шалгалт</option>
                  <option value="vacation">Амралт</option>
                  <option value="event">Бусад үйл ажиллагаа эвэнт</option>
                </select>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Болих</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleAddEvent}
                  className="bg-blue-900 hover:bg-blue-900 hover:opacity-70"
                >
                  Нэмэх
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {Object.entries(groupedEvents).map(
        ([year, groupedEvent]) =>
          filterYear === year && (
            <YearCard data={groupedEvent} key={year} year={year} />
          )
      )}
    </div>
  );
}
