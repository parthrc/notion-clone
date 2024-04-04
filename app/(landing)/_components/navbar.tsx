"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useTheme } from "next-themes";
import React from "react";


type Props = {};

export default function Navbar({}: Props) {
  const { resolvedTheme } = useTheme();
  // Check if user scrolls more than 10px
  const scrolled = useScrollTop();

  // Check if user is authenticated
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        "bg-background  border-black w-full fixed top-0 py-2 ",
        scrolled && " border-b"
      )}
    >
      <div className="flex justify-between px-5 py-2 items-center">
        <span className="font-extrabold text-2xl">PROTION</span>
        <div className="flex gap-x-4 items-center">
          {isLoading && (
           <Spinner size="sm" />
          )}
          {!isAuthenticated && !isLoading && (
            <SignInButton mode="modal">
              <Button size="sm" className="font-bold uppercase gap-x-1">
                Login
              </Button>
            </SignInButton>
          )}
          {isAuthenticated && !isLoading && <UserButton afterSignOutUrl="/" />}

          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
