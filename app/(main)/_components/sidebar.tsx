import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  Trash,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import DocumentNavbar from "./doc-navbar";
import { UserItem } from "./user-item";
import { SidebarItem } from "./sidebar-item";
import { useSettings } from "@/hooks/use-settings";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { DocumentsList } from "./documents-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TrashBox } from "./trash-box";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/use-search";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  //For resizing the sidebar
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const openSettings = useSearch((store) => store.onOpen);

  const settings = useSettings();

  // Collapse if on mobile or open
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  // mosue down on anchor point
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  //When dragging the anchor point
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  // WHen dragging completes
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Reset sidebar to default state
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  // Collapse sidebar
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  // Create new document
  const createNewDoc = useMutation(api.documents.createNewDocument);
  const handleCreateNewDoc = () => {
    const promise = createNewDoc({}).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating new document...",
      success: "New document created successfully!",
      error: "Error creating new document!",
    });
  };

  return (
    <>
      <aside
        className={cn(
          "group/sidebar h-full bg-slate-50 dark:bg-background overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
        ref={sidebarRef}
      >
        {/* Left arrow collapse button */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        {/* Sidebar items */}
        <div>
          <UserItem />
          <SidebarItem
            label="Settings"
            icon={SettingsIcon}
            onClick={settings.onOpen}
          />
          <SidebarItem
            label="Search"
            icon={SearchIcon}
            isSearch
            onClick={openSettings}
          />
          {/* Documents list here */}
          <DocumentsList />

          <SidebarItem
            label="New page"
            icon={PlusIcon}
            onClick={handleCreateNewDoc}
          />

          <Popover>
            <PopoverTrigger className="w-full">
              <SidebarItem label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent side="right" className="w-fit">
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        {/* Resize anchor point */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <DocumentNavbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
      </div>
    </>
  );
};
