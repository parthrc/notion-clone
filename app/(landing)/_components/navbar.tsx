import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="bg-background border border-black w-full fixed top-0">
      <div className="flex justify-between px-5 py-2 items-center">
        <span className="font-extrabold text-2xl">PROTION</span>
        <div className="flex gap-x-4 items-center">
          <Button size="sm" className="font-bold uppercase gap-x-1">
            Login
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
