import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
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
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

interface ArchivedBannerProps {
  documentId: Id<"documents">;
}

export const ArchivedBanner = ({ documentId }: ArchivedBannerProps) => {
  const router = useRouter();
  const restore = useMutation(api.documents.restoreDocument);
  const deleteDoc = useMutation(api.documents.deleteDocument);

  const handleRestore = () => {
    const promise = restore({ documentId });

    toast.promise(promise, {
      loading: "Restoring documents...",
      success: "Document restored!",
      error: "Error restoring document!",
    });
  };

  const handleDelete = () => {
    const promise = deleteDoc({ documentId });

    toast.promise(promise, {
      loading: "Deleting document permanently...",
      success: "Document deleted permanently!",
      error: "Error deleting document!",
    });

    router.push("/documents");
  };

  return (
    <div className="w-full flex bg-red-500 text-white  items-center justify-center gap-x-8 h-fit py-2">
      <div className="">This document is archived.</div>
      <div className="flex gap-x-2">
        <Button
          variant="ghost"
          className="border border-white"
          size="sm"
          onClick={handleRestore}
        >
          Restore
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="ghost" className="border border-white" size="sm">
              Delete
            </Button>
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
