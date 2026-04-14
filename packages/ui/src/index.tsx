import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "ghost";
};

export function NeonButton({ children, variant = "solid", className = "", ...props }: ButtonProps) {
  const variants = {
    solid:
      "bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-blue)] to-[var(--accent-purple)] text-white shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95",
    ghost:
      "bg-bg-card/80 text-text-primary border-2 border-border hover:border-[var(--accent-pink)] hover:text-[var(--accent-pink)] hover:shadow-[0_0_20px_rgba(255,107,157,0.2)] hover:scale-105 active:scale-95"
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
    <div className={`rounded-2xl border-2 border-border bg-bg-card/90 backdrop-blur-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 ${className}`}>
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
      <p className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent-pink)]/40 bg-gradient-to-r from-[var(--accent-pink)]/20 to-[var(--accent-cyan)]/20 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-[var(--accent-pink)] font-bold shadow-[0_0_15px_rgba(255,107,157,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sunshine)] animate-pulse" />
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-text-primary md:text-4xl bg-gradient-to-r from-text-primary to-[var(--accent-purple)] bg-clip-text">{title}</h2>
      <p className="text-sm text-text-secondary md:text-base leading-relaxed">{subtitle}</p>
    </div>
  );
}
