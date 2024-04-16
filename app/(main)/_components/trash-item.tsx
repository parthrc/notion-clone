import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Trash, Undo } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface TrashItemProps {
  document: Doc<"documents">;
}

export const TrashItem = ({ document }: TrashItemProps) => {
  const router = useRouter();
  const restore = useMutation(api.documents.restoreDocument);
  const deleteDoc = useMutation(api.documents.deleteDocument);

  const handleRestore = () => {
    const promise = restore({ documentId: document._id });

    toast.promise(promise, {
      loading: "Restoring documents...",
      success: "Document restored!",
      error: "Error restoring document!",
    });
  };

  const handleDelete = () => {
    const promise = deleteDoc({ documentId: document._id });
    toast.promise(promise, {
      loading: "Deleting document permanently...",
      success: "Document deleted permanently!",
      error: "Error dleeting document!",
    });

    router.push("/documents");
  };

  return (
    <div className="flex items-center w-full rounded-sm  px-2 py-1 text-sm gap-y-1 dark:hover:bg-neutral-800 hover:bg-neutral-200">
      <div
        role="button"
        className="flex-1"
        onClick={() => router.push(`/documents/${document._id}`)}
      >
        {document.title}
      </div>

      <div className="flex gap-x-1 items-center">
        <div
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 p-1"
          role="button"
          onClick={handleRestore}
        >
          <Undo className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div
              className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 p-1"
              role="button"
            >
              <Trash className="h-4 w-4 shrink-0 text-muted-foreground/50" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Document will be permanently deleted, cannot be undone!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
