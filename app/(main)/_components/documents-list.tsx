import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentItem } from "./document-item";

export const DocumentsList = () => {
  //Get all documents
  const allDocs = useQuery(api.documents.getAllDocuments);
  console.log(allDocs);

  // Convex queries are undefined when they are loading
  // we can use that behaviour to show loading state
  if (allDocs === undefined) {
    return (
      <div className="space-y-4 pl-8 pt-4">
        <DocumentItem.Skeleton />
        <DocumentItem.Skeleton />
        <DocumentItem.Skeleton />
        <DocumentItem.Skeleton />
      </div>
    );
  }

  return (
    <div>
      {allDocs?.map((doc) => <DocumentItem key={doc._id} document={doc} />)}
    </div>
  );
};
