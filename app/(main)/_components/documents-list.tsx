import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentItem } from "./document-item";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
}

export const DocumentsList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  // State to store currently epanded pages in sidebar list
  // Object containing document ID as string and a boolean for whether its expanded
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  // Handle the expansion button
  // get current Document ID
  // Toggle expansion of specified document and add to previous state
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  //Get all documents
  const allDocs = useQuery(api.documents.getAllDocuments, {
    parentDocument: parentDocumentId,
  });

  // Convex queries are undefined when they are loading
  // we can use that behaviour to show loading state
  if (allDocs === undefined) {
    return (
      <div className="space-y-4 pl-8 pt-4">
        <DocumentItem.Skeleton />
        {level === 0 && (
          <>
            <DocumentItem.Skeleton level={level} />
            <DocumentItem.Skeleton level={level} />
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          " ml-4 hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages yet.
      </p>
      {allDocs?.map((doc) => (
        <div key={doc._id}>
          <DocumentItem
            document={doc}
            level={level}
            onExpand={() => onExpand(doc._id)}
            expanded={expanded[doc._id]}
          ></DocumentItem>
          {expanded[doc._id] && (
            <DocumentsList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};
