import { prisma } from "../../../lib/prisma"; // Ensure the path is correct

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const { courseId } = await params;

  // Fetch roadmap data based on school_year (courseId)
  const roadmapData = await prisma.roadmap.findMany({
    where: {
      school_year: parseInt(courseId), // courseId-г school_year болгон ашиглана
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
        <h1 className="text-3xl font-bold text-red-500">Roadmap олоогүй байна!</h1>
      </div>
    );
  }

  // Group roadmapData by semester (Spring, Fall)
  const groupedBySemester = roadmapData.reduce((acc, roadmap) => {
    const semester = roadmap.semester || "Unknown"; // If no semester, use "Unknown"
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(roadmap);
    return acc;
  }, {} as { [key: string]: typeof roadmapData });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Сургалтын агуулга</h1>

      {/* Display grouped roadmap by semester */}
      <div className="space-y-8">
        {Object.entries(groupedBySemester).map(([semester, items], index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">{semester === "Хавар" ? "Хаврын улиралд" : semester === "Намар" ? "Намрын улиралд" : "Unknown Semester"}</h2>
            
            {/* Group by type (Pro, Gen) */}
            <div className="space-y-4">
              {["Pro", "Gen"].map((type, idx) => {
                const filteredItems = items.filter((item) => item.type === type);
                if (filteredItems.length > 0) {
                  return (
                    <div key={idx} className="border p-4 rounded-lg bg-gray-200">
                      <h3 className="font-semibold text-xl mb-4">
                        {type === "Pro" ? "Мэргэжлийн хичээлүүд" : "Ерөнхий эрдэмийн хичээлүүд"}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {filteredItems.map((roadmap, idx) => (
                          <div key={idx} className="p-4 border rounded-lg">
                            <h4 className="font-bold mb-2">{roadmap.lesson_name}</h4>
                            <p className="text-gray-700">Кредит: {roadmap.credits}</p>
                            
                          </div>
                        ))}
                      </div>
                    </div>
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
