"use client";
import { ArchivedBanner } from "@/app/(main)/_components/archived-banner";
import { Cover } from "@/app/(main)/_components/cover";
import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  const router = useRouter();
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

  if (document === null) return router.push("/documents");

  return (
    <div className="h-full flex dark:bg-[#1F1F1F] text-black items-center flex-col gap-y-4">
      {/* Document page container */}
      <div className="pt-20 w-full h-full border">
        {document.isArchived && <ArchivedBanner documentId={document._id} />}
        <div>
          <Cover />
        </div>
      </div>
    </div>
  );
}
