import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "ghost";
};

export function NeonButton({ children, variant = "solid", className = "", ...props }: ButtonProps) {
  const variants = {
    solid:
      "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-blue)] text-white shadow-[0_0_30px_rgba(46,211,255,0.35)] hover:shadow-[0_0_40px_rgba(92,124,255,0.5)]",
    ghost:
      "bg-bg-card text-text-primary border border-border hover:border-[var(--accent-cyan)]/70 hover:bg-bg-surface"
  };

  const buttonVariant = variants[variant as keyof typeof variants];

  return (
    <button
      {...props}
      className={`rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold transition-all duration-300 ${buttonVariant} ${className}`}
    >
      {children}
    </button>
  );
}

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div className={`rounded-2xl border border-border bg-bg-card backdrop-blur-md shadow-glass ${className}`}>
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="max-w-xl space-y-2 sm:space-y-3">
      <p className="inline-flex rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-text-primary md:text-4xl">{title}</h2>
      <p className="text-sm text-text-secondary md:text-base">{subtitle}</p>
    </div>
  );
}
