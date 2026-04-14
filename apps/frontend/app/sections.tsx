"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Brush,
  ChevronLeft,
  ChevronRight,
  Code2,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Moon,
  Phone,
  Rocket,
  Sparkles,
  Sun,
  X
} from "lucide-react";
import { GlassCard, NeonButton } from "@portfolio/ui";
import { useTheme } from "./providers";

type Testimonial = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
};

type ProjectItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  blurb: string;
};

const services = [
  {
    title: "Web & Software Development",
    description:
      "Custom websites and robust platforms engineered for speed, scalability, and conversion growth.",
    icon: Code2
  },
  {
    title: "Social Media Marketing",
    description:
      "Campaign design and channel strategy that turn attention into qualified leads and revenue.",
    icon: MessageSquare
  },
  {
    title: "Graphics Design",
    description:
      "Brand identity systems and premium visual content built to make your business unforgettable.",
    icon: Brush
  }
];

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90",
    blurb: "A performant storefront with tailored checkout flows and real-time analytics."
  },
  {
    id: 2,
    title: "Social Media Campaign",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=90",
    blurb: "A high-converting launch campaign that boosted qualified traffic by 250%."
  },
  {
    id: 3,
    title: "Brand Identity Kit",
    category: "Graphics Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=90",
    blurb: "A cohesive visual system that elevated trust and improved cross-channel consistency."
  },
  {
    id: 4,
    title: "SaaS Dashboard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90",
    blurb: "A modular product dashboard focused on retention, clarity, and team productivity."
  }
];

const navItems = ["home", "services", "portfolio", "testimonials", "contact"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};


// Animated Counter Component
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const reduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center p-2"
    >
      <motion.p 
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--accent-cyan)]"
        initial={reduceMotion ? undefined : { scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        {value}
      </motion.p>
      <p className="text-xs sm:text-sm text-text-muted mt-1 leading-tight">{label}</p>
    </motion.div>
  );
}

// Simple fade-in text - lightweight for performance
function TextReveal({ children, className = "" }: { children: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  
  if (reduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.span>
  );
}

// Shimmer Loading Effect
function ShimmerCard() {
  return (
    <div className="h-40 sm:h-48 rounded-2xl border border-border bg-bg-card overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent animate-shimmer" />
    </div>
  );
}

// Testimonial Carousel Component
function TestimonialCarousel({ testimonials, loading }: { testimonials: Testimonial[]; loading: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  
  useEffect(() => {
    if (testimonials.length === 0 || loading) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length, loading]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (loading) {
    return (
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => <ShimmerCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={reduceMotion ? undefined : { opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          >
            {[0, 1, 2].map((offset) => {
              const idx = (currentIndex + offset) % testimonials.length;
              const item = testimonials[idx];
              if (!item) return null;
              
              return (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: offset * 0.1 }}
                >
                  <GlassCard className="h-full p-4 sm:p-6 hover:border-[var(--accent-cyan)]/30 transition-colors duration-300">
                    <Sparkles className="mb-3 sm:mb-4 h-4 sm:h-5 w-4 sm:w-5 text-[var(--accent-cyan)]" />
                    <p className="text-text-secondary text-sm sm:text-base mb-3 sm:mb-4">&ldquo;{item.message}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-text-primary text-sm sm:text-base">{item.name}</p>
                      <p className="text-sm text-[var(--accent-cyan)]">★★★★★</p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center gap-2 mt-4 sm:mt-6">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-border hover:border-[var(--accent-cyan)]/50 hover:bg-bg-card transition-all"
        >
          <ChevronLeft className="h-4 sm:h-5 w-4 sm:w-5 text-text-primary" />
        </button>
        <div className="flex gap-1 items-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-[var(--accent-cyan)] w-4" : "bg-border hover:bg-text-muted"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 rounded-full border border-border hover:border-[var(--accent-cyan)]/50 hover:bg-bg-card transition-all"
        >
          <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5 text-text-primary" />
        </button>
      </div>
    </div>
  );
}

// Use Navbar Scroll Hook
function useNavbarScroll() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { hidden, scrolled };
}

// Theme Toggle Component - Playful & Colorful
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl border-2 border-border bg-bg-card/80 backdrop-blur-sm hover:border-[var(--accent-cyan)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
      whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: 5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <Moon className="w-5 h-5 text-[var(--accent-cyan)]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <Sun className="w-5 h-5 text-[var(--accent-sunshine)]" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Sparkle effect in light mode */}
      {theme === "light" && (
        <>
          <motion.span
            className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent-pink)] rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <motion.span
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[var(--accent-mint)] rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
          />
        </>
      )}
    </motion.button>
  );
}

// Mobile Menu Component
function MobileMenu({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-bg-surface border-l border-border z-50 md:hidden p-6"
            initial={reduceMotion ? undefined : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-semibold text-text-primary">Menu</span>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5">
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  onClick={onClose}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors py-2 border-b border-border/50"
                  initial={reduceMotion ? undefined : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </motion.a>
              ))}
            </nav>
            <div className="mt-8">
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function HomePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { hidden, scrolled } = useNavbarScroll();

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoadingTestimonials(true);
      try {
        const response = await fetch("/api/testimonials", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        const data = (await response.json()) as Testimonial[];
        setTestimonials(data);
      } catch (error) {
        setTestimonials([
          {
            id: 0,
            name: "DevCraft Client",
            message: "Connect your database to display live testimonials here.",
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <motion.main
      className="relative isolate"
      initial={reduceMotion ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.35 }}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid bg-[size:24px_24px] opacity-[0.06]" />

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled 
            ? "border-border bg-bg-base/85 backdrop-blur-xl" 
            : "border-transparent bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-5 py-3 sm:py-4">
          <a href="#home" className="text-base sm:text-lg font-semibold tracking-wide text-text-primary">
            DEVCRAFT <span className="text-accent-cyan">STUDIO</span>
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden gap-6 text-sm text-text-secondary md:flex">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item}`} className="transition-colors hover:text-text-primary">
                  {item[0].toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Desktop CTA and Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a href="#contact">
              <NeonButton className="text-sm">Let&apos;s Work Together</NeonButton>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-xl border-2 border-border bg-bg-card shadow-sm active:scale-95 transition-transform"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* MOBILE-FIRST HERO */}
      <section id="home" className="pt-20 pb-12 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Mobile Hero - Clean & Simple with Animations */}
          <div className="md:hidden">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center"
            >
              <motion.span 
                variants={fadeUp}
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20 mb-4"
              >
                Welcome
              </motion.span>
              <motion.h1 
                variants={fadeUp}
                className="text-3xl font-bold text-text-primary leading-tight mb-4"
              >
                We Build.<br/>
                We Market.<br/>
                <span className="text-[var(--accent-cyan)]">We Deliver.</span>
              </motion.h1>
              <motion.p 
                variants={fadeUp}
                className="text-text-secondary text-base mb-6 max-w-xs mx-auto"
              >
                Creative digital studio helping businesses grow.
              </motion.p>
              <motion.div 
                variants={fadeUp}
                className="flex flex-col gap-3 mb-8"
              >
                <a href="#portfolio">
                  <NeonButton className="w-full">View Our Work</NeonButton>
                </a>
                <a href="#services">
                  <NeonButton variant="ghost" className="w-full">Our Services</NeonButton>
                </a>
              </motion.div>
            </motion.div>

            {/* Mobile Stats - Horizontal Scroll with Animations */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
            >
              {[
                ["50+", "Projects"],
                ["30+", "Clients"],
                ["3", "Services"],
                ["100%", "Commit"]
              ].map(([value, label], idx) => (
                <motion.div 
                  key={label} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex-shrink-0 bg-bg-card border border-border rounded-xl p-3 min-w-[80px] text-center hover:border-[var(--accent-cyan)]/50 transition-colors"
                >
                  <p className="text-xl font-bold text-[var(--accent-cyan)]">{value}</p>
                  <p className="text-xs text-text-muted">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Desktop Hero */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20">
                Welcome to DevCraft Studio
              </span>
              <h1 className="text-5xl font-bold text-text-primary leading-tight">
                We Build. We Market. <span className="text-[var(--accent-cyan)]">We Deliver.</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-md">
                A creative digital studio helping businesses grow with conversion-focused websites and campaigns.
              </p>
              <div className="flex gap-4">
                <a href="#portfolio"><NeonButton>View Our Work</NeonButton></a>
                <a href="#services"><NeonButton variant="ghost">Our Services</NeonButton></a>
              </div>
              <div className="grid grid-cols-4 gap-4 pt-4">
                {[
                  ["50+", "Projects Completed"],
                  ["30+", "Happy Clients"],
                  ["3", "Core Services"],
                  ["100%", "Commitment"]
                ].map(([value, label]) => (
                  <AnimatedCounter key={label} value={value} label={label} />
                ))}
              </div>
            </div>
            <div className="relative">
              <GlassCard className="p-6">
                <p className="text-xs uppercase tracking-wider text-[var(--accent-cyan)] mb-2">Creative Excellence</p>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">Digital Solutions That Drive Growth</h3>
                <div className="flex gap-2">
                  {services.map((s) => (
                    <span key={s.title} className="px-3 py-1 rounded-lg bg-bg-card border border-border text-sm text-text-secondary">
                      {s.title.split(" ")[0]}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - Mobile Optimized */}
      <section id="services" className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20 mb-3">
              What We Do
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-2">Our Services</h2>
            <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto">
              End-to-end solutions to launch and scale your business.
            </p>
          </div>

          {/* Mobile: Vertical Cards with Animations */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="md:hidden space-y-3"
          >
            {services.map((service) => (
              <motion.div 
                key={service.title} 
                variants={fadeUp}
                className="bg-bg-card border border-border rounded-xl p-4 flex items-start gap-4 hover:border-[var(--accent-cyan)]/30 transition-colors"
              >
                <motion.div 
                  className="p-2 rounded-lg bg-[var(--accent-cyan)]/10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <service.icon className="h-6 w-6 text-[var(--accent-cyan)]" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">{service.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <GlassCard key={service.title} className="p-6 group cursor-pointer hover:-translate-y-2 transition-transform">
                <service.icon className="mb-4 h-10 w-10 text-[var(--accent-cyan)]" />
                <h3 className="mb-2 text-xl font-semibold text-text-primary">{service.title}</h3>
                <p className="text-text-secondary">{service.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO - Mobile Optimized */}
      <section id="portfolio" className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20 mb-2">
                Our Work
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-text-primary">Featured Projects</h2>
            </div>
          </div>

          {/* Mobile: 2 Columns with Animations */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="md:hidden grid grid-cols-2 gap-3"
          >
            {projects.map((project) => (
              <motion.button
                key={project.id}
                variants={fadeUp}
                onClick={() => setSelectedProject(project)}
                className="text-left bg-bg-card border border-border rounded-xl overflow-hidden active:scale-95 transition-all hover:border-[var(--accent-cyan)]/50 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-3">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--accent-cyan)] mb-1">{project.category}</p>
                  <h3 className="text-sm font-semibold text-text-primary leading-tight">{project.title}</h3>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Desktop: 4 Columns with hover effects */}
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="text-left group"
              >
                <GlassCard className="overflow-hidden hover:-translate-y-2 transition-transform">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wider text-[var(--accent-cyan)] mb-1">{project.category}</p>
                    <h3 className="font-semibold text-text-primary">{project.title}</h3>
                  </div>
                </GlassCard>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Mobile Optimized */}
      <section id="testimonials" className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 md:mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20 mb-2">
              Clients Love Us
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-text-primary">What Our Clients Say</h2>
          </div>

          {/* Mobile: Single Card with Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            {loadingTestimonials ? (
              <div className="bg-bg-card border border-border rounded-xl p-4 animate-pulse h-32" />
            ) : testimonials.length > 0 ? (
              <div className="bg-bg-card border border-border rounded-xl p-4 hover:border-[var(--accent-cyan)]/30 transition-colors">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((star) => (
                    <motion.span 
                      key={star} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: star * 0.1 }}
                      className="text-[var(--accent-cyan)] text-sm"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                  &ldquo;{testimonials[0].message}&rdquo;
                </p>
                <p className="font-semibold text-text-primary text-sm">{testimonials[0].name}</p>
              </div>
            ) : null}
          </motion.div>

          {/* Desktop: Carousel */}
          <div className="hidden md:block">
            <TestimonialCarousel testimonials={testimonials} loading={loadingTestimonials} />
          </div>
        </div>
      </section>

      {/* CONTACT - Mobile Optimized with Animations */}
      <section id="contact" className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20 mb-2">
              Get In Touch
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-2">Start Your Project</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8"
          >
            {/* Mobile: Simple Form */}
            <div className="bg-bg-card border border-border rounded-2xl p-5 md:p-8">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-border bg-bg-base px-4 py-3 text-text-primary text-sm outline-none focus:border-[var(--accent-cyan)] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-xl border border-border bg-bg-base px-4 py-3 text-text-primary text-sm outline-none focus:border-[var(--accent-cyan)] transition-colors"
                />
                <textarea
                  placeholder="Tell us about your project"
                  rows={4}
                  className="w-full rounded-xl border border-border bg-bg-base px-4 py-3 text-text-primary text-sm outline-none focus:border-[var(--accent-cyan)] transition-colors resize-none"
                />
                <NeonButton className="w-full">Send Message</NeonButton>
              </form>
            </div>

            {/* Mobile: Contact Info Below */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 md:mt-0 space-y-4 md:space-y-6"
            >
              <p className="text-text-secondary text-sm md:text-base">
                Ready to transform your digital presence? Let&apos;s discuss how we can help grow your business.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: "hello@devcraftstudio.com" },
                  { icon: Phone, label: "+233 24 123 4567" },
                  { icon: MapPin, label: "Accra, Ghana" }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.label} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 text-text-primary"
                  >
                    <div className="p-2 rounded-lg bg-[var(--accent-cyan)]/10">
                      <item.icon className="h-4 w-4 text-[var(--accent-cyan)]" />
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center md:text-left md:flex md:justify-between md:items-center">
          <p className="text-text-muted text-sm">© 2026 DevCraft Studio</p>
          <p className="text-text-muted text-sm flex items-center justify-center gap-1 mt-2 md:mt-0">
            Made with <Sparkles className="h-3 w-3 text-[var(--accent-cyan)]" /> in Ghana
          </p>
        </div>
      </footer>

      {/* PROJECT MODAL - Lightweight */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-bg-surface border border-border rounded-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-48 sm:h-56 object-cover"
            />
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-xs uppercase text-[var(--accent-cyan)] mb-1">{selectedProject.category}</p>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg hover:bg-bg-card transition-colors"
                >
                  <X className="h-5 w-5 text-text-muted" />
                </button>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{selectedProject.blurb}</p>
            </div>
          </div>
        </div>
      )}
    </motion.main>
  );
}
