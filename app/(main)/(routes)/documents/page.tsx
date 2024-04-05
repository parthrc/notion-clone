"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {};

export default function DocumentsPage({}: Props) {
  // Get auth info from convex
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Create new document
  const createNewDoc = useMutation(api.documents.createNewDocument);
  const handleCreateNewDoc = () => {
    const promise = createNewDoc({});

    toast.promise(promise, {
      loading: "Creating new document...",
      success: "New document created successfully!",
      error: "Error creating new document!",
    });
  };

  // While page loads
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="icon" />
      </div>
    );
  }
  // If not authenticated redirect to landingpage
  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-[#1F1F1F] text-black items-center justify-center flex-col gap-y-4">
      <Image src="/questions-bro.png" alt="landing" height={300} width={300} />
      <div>
        <Button className="flex gap-x-1" onClick={handleCreateNewDoc}>
          Create new document <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
