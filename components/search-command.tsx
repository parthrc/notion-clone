"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
export const SearchCommand = () => {
  //Search store
  const isOpen = useSearch((store) => store.isOpen);
  const onOpen = useSearch((store) => store.onOpen);
  const toggle = useSearch((store) => store.toggle);

  // State for search command

  const [search, searchResults] = useState("");

  const { user } = useUser();

  const allDocs = useQuery(api.documents.getAllDocuments);
  const archivedDocs = allDocs?.filter((doc) => doc.isArchived === true);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        onOpen();
      }
    };

    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, [isOpen]);

  return (
    <CommandDialog open={isOpen} onOpenChange={toggle}>
      <CommandInput placeholder={`Search ${user?.firstName}'s protion...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Trash">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
