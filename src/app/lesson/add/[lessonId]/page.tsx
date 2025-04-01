"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PrismaClient } from "@prisma/client";
// Define the course structure

export default function CoursePage() {
  const { lessonId } = useParams();

  return <div className="container mx-auto p-6">add{lessonId}</div>;
}
