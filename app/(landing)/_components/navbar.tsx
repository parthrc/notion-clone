"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  // Check if user scrolls more than 10px
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "bg-background  border-black w-full fixed top-0 py-2 z-[99999] ",
        scrolled && " border-b"
      )}
    >
      <div className="flex justify-between px-5 py-2 items-center">
        <span className="font-extrabold text-2xl">PROTION</span>
        <div className="flex gap-x-4 items-center">
          <Button size="sm" className="font-bold uppercase gap-x-1">
            Login
          </Button>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
