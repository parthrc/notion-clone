"use client";
import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  const document = useQuery(api.documents.getDocById, {
    id: params.documentId,
  });

  console.log(document);

  // While page loads
  // ! Change to Skeleton
  if (document === undefined) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-y-2">
        <Spinner size="icon" />
        Loading document
      </div>
    );
  }

  if (document === null) return null;

  return (
    <div className="h-full flex dark:bg-[#1F1F1F] text-black items-center flex-col gap-y-4">
      {/* Document header container */}
      <div className="pt-20  w-full border px-3 h-full">{document?.title}</div>
      {/* Document content */}
    </div>
  );
}
