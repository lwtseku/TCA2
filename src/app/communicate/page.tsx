import Link from 'next/link';
 
export default function CommunicatePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full max-w-xl bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center">Харилцаа холбоо</h1>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="/communicate/post">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Пост
            </button>
          </Link>
          <Link href="/communicate/user">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Чат
            </button>
          </Link>
        </div>
      </div>
 
      {/* Content */}
      <div className="w-full max-w-xl mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Постууд</h2>
        <p>Постын хуудас харагдаж байна.</p>
        <p>Энэ хэсэгт постуудын мэдээлэл харагдана.</p>
      </div>
    </div>
  );
}