import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

export default function HeroSection({}: Props) {
  return (
    <div className=" max-w-3xl">
      <div className="flex items-center flex-col gap-y-8">
        <span className="md:text-7xl sm:text-5xl text-3xl font-extrabold">
          PROTION
        </span>
        <h1 className="text-balance text-center text-xl">
          An almost 1:1 Notion clone developed using Nextjs, Convex for backend,
          Clerk for authentication, TailwindCSS & Shadcn/ui for styling.
        </h1>

        <Button className="font-bold uppercase gap-x-2">
          Get started <ArrowRight className="h-4 w-4" />
        </Button>
        <div className="w-[500px] h-[500px] relative mt-[-70px]">
          <Image
            src="/landing-light.png"
            alt="landing"
            className="object-contain"
            fill
          />
        </div>
      </div>
    </div>
  );
}
