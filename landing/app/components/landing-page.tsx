"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  ClipboardList,
  Clock3,
  Globe2,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  PhoneCall,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";
import { BrowserMockup } from "./browser-mockup";
import { FeatureCard } from "./feature-card";
import { FormField } from "./form-field";
import { MobileMockup } from "./mobile-mockup";
import { PricingCard } from "./pricing-card";
import { SectionHeading } from "./section-heading";
import { faqs } from "../data/faq";
import { features } from "../data/features";
import { industries } from "../data/industries";
import { logos, steps } from "../data/marketing";
import { pricingPlans } from "../data/pricing";
import type { ContactFormState, DemoFormState } from "../types/landing";

type DemoFormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  industry?: string;
  teamSize?: string;
  details?: string;
};

type ContactFormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

type SectionWrapperProps = {
  children: ReactNode;
  id?: string;
};

function SectionWrapper({ children, id }: SectionWrapperProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      {children}
    </section>
  );
}

type LandingHeaderProps = {};

function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = mobileMenuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])");
      if (!focusableElements?.length) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMenuItemRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const mobileLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "border-b border-slate-200/80 bg-white/80 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent shadow-none backdrop-blur-none"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-8 lg:px-12 lg:py-4">
     <a
  href="#hero"
  className="flex shrink-0 items-center"
  aria-label="TT AI Chat Home"
>
  <img
    src="/ar-ai-chat-logo.png"
    alt="TT AI Chat"
    className="h-16 w-auto object-contain sm:h-[72px]"
  />
</a>

          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            <a href="#features" className="transition hover:text-slate-950">Features</a>
            <a href="#pricing" className="transition hover:text-slate-950">Pricing</a>
            <a href="#faq" className="transition hover:text-slate-950">FAQ</a>
            <a href="#contact" className="transition hover:text-slate-950">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-600 sm:px-4 lg:inline-flex"
            >
              Book Demo
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-sm transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className={`h-0.5 w-5 rounded-full bg-slate-900 transition ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`h-0.5 w-5 rounded-full bg-slate-900 transition ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`h-0.5 w-5 rounded-full bg-slate-900 transition ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-slate-950/30 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.aside
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.95 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[86vw] max-w-[320px] flex-col border-l border-slate-200 bg-white/95 px-5 py-5 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.45)] lg:hidden"
            >
              <div className="flex items-center justify-between">
                <a href="#hero" className="flex items-center gap-3 text-lg font-semibold tracking-tight" onClick={closeMobileMenu}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-sky-500/20">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="text-[0.95rem]">TT AI Chat</span>
                </a>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                  aria-label="Close navigation menu"
                  onClick={closeMobileMenu}
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>

              <nav id="mobile-navigation" aria-label="Mobile" className="mt-8 flex flex-1 flex-col gap-2">
                {mobileLinks.map((link, index) => (
                  <a
                    key={link.href}
                    ref={index === 0 ? firstMenuItemRef : null}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="rounded-full bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                Book Demo
              </a>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

type HeroSectionProps = {
  shouldReduceMotion: boolean;
};

function HeroSection({ shouldReduceMotion }: HeroSectionProps) {
  return (
    <SectionWrapper>
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-sky-600" />
            AI Chatbot for Modern Businesses
          </div>
          <h1 className="mt-8 text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.03em] text-slate-950 sm:text-[3rem] lg:text-[4.25rem]">
            AI Chatbot That Works Like Your Best Employee
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
            Train your chatbot with documents, websites, and FAQs. Generate leads and answer customer questions 24/7 with a premium AI experience.
          </p>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_35px_-12px_rgba(14,165,233,0.55)] transition duration-200 hover:-translate-y-0.5 hover:bg-sky-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Book Demo <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              <CirclePlay className="h-4 w-4" /> View Features
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 sm:justify-start">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">⚡ No-code setup</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">🔒 Enterprise-ready</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">📈 Live analytics</span>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-semibold text-slate-950">24/7</p>
              <p className="mt-1 text-sm text-slate-600">Always-on support</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-semibold text-slate-950">96.4%</p>
              <p className="mt-1 text-sm text-slate-600">Answer accuracy</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-semibold text-slate-950">5 min</p>
              <p className="mt-1 text-sm text-slate-600">To launch</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[640px]"
        >
          <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.25),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.24),_transparent_45%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 p-3 shadow-[0_30px_100px_-30px_rgba(2,6,23,0.45)] sm:p-5">
            <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="rounded-[20px] bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">TT AI Chat Dashboard</p>
                    <p className="text-sm text-slate-500">Live insights and conversations</p>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                    +24% leads
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Today’s conversations</p>
                      <LayoutDashboard className="h-5 w-5 text-sky-400" />
                    </div>
                    <p className="mt-4 text-3xl font-semibold">1,248</p>
                    <p className="mt-2 text-sm text-slate-400">Auto-resolved support requests</p>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Lead capture</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">87</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Accuracy</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">96.4%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -left-2 top-8 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block sm:-left-4 sm:top-10">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-100 p-2 text-sky-700">
                  <MessagesSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Live chat ready</p>
                  <p className="text-sm text-slate-500">Instant responses</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 right-3 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block sm:-bottom-5 sm:right-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Train once</p>
                  <p className="text-sm text-slate-500">Answer forever</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

type TrustedSectionProps = {
  logos: string[];
};

function TrustedSection({ logos }: TrustedSectionProps) {
  return (
    <SectionWrapper>
      <div className="rounded-[32px] border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-sky-50 px-6 py-10 sm:px-10">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Trusted by forward-thinking teams
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {logos.map((logo) => (
            <div key={logo} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center text-base font-semibold text-slate-600 shadow-sm">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

type FeaturesSectionProps = {
  features: Array<{ icon: typeof features[number]["icon"]; title: string; description: string }>;
  shouldReduceMotion: boolean;
};

function FeaturesSection({ features, shouldReduceMotion }: FeaturesSectionProps) {
  return (
    <SectionWrapper id="features">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need to turn support into growth"
        description="From onboarding to intelligent insights, TT AI Chat helps teams serve visitors faster while capturing more opportunities."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

type HowItWorksSectionProps = {
  steps: string[];
  shouldReduceMotion: boolean;
};

function HowItWorksSection({ steps, shouldReduceMotion }: HowItWorksSectionProps) {
  return (
    <SectionWrapper>
      <div className="rounded-[32px] border border-slate-200 bg-slate-950 px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
        <SectionHeading
          eyebrow="How it works"
          title="Go from setup to live support in minutes"
          description="A thoughtful process designed to help your team launch quickly without sacrificing quality."
          align="center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300">
                <span className="text-lg font-semibold">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step}</h3>
              {index < steps.length - 1 ? (
                <div className="mt-6 hidden justify-center text-slate-400 lg:flex">
                  <ChevronDown className="h-5 w-5" />
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

type IndustriesSectionProps = {
  industries: Array<{ name: string; icon: typeof industries[number]["icon"] }>;
  shouldReduceMotion: boolean;
};

function IndustriesSection({ industries, shouldReduceMotion }: IndustriesSectionProps) {
  return (
    <SectionWrapper>
      <SectionHeading
        eyebrow="Industries"
        title="Built to fit the way modern businesses operate"
        description="Whether you run a clinic, a campus, or a hotel, TT AI Chat adapts to your audience and workflows."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {industries.map((industry, index) => (
          <motion.div
            key={industry.name}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <industry.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">{industry.name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Deliver instant help with a chatbot tailored to your service model.
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

type DashboardPreviewSectionProps = {
  shouldReduceMotion: boolean;
};

function DashboardPreviewSection({ shouldReduceMotion }: DashboardPreviewSectionProps) {
  return (
    <SectionWrapper>
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Dashboard preview</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            A command center for every conversation
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Monitor performance, understand customer intent, and collaborate across teams from a beautifully designed workspace.
          </p>
          <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="rounded-[20px] bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-400">Knowledge base health</p>
              <div className="mt-3 h-2.5 rounded-full bg-white/10">
                <div className="h-2.5 w-[84%] rounded-full bg-sky-400" />
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-sm text-slate-400">Widget</p>
                  <p className="mt-1 text-xl font-semibold">Live</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-sm text-slate-400">Knowledge</p>
                  <p className="mt-1 text-xl font-semibold">1.2k docs</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-sm text-slate-400">Leads</p>
                  <p className="mt-1 text-xl font-semibold">+31%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-5"
        >
          <BrowserMockup
            src="/images/widget.png"
            alt="TT AI Chat widget preview"
            title="Widget preview"
            subtitle="Launch a branded chat experience that feels native to your website."
          />
          <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
            <BrowserMockup
              src="/images/knowledge-base.png"
              alt="Knowledge base preview"
              title="Knowledge base"
              subtitle="Organize content into a searchable, high-confidence assistant."
            />
            <MobileMockup
              src="/images/analytics.png"
              alt="Analytics preview"
              title="Insights on the go"
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

type PricingSectionProps = {
  pricingPlans: Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  }>;
};

function PricingSection({ pricingPlans }: PricingSectionProps) {
  return (
    <SectionWrapper id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Flexible plans that grow with your team"
        description="Choose the plan that fits your support volume, knowledge scope, and growth goals."
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            highlighted={plan.highlighted}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

type FaqSectionProps = {
  faqs: Array<{ question: string; answer: string }>;
  activeFaq: number | null;
  setActiveFaq: Dispatch<SetStateAction<number | null>>;
  shouldReduceMotion: boolean;
};

function FaqSection({ faqs, activeFaq, setActiveFaq, shouldReduceMotion }: FaqSectionProps) {
  return (
    <SectionWrapper id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions, answered clearly"
        description="Everything you need to know before your team goes live with TT AI Chat."
      />
      <div className="mt-12 space-y-4">
        {faqs.map((item, index) => {
          const isOpen = activeFaq === index;
          return (
            <motion.div
              key={item.question}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]"
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 text-left"
                onClick={() => setActiveFaq(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                </span>
                <ChevronDown className={`mt-1 h-5 w-5 flex-none text-slate-400 transition ${isOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {isOpen ? <p className="mt-4 text-base leading-7 text-slate-600">{item.answer}</p> : null}
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

type BookDemoSectionProps = {
  demoForm: DemoFormState;

  setDemoForm: Dispatch<
    SetStateAction<DemoFormState>
  >;

  handleDemoSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;

  demoStatus: "idle" | "loading" | "success";

  demoFeedback: string;

  demoErrors: DemoFormErrors;

  setDemoErrors: Dispatch<
    SetStateAction<DemoFormErrors>
  >;

  shouldReduceMotion: boolean;
};
function BookDemoSection({
  demoForm,
  setDemoForm,
  handleDemoSubmit,
  demoStatus,
  demoFeedback,
  demoErrors,
  setDemoErrors,
  shouldReduceMotion,
}: BookDemoSectionProps) { 
  return (
    <SectionWrapper id="book-demo">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[40px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="flex flex-col justify-between rounded-[30px] border border-white/10 bg-white/10 p-7 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Book free demo</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                See how TT AI Chat can elevate support, sales, and service in one live walkthrough.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Join a no-obligation session with our team to explore your goals, review the product, and leave with a clear path forward.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "30-minute live demo",
                "Free consultation tailored to your team",
                "Live product walkthrough with practical examples",
                "No obligation to continue",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-sky-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

    <form
  noValidate
  onSubmit={handleDemoSubmit}
  className="rounded-[30px] border border-slate-200 bg-white/95 p-6 text-slate-900 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.45)] sm:p-7 lg:p-8"
>
  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
    <Sparkles className="h-4 w-4 text-sky-600" />
    Premium booking form
  </div>

  <div className="mt-5 grid gap-4 sm:grid-cols-2">

    {/* ===================================================== */}
    {/* FULL NAME */}
    {/* ===================================================== */}

    <div>
      <FormField
        label="Full Name"
        id="demo-name"
        name="name"
        value={demoForm.name}
        onChange={(event) => {
          setDemoForm((current) => ({
            ...current,
            name: event.target.value,
          }));

          setDemoErrors((current) => ({
            ...current,
            name: undefined,
          }));
        }}
        placeholder="Alex Morgan"
        required
        inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm"
      />

      {demoErrors.name && (
        <p className="mt-1 text-sm text-red-600">
          {demoErrors.name}
        </p>
      )}
    </div>


    {/* ===================================================== */}
    {/* EMAIL */}
    {/* ===================================================== */}

    <div>
      <FormField
        label="Work Email"
        id="demo-email"
        type="email"
        name="email"
        value={demoForm.email}
        onChange={(event) => {
          setDemoForm((current) => ({
            ...current,
            email: event.target.value,
          }));

          setDemoErrors((current) => ({
            ...current,
            email: undefined,
          }));
        }}
        placeholder="alex@company.com"
        required
        inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm"
      />

      {demoErrors.email && (
        <p className="mt-1 text-sm text-red-600">
          {demoErrors.email}
        </p>
      )}
    </div>


    {/* ===================================================== */}
    {/* PHONE */}
    {/* ===================================================== */}

    <div>
      <FormField
        label="Phone Number"
        id="demo-phone"
        type="tel"
        name="phone"
        value={demoForm.phone}
        onChange={(event) => {
          setDemoForm((current) => ({
            ...current,
            phone: event.target.value,
          }));

          setDemoErrors((current) => ({
            ...current,
            phone: undefined,
          }));
        }}
        placeholder="+91 9876543210"
        inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm"
      />

      {demoErrors.phone && (
        <p className="mt-1 text-sm text-red-600">
          {demoErrors.phone}
        </p>
      )}
    </div>


    {/* ===================================================== */}
    {/* COMPANY */}
    {/* ===================================================== */}

    <div>
      <FormField
        label="Company"
        id="demo-company"
        name="company"
        value={demoForm.company}
        onChange={(event) => {
          setDemoForm((current) => ({
            ...current,
            company: event.target.value,
          }));

          setDemoErrors((current) => ({
            ...current,
            company: undefined,
          }));
        }}
        placeholder="Northwind Labs"
        required
        inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm"
      />

      {demoErrors.company && (
        <p className="mt-1 text-sm text-red-600">
          {demoErrors.company}
        </p>
      )}
    </div>


    {/* ===================================================== */}
    {/* COMPANY WEBSITE */}
    {/* ===================================================== */}

    <div>
      <FormField
        label="Company Website"
        id="demo-website"
        type="url"
        name="website"
        value={demoForm.website}
        onChange={(event) => {
          setDemoForm((current) => ({
            ...current,
            website: event.target.value,
          }));

          setDemoErrors((current) => ({
            ...current,
            website: undefined,
          }));
        }}
        placeholder="https://example.com"
        inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm"
      />

      {demoErrors.website && (
        <p className="mt-1 text-sm text-red-600">
          {demoErrors.website}
        </p>
      )}
    </div>


    {/* ===================================================== */}
    {/* INDUSTRY */}
    {/* ===================================================== */}

    <div className="space-y-2">
      <label
        htmlFor="demo-industry"
        className="text-sm font-medium text-slate-700"
      >
        Industry
      </label>

      <select
        id="demo-industry"
        value={demoForm.industry}
        onChange={(event) => {
          setDemoForm((current) => ({
            ...current,
            industry: event.target.value,
          }));

          setDemoErrors((current) => ({
            ...current,
            industry: undefined,
          }));
        }}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      >
        <option value="">Select industry</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
        <option value="Retail">Retail</option>
        <option value="Real Estate">Real Estate</option>
        <option value="Finance">Finance</option>
        <option value="Manufacturing">Manufacturing</option>
      </select>

      {demoErrors.industry && (
        <p className="text-sm text-red-600">
          {demoErrors.industry}
        </p>
      )}
    </div>


    {/* ===================================================== */}
    {/* TEAM SIZE */}
    {/* ===================================================== */}

    <div className="space-y-2">
      <label
        htmlFor="demo-team-size"
        className="text-sm font-medium text-slate-700"
      >
        Team Size
      </label>

      <select
        id="demo-team-size"
        value={demoForm.teamSize}
        onChange={(event) => {
          setDemoForm((current) => ({
            ...current,
            teamSize: event.target.value,
          }));

          setDemoErrors((current) => ({
            ...current,
            teamSize: undefined,
          }));
        }}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      >
        <option value="">Select size</option>
        <option value="1-10">1–10</option>
        <option value="11-50">11–50</option>
        <option value="51-200">51–200</option>
        <option value="201+">201+</option>
      </select>

      {demoErrors.teamSize && (
        <p className="text-sm text-red-600">
          {demoErrors.teamSize}
        </p>
      )}
    </div>


    {/* ===================================================== */}
    {/* MESSAGE / DETAILS */}
    {/* ===================================================== */}

    <div className="sm:col-span-2">
      <FormField
        label="Message"
        id="demo-details"
        name="details"
        textarea
        value={demoForm.details}
        onChange={(event) => {
          setDemoForm((current) => ({
            ...current,
            details: event.target.value,
          }));

          setDemoErrors((current) => ({
            ...current,
            details: undefined,
          }));
        }}
        placeholder="Tell us about your support goals, launch timeline, or current workflow…"
        inputClassName="min-h-28 rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm"
      />

      {demoErrors.details && (
        <p className="mt-1 text-sm text-red-600">
          {demoErrors.details}
        </p>
      )}
    </div>

  </div>


  {/* ===================================================== */}
  {/* SUBMIT */}
  {/* ===================================================== */}

  <button
    type="submit"
    disabled={demoStatus === "loading"}
    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_15px_35px_-12px_rgba(14,165,233,0.55)] transition hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
  >
    {demoStatus === "loading"
      ? "Sending…"
      : demoStatus === "success"
        ? "Booked"
        : "Book Free Demo"}

    <ArrowRight className="h-4 w-4" />
  </button>


  {/* ===================================================== */}
  {/* FEEDBACK */}
  {/* ===================================================== */}

  {demoFeedback ? (
    <p className="mt-4 text-sm text-emerald-700">
      {demoFeedback}
    </p>
  ) : null}

</form>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

type ContactSectionProps = {
  contactForm: ContactFormState;

  setContactForm: Dispatch<
    SetStateAction<ContactFormState>
  >;

  handleContactSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;

  contactStatus: "idle" | "loading" | "success";

  contactFeedback: string;

  contactErrors: ContactFormErrors;

  setContactErrors: Dispatch<
    SetStateAction<ContactFormErrors>
  >;

  shouldReduceMotion: boolean;
};

function ContactSection({
  contactForm,
  setContactForm,
  handleContactSubmit,
  contactStatus,
  contactFeedback,
  contactErrors,
  setContactErrors,
  shouldReduceMotion,
}: ContactSectionProps) {
  return (
    <SectionWrapper id="contact">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[40px] border border-slate-200 bg-white px-6 py-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] sm:px-8 sm:py-10 lg:px-12 lg:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-7 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Contact us</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Reach our team for support, partnerships, or questions.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              We’re here to help you launch with confidence and keep your chatbot experience aligned with your goals.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <Mail className="mt-0.5 h-4 w-4 text-sky-600" />
                <span>aritsolutions.tech@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <PhoneCall className="mt-0.5 h-4 w-4 text-sky-600" />
                <span>9960811224</span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <MapPin className="mt-0.5 h-4 w-4 text-sky-600" />
                <span>540 Market Street, San Francisco, CA 94105</span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-sky-600" />
                <span>Mon–Fri • 9:00 AM – 6:00 PM PST</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700">
                <Globe2 className="h-4 w-4" />
                LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700">
                <Globe2 className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>

        <form
  onSubmit={handleContactSubmit}
  className="rounded-[30px] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10"
>
  <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
    <Globe2 className="h-4 w-4 text-sky-300" />
    Contact form
  </div>

  <div className="mt-5 space-y-4">

    {/* NAME */}
    <div>
      <FormField
        label="Name"
        id="contact-name"
        name="name"
        value={contactForm.name}
        onChange={(event) => {
          setContactForm((current) => ({
            ...current,
            name: event.target.value,
          }));

          setContactErrors((current) => ({
            ...current,
            name: undefined,
          }));
        }}
        placeholder="Jamie Lee"
        required
        inputClassName="h-12 rounded-2xl border-slate-700 bg-slate-900/70 px-4 text-sm text-white"
      />

      {contactErrors.name && (
        <p className="mt-1 text-sm text-red-400">
          {contactErrors.name}
        </p>
      )}
    </div>


    {/* EMAIL */}
    <div>
      <FormField
        label="Email"
        id="contact-email"
        type="email"
        name="email"
        value={contactForm.email}
        onChange={(event) => {
          setContactForm((current) => ({
            ...current,
            email: event.target.value,
          }));

          setContactErrors((current) => ({
            ...current,
            email: undefined,
          }));
        }}
        placeholder="jamie@company.com"
        required
        inputClassName="h-12 rounded-2xl border-slate-700 bg-slate-900/70 px-4 text-sm text-white"
      />

      {contactErrors.email && (
        <p className="mt-1 text-sm text-red-400">
          {contactErrors.email}
        </p>
      )}
    </div>


    {/* SUBJECT */}
    <div>
      <FormField
        label="Subject"
        id="contact-subject"
        name="subject"
        value={contactForm.subject}
        onChange={(event) => {
          setContactForm((current) => ({
            ...current,
            subject: event.target.value,
          }));

          setContactErrors((current) => ({
            ...current,
            subject: undefined,
          }));
        }}
        placeholder="Product question or partnership"
        inputClassName="h-12 rounded-2xl border-slate-700 bg-slate-900/70 px-4 text-sm text-white"
      />

      {contactErrors.subject && (
        <p className="mt-1 text-sm text-red-400">
          {contactErrors.subject}
        </p>
      )}
    </div>


    {/* MESSAGE */}
    <div>
      <FormField
        label="Message"
        id="contact-message"
        name="message"
        textarea
        value={contactForm.message}
        onChange={(event) => {
          setContactForm((current) => ({
            ...current,
            message: event.target.value,
          }));

          setContactErrors((current) => ({
            ...current,
            message: undefined,
          }));
        }}
        placeholder="Tell us about your goals, timeline, or support needs."
        required
        inputClassName="min-h-28 rounded-2xl border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-white"
      />

      {contactErrors.message && (
        <p className="mt-1 text-sm text-red-400">
          {contactErrors.message}
        </p>
      )}
    </div>

  </div>


  {/* SUBMIT */}
  <button
    type="submit"
    disabled={contactStatus === "loading"}
    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
  >
    {contactStatus === "loading"
      ? "Sending…"
      : contactStatus === "success"
        ? "Sent"
        : "Send Message"}

    <ArrowRight className="h-4 w-4" />
  </button>


  {/* FEEDBACK */}
  {contactFeedback ? (
    <p className="mt-4 text-sm text-sky-300">
      {contactFeedback}
    </p>
  ) : null}
</form>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+918767311963"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact us on WhatsApp"
      title="Contact us on WhatsApp"
      className="group fixed bottom-4 right-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-emerald-500 text-white shadow-[0_18px_36px_-15px_rgba(16,185,129,0.45)] transition duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-12 sm:w-12"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm sm:block">
        WhatsApp
      </span>
    </a>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f8fafc_100%)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8 lg:flex-row lg:justify-between lg:px-12">
        <div className="max-w-sm">
          <a href="#hero" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Bot className="h-5 w-5" />
            </div>
            <span>TT AI Chat</span>
          </a>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            AI chatbots for modern businesses that want to support customers and grow revenue 24/7.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick links</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#features" className="transition hover:text-slate-950">Features</a></li>
              <li><a href="#pricing" className="transition hover:text-slate-950">Pricing</a></li>
              <li><a href="#faq" className="transition hover:text-slate-950">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Products</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#contact" className="transition hover:text-slate-950">Book demo</a></li>
              <li><a href="#pricing" className="transition hover:text-slate-950">Starter</a></li>
              <li><a href="#pricing" className="transition hover:text-slate-950">Professional</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#contact" className="transition hover:text-slate-950">Contact</a></li>
              <li><a href="#" className="transition hover:text-slate-950">Privacy</a></li>
              <li><a href="#" className="transition hover:text-slate-950">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LandingPageContent() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [demoForm, setDemoForm] = useState<DemoFormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    industry: "",
    teamSize: "",
    details: "",
  });
  

  const [contactForm, setContactForm] = useState<ContactFormState>({ name: "", email: "", subject: "", message: "" });
  const [demoStatus, setDemoStatus] = useState<"idle" | "loading" | "success">("idle");
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success">("idle");
const [demoErrors, setDemoErrors] =
  useState<DemoFormErrors>({});

const [contactErrors, setContactErrors] =
  useState<ContactFormErrors>({});
  const [demoFeedback, setDemoFeedback] = useState("");
  const [contactFeedback, setContactFeedback] = useState("");


 const validateDemoForm = (): boolean => {
  const errors: DemoFormErrors = {};

  // =====================================================
  // NAME
  // =====================================================

  const name = demoForm.name.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  } else if (!/^[A-Za-z\s'-]+$/.test(name)) {
    errors.name =
      "Name can contain only letters, spaces, hyphens and apostrophes.";
  }

  // =====================================================
  // EMAIL
  // =====================================================

  const email = demoForm.email.trim();

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  // =====================================================
  // PHONE - OPTIONAL
  // =====================================================

  const phone = demoForm.phone.trim();

  if (phone) {
    const digitsOnly = phone.replace(/\D/g, "");

    let phoneNumber = digitsOnly;

    if (
      digitsOnly.startsWith("91") &&
      digitsOnly.length === 12
    ) {
      phoneNumber = digitsOnly.slice(2);
    }

    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      errors.phone =
        "Please enter a valid 10-digit mobile number.";
    }
  }

  // =====================================================
  // COMPANY
  // =====================================================

  const company = demoForm.company.trim();

  if (!company) {
    errors.company = "Please enter your company name.";
  } else if (company.length < 2) {
    errors.company =
      "Company name must be at least 2 characters.";
  } else if (company.length > 150) {
    errors.company =
      "Company name cannot exceed 150 characters.";
  }

  // =====================================================
  // WEBSITE - OPTIONAL
  // =====================================================

  const website = demoForm.website.trim();

  if (website) {
    try {
      const websiteUrl = new URL(website);

      if (
        websiteUrl.protocol !== "http:" &&
        websiteUrl.protocol !== "https:"
      ) {
        errors.website =
          "Please enter a valid website URL.";
      }
    } catch {
      errors.website =
        "Please enter a valid website URL.";
    }
  }

  // =====================================================
  // INDUSTRY - OPTIONAL
  // =====================================================

  const allowedIndustries = [
    "Healthcare",
    "Education",
    "Retail",
    "Real Estate",
    "Finance",
    "Manufacturing",
  ];

  if (
    demoForm.industry &&
    !allowedIndustries.includes(demoForm.industry)
  ) {
    errors.industry =
      "Please select a valid industry.";
  }

  // =====================================================
  // TEAM SIZE - OPTIONAL
  // =====================================================

  const allowedTeamSizes = [
    "1-10",
    "11-50",
    "51-200",
    "201+",
  ];

  if (
    demoForm.teamSize &&
    !allowedTeamSizes.includes(demoForm.teamSize)
  ) {
    errors.teamSize =
      "Please select a valid team size.";
  }

  // =====================================================
  // MESSAGE - OPTIONAL
  // =====================================================

  const details = demoForm.details.trim();

  if (details.length > 2000) {
    errors.details =
      "Message cannot exceed 2000 characters.";
  }

  // =====================================================
  // SET ERRORS
  // =====================================================

  setDemoErrors(errors);

  return Object.keys(errors).length === 0;
};
const handleDemoSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  // ==========================================
  // FRONTEND VALIDATION
  // ==========================================

  const isValid = validateDemoForm();

  if (!isValid) {
    return;
  }

  // ==========================================
  // SUBMIT START
  // ==========================================

  setDemoStatus("loading");
  setDemoFeedback("");

  try {
    const response = await fetch("/api/demo", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: demoForm.name.trim(),
        email: demoForm.email.trim(),
        phone: demoForm.phone.trim(),
        company: demoForm.company.trim(),
        website: demoForm.website.trim(),
        industry: demoForm.industry,
        teamSize: demoForm.teamSize,
        details: demoForm.details.trim(),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Unable to submit demo request."
      );
    }

    // ==========================================
    // SUCCESS
    // ==========================================

    setDemoStatus("success");

    setDemoFeedback(
      "Thanks! We’ll reach out shortly with a tailored walkthrough."
    );

    setDemoForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      industry: "",
      teamSize: "",
      details: "",
    });

    setDemoErrors({});
  } catch (error) {
    console.error(
      "Demo form submission error:",
      error
    );

    setDemoStatus("idle");

    setDemoFeedback(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
};

const validateContactForm = () => {
  const errors: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  } = {};

  // ==========================================
  // NAME
  // ==========================================

  const cleanName = contactForm.name.trim();

  if (!cleanName) {
    errors.name = "Please enter your name.";
  } else if (cleanName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (cleanName.length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  } else if (!/^[A-Za-z\s'-]+$/.test(cleanName)) {
    errors.name =
      "Name can contain only letters, spaces, hyphens and apostrophes.";
  }

  // ==========================================
  // EMAIL
  // ==========================================

  const cleanEmail = contactForm.email.trim();

  if (!cleanEmail) {
    errors.email = "Please enter your email address.";
  } else {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      errors.email =
        "Please enter a valid email address.";
    }
  }

  // ==========================================
  // SUBJECT
  // ==========================================

  const cleanSubject = contactForm.subject.trim();

  if (!cleanSubject) {
    errors.subject = "Please enter a subject.";
  } else if (cleanSubject.length < 3) {
    errors.subject =
      "Subject must be at least 3 characters.";
  } else if (cleanSubject.length > 200) {
    errors.subject =
      "Subject cannot exceed 200 characters.";
  }

  // ==========================================
  // MESSAGE
  // ==========================================

  const cleanMessage = contactForm.message.trim();

  if (!cleanMessage) {
    errors.message =
      "Please enter your message.";
  } else if (cleanMessage.length < 10) {
    errors.message =
      "Message must be at least 10 characters.";
  } else if (cleanMessage.length > 2000) {
    errors.message =
      "Message cannot exceed 2000 characters.";
  }

  setContactErrors(errors);

  return Object.keys(errors).length === 0;
};

const handleContactSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (!validateContactForm()) {
    return;
  }

  setContactStatus("loading");
  setContactFeedback("");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactForm),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to send your message."
      );
    }

    setContactStatus("success");

    setContactFeedback(
      "Message received. Our team will reply within one business day."
    );

    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setContactErrors({});
  } catch (error) {
    console.error("Contact form error:", error);

    setContactStatus("idle");

    setContactFeedback(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
};

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <LandingHeader />

      <main id="hero">
        <HeroSection shouldReduceMotion={shouldReduceMotion} />
        <TrustedSection logos={logos} />
        <FeaturesSection features={features} shouldReduceMotion={shouldReduceMotion} />
        <HowItWorksSection steps={steps} shouldReduceMotion={shouldReduceMotion} />
        <IndustriesSection industries={industries} shouldReduceMotion={shouldReduceMotion} />
        <DashboardPreviewSection shouldReduceMotion={shouldReduceMotion} />
        <PricingSection pricingPlans={pricingPlans} />
        <FaqSection faqs={faqs} activeFaq={activeFaq} setActiveFaq={setActiveFaq} shouldReduceMotion={shouldReduceMotion} />
       <BookDemoSection
  demoForm={demoForm}
  setDemoForm={setDemoForm}
  handleDemoSubmit={handleDemoSubmit}
  demoStatus={demoStatus}
  demoFeedback={demoFeedback}
  demoErrors={demoErrors}
  setDemoErrors={setDemoErrors}
  shouldReduceMotion={shouldReduceMotion}
/>
      <ContactSection
  contactForm={contactForm}
  setContactForm={setContactForm}
  handleContactSubmit={handleContactSubmit}
  contactStatus={contactStatus}
  contactFeedback={contactFeedback}
  contactErrors={contactErrors}
  setContactErrors={setContactErrors}
  shouldReduceMotion={shouldReduceMotion}
/>
      </main>

      <WhatsAppButton />
      <LandingFooter />
    </div>
  );
}

export default LandingPageContent;
