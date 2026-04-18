import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-4">
        <Badge>{eyebrow}</Badge>
        <h2 className="font-display text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-white/65 md:text-lg">{description}</p>
      </div>
      {action}
    </div>
  );
}
