import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Search } from "lucide-react";
import { TrashItem } from "./trash-item";

export const TrashBox = () => {
  const archivedDocs = useQuery(api.documents.getAllArchivedDocuments);

  console.log(archivedDocs);
  return (
    <div className="flex flex-col items-center gap-y-2">
      {/* Search bar */}
      <div className="flex items-center gap-x-2">
        <Search />
        <Input type="search" placeholder={`Search archived files...`} />
      </div>
      {/* Archived couments list */}
      <div className="flex flex-col w-full gap-y-1">
        {archivedDocs === undefined && <Spinner size="sm" />}
        {archivedDocs === null && (
          <p className="text-sm text-muted-foreground">
            No archived documents found.
          </p>
        )}
        {archivedDocs &&
          archivedDocs.map((doc) => <TrashItem key={doc._id} document={doc} />)}
      </div>
    </div>
  );
};
