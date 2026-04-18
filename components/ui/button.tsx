import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium tracking-[0.16em] uppercase transition duration-300 hover:-translate-y-0.5";

export function Button({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClassName =
    variant === "primary"
      ? "bg-accent text-white shadow-glow hover:bg-[#5a9cff]"
      : "bg-white/5 text-white hover:border-accent/50 hover:bg-white/10";

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
