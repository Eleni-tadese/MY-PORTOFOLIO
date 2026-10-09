import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ease-out";
const variants = {
  primary:
    "bg-lime text-on-lime hover:-translate-y-0.5 hover:bg-lime-soft hover:shadow-[0_12px_30px_-10px_rgb(227_255_89/0.55)]",
  ghost:
    "border border-border-strong text-fg hover:border-lime hover:text-lime",
};
const sizes = { md: "px-6 py-3 text-sm", sm: "px-4 py-2 text-xs" };

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
