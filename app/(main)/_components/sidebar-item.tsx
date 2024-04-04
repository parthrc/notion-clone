"use client";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const SidebarItem = ({
  label,
  icon: Icon,
  onClick,
}: SidebarItemProps) => {
  return (
    <div
      role="button"
      className="flex items-center text-sm p-3 w-full hover:bg-primary/5 gap-x-2"
    >
      <Icon className="h-5 w-5" />
      <div className="truncate">{label}</div>
    </div>
  );
};
