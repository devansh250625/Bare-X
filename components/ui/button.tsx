import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]";

export function Button({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClassName = {
    primary:
      "bg-foreground text-white shadow-[0_4px_16px_rgba(26,26,46,0.2)] hover:shadow-[0_8px_32px_rgba(26,26,46,0.3)] hover:bg-[#2a2a44]",
    ghost:
      "bg-transparent text-foreground border border-foreground/15 hover:border-foreground/30 hover:bg-foreground/5",
    dark:
      "bg-white text-surface-dark shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
  }[variant];

  const classes = cn(baseClassName, variantClassName, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
