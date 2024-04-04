"use client";
import React from "react";
import { Sidebar } from "./_components/sidebar";

type Props = {};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full dark:bg-[#1f1f1f] ">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
