import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Menu, MenuIcon, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { DocTitle } from "./doc-title";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import PublishButton from "./publish-button";

interface DocumentNavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const DocumentNavbar = ({ isCollapsed, onResetWidth }: DocumentNavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getDocById, {
    id: params.documentId as Id<"documents">,
  });
  const router = useRouter();

  const archive = useMutation(api.documents.archiveDocument);

  if (document === undefined)
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center justify-between">
        <div className="h-full flex items-center justify-center flex-col gap-y-2">
          <Spinner size="sm" />
        </div>
      </nav>
    );

  if (document === null) return null;

  // handle archving
  const handleArchive = () => {
    const promise = archive({ id: document._id });

    toast.promise(promise, {
      loading: "Archiving document...",
      success: "Document archived!",
      error: "Error archiving document!",
    });
  };

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] p-4 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          {document === null ? "" : <DocTitle document={document} />}

          <div className="flex items-center gap-x-4 ">
            <PublishButton initialData={document} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="h-6 w-6 mr-2 shrink-0 dark:text-white dark:hover:bg-neutral-500 text-black opacity-100  flex hover:bg-neutral-200 rounded-md" />
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
        </div>
      </nav>
    </>
  );
};
export default DocumentNavbar;
