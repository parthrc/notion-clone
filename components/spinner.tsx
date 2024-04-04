"use client";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const sizes = {
  default: "h-4 w-4",
  sm: "h-8 w-8",
  lg: "h-16 w-16",
  icon: "h-24 w-24",
};

interface SpinnerProps {
  size?: "default" | "sm" | "lg" | "icon";
  color?: string;
}

export const Spinner = ({ size = "default", color }: SpinnerProps) => {
  return <Loader className={cn("animate-spin", size && `${sizes[size]}`)} />;
};
