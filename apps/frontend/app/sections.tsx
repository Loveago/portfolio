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
  MessageSquare,
  Phone,
  Rocket,
  Sparkles,
  X,
  ChevronDown
} from "lucide-react";
import { GlassCard, NeonButton, SectionHeading } from "@portfolio/ui";

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
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80",
    blurb: "A performant storefront with tailored checkout flows and real-time analytics."
  },
  {
    id: 2,
    title: "Social Media Campaign",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1611162616805-6c0f6a8f9f6f?auto=format&fit=crop&w=900&q=80",
    blurb: "A high-converting launch campaign that boosted qualified traffic by 250%."
  },
  {
    id: 3,
    title: "Brand Identity Kit",
    category: "Graphics Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
    blurb: "A cohesive visual system that elevated trust and improved cross-channel consistency."
  },
  {
    id: 4,
    title: "SaaS Dashboard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1551281044-8d8d8d8f0f54?auto=format&fit=crop&w=900&q=80",
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
    <div className="h-48 rounded-2xl border border-white/10 bg-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
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
      <div className="grid gap-4 md:grid-cols-3">
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
            className="grid gap-4 md:grid-cols-3"
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
                  <GlassCard className="h-full p-6 hover:border-cyan-300/30 transition-colors duration-300">
                    <Sparkles className="mb-4 h-5 w-5 text-cyan-300" />
                    <p className="text-slate-200 mb-4">&ldquo;{item.message}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-cyan-200">★★★★★</p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-white/20 hover:border-cyan-300/50 hover:bg-white/5 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1 items-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-cyan-400 w-4" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 rounded-full border border-white/20 hover:border-cyan-300/50 hover:bg-white/5 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
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

export function HomePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [formFocused, setFormFocused] = useState<string | null>(null);
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

      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-white/10 bg-[#050713]/85 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#home" className="text-lg font-semibold tracking-wide">
            DEVCRAFT <span className="text-cyan-300">STUDIO</span>
          </a>
          <ul className="hidden gap-6 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item}`} className="transition-colors hover:text-white">
                  {item[0].toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact">
            <NeonButton>Let&apos;s Work Together</NeonButton>
          </a>
        </nav>
      </motion.header>

      <motion.section 
        id="home" 
        ref={heroRef} 
        className="section-shell mx-auto max-w-6xl px-5 pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen flex items-center"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="grid items-center gap-12 md:grid-cols-2 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.p 
              variants={fadeUp}
              className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200"
            >
              Welcome to DevCraft Studio
            </motion.p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              <TextReveal>We Build. We Market.</TextReveal>{" "}
              <span className="text-cyan-300">
                <TextReveal>We Deliver.</TextReveal>
              </span>
            </h1>
            <motion.p 
              variants={fadeUp}
              className="max-w-xl text-lg text-slate-300"
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
              className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4"
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
            className="relative"
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
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl"
                  animate={reduceMotion ? undefined : { opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#0c1230] to-[#070a18] p-6 relative">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-200">Creative Excellence</p>
                  <h3 className="text-3xl font-semibold">Digital Solutions That Drive Growth</h3>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                    {services.map((service, idx) => (
                      <motion.div 
                        key={service.title} 
                        className="rounded-lg border border-white/10 bg-white/5 p-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: "rgba(46, 211, 255, 0.3)" }}
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a href="#services" className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.section>

      <motion.section
        id="services"
        className="mx-auto max-w-6xl px-5 py-16"
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
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div 
              key={service.title} 
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -8, transition: { duration: 0.3 } }}
            >
              <GlassCard className="h-full p-6 group cursor-pointer relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="relative"
                  whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <service.icon className="mb-4 h-10 w-10 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                </motion.div>
                <h3 className="mb-3 text-xl font-semibold group-hover:text-cyan-200 transition-colors">{service.title}</h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors">{service.description}</p>
                <motion.div 
                  className="mt-4 flex items-center gap-2 text-cyan-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
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
        className="mx-auto max-w-6xl px-5 py-16"
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
          <motion.div whileHover={reduceMotion ? undefined : { scale: 1.05 }} whileTap={reduceMotion ? undefined : { scale: 0.95 }}>
            <NeonButton variant="ghost">View All Projects</NeonButton>
          </motion.div>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover"
                    whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-[#050713] via-transparent to-transparent"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.8 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <motion.p 
                    className="text-xs uppercase tracking-[0.16em] text-cyan-200"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    {project.category}
                  </motion.p>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold group-hover:text-cyan-200 transition-colors">{project.title}</h3>
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="h-4 w-4 text-cyan-200" />
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
        className="mx-auto max-w-6xl px-5 py-16"
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

        <motion.div variants={fadeUp} className="mt-10">
          <TestimonialCarousel testimonials={testimonials} loading={loadingTestimonials} />
        </motion.div>
      </motion.section>

      <motion.section
        id="contact"
        className="mx-auto max-w-6xl px-5 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <motion.div variants={fadeUp}>
            <GlassCard className="p-6 h-full">
              <SectionHeading
                eyebrow="Get In Touch"
                title="Ready To Start Your Project?"
                subtitle="Share your goals and we will help turn your vision into growth-focused outcomes."
              />
              <div className="mt-8 space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@devcraftstudio.com" },
                  { icon: Phone, label: "Call", value: "+233 24 123 4567" },
                  { icon: MapPin, label: "Location", value: "Accra, Ghana" }
                ].map((contact, idx) => (
                  <motion.div
                    key={contact.label}
                    className="flex items-center gap-4 text-slate-300 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 5, color: "#2ed3ff" }}
                  >
                    <div className="p-2 rounded-lg border border-white/10 bg-white/5 group-hover:border-cyan-300/30 transition-colors">
                      <contact.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">{contact.label}</p>
                      <p className="text-sm">{contact.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
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
                            ? "-top-2 text-xs text-cyan-300 bg-[#0b1028] px-1" 
                            : "top-3.5 text-slate-400"
                        }`}
                      >
                        {field.label}
                      </motion.label>
                      <input
                        id={field.id}
                        type={field.type}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-300 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(46,211,255,0.15)]"
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
                        ? "-top-2 text-xs text-cyan-300 bg-[#0b1028] px-1" 
                        : "top-3.5 text-slate-400"
                    }`}
                  >
                    Tell us about your project
                  </motion.label>
                  <textarea
                    id="message"
                    className="min-h-32 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-300 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(46,211,255,0.15)] resize-none"
                    onFocus={() => setFormFocused("message")}
                    onBlur={(e) => !e.target.value && setFormFocused(null)}
                  />
                </motion.div>
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <NeonButton className="w-full">
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
        className="border-t border-white/10 px-5 py-10"
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-slate-400 md:flex-row md:items-center">
          <p>© 2026 DevCraft Studio. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            Designed with motion-forward UX <Sparkles className="h-4 w-4 text-cyan-300" />
          </p>
        </div>
      </motion.footer>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-5 backdrop-blur"
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
              className="w-full max-w-2xl"
            >
              <GlassCard className="overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-56 w-full object-cover md:h-72"
                />
                <div className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">
                        {selectedProject.category}
                      </p>
                      <h3 className="text-2xl font-semibold">{selectedProject.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="rounded-full border border-white/20 p-2 text-slate-200 transition hover:border-cyan-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-slate-300">{selectedProject.blurb}</p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.main>
  );
}
