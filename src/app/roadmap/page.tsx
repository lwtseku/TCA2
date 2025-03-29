import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

export default function RoadmapPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-gray-100 to-white text-gray-900 px-6 py-10">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-4 text-center">Roadmap</h1>
        <p className="text-center text-lg max-w-2xl mb-8 leading-relaxed">
          Оюутнуудад мэргэжлээ сонгоход нь туслах, суралцахад туслах замын
          зураг, гарын авлага болон агуулгыг бий болгох юм.
        </p>

        {/* Divider and Main Button */}
        <div className="flex items-center w-full max-w-2xl mb-10">
          <hr className="flex-grow border-gray-400" />
          <div className="mx-6 px-8 py-3 bg-gray-200 border border-gray-400 rounded-full text-lg font-semibold text-center hover:bg-gray-300 transition duration-300">
            Компьютерын ухаан
          </div>
          <hr className="flex-grow border-gray-400" />
        </div>

        {/* Course Buttons */}
        <div className="grid grid-cols-1 gap-6 w-full max-w-3xl sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/roadmap/1st"
            className="px-6 py-4 bg-white shadow-md border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-center font-medium"
          >
            1-р курс
          </Link>
          <Link
            href="/roadmap/2nd-course"
            className="px-6 py-4 bg-white shadow-md border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-center font-medium"
          >
            2-р курс
          </Link>
          <Link
            href="/roadmap/3rd-course"
            className="px-6 py-4 bg-white shadow-md border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-center font-medium"
          >
            3-р курс
          </Link>
          <Link
            href="/roadmap/4th-course"
            className="px-6 py-4 bg-white shadow-md border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-center font-medium"
          >
            4-р курс
          </Link>
          <Link
            href="/roadmap/5th-course"
            className="px-6 py-4 bg-white shadow-md border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-center font-medium"
          >
            5-р курс
          </Link>
        </div>
      </div>
    </>
  );
}
