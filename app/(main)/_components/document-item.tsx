"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  ChevronRightIcon,
  File,
  MoreHorizontal,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface DocumentItemProps {
  document: Doc<"documents">;
}

export const DocumentItem = ({ document }: DocumentItemProps) => {
  const router = useRouter();

  const archive = useMutation(api.documents.archiveDocument);

  const handleArchive = () => {
    const promise = archive({ id: document._id });

    toast.promise(promise, {
      loading: "Archiving document...",
      success: "Document archived!",
      error: "Error archiving document!",
    });
  };

  return (
    <div className=" flex items-center gap-x-1 p-2 group">
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
      <div className=" flex items-center gap-x-1">
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 "
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="h-4 w-4 shrink-0 text-muted-foreground/50 hidden group-hover:flex" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className=" w-full flex items-center gap-x-2 cursor-pointer hover:bg-primary/5"
                onClick={handleArchive}
              >
                <Trash className="h-4 w-4 text-muted-foreground" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 hidden group-hover:flex"
        >
          <PlusIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      </div>
    </div>
  );
};

DocumentItem.Skeleton = function DocumentItemSkeleton() {
  return <Skeleton className="w-full h-8" />;
};
