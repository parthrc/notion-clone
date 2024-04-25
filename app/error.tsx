"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
  return (
    <div className="h-full w-full flex items-center justify-center text-3xl flex-col gap-y-4">
      Error
      <Link href="/documents">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
};

export default Error;
