import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "pill";

const variants: Record<Variant, string> = {
  primary: "btn-shine bg-forest-floor text-paper-white hover:-translate-y-0.5 hover:bg-deep-moss hover:shadow-md",
  ghost: "border border-ink-black text-ink-black hover:-translate-y-0.5 hover:bg-pale-stone",
  pill: "text-ink-black hover:bg-pale-stone",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  full?: boolean;
  external?: boolean;
  className?: string;
};

export function Button({ children, variant = "primary", href, full = false, external = false, className = "" }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-buttons px-4 py-1.5 text-body font-medium transition-[color,background-color,translate,scale,box-shadow] duration-300 ease-out active:scale-[0.97] ${
    full ? "w-full" : ""
  } ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
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
