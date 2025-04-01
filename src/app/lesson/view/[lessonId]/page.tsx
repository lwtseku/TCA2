"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const { lessonId } = useParams();

  return <div className="container mx-auto p-6">view{lessonId}</div>;
}
