import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, TrashIcon } from "lucide-react";
import { useCoverImage } from "@/hooks/use-coverImage";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

interface CoverImageProps {
  imageUrl?: string;
  preview?: boolean;
}

export default function CoverImage({ imageUrl, preview }: CoverImageProps) {
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCover = useMutation(api.documents.removeCoverImage);
  const params = useParams();

  const onRemove = async () => {
    try {
      console.log("params:", params);
      if (imageUrl) {
        await edgestore.publicFiles.delete({
          url: imageUrl,
        });
      }

      removeCover({
        documentId: params.documentId as Id<"documents">,
      });
    } catch (error) {
      toast.error("Error removing covering image!");
    } finally {
      toast.success("Cover image removed successfully!");
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-[30vh] group",
        !imageUrl && "bg-muted",
        imageUrl && "bg-muted"
      )}
    >
      {/* If image exists */}
      {!!imageUrl && (
        <div>
          <Image
            src={imageUrl}
            fill
            alt="cover-image"
            className="object-cover"
          ></Image>
          <div className="absolute bottom-5 right-5 p-1  flex gap-x-2 opacity-0 group-hover:opacity-100">
            <Button
              variant="outline"
              className="flex gap-x-1 
              items-center text-muted-foreground"
              onClick={coverImage.onOpen}
            >
              <ImageIcon /> Change cover
            </Button>
            <Button
              variant="outline"
              className="flex gap-x-1 items-center text-muted-foreground"
              onClick={onRemove}
            >
              <TrashIcon /> Delete cover
            </Button>
          </div>
        </div>
      )}

      {/* If no image exist */}
      {!imageUrl && !preview && (
        <div className="absolute bottom-5 right-5 p-1  flex gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            variant="outline"
            className="flex gap-x-1 items-center text-muted-foreground"
            onClick={coverImage.onOpen}
          >
            <ImageIcon /> Add cover
          </Button>
        </div>
      )}
    </div>
  );
}
