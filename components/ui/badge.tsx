import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-accent",
        className
      )}
    >
      {children}
    </div>
  );
}
