"use client";
import React from "react";
import { Sidebar } from "./_components/sidebar";
import { SearchCommand } from "@/components/search-command";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect, useRouter } from "next/navigation";

type Props = {};

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size="icon" />
      </div>
    );
  }
  if (!isLoading && !isAuthenticated) return redirect("/");
  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
