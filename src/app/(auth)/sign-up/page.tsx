import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOut } from "@/components/sign-out";

const AdminHomePage = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  if (session.user.role !== "admin") redirect("/");

  return (
    <html lang="mn" className="h-full">
      <body className="min-h-screen w-full bg-[#0f181e] text-[#d6faff] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#13272e] border border-[#1e3a44] rounded-2xl shadow-xl px-8 py-10 space-y-8">
          <h1 className="text-2xl font-bold text-center text-white">
            Админ нүүр хуудас
          </h1>

          <div className="flex flex-col gap-4">
            <AdminCard href="/admin/lessons" label="Хичээл удирдлага" />
            <AdminCard
              href="/admin/timetable"
              label="Хичээлийн хуваарь удирдлага"
            />
            <AdminCard href="/admin/users" label="Хэрэглэгчийн удирдлага" />
            <AdminCard href="/admin/schedule" label="Хуанли удирдлага" />
          </div>
          <SignOut />
        </div>
      </body>
    </html>
  );
};

type AdminCardProps = {
  href: string;
  label: string;
};

const AdminCard = ({ href, label }: AdminCardProps) => (
  <Link href={href}>
    <div className="bg-[#0f181e] border border-[#2a4c56] text-[#d6faff] py-3 px-4 rounded-lg text-center hover:border-[#24ffa5] hover:bg-[#13272e] hover:shadow-md transition-all duration-300 cursor-pointer">
      <span className="text-base font-medium">{label}</span>
    </div>
  </Link>
);

export default AdminHomePage;
