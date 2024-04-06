import { Doc } from "@/convex/_generated/dataModel";
import { Trash, Undo } from "lucide-react";

interface TrashItemProps {
  document: Doc<"documents">;
}

export const TrashItem = ({ document }: TrashItemProps) => {
  return (
    <div className="flex items-center w-full  p-1 text-sm gap-y-1">
      <div className="flex-1">{document.title}</div>

      <div className="flex gap-x-1 items-center">
        <div
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 p-1"
          role="button"
        >
          <Undo className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
        <div
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 p-1"
          role="button"
        >
          <Trash className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      </div>
    </div>
  );
};
