"use client";
import { ArchivedBanner } from "@/app/(main)/_components/archived-banner";
import Editor from "@/components/blocknote-editor";
import CoverImage from "@/components/cover-image";
import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { document } from "postcss";

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

  const update = useMutation(api.documents.updateDocument);

  const handleEditorUpdate = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

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
      <div className=" w-full h-full border">
        {document.isArchived && <ArchivedBanner documentId={document._id} />}
        <CoverImage preview imageUrl={document.coverImage} />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-6 flex flex-col items-start ">
          <h1 className="text-black dark:text-white text-5xl ml-[3.3rem] mb-4">
            {document.title}
          </h1>

          <Editor
            onChange={() => {}}
            preview
            editable={false}
            initialContent={document.content}
          />
        </div>
      </div>
    </div>
  );
}
