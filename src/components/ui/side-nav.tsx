"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItems } from "@/components/config";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SignOut } from "../sign-out";
import { ThemeToggle } from "../ThemeToggle"; // 🟢 ThemeToggle import хийсэн

export default function SideNav() {
  const navItems = NavItems();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("sidebarExpanded");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "sidebarExpanded",
        JSON.stringify(isSidebarExpanded)
      );
    }
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="fixed top-0 left-0 h-screen z-30">
      <div className="p-0 relative z-10">
        <div
          className={cn(
            isSidebarExpanded ? "w-[270px]" : "w-[88px]",
            "shadow-md transition-all duration-300 ease-in-out hidden sm:flex h-screen bg-background border-r border-border"
          )}
        >
          <aside className="flex flex-col w-full h-full overflow-x-hidden">
            <div className="mt-10 ml-6 mr-3">
              <div className="flex flex-col space-y-1 items-center justify-between space-x-2 mb-4">
                <img
                  src="/images/logo-side-nav.png"
                  alt="err"
                  className="w-12 h-10"
                />
                <h1 className="font-extrabold text-xl pt-0 text-center bg-gradient-to-br from-[#5584c6] from-20% to-[#C23436] to-80% bg-clip-text text-transparent flex justify-start">
                  Цахим сургалтын систем
                </h1>
              </div>
              <div className="flex flex-col space-y-5 mt-16">
                {navItems.map((item, idx) =>
                  item.position === "top" ? (
                    <Fragment key={idx}>
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </Fragment>
                  ) : null
                )}
              </div>
            </div>

            <div className="sticky bottom-0 mt-auto mb-4 space-y-2">
              {navItems.map((item, idx) =>
                item.position === "bottom" ? (
                  <Fragment key={idx}>
                    <SideNavItem
                      label={item.name}
                      icon={item.icon}
                      path={item.href}
                      active={item.active}
                      isSidebarExpanded={isSidebarExpanded}
                    />
                  </Fragment>
                ) : null
              )}
              <SignOut />

              {/* ✅ Dark / Light Mode Toggle Button нэмэгдсэн */}
              <ThemeToggle />
            </div>
          </aside>

          <div className="absolute bottom-32 right-[-12px]">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center text-white border border-muted-foreground/20 rounded-full bg-[#5584c6] shadow-md hover:shadow-lg transition duration-300"
              onClick={toggleSidebar}
            >
              {isSidebarExpanded ? (
                <ChevronLeft
                  size={16}
                  className="stroke-foreground text-white"
                />
              ) : (
                <ChevronRight size={16} className="stroke-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  return isSidebarExpanded ? (
    <Link
      href={path}
      className={`relative flex items-center whitespace-nowrap rounded-md ${
        active
          ? "font-base shadow-sm text-[#5584c6] font-bold dark:bg-neutral-800 dark:text-white"
          : "hover:bg-[#1E356A] hover:text-white text-gray-600 font-bold dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
      }`}
    >
      <div className="w-full font-base text-md py-1.5 px-2 flex items-center space-x-7 rounded-md">
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  ) : (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={path}
            className={`relative flex items-center rounded-md ${
              active
                ? "font-base text-xl text-[#5584c6] dark:bg-neutral-800 dark:text-white"
                : "hover:bg-[#5584c6] hover:text-white text-muted-foreground dark:hover:bg-neutral-800 dark:hover:text-white"
            }`}
          >
            <div className="p-2">{icon}</div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          className="px-3 py-1.5 text-xl"
          sideOffset={10}
        >
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
