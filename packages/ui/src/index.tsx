import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "ghost";
};

export function NeonButton({ children, variant = "solid", className = "", ...props }: ButtonProps) {
  const variants = {
    solid:
      "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_0_30px_rgba(46,211,255,0.35)] hover:shadow-[0_0_40px_rgba(92,124,255,0.5)]",
    ghost:
      "bg-white/5 text-white border border-white/20 hover:border-cyan-300/70 hover:bg-white/10"
  };

  const buttonVariant = variants[variant as keyof typeof variants];

  return (
    <button
      {...props}
      className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${buttonVariant} ${className}`}
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
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-glass ${className}`}>
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
    <div className="max-w-xl space-y-3">
      <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
      <p className="text-sm text-slate-300 md:text-base">{subtitle}</p>
    </div>
  );
}
