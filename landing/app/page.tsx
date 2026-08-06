"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  GraduationCap,
  Globe2,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { BrowserMockup } from "./components/browser-mockup";
import { FeatureCard } from "./components/feature-card";
import { FormField } from "./components/form-field";
import { MobileMockup } from "./components/mobile-mockup";
import { PricingCard } from "./components/pricing-card";
import { SectionHeading } from "./components/section-heading";

const logos = ["Hospitals", "Schools", "Restaurants", "Real Estate", "Manufacturing"];

const features = [
  {
    icon: Database,
    title: "Knowledge Base",
    description: "Train the assistant from PDFs, websites, FAQs, and internal documents in minutes.",
  },
  {
    icon: Sparkles,
    title: "Lead Generation",
    description: "Capture qualified leads automatically while answering questions in real time.",
  },
  {
    icon: MessagesSquare,
    title: "Live Chat",
    description: "Offer instant 24/7 support with a smooth, branded chat experience for visitors.",
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    description: "Understand intent, drop-off points, and conversion opportunities from one dashboard.",
  },
  {
    icon: MonitorSmartphone,
    title: "Multi Website",
    description: "Deploy the same assistant across multiple websites with a single setup.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Enterprise-grade privacy controls, role-based access, and safe content handling.",
  },
];

const steps = ["Create Chatbot", "Upload Documents", "Train AI", "Copy Widget", "Go Live"];

const industries = [
  { name: "Hospitals", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "Restaurant", icon: Store },
  { name: "Hotels", icon: Building2 },
  { name: "Real Estate", icon: Landmark },
  { name: "Finance", icon: BrainCircuit },
  { name: "Law Firms", icon: ClipboardList },
  { name: "Manufacturing", icon: Zap },
];

const faqs = [
  {
    question: "How quickly can we launch our chatbot?",
    answer:
      "Most teams are live in under a week. You can upload documents, train the assistant, and embed the widget in a few simple steps.",
  },
  {
    question: "Can we use our own knowledge base?",
    answer:
      "Yes. You can connect PDFs, website pages, FAQs, and help center documents to create a tailored AI assistant.",
  },
  {
    question: "Does it support multilingual conversations?",
    answer:
      "Absolutely. The platform can understand and respond in multiple languages to support global customers.",
  },
  {
    question: "Is it suitable for small businesses?",
    answer:
      "Yes. The starter plan is built for small teams that want to automate support and capture qualified leads without complex setup.",
  },
  {
    question: "Can we customize the widget design?",
    answer:
      "Yes. You can tailor the widget branding, placement, and visual style to match your website and business.",
  },
  {
    question: "What analytics do we get?",
    answer:
      "You receive conversation summaries, lead capture data, popular questions, and performance insights to improve customer experience.",
  },
  {
    question: "Do you offer enterprise security controls?",
    answer:
      "Yes. Enterprise plans include more secure deployment options, advanced permissions, and dedicated onboarding support.",
  },
  {
    question: "Can we connect multiple websites?",
    answer:
      "Yes. Multi-site deployments are supported so you can manage knowledge and conversations across channels from one place.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a demo and our team will help you map your content, configure the assistant, and prepare your launch plan.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a guided demo experience and pilot onboarding so you can evaluate fit before committing to a subscription.",
  },
];

function SectionWrapper({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      {children}
    </section>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    industry: "",
    teamSize: "",
    details: "",
  });
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [demoStatus, setDemoStatus] = useState<"idle" | "loading" | "success">("idle");
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success">("idle");
  const [demoFeedback, setDemoFeedback] = useState("");
  const [contactFeedback, setContactFeedback] = useState("");

  const handleDemoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDemoStatus("loading");
    window.setTimeout(() => {
      setDemoStatus("success");
      setDemoFeedback("Thanks! We’ll reach out shortly with a tailored walkthrough.");
      setDemoForm({ name: "", email: "", phone: "", company: "", website: "", industry: "", teamSize: "", details: "" });
    }, 500);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus("loading");
    window.setTimeout(() => {
      setContactStatus("success");
      setContactFeedback("Message received. Our team will reply within one business day.");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 500);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
          <a href="#hero" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-sky-500/20">
              <Bot className="h-5 w-5" />
            </div>
            <span className="text-[0.95rem] sm:text-[1rem]">AR AI Chat</span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-950">Features</a>
            <a href="#pricing" className="transition hover:text-slate-950">Pricing</a>
            <a href="#faq" className="transition hover:text-slate-950">FAQ</a>
            <a href="#contact" className="transition hover:text-slate-950">Contact</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-600 sm:px-5"
          >
            Book Demo
          </a>
        </div>
      </header>

      <main id="hero">
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
                        <p className="text-sm font-semibold text-slate-900">AR AI Chat Dashboard</p>
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

        <SectionWrapper id="features">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to turn support into growth"
            description="From onboarding to intelligent insights, AR AI Chat helps teams serve visitors faster while capturing more opportunities."
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

        <SectionWrapper>
          <SectionHeading
            eyebrow="Industries"
            title="Built to fit the way modern businesses operate"
            description="Whether you run a clinic, a campus, or a hotel, AR AI Chat adapts to your audience and workflows."
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
                alt="AR AI Chat widget preview"
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

        <SectionWrapper id="pricing">
          <SectionHeading
            eyebrow="Pricing"
            title="Flexible plans that grow with your team"
            description="Choose the plan that fits your support volume, knowledge scope, and growth goals."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            <PricingCard
              name="Starter"
              price="$49"
              description="Perfect for small teams launching their first AI assistant."
              features={["1 chatbot", "Up to 5,000 conversations", "Basic analytics", "Email support"]}
            />
            <PricingCard
              name="Professional"
              price="$149"
              description="For growing companies that want richer automation and lead capture."
              features={["Unlimited conversations", "Advanced analytics", "Multi-site support", "Priority support"]}
              highlighted
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              description="For organizations with advanced security and integration needs."
              features={["Security review", "Dedicated onboarding", "Custom integrations", "SLA support"]}
            />
          </div>
        </SectionWrapper>

        <SectionWrapper id="faq">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions, answered clearly"
            description="Everything you need to know before your team goes live with AR AI Chat."
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
                    See how AR AI Chat can elevate support, sales, and service in one live walkthrough.
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

              <form onSubmit={handleDemoSubmit} className="rounded-[30px] border border-slate-200 bg-white/95 p-6 text-slate-900 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.45)] sm:p-7 lg:p-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Sparkles className="h-4 w-4 text-sky-600" />
                  Premium booking form
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <FormField label="Full Name" id="demo-name" name="name" value={demoForm.name} onChange={(event) => setDemoForm({ ...demoForm, name: event.target.value })} placeholder="Alex Morgan" required inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm" />
                  <FormField label="Work Email" id="demo-email" type="email" name="email" value={demoForm.email} onChange={(event) => setDemoForm({ ...demoForm, email: event.target.value })} placeholder="alex@company.com" required inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm" />
                  <FormField label="Phone Number" id="demo-phone" type="tel" name="phone" value={demoForm.phone} onChange={(event) => setDemoForm({ ...demoForm, phone: event.target.value })} placeholder="+1 555 123 4567" inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm" />
                  <FormField label="Company" id="demo-company" name="company" value={demoForm.company} onChange={(event) => setDemoForm({ ...demoForm, company: event.target.value })} placeholder="Northwind Labs" required inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm" />
                  <FormField label="Company Website" id="demo-website" type="url" name="website" value={demoForm.website} onChange={(event) => setDemoForm({ ...demoForm, website: event.target.value })} placeholder="https://example.com" inputClassName="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm" />
                  <div className="space-y-2">
                    <label htmlFor="demo-industry" className="text-sm font-medium text-slate-700">Industry</label>
                    <select id="demo-industry" value={demoForm.industry} onChange={(event) => setDemoForm({ ...demoForm, industry: event.target.value })} className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100">
                      <option value="">Select industry</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Finance">Finance</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="demo-team-size" className="text-sm font-medium text-slate-700">Team Size</label>
                    <select id="demo-team-size" value={demoForm.teamSize} onChange={(event) => setDemoForm({ ...demoForm, teamSize: event.target.value })} className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100">
                      <option value="">Select size</option>
                      <option value="1-10">1–10</option>
                      <option value="11-50">11–50</option>
                      <option value="51-200">51–200</option>
                      <option value="201+">201+</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <FormField label="Message" id="demo-details" name="details" textarea value={demoForm.details} onChange={(event) => setDemoForm({ ...demoForm, details: event.target.value })} placeholder="Tell us about your support goals, launch timeline, or current workflow…" inputClassName="min-h-28 rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
                  </div>
                </div>
                <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_15px_35px_-12px_rgba(14,165,233,0.55)] transition hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">
                  {demoStatus === "loading" ? "Sending…" : demoStatus === "success" ? "Booked" : "Book Free Demo"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                {demoFeedback ? <p className="mt-4 text-sm text-emerald-700">{demoFeedback}</p> : null}
              </form>
            </div>
          </motion.div>
        </SectionWrapper>

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
                    <span>hello@arai-chat.com</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <PhoneCall className="mt-0.5 h-4 w-4 text-sky-600" />
                    <span>+1 (800) 555-0148</span>
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

              <form onSubmit={handleContactSubmit} className="rounded-[30px] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Globe2 className="h-4 w-4 text-sky-300" />
                  Contact form
                </div>
                <div className="mt-5 space-y-4">
                  <FormField label="Name" id="contact-name" name="name" value={contactForm.name} onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })} placeholder="Jamie Lee" required inputClassName="h-12 rounded-2xl border-slate-700 bg-slate-900/70 px-4 text-sm text-white" />
                  <FormField label="Email" id="contact-email" type="email" name="email" value={contactForm.email} onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })} placeholder="jamie@company.com" required inputClassName="h-12 rounded-2xl border-slate-700 bg-slate-900/70 px-4 text-sm text-white" />
                  <FormField label="Subject" id="contact-subject" name="subject" value={contactForm.subject} onChange={(event) => setContactForm({ ...contactForm, subject: event.target.value })} placeholder="Product question or partnership" inputClassName="h-12 rounded-2xl border-slate-700 bg-slate-900/70 px-4 text-sm text-white" />
                  <FormField label="Message" id="contact-message" name="message" textarea value={contactForm.message} onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })} placeholder="Tell us about your goals, timeline, or support needs." required inputClassName="min-h-28 rounded-2xl border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-white" />
                </div>
                <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                  {contactStatus === "loading" ? "Sending…" : contactStatus === "success" ? "Sent" : "Send Message"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                {contactFeedback ? <p className="mt-4 text-sm text-sky-300">{contactFeedback}</p> : null}
              </form>
            </div>
          </motion.div>
        </SectionWrapper>
      </main>

      <a
        href="https://wa.me/15551234567"
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

      <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f8fafc_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8 lg:flex-row lg:justify-between lg:px-12">
          <div className="max-w-sm">
            <a href="#hero" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Bot className="h-5 w-5" />
              </div>
              <span>AR AI Chat</span>
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
    </div>
  );
}
