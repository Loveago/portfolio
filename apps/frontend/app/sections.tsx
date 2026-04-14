"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
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
  X,
  ChevronDown
} from "lucide-react";
import { GlassCard, NeonButton, SectionHeading } from "@portfolio/ui";
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
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

// Scroll Progress Component
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

// Animated Counter Component
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const reduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.p 
        className="text-3xl md:text-4xl font-bold text-cyan-300"
        initial={reduceMotion ? undefined : { scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        {value}
      </motion.p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </motion.div>
  );
}

// Text Reveal Animation Component
function TextReveal({ children, className = "" }: { children: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 }
    })
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  if (reduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`${className} inline-flex flex-wrap`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="mr-[0.25em] inline-block"
          style={{ transformOrigin: "center bottom" }}
        >
          {word}
        </motion.span>
      ))}
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
  const [formFocused, setFormFocused] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { hidden, scrolled } = useNavbarScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

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
      <ScrollProgress />
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
              className="p-2 rounded-xl border border-border bg-bg-card/50 backdrop-blur-sm"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </nav>
      </motion.header>

      <motion.section 
        id="home" 
        ref={heroRef} 
        className="section-shell mx-auto max-w-6xl px-5 pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen flex items-center"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="grid items-center gap-8 md:gap-12 md:grid-cols-2 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5 md:space-y-6 text-center md:text-left"
          >
            <motion.p 
              variants={fadeUp}
              className="inline-flex rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-cyan"
            >
              Welcome to DevCraft Studio
            </motion.p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-text-primary">
              <TextReveal>We Build. We Market.</TextReveal>{" "}
              <span className="text-accent-cyan">
                <TextReveal>We Deliver.</TextReveal>
              </span>
            </h1>
            <motion.p 
              variants={fadeUp}
              className="max-w-xl mx-auto md:mx-0 text-base md:text-lg text-text-secondary"
            >
              A creative digital studio helping businesses grow with conversion-focused websites,
              strategic campaigns, and unforgettable visual storytelling.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.a 
                href="#portfolio"
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              >
                <NeonButton className="group inline-flex items-center gap-2">
                  View Our Work
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.span>
                </NeonButton>
              </motion.a>
              <a href="#services">
                <NeonButton variant="ghost">Our Services</NeonButton>
              </a>
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 md:grid-cols-4"
            >
              {[
                ["50+", "Projects Completed"],
                ["30+", "Happy Clients"],
                ["3", "Core Services"],
                ["100%", "Commitment"]
              ].map(([value, label]) => (
                <AnimatedCounter key={label} value={value} label={label} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: reduceMotion ? 0 : 0.8, 
              delay: reduceMotion ? 0 : 0.2,
              type: "spring",
              stiffness: 100
            }}
            className="relative hidden md:block"
          >
            <motion.div
              animate={reduceMotion ? undefined : { 
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut" 
              }}
            >
              <GlassCard className="overflow-hidden p-4 relative">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-accent-cyan/20 to-accent-blue/20 blur-xl"
                  animate={reduceMotion ? undefined : { opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <div className="rounded-xl border border-border bg-gradient-to-br from-bg-surface to-bg-base p-6 relative">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent-cyan">Creative Excellence</p>
                  <h3 className="text-3xl font-semibold">Digital Solutions That Drive Growth</h3>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                    {services.map((service, idx) => (
                      <motion.div 
                        key={service.title} 
                        className="rounded-lg border border-border bg-bg-card p-3 text-text-primary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: "var(--accent-cyan)" }}
                      >
                        {service.title.split(" ")[0]}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a href="#services" className="flex flex-col items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.section>

      <motion.section
        id="services"
        className="mx-auto max-w-6xl px-4 sm:px-5 py-12 sm:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            subtitle="End-to-end solutions built to launch, scale, and elevate your business with confidence."
          />
        </motion.div>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div 
              key={service.title} 
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -8, transition: { duration: 0.3 } }}
            >
              <GlassCard className="h-full p-4 sm:p-6 group cursor-pointer relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="relative"
                  whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <service.icon className="mb-3 sm:mb-4 h-8 sm:h-10 w-8 sm:w-10 text-accent-cyan group-hover:text-accent-blue transition-colors" />
                </motion.div>
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">{service.title}</h3>
                <p className="text-sm sm:text-base text-text-secondary group-hover:text-text-primary transition-colors">{service.description}</p>
                <motion.div 
                  className="mt-3 sm:mt-4 flex items-center gap-2 text-accent-cyan text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="h-4 w-4" />
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="portfolio"
        className="mx-auto max-w-6xl px-4 sm:px-5 py-12 sm:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Projects"
            subtitle="A snapshot of selected client work spanning design, development, and growth marketing."
          />
          <motion.div whileHover={reduceMotion ? undefined : { scale: 1.05 }} whileTap={reduceMotion ? undefined : { scale: 0.95 }} className="hidden sm:block">
            <NeonButton variant="ghost" className="text-sm">View All Projects</NeonButton>
          </motion.div>
        </motion.div>

        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              variants={scaleIn}
              whileHover={reduceMotion ? undefined : { y: -8, transition: { duration: 0.3 } }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="text-left group"
            >
              <GlassCard className="overflow-hidden relative">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover"
                    whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.8 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2 p-3 sm:p-4">
                  <motion.p 
                    className="text-xs uppercase tracking-[0.16em] text-accent-cyan"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    {project.category}
                  </motion.p>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">{project.title}</h3>
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="h-4 w-4 text-accent-cyan" />
                    </motion.div>
                  </div>
                </div>
              </GlassCard>
            </motion.button>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="testimonials"
        className="mx-auto max-w-6xl px-4 sm:px-5 py-12 sm:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="Clients Love Us"
            title="What Our Clients Say"
            subtitle="Live testimonial data fetched from your backend API with loading state transitions."
          />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
          <TestimonialCarousel testimonials={testimonials} loading={loadingTestimonials} />
        </motion.div>
      </motion.section>

      <motion.section
        id="contact"
        className="mx-auto max-w-6xl px-4 sm:px-5 py-12 sm:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr_1.4fr]">
          <motion.div variants={fadeUp}>
            <GlassCard className="p-4 sm:p-6 h-full">
              <SectionHeading
                eyebrow="Get In Touch"
                title="Ready To Start Your Project?"
                subtitle="Share your goals and we will help turn your vision into growth-focused outcomes."
              />
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@devcraftstudio.com" },
                  { icon: Phone, label: "Call", value: "+233 24 123 4567" },
                  { icon: MapPin, label: "Location", value: "Accra, Ghana" }
                ].map((contact, idx) => (
                  <motion.div
                    key={contact.label}
                    className="flex items-center gap-3 sm:gap-4 text-text-secondary group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 5, color: "var(--accent-cyan)" }}
                  >
                    <div className="p-2 rounded-lg border border-border bg-bg-card group-hover:border-accent-cyan/30 transition-colors">
                      <contact.icon className="h-4 sm:h-5 w-4 sm:w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted">{contact.label}</p>
                      <p className="text-sm text-text-primary">{contact.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GlassCard className="p-4 sm:p-6">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  {[
                    { id: "name", label: "Your Name", type: "text" },
                    { id: "email", label: "Your Email", type: "email" }
                  ].map((field) => (
                    <motion.div
                      key={field.id}
                      className="relative"
                      animate={formFocused === field.id ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formFocused === field.id 
                            ? "-top-2 text-xs text-accent-cyan bg-bg-base px-1" 
                            : "top-3.5 text-text-muted"
                        }`}
                      >
                        {field.label}
                      </motion.label>
                      <input
                        id={field.id}
                        type={field.type}
                        className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary outline-none transition-all duration-300 focus:border-accent-cyan focus:bg-bg-surface focus:shadow-[0_0_20px_rgba(46,211,255,0.15)]"
                        onFocus={() => setFormFocused(field.id)}
                        onBlur={(e) => !e.target.value && setFormFocused(null)}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="relative"
                  animate={formFocused === "message" ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      formFocused === "message" 
                        ? "-top-2 text-xs text-accent-cyan bg-bg-base px-1" 
                        : "top-3.5 text-text-muted"
                    }`}
                  >
                    Tell us about your project
                  </motion.label>
                  <textarea
                    id="message"
                    className="min-h-28 sm:min-h-32 w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary outline-none transition-all duration-300 focus:border-accent-cyan focus:bg-bg-surface focus:shadow-[0_0_20px_rgba(46,211,255,0.15)] resize-none"
                    onFocus={() => setFormFocused("message")}
                    onBlur={(e) => !e.target.value && setFormFocused(null)}
                  />
                </motion.div>
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <NeonButton className="w-full text-sm sm:text-base py-3">
                    <motion.span 
                      className="inline-flex items-center gap-2"
                      animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      Send Message <Rocket className="h-4 w-4" />
                    </motion.span>
                  </NeonButton>
                </motion.div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-t border-border px-4 sm:px-5 py-8 sm:py-10"
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-text-muted md:flex-row md:items-center">
          <p className="text-text-secondary">© 2026 DevCraft Studio. All rights reserved.</p>
          <p className="inline-flex items-center gap-2 text-text-secondary">
            Designed with motion-forward UX <Sparkles className="h-4 w-4 text-accent-cyan" />
          </p>
        </div>
      </motion.footer>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 sm:p-5 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              className="w-full max-w-2xl mx-4"
            >
              <GlassCard className="overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-48 sm:h-56 w-full object-cover md:h-72"
                />
                <div className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-accent-cyan">
                        {selectedProject.category}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-semibold text-text-primary">{selectedProject.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="rounded-full border border-border p-2 text-text-secondary transition hover:border-accent-cyan hover:text-accent-cyan"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-text-secondary">{selectedProject.blurb}</p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.main>
  );
}
