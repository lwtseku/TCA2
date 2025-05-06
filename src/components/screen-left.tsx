"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItems } from "@/components/config";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SignOut } from "./sign-out";
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
            ? "font-base text-sm bg-neutral-200 shadow-sm text-black dark:bg-neutral-800 dark:text-white"
            : "hover:bg-[#19C3B7] hover:text-white text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
        }`}
      >
        <div className="font-base text-sm py-1.5 px-2 flex items-center space-x-2 rounded-md">
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
                  ? "font-base text-sm bg-neutral-200 text-neutral-100 dark:bg-neutral-800 dark:text-white"
                  : "hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              }`}
            >
              <div className="p-2">{icon}</div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left" className="px-3 w-full py-1.5 text-xs" sideOffset={10}>
            <span>{label}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  