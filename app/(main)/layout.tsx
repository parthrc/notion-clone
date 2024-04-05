"use client";
import React from "react";
import { Sidebar } from "./_components/sidebar";
import { SearchCommand } from "@/components/search-command";

type Props = {};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex dark:bg-[#1f1f1f] ">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
