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
  Database,
  Globe2,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";
import Image from "next/image";
import { FormField } from "./form-field";
import { PricingCard } from "./pricing-card";
import { SectionHeading } from "./section-heading";
import { faqs } from "../data/faq";
import { features } from "../data/features";
import { industries } from "../data/industries";
import { steps } from "../data/marketing";
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
  className?: string;
};

function SectionWrapper({ children, id, className = "" }: SectionWrapperProps) {
  return (
    <section id={id} className={`mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28 ${className}`}>
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
    { href: "#how-it-works", label: "How It Works" },
    { href: "#solutions", label: "Solutions" },
    { href: "#pricing", label: "Pricing" },
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-8 lg:px-12 lg:py-3">
          <a href="#hero" className="flex shrink-0 items-center" aria-label="TT AI Chat home">
            <img
              src="/tt-chat-logo.svg"
              alt="TT AI Chat"
              className="h-11 w-auto object-contain sm:h-12"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium text-[#071A3D] lg:flex">
            <a href="#features" className="transition-colors hover:text-blue-600">Features</a>
            <a href="#how-it-works" className="transition-colors hover:text-blue-600">How It Works</a>
            <a href="#solutions" className="transition-colors hover:text-blue-600">Solutions</a>
            <a href="#pricing" className="transition-colors hover:text-blue-600">Pricing</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#book-demo"
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-12px_rgba(37,99,235,0.7)] transition-colors hover:bg-blue-700 active:bg-blue-800 sm:px-5 lg:inline-flex"
            >
              Get Started
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 lg:hidden"
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
                <a href="#hero" className="flex items-center" onClick={closeMobileMenu} aria-label="TT AI Chat home">
                  <img
                    src="/tt-chat-logo.svg"
                    alt="TT AI Chat"
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                    className="rounded-lg px-4 py-3.5 text-base font-medium text-[#071A3D] transition-colors hover:bg-slate-50 hover:text-blue-700"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#book-demo"
                onClick={closeMobileMenu}
                className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
              >
                Get Started
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
  const [showAssistantResponse, setShowAssistantResponse] = useState(shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      setShowAssistantResponse(true);
      return;
    }

    const responseTimer = window.setTimeout(() => {
      setShowAssistantResponse(true);
    }, 1900);

    return () => window.clearTimeout(responseTimer);
  }, [shouldReduceMotion]);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(6,182,212,0.07),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/70 px-3.5 py-2 text-sm font-semibold text-blue-700"
            >
              <Sparkles className="h-4 w-4 text-blue-600" />
              AI Chatbot for Modern Businesses
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08, delayChildren: shouldReduceMotion ? 0 : 0.12 } },
              }}
              className="mt-7 max-w-2xl text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-[3.2rem] lg:text-[4.35rem]"
            >
              {"AI Chatbot That Works Like Your Best Employee".split(" ").map((word) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="mr-[0.22em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.62 }}
              className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl"
            >
              Train your chatbot with documents, websites, and FAQs. Generate leads and answer customer questions 24/7 with a premium AI experience.
            </motion.p>
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.76 }}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_14px_32px_-14px_rgba(37,99,235,0.7)] transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Book Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <CirclePlay className="h-4 w-4" /> View Features
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.9 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 sm:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5"><CheckCircle2 className="h-4 w-4 text-blue-600" /> No-code setup</span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Enterprise-ready</span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Live analytics</span>
            </motion.div>
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 1.02 }}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-semibold text-slate-950">24/7</p>
                <p className="mt-1 text-sm text-slate-600">Always-on support</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-semibold text-slate-950">96.4%</p>
                <p className="mt-1 text-sm text-slate-600">Answer accuracy</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-semibold text-slate-950">5 min</p>
                <p className="mt-1 text-sm text-slate-600">To launch</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[620px]"
          >
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="pointer-events-none absolute -inset-8 rounded-[36px] bg-[radial-gradient(circle_at_24%_20%,rgba(37,99,235,0.16),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(6,182,212,0.12),transparent_34%)] blur-2xl" />
              <div className="relative rounded-[28px] border border-slate-200 bg-slate-950 p-2.5 shadow-[0_30px_100px_-35px_rgba(2,6,23,0.5)] sm:p-4">
                <div className="overflow-hidden rounded-[22px] border border-white/10 bg-slate-900">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/30">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">TT AI Chat</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> AI assistant active</p>
                      </div>
                    </div>
                    <span className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300">Live</span>
                  </div>

                  <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_0.76fr]">
                    <div className="min-h-[310px] rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Conversation</p>
                        <MessagesSquare className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="mt-5 space-y-3 text-sm leading-6">
                        <motion.div
                          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.75 }}
                          className="max-w-[88%] rounded-2xl rounded-tl-md border border-white/10 bg-white/10 px-3.5 py-3 text-slate-200"
                        >
                          Hi, I&apos;m looking for help with your services.
                        </motion.div>
                        <motion.div
                          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 1.05 }}
                          className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-blue-600 px-3.5 py-3 text-white shadow-lg shadow-blue-950/20"
                        >
                          Of course. What would you like to explore today?
                        </motion.div>
                        <div className="min-h-12">
                          <AnimatePresence initial={!shouldReduceMotion}>
                            {!showAssistantResponse ? (
                              <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25 }}
                                className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-md border border-white/10 bg-white/10 px-3.5 py-3"
                                aria-label="AI is typing"
                              >
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:150ms]" />
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:300ms]" />
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-[92%] rounded-2xl rounded-tl-md border border-white/10 bg-white/10 px-3.5 py-3 text-slate-200"
                              >
                                I can help with web development, eCommerce, and AI solutions. Would you like a free consultation?
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-slate-500">
                        <span className="flex-1">Type your message...</span>
                        <ArrowRight className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 2.35 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-slate-400">Knowledge context</p>
                          <BrainCircuit className="h-4 w-4 text-cyan-300" />
                        </div>
                        <p className="mt-3 text-sm font-semibold text-white">Website & FAQs</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">3 sources used for this answer</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 2.55 }}
                        className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-emerald-200">Lead captured</p>
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        </div>
                        <p className="mt-3 text-sm font-semibold text-white">Qualified visitor</p>
                        <p className="mt-1 text-xs leading-5 text-emerald-100/60">Ready for your sales team</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 2.75 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <p className="text-xs font-medium text-slate-400">Today&apos;s impact</p>
                        <div className="mt-3 flex items-end justify-between">
                          <p className="text-2xl font-semibold text-white">+24%</p>
                          <p className="text-xs text-cyan-300">more leads</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
}

type TrustedSectionProps = {
  shouldReduceMotion: boolean;
};

function TrustedSection({ shouldReduceMotion }: TrustedSectionProps) {
  const signals = [
    { title: "Conversations", detail: "AI responses", icon: MessagesSquare },
    { title: "Knowledge Base", detail: "Sources ready", icon: BrainCircuit },
    { title: "Lead Generation", detail: "Capture leads", icon: Sparkles },
    { title: "Analytics", detail: "Track activity", icon: TrendingUp },
  ];

  return (
    <SectionWrapper className="py-10 sm:py-12 lg:py-14">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-7 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.45)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(37,99,235,0.08),transparent_32%),radial-gradient(circle_at_88%_100%,rgba(6,182,212,0.06),transparent_28%)]" />
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">BUILT FOR MODERN CUSTOMER EXPERIENCES</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#071A3D] sm:text-3xl">Trusted by forward-thinking teams</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">AI-powered customer experiences, built for modern businesses.</p>
        </motion.div>

        <div className="relative mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {signals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={signal.title}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.32, delay: shouldReduceMotion ? 0 : 0.18 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-[0_14px_35px_-24px_rgba(37,99,235,0.45)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm transition duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-200/60">
                    <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-semibold text-slate-900">{signal.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{signal.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-5 flex max-w-md items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-950 px-4 py-3 text-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.55)] sm:px-5"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white"><Bot className="h-4 w-4" /></div>
            <div className="min-w-0 text-left"><p className="text-sm font-semibold">TT AI Chat Workspace</p><p className="mt-0.5 truncate text-xs text-slate-400">Conversations • Knowledge • Analytics</p></div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] font-medium text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Connected</span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

type FeaturesSectionProps = {
  features: Array<{ icon: typeof features[number]["icon"]; title: string; description: string }>;
  shouldReduceMotion: boolean;
};

function FeaturesSection({ features, shouldReduceMotion }: FeaturesSectionProps) {
  const showcaseFeatures = features.slice(0, 3);
  const supportingFeatures = features.slice(3);

  return (
    <SectionWrapper id="features" className="py-14 sm:py-16 lg:py-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to turn support into growth"
          description="From onboarding to intelligent insights, TT Chat helps teams serve visitors faster while capturing more opportunities."
        />
      </motion.div>

      <div className="mt-12 space-y-8 sm:mt-14 sm:space-y-10">
        {showcaseFeatures.map((feature, index) => {
          const isReversed = index % 2 === 1;
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`grid items-center gap-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_25px_80px_-45px_rgba(15,23,42,0.35)] sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10 ${isReversed ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="max-w-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Product capability</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{feature.title}</h3>
                <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">{feature.description}</p>
              </div>

              <div className="min-w-0">
                {feature.title === "Knowledge Base" ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Knowledge sources</p>
                        <p className="mt-1 text-xs text-slate-500">Train once, answer with confidence</p>
                      </div>
                      <BrainCircuit className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="mt-4 space-y-2">
                      {["Website pages", "PDFs & documents", "FAQs"].map((source, sourceIndex) => (
                        <motion.div
                          key={source}
                          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.2 + sourceIndex * 0.1 }}
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Globe2 className="h-4 w-4" /></span>
                          <span className="flex-1 text-sm font-medium text-slate-700">{source}</span>
                          <span className="text-[11px] font-medium text-emerald-600">Synced</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
                      <div className="flex items-center justify-between text-xs"><span className="font-medium text-slate-700">Knowledge synced</span><span className="text-blue-700">84%</span></div>
                      <motion.div
                        initial={shouldReduceMotion ? { scaleX: 0.84 } : { scaleX: 0 }}
                        whileInView={{ scaleX: 0.84 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.5 }}
                        style={{ transformOrigin: "left" }}
                        className="mt-2 h-2 rounded-full bg-blue-500"
                      />
                      <p className="mt-2 text-[11px] text-slate-500">AI assistant ready to answer from your sources</p>
                    </div>
                  </div>
                ) : null}

                {feature.title === "Lead Generation" ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white sm:p-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div><p className="text-sm font-semibold">Lead capture</p><p className="mt-1 text-xs text-slate-500">Turn intent into an opportunity</p></div>
                      <Sparkles className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div className="mt-5 space-y-3">
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.18 }}
                        className="ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-blue-600 px-3.5 py-3 text-sm leading-6"
                      >
                        I&apos;d like to learn more about a free consultation.
                      </motion.div>
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.45 }}
                        className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Intent detected: high interest
                      </motion.div>
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.68 }}
                        className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4"
                      >
                        <div className="flex items-center justify-between"><p className="text-sm font-semibold text-white">Qualified lead</p><CheckCircle2 className="h-4 w-4 text-emerald-300" /></div>
                        <div className="mt-3 flex items-center justify-between text-xs"><span className="text-slate-400">Status</span><span className="text-emerald-300">Ready for follow-up</span></div>
                      </motion.div>
                    </div>
                  </div>
                ) : null}

                {feature.title === "Live Chat" ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white sm:p-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-300" /><p className="text-sm font-semibold">AI assistant active</p></div><MessagesSquare className="h-5 w-5 text-slate-500" /></div>
                    <div className="mt-5 space-y-3 text-sm leading-6">
                      <motion.div {...(shouldReduceMotion ? { initial: { opacity: 1, y: 0 } } : { initial: { opacity: 0, y: 8 } })} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.15 }} className="max-w-[86%] rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-3 text-slate-200">Can you tell me about your services?</motion.div>
                      <motion.div {...(shouldReduceMotion ? { initial: { opacity: 1, y: 0 } } : { initial: { opacity: 0, y: 8 } })} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.38 }} className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md bg-blue-600 px-3.5 py-3">We provide web development, eCommerce, and AI solutions.</motion.div>
                      <motion.div initial={{ opacity: shouldReduceMotion ? 1 : 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.65 }} className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-white/10 bg-white/10 px-3.5 py-3 w-fit"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:150ms]" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:300ms]" /></motion.div>
                      <motion.div initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 1.05 }} className="max-w-[90%] rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-3 text-slate-200">Would you like a free consultation?</motion.div>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {supportingFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-blue-200 hover:bg-white hover:shadow-[0_20px_55px_-35px_rgba(37,99,235,0.45)]"
            >
              <div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><Icon className="h-5 w-5" /></div><span className="text-xs font-medium text-slate-400">TT AI Chat</span></div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              <div className="mt-5 h-12 rounded-xl border border-slate-200 bg-white p-3">
                {feature.title === "Analytics" ? <div className="flex h-full items-end gap-1.5">{[35, 52, 43, 70, 62, 86, 76].map((height, barIndex) => <motion.span key={barIndex} initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : barIndex * 0.05 }} style={{ height: `${height}%`, transformOrigin: "bottom" }} className="flex-1 rounded-t-sm bg-blue-500/70" />)}</div> : null}
                {feature.title === "Website Integration" ? <div className="flex items-center justify-between text-xs"><span className="font-mono text-slate-500">&lt;widget /&gt;</span><span className="flex items-center gap-1 text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Connected</span></div> : null}
                {feature.title === "Secure" ? <div className="flex items-center gap-2 text-xs text-slate-600"><ShieldCheck className="h-4 w-4 text-blue-600" /> Protected workspace</div> : null}
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

type HowItWorksSectionProps = {
  steps: string[];
  shouldReduceMotion: boolean;
};

function HowItWorksSection({ steps, shouldReduceMotion }: HowItWorksSectionProps) {
  const stepVisuals = [
    { label: "Workspace ready", icon: LayoutDashboard, accent: "blue" },
    { label: "Sources syncing", icon: Database, accent: "cyan" },
    { label: "AI configured", icon: BrainCircuit, accent: "blue" },
    { label: "Widget connected", icon: MessagesSquare, accent: "cyan" },
    { label: "Ready to help", icon: CheckCircle2, accent: "blue" },
  ];

  return (
    <SectionWrapper id="how-it-works" className="py-14 sm:py-16 lg:py-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <SectionHeading
          eyebrow="How it works"
          title="Go from setup to live support quickly"
          description="Set up your chatbot, add your business knowledge, customize the experience, and launch it on your website."
        />
      </motion.div>

      <div className="relative mt-10 sm:mt-12">
        <div className="absolute left-5 top-6 bottom-6 w-px bg-slate-200 sm:left-1/2 sm:top-8 sm:bottom-auto sm:h-px sm:w-[calc(100%-120px)] sm:-translate-x-1/2" />
        <motion.div
          initial={shouldReduceMotion ? { scaleY: 1, scaleX: 1 } : { scaleY: 0, scaleX: 0 }}
          whileInView={{ scaleY: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.7, delay: shouldReduceMotion ? 0 : 0.35, ease: "easeInOut" }}
          style={{ transformOrigin: "top center" }}
          className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500 sm:left-1/2 sm:top-8 sm:bottom-auto sm:h-px sm:w-[calc(100%-120px)] sm:-translate-x-1/2 sm:[transform-origin:left_center]"
        />

        <div className="relative grid gap-8 sm:grid-cols-5 sm:gap-3">
          {steps.map((step, index) => {
            const visual = stepVisuals[index] ?? stepVisuals[0];
            const Icon = visual.icon;
            const isCyan = visual.accent === "cyan";
            const stepDelay = 0.45 + index * 0.27;

            return (
              <motion.div
                key={step}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : stepDelay, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid grid-cols-[42px_1fr] gap-4 sm:block sm:text-center"
              >
                <motion.div
                  initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.32, delay: shouldReduceMotion ? 0 : stepDelay + 0.08 }}
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold shadow-sm sm:mx-auto ${isCyan ? "border-cyan-400/30 bg-cyan-50 text-cyan-700" : "border-blue-200 bg-blue-50 text-blue-700"}`}
                >
                  0{index + 1}
                </motion.div>

                <div className="min-w-0 pt-0.5 sm:pt-5">
                  <div className="mx-0 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm sm:mx-auto">
                    <Icon className={`h-5 w-5 ${isCyan ? "text-cyan-600" : "text-blue-600"}`} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-950 sm:text-lg">{step}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{visual.label}</p>

                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left sm:mt-5">
                    {index === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-600"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Workspace connected</div>
                    ) : null}
                    {index === 1 ? (
                      <div className="space-y-2 text-xs text-slate-600"><div className="flex justify-between"><span>Website</span><span className="text-emerald-600">Synced</span></div><div className="h-1.5 rounded-full bg-slate-200"><motion.div initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : stepDelay + 0.2 }} style={{ transformOrigin: "left" }} className="h-1.5 rounded-full bg-cyan-500" /></div></div>
                    ) : null}
                    {index === 2 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-600"><span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><BrainCircuit className="h-3.5 w-3.5" /></span><span>Context ready for AI</span></div>
                    ) : null}
                    {index === 3 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-600"><span className="h-2 w-2 rounded-full bg-cyan-400" /><span className="flex-1">Widget online</span><span className="text-emerald-600">Live</span></div>
                    ) : null}
                    {index === 4 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-600"><CheckCircle2 className="h-4 w-4 text-emerald-500" /><span>Ready to respond</span></div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
    <SectionWrapper id="solutions" className="py-14 sm:py-16 lg:py-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Industries"
          title="Built to fit the way modern businesses operate"
          description="Whether you run a clinic, a campus, or a hotel, TT Chat adapts to your audience and workflows."
        />
      </motion.div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {industries.map((industry, index) => {
          const IndustryIcon = industry.icon;
          return (
            <motion.article
              key={industry.name}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_65px_-42px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_70px_-38px_rgba(37,99,235,0.35)] focus-within:border-blue-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white transition-colors group-hover:bg-blue-600">
                  <IndustryIcon className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-100 bg-cyan-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> AI ready
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{industry.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Deliver instant help with a chatbot tailored to your service model.
              </p>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0.75, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.2 + index * 0.05 }}
                className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50/40"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">AI conversation</span>
                  <span className="text-[10px] font-medium text-emerald-600">Active</span>
                </div>
                <div className="mt-3 space-y-2 text-xs leading-5">
                  <div className="max-w-[88%] rounded-lg rounded-tl-sm bg-white px-3 py-2 text-slate-600 shadow-sm">How can your team help?</div>
                  <div className="ml-auto max-w-[88%] rounded-lg rounded-tr-sm bg-slate-950 px-3 py-2 text-white transition-colors group-hover:bg-blue-600">TT AI Chat is ready to respond.</div>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

type DashboardPreviewSectionProps = {
  shouldReduceMotion: boolean;
};

function DashboardPreviewSection({ shouldReduceMotion }: DashboardPreviewSectionProps) {
  const reveal = (delay: number, y = 14) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.42, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <SectionWrapper className="pb-10 pt-12 sm:pb-12 sm:pt-16 lg:pb-16 lg:pt-20">
      <motion.div {...reveal(0, 10)} className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Dashboard preview</p>
        <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-[2.7rem]">
          A command center for every conversation
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Monitor performance, understand customer intent, and collaborate across teams from a beautifully designed workspace.
        </p>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 22 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-12"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 p-2 shadow-[0_35px_100px_-38px_rgba(15,23,42,0.55)] sm:p-3"
        >
          <div className="overflow-hidden rounded-[22px] border border-white/10 bg-slate-900">
            <motion.div {...reveal(0.18, 8)} className="flex flex-col border-b border-white/10 bg-slate-900/95 lg:flex-row">
              <div className="flex items-center gap-3 px-4 py-3 sm:px-5 lg:w-[190px] lg:border-r lg:border-white/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">TT AI Chat</p>
                  <p className="text-[11px] text-slate-500">Workspace</p>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3 sm:px-5">
                <div>
                  <p className="text-sm font-semibold text-white">Overview</p>
                  <p className="mt-0.5 text-xs text-slate-500">Live insights and conversations</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Widget live
                </span>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-[190px_1fr]">
              <motion.aside {...reveal(0.24, 8)} className="border-b border-white/10 bg-slate-950/45 p-3 lg:border-b-0 lg:border-r">
                <p className="hidden px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 lg:block">Workspace</p>
                <nav aria-label="Product preview navigation" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:block lg:space-y-1">
                  <div className="flex items-center gap-2 rounded-lg bg-blue-600/15 px-3 py-2 text-xs font-medium text-blue-300"><LayoutDashboard className="h-4 w-4" /> Overview</div>
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"><MessagesSquare className="h-4 w-4" /> Conversations</div>
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"><BrainCircuit className="h-4 w-4" /> Knowledge</div>
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"><Zap className="h-4 w-4" /> Analytics</div>
                </nav>
              </motion.aside>

              <div className="min-w-0 bg-slate-900 p-4 sm:p-5 lg:p-6">
                <motion.div {...reveal(0.32, 8)} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Conversations", value: "1,248", detail: "+18.2%", icon: MessagesSquare, tone: "text-blue-300" },
                    { label: "Lead capture", value: "87", detail: "+31%", icon: CheckCircle2, tone: "text-emerald-300" },
                    { label: "Answer accuracy", value: "96.4%", detail: "Healthy", icon: Sparkles, tone: "text-cyan-300" },
                    { label: "Knowledge base", value: "1.2k", detail: "docs indexed", icon: BrainCircuit, tone: "text-blue-300" },
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.38 + index * 0.07 }}
                      className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-blue-400/30 hover:bg-white/[0.07]"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">{metric.label}</p>
                        <metric.icon className={`h-4 w-4 ${metric.tone}`} />
                      </div>
                      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{metric.value}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{metric.detail}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                  <motion.div {...reveal(0.7, 10)} className="rounded-xl border border-white/10 bg-slate-950/55 p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">Conversation activity</p>
                        <p className="mt-1 text-xs text-slate-500">Customer questions answered by AI</p>
                      </div>
                      <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[11px] font-medium text-emerald-300">Live</span>
                    </div>
                    <div className="mt-5 flex h-24 items-end gap-2 border-b border-white/10 px-1">
                      {[42, 58, 48, 72, 64, 86, 78, 96, 82, 100, 90, 108].map((height, index) => (
                        <motion.div
                          key={index}
                          initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.75 + index * 0.035, ease: [0.22, 1, 0.36, 1] }}
                          style={{ height: `${height}%`, transformOrigin: "bottom" }}
                          className={`min-w-2 flex-1 rounded-t-sm ${index > 8 ? "bg-blue-400" : "bg-blue-400/35"}`}
                        />
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between text-[10px] text-slate-600"><span>9 AM</span><span>12 PM</span><span>3 PM</span><span>Now</span></div>
                    <div className="mt-5 space-y-2">
                      {["Customer asked about services", "AI response delivered", "Follow-up lead captured"].map((activity, index) => (
                        <motion.div
                          key={activity}
                          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 1.1 + index * 0.1 }}
                          className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${index === 2 ? "bg-emerald-300" : "bg-cyan-300"}`} />
                          <span className="flex-1 text-xs text-slate-300">{activity}</span>
                          <span className="text-[10px] text-slate-600">{index === 0 ? "2m" : index === 1 ? "1m" : "now"}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                    <motion.div {...reveal(0.82, 10)} className="rounded-xl border border-white/10 bg-slate-950/55 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">Knowledge base health</p>
                        <BrainCircuit className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-white/10"><motion.div initial={shouldReduceMotion ? { scaleX: 0.84 } : { scaleX: 0 }} whileInView={{ scaleX: 0.84 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 1 }} style={{ transformOrigin: "left" }} className="h-2 rounded-full bg-blue-400" /></div>
                      <div className="mt-3 flex justify-between text-xs"><span className="text-slate-400">Widget</span><span className="font-medium text-emerald-300">Live</span></div>
                      <div className="mt-2 flex justify-between text-xs"><span className="text-slate-400">Sources indexed</span><span className="font-medium text-white">1.2k docs</span></div>
                    </motion.div>
                    <motion.div {...reveal(0.94, 10)} className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">New lead captured</p>
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      </div>
                      <p className="mt-3 text-xs leading-5 text-slate-400">Visitor asked about a consultation and is ready for follow-up.</p>
                      <div className="mt-4 flex items-center justify-between"><span className="text-xs font-medium text-emerald-300">Qualified</span><span className="text-[10px] text-slate-500">Just now</span></div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div {...reveal(0.25, 12)} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.35)] sm:p-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Conversations</p><p className="mt-1 text-sm font-semibold text-slate-900">Live Chat / AI Conversations</p></div>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active</span>
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="space-y-2 rounded-xl bg-slate-50 p-2">
              {["Priya Sharma", "Alex Morgan", "Jordan Lee"].map((name, index) => (
                <motion.div
                  key={name}
                  initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.3 + index * 0.08 }}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${index === 0 ? "bg-white shadow-sm ring-1 ring-blue-100" : ""}`}
                >
                  <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-700">{name}</span>
                  <span className="text-[10px] text-slate-400">{index + 1}m</span>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl bg-slate-950 p-3 text-white sm:p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3"><div><p className="text-xs font-semibold">Priya Sharma</p><p className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Online</p></div><MessagesSquare className="h-4 w-4 text-cyan-300" /></div>
              <div className="mt-3 space-y-2 text-xs leading-5"><div className="max-w-[84%] rounded-lg rounded-tl-sm bg-white/10 px-3 py-2 text-slate-300">Can you tell me about your services?</div><div className="ml-auto max-w-[84%] rounded-lg rounded-tr-sm bg-blue-600 px-3 py-2">We provide web development, eCommerce, and AI solutions.</div><div className="flex items-center gap-1.5 text-[10px] text-cyan-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:150ms]" /> AI responding</div></div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2"><Image src="/images/conversations.png" alt="TT AI Chat conversations preview" width={1200} height={800} className="h-12 w-20 rounded-lg object-cover" /><div><p className="text-xs font-semibold text-slate-700">Conversation management</p><p className="mt-1 text-[11px] text-slate-500">Review active customer conversations and AI responses.</p></div></div>
        </motion.div>

        <div className="grid gap-4">
          <motion.div {...reveal(0.38, 12)} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.35)] sm:p-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Analytics</p><p className="mt-1 text-sm font-semibold text-slate-900">Analytics &amp; Performance</p></div><TrendingUp className="h-4 w-4 text-blue-600" /></div>
            <div className="mt-3 grid grid-cols-2 gap-2"><div className="rounded-lg bg-slate-50 p-2.5"><p className="text-[10px] text-slate-500">Conversations</p><p className="mt-1 text-lg font-semibold text-slate-900">1,248</p></div><div className="rounded-lg bg-slate-50 p-2.5"><p className="text-[10px] text-slate-500">Leads captured</p><p className="mt-1 text-lg font-semibold text-slate-900">87</p></div></div>
            <div className="mt-3 flex h-14 items-end gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 pt-2">{[35, 48, 42, 65, 58, 78, 70, 92].map((height, index) => <motion.span key={index} initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.55 + index * 0.04 }} style={{ height: `${height}%`, transformOrigin: "bottom" }} className="flex-1 rounded-t-sm bg-blue-500/70" />)}</div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400"><span>Activity</span><span>Illustrative product view</span></div>
            <Image src="/images/analytics.png" alt="TT AI Chat analytics preview" width={800} height={1400} className="mt-3 h-20 w-full rounded-lg object-cover object-top opacity-80" />
          </motion.div>

          <motion.div {...reveal(0.5, 12)} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.35)] sm:p-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Knowledge Base</p><p className="mt-1 text-sm font-semibold text-slate-900">Knowledge Base &amp; AI Training</p></div><BrainCircuit className="h-4 w-4 text-cyan-600" /></div>
            <div className="mt-3 space-y-2">{["Website pages", "PDFs & documents", "FAQs"].map((source, index) => <motion.div key={source} initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.65 + index * 0.07 }} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-xs"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-blue-600 shadow-sm"><Globe2 className="h-3.5 w-3.5" /></span><span className="flex-1 font-medium text-slate-700">{source}</span><span className="text-[10px] font-medium text-emerald-600">Indexed</span></motion.div>)}</div>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-cyan-100 bg-cyan-50/60 p-2 text-[10px] text-cyan-800"><CheckCircle2 className="h-3.5 w-3.5 text-cyan-600" /> AI-ready knowledge synced</div>
            <Image src="/images/knowledge-base.png" alt="TT AI Chat knowledge base preview" width={1200} height={800} className="mt-3 h-20 w-full rounded-lg object-cover object-top opacity-80" />
          </motion.div>
        </div>
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
  shouldReduceMotion: boolean;
};

function PricingSection({ pricingPlans, shouldReduceMotion }: PricingSectionProps) {
  return (
    <SectionWrapper id="pricing" className="pt-12 sm:pt-16 lg:pt-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Pricing"
          title="Flexible plans that grow with your team"
          description="Choose the plan that fits your support volume, knowledge scope, and growth goals."
        />
      </motion.div>
      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : pricingPlans.indexOf(plan) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <PricingCard
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              highlighted={plan.highlighted}
            />
          </motion.div>
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
    <SectionWrapper id="faq" className="py-14 sm:py-16 lg:py-20">
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions, answered clearly"
        description="Everything you need to know before your team goes live with TT Chat."
      />
      <div className="mt-10 space-y-4">
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
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={shouldReduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={shouldReduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-base leading-7 text-slate-600">{item.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
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
        className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 px-6 py-8 text-white shadow-[0_35px_100px_-45px_rgba(15,23,42,0.65)] sm:px-8 sm:py-10 lg:px-12 lg:py-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_88%_90%,rgba(6,182,212,0.1),transparent_28%)]" />
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-7 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">Book free demo</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                See how TT Chat can elevate support, sales, and service in one live walkthrough.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Join a no-obligation session with our team to explore your goals, review the product, and leave with a clear path forward.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {[
                "30-minute live demo",
                "Free consultation tailored to your team",
                "Live product walkthrough with practical examples",
                "No obligation to continue",
              ].map((item) => (
                <motion.div
                  key={item}
                  initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.35 + item.length * 0.001 }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-blue-300" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

    <form
  noValidate
  onSubmit={handleDemoSubmit}
  className="rounded-[30px] border border-slate-200 bg-white/95 p-6 text-slate-900 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.45)] sm:p-7 lg:p-8"
>
  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
    <Sparkles className="h-4 w-4 text-blue-600" />
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
        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_15px_35px_-12px_rgba(37,99,235,0.55)] transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
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
    <SectionWrapper id="contact" className="pt-14 sm:pt-16 lg:pt-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[40px] border border-slate-200 bg-white px-6 py-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] sm:px-8 sm:py-10 lg:px-12 lg:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-7 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Contact us</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Reach our team for support, partnerships, or questions.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              We’re here to help you launch with confidence and keep your chatbot experience aligned with your goals.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <Mail className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>account@tomartechworks.com

</span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <PhoneCall className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>+91 9974730044
</span>
              </div>
             
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>Mon–Fri • 9:00 AM – 6:00 PM PST</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/+919974730044" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                <Globe2 className="h-4 w-4" />
                LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
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
    <Globe2 className="h-4 w-4 text-blue-300" />
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
    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
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
    <p className="mt-4 text-sm text-blue-300">
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
      href="https://wa.me/+919974730044"
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
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-8 sm:py-12 lg:flex-row lg:justify-between lg:gap-16 lg:px-12">
        <div className="max-w-sm">
          <a href="#hero" className="flex items-center" aria-label="TT Chat home">
            <img
              src="/tt-chat-logo.svg"
              alt="TT Chat"
              className="h-12 w-auto object-contain"
            />
          </a>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            AI chatbots for modern businesses that want to support customers and grow revenue 24/7.
          </p>
        </div>
        <div className="grid w-full gap-8 sm:grid-cols-3 lg:max-w-2xl">
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
        <TrustedSection shouldReduceMotion={shouldReduceMotion} />
        <FeaturesSection features={features} shouldReduceMotion={shouldReduceMotion} />
        <HowItWorksSection steps={steps} shouldReduceMotion={shouldReduceMotion} />
        <IndustriesSection industries={industries} shouldReduceMotion={shouldReduceMotion} />
        <DashboardPreviewSection shouldReduceMotion={shouldReduceMotion} />
        <PricingSection pricingPlans={pricingPlans} shouldReduceMotion={shouldReduceMotion} />
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
