"use client";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";


type Props = {};

export default function DocumentsPage({}: Props) {
  // Get auth info from convex
  const { isAuthenticated, isLoading } = useConvexAuth();
  // While page loads
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <ClipLoader size={100} />
      </div>
    );
  }
  // If not authenticated redirect to landingpage
  if (!isAuthenticated) {
    return redirect("/");
  }
  return <div className="h-full flex dark:bg-[#1F1F1F]">Docuemnts</div>;
}
