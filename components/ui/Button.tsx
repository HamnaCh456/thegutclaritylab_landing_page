import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "pill";

const variants: Record<Variant, string> = {
  primary: "bg-forest-floor text-paper-white hover:bg-deep-moss",
  ghost: "border border-ink-black text-ink-black hover:bg-pale-stone",
  pill: "text-ink-black hover:bg-pale-stone",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  full?: boolean;
  className?: string;
};

export function Button({ children, variant = "primary", href, full = false, className = "" }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-buttons px-6 py-3 text-body font-medium transition-colors ${
    full ? "w-full" : ""
  } ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls}>
      {children}
    </button>
  );
}
