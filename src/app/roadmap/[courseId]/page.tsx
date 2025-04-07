import { prisma } from "../../../lib/prisma";
import "./page.css"

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const { courseId } = await params;

  const roadmapData = await prisma.roadmap.findMany({
    where: {
      school_year: parseInt(courseId),
    },
    select: {
      lesson_name: true,
      credits: true,
      type: true,
      semester: true,
      school_year: true,
    },
  });

  if (!roadmapData || roadmapData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500">Roadmap олоогүй байна! </h1>
      </div>
    );
  }

  const groupedBySemester = roadmapData.reduce((acc, roadmap) => {
    const semester = roadmap.semester || "Unknown";
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(roadmap);
    return acc;
  }, {} as { [key: string]: typeof roadmapData });

  return (
    <div className="container mx-auto p-6">
     <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
  {courseId}-р курсийн сургалтын агуулга
</h1>



      <div className="space-y-8">
        {Object.entries(groupedBySemester).map(([semester, items], index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-100">
          <h2
  className="semester-header mb-4"
  style={{
    backgroundImage:
      semester === "Хавар"
        ? "url('/images/havar.png')"
        : semester === "Намар"
        ? "url('/images/namar.jpg')"
        : "none",
  }}
>
  <span className="text-shadow">
    {semester === "Хавар" ? "🌸 Хаврын улиралд" : semester === "Намар" ? "🍂 Намрын улиралд" : "📚 Unknown Semester"}
  </span>
</h2>



            <div className="space-y-4">
              {["Pro", "Gen"].map((type, idx) => {
                const filteredItems = items.filter((item) => item.type === type);

                if (filteredItems.length > 0) {
                  return (
                    <details
                      key={idx}
                      className="border rounded-lg bg-gray-200 open:shadow-md transition-all duration-300"
                    >
                      <summary className="cursor-pointer font-semibold text-xl p-4 select-none">
                        {type === "Pro"
                          ? "Мэргэжлийн хичээлүүд"
                          : "Ерөнхий эрдэмийн хичээлүүд"}
                      </summary>

                      <div className="grid grid-cols-2 gap-4 p-4">
  {filteredItems.map((roadmap, idx) => (
    <div key={idx} className="lesson-card">
      <h4>{roadmap.lesson_name}</h4>
      <p>Кредит: {roadmap.credits}</p>
    </div>
  ))}
</div>

                    </details>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
