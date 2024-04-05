"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { ChevronRightIcon, File, MoreHorizontal, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface DocumentItemProps {
  document: Doc<"documents">;
}

export const DocumentItem = ({ document }: DocumentItemProps) => {
  const router = useRouter();

  return (
    <div className=" border flex items-center gap-x-1 p-2 ">
      {/* Sohw children button */}
      <div
        role="button"
        className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
      >
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
      </div>
      {/* File icon and title */}
      <div
        className="flex items-center gap-x-1 grow cursor-pointer"
        onClick={() => router.push(`/documents/${document._id}`)}
      >
        <File className="h-4 w-4 shrink-0 text-muted-foreground/50" />

        <div className="truncate text-sm text-muted-foreground">
          {document.title}
        </div>
      </div>
      {/* More and plus buttons */}
      <div className="flex items-center gap-x-1">
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
        >
          <MoreHorizontal className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
        >
          <PlusIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      </div>
    </div>
  );
};
