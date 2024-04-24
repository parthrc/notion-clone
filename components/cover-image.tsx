import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, TrashIcon } from "lucide-react";
import { useCoverImage } from "@/hooks/use-coverImage";

interface CoverImageProps {
  imageUrl?: string;
  preview?: boolean;
}

export default function CoverImage({ imageUrl, preview }: CoverImageProps) {
  const coverImage = useCoverImage();

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
            <ImageIcon /> Change cover
          </Button>
          <Button
            variant="outline"
            className="flex gap-x-1 items-center text-muted-foreground"
          >
            <TrashIcon /> Delete cover
          </Button>
        </div>
      )}
    </div>
  );
}
