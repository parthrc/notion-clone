import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { SidebarItem } from "./sidebar-item";

export const DocumentsList = () => {
  //Get all documents
  const allDocs = useQuery(api.documents.getAllDocuments);
  console.log(allDocs);

  // Convex queries are undefined when they are loading
  // we can use that behaviour to show loading state
  if (allDocs === undefined) {
    return <Spinner size="sm" />;
  }

  return (
    <div>
      {allDocs?.map((doc) => <SidebarItem key={doc._id} label={doc.title} />)}
    </div>
  );
};
