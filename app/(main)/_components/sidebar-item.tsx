"use client";
import { File, LucideIcon } from "lucide-react";

interface SidebarItemProps {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  isSearch?: boolean;
}

export const SidebarItem = ({
  label,
  icon: Icon,
  onClick,
  isSearch,
}: SidebarItemProps) => {
  return (
    <div
      role="button"
      className="flex items-center text-sm p-3 w-full hover:bg-primary/5 gap-x-2 font-medium"
      onClick={onClick}
    >
      {Icon ? <Icon className="h-5 w-5" /> : <File className="h-4 w-4" />}
      <div className="truncate">{label}</div>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted gap-1 px-1.5 font-mono font-medium text-[10px] text-muted-foreground opacity-100">
          <span className="text-sm">CMD</span>K
        </kbd>
      )}
    </div>
  );
};
