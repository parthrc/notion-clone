import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Search } from "lucide-react";
import { TrashItem } from "./trash-item";
import { useState } from "react";

export const TrashBox = () => {
  const archivedDocs = useQuery(api.documents.getAllArchivedDocuments);
  const [search, setSearch] = useState("");

  const searchResults = archivedDocs?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-y-3 ">
      {/* Search bar */}
      <div className="flex items-center gap-x-2">
        <Search className="h-6 w-6" />
        <Input
          type="search"
          placeholder={`Search archived files...`}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Archived couments list */}
      {archivedDocs === undefined && <Spinner size="sm" />}
      <div className="flex flex-col w-full gap-y-1">
        {archivedDocs === null && (
          <p className="text-sm text-muted-foreground">
            No archived documents found.
          </p>
        )}

        {searchResults &&
          searchResults.map((doc) => (
            <TrashItem key={doc._id} document={doc} />
          ))}
      </div>
    </div>
  );
};
