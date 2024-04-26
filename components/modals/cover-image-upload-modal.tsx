"use client";
import { useCoverImage } from "@/hooks/use-coverImage";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Cancel } from "@radix-ui/react-alert-dialog";
import { useEdgeStore } from "@/lib/edgestore";
import { updateDocument } from "@/convex/documents";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

const ALLOWED_IMAGE_TYPES = [
  "image/webp",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

export const CoverImageUploadModal = () => {
  const [file, setFile] = useState<File | null>();
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const { user } = useUser();
  const update = useMutation(api.documents.updateDocument);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // If files exist select the first one
    const file = event.target.files && event.target.files[0];

    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) {
      return toast.error("Please select an Image file!");
    }
    if (file && !ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return toast.error("Select an IMAGE only!");
    }
    if (file && ALLOWED_IMAGE_TYPES.includes(file.type)) {
      try {
        // Upload to edgestore
        const res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: coverImage.url,
          },
        });

        if (res && user) {
          await update({
            id: params.documentId as Id<"documents">,
            coverImage: res.url,
          });
        }
      } catch (error) {
        toast.error("Error uploading image");
      } finally {
        toast.success("Image uploaded successfully");

        coverImage.onClose();
      }
    }
  };

  const onClose = () => {
    setFile(undefined);

    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2>Cover image</h2>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="picture">Upload cover image</Label>
          <Input
            id="picture"
            type="file"
            className=" cursor-pointer"
            onChange={handleImageChange}
          ></Input>
        </div>
        <div className="flex mt-5 gap-x-4">
          <Button onClick={handleUpload} type="submit">
            Upload
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
