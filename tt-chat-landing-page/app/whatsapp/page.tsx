"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  MessagesSquare,
  Phone,
  Plus,
  Settings2,
  Sparkles,
  Users,
  UserRound,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { faqs } from "../data/faq";
import { industries } from "../data/industries";
import { pricingPlans } from "../data/pricing";

const workflow = [
  { title: "Customer sends a message", detail: "A WhatsApp question enters your workspace.", icon: MessageCircle },
  { title: "AI understands the request", detail: "Intent and context are identified in the conversation.", icon: BrainCircuit },
  { title: "AI uses business knowledge", detail: "Sources, FAQs, and documents guide the reply.", icon: FileText },
  { title: "AI responds or hands over", detail: "Routine questions stay automated; people take over when needed.", icon: Headphones },
];

const signals = [
  ["Conversations", "AI-powered customer replies", MessagesSquare],
  ["Knowledge Base", "Business information ready for AI", FileText],
  ["Lead Generation", "Capture and qualify prospects", Users],
  ["Human Handover", "Move conversations to your team", Headphones],
] as const;

const whatsappFaqs = [
  { question: "How does WhatsApp AI work?", answer: "TT WhatsApp AI receives customer messages, uses your configured business knowledge, and drafts helpful responses inside a managed conversation workflow." },
  { question: "Can the AI use my business information?", answer: "Yes. The product story is built around connecting business sources such as services, FAQs, documents, and website information to the assistant." },
  { question: "Can a human take over a conversation?", answer: "Yes. Conversations can move from AI mode to an agent workflow when a customer needs human assistance." },
  { question: "Can I manage multiple conversations?", answer: "The conversation workspace is designed to help teams review active conversations, customer context, leads, and response status from one place." },
  { question: "Can I see leads from conversations?", answer: "Lead qualification is represented as part of the product workflow so teams can review intent and follow-up status alongside the conversation." },
  { question: "Is WhatsApp API setup required?", answer: "The connection and account requirements depend on your WhatsApp setup. Book a demo to review the right configuration for your business." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-800 bg-[#071a3d] shadow-[0_30px_90px_-38px_rgba(7,26,61,0.65)] ${className}`}>{children}</div>;
}

function ConversationVisual({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <ProductShell className={compact ? "p-3" : "overflow-hidden p-3 sm:p-4"}>
      {!compact ? (
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white"><MessageCircle className="h-5 w-5" /></div><div><p className="text-sm font-semibold text-white">WhatsApp inbox</p><p className="text-xs text-slate-400">TT WhatsApp AI</p></div></div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> AI active</span>
        </div>
      ) : null}
      <div className={`grid gap-3 ${compact ? "" : "mt-3 lg:grid-cols-[0.75fr_1.25fr]"}`}>
        <div className="space-y-2 rounded-xl bg-white/[0.06] p-2">
          {["New enquiry", "Product question", "Follow-up"].map((item, index) => (
            <div key={item} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${index === 0 ? "bg-white/10" : ""}`}><span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-[#25D366]" : "bg-slate-500"}`} /><span className="flex-1 text-xs text-slate-300">{item}</span><span className="text-[10px] text-slate-500">{index + 1}m</span></div>
          ))}
        </div>
        <div className="rounded-xl bg-white/[0.06] p-3 sm:p-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3"><div><p className="text-xs font-semibold text-white">Customer conversation</p><p className="mt-1 text-[10px] text-emerald-300">WhatsApp · AI mode</p></div><Users className="h-4 w-4 text-slate-500" /></div>
          <div className="mt-3 space-y-2 text-xs leading-5"><div className="max-w-[86%] rounded-lg rounded-tl-sm bg-white/10 px-3 py-2 text-slate-300">Hi, I want to know more about your services.</div><div className="ml-auto max-w-[86%] rounded-lg rounded-tr-sm bg-[#25D366] px-3 py-2 text-[#062b18]">Absolutely. Which service are you interested in?</div><motion.div initial={{ opacity: reduceMotion ? 1 : 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: reduceMotion ? 0 : 0.35 }} className="flex items-center gap-1.5 text-[10px] text-cyan-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:150ms]" /> AI is typing</motion.div></div>
        </div>
      </div>
    </ProductShell>
  );
}

function DashboardVisual() {
  return (
    <ProductShell className="overflow-hidden p-2 sm:p-3">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-3"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white"><BotIcon /></div><span className="text-sm font-semibold text-white">TT WhatsApp AI</span></div><span className="text-[10px] text-slate-500">Illustrative workspace</span></div>
      <div className="grid lg:grid-cols-[170px_1fr]">
        <aside className="border-b border-white/10 p-2 lg:border-b-0 lg:border-r"><div className="space-y-1 text-[11px] text-slate-400">{[[LayoutDashboard, "Overview"], [MessagesSquare, "Conversations"], [Users, "Contacts"], [Zap, "Leads"], [FileText, "Knowledge Base"], [BarChart3, "Analytics"], [Settings2, "Settings"]].map(([Icon, label]) => <div key={label as string} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${label === "Conversations" ? "bg-blue-600/20 text-blue-300" : ""}`}><Icon className="h-3.5 w-3.5" />{label as string}</div>)}</div></aside>
        <div className="min-w-0 bg-slate-900 p-3 sm:p-4"><div className="grid gap-2 sm:grid-cols-3"><Metric label="Conversations" value="Active" /><Metric label="Leads" value="Review" /><Metric label="Mode" value="AI + Agent" /></div><div className="mt-3 grid gap-3 xl:grid-cols-[1.2fr_0.8fr]"><ConversationVisual compact /><div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-xs font-semibold text-white">Customer context</p><div className="mt-3 space-y-2 text-[11px] text-slate-400"><div className="flex justify-between"><span>Status</span><span className="text-emerald-300">Qualified</span></div><div className="flex justify-between"><span>Mode</span><span className="text-cyan-300">AI</span></div><div className="flex justify-between"><span>Handover</span><span className="text-slate-300">Available</span></div></div></div></div></div>
      </div>
    </ProductShell>
  );
}

function BotIcon() { return <Sparkles className="h-3.5 w-3.5" />; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5"><p className="text-[10px] text-slate-500">{label}</p><p className="mt-1 text-xs font-semibold text-white">{value}</p></div>; }

function WhatsAppPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", close);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", close); document.body.style.overflow = previous; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 lg:px-12"><a href="#top" className="flex items-center gap-3" aria-label="TT WhatsApp AI home"><img src="/tt-chat-logo.svg" alt="TT WhatsApp AI" className="h-10 w-auto" /><span className="hidden border-l border-slate-200 pl-3 text-sm font-semibold text-[#071a3d] sm:inline">WhatsApp AI</span></a><nav className="hidden items-center gap-7 text-sm font-medium text-[#071a3d] lg:flex"><a href="#features">Features</a><a href="#how-it-works">How It Works</a><a href="#solutions">Solutions</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></nav><div className="flex items-center gap-2"><a href="#demo" className="hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:inline-flex">Get Started</a><button type="button" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white lg:hidden"><span className="text-xl">{menuOpen ? "×" : "☰"}</span></button></div></div></header>
      <AnimatePresence>{menuOpen ? <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 z-[70] flex h-full w-[86vw] max-w-[320px] flex-col bg-white p-5 shadow-2xl lg:hidden"><div className="flex justify-between"><span className="font-semibold text-[#071a3d]">TT WhatsApp AI</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" className="h-10 w-10 rounded-lg border">×</button></div><nav className="mt-8 flex flex-1 flex-col gap-2">{[["#features", "Features"], ["#how-it-works", "How It Works"], ["#solutions", "Solutions"], ["#pricing", "Pricing"], ["#faq", "FAQ"]].map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-4 py-3 text-base hover:bg-slate-50">{label}</a>)}</nav><a href="#demo" onClick={() => setMenuOpen(false)} className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white">Get Started</a></motion.aside> : null}</AnimatePresence>

      <main id="top">
        <section className="relative overflow-hidden bg-slate-50"><div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.12),transparent_32%),radial-gradient(circle_at_10%_80%,rgba(37,211,102,0.08),transparent_28%)]" /><div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:py-24"><div><Reveal><p className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700"><MessageCircle className="h-4 w-4" /> WhatsApp AI Agent</p><h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-0.04em] text-[#071a3d] sm:text-5xl lg:text-6xl">Turn WhatsApp conversations into automated customer experiences.</h1><p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">Answer customer questions, use your business knowledge, qualify leads, and hand conversations to your team from one focused AI workspace.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">Get Started <ArrowRight className="h-4 w-4" /></a><a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700">See how it works</a></div></Reveal></div><Reveal delay={0.12}><ConversationVisual /></Reveal></div></section>

        <section className="border-b border-slate-200 bg-white py-12"><div className="mx-auto grid max-w-5xl gap-5 px-4 sm:px-8 lg:grid-cols-5 lg:px-12">{signals.map(([title, detail, Icon]) => <div key={title} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm"><Icon className="h-4 w-4" /></div><div><p className="text-sm font-semibold text-slate-900">{title}</p><p className="text-xs text-slate-500">{detail}</p></div></div>)}</div></section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12"><Reveal><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">How it works</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">From WhatsApp message to business action</h2></div></Reveal><div className="relative mt-12 grid gap-6 lg:grid-cols-4">{workflow.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 0.08}><div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.35)]"><div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></div><span className="text-xs font-semibold text-slate-400">0{index + 1}</span></div><h3 className="mt-5 text-lg font-semibold text-[#071a3d]">{item.title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p><div className="mt-6 h-1 rounded-full bg-slate-100"><div className={`h-1 rounded-full ${index === 0 ? "w-1/4" : index === 1 ? "w-2/4" : index === 2 ? "w-3/4" : "w-full"} bg-blue-500`} /></div></div></Reveal>})}</div></section>

        <section id="features" className="bg-slate-50"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12"><Reveal><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Product capabilities</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">A messaging workspace built around real conversations.</h2></div></Reveal><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[["AI WhatsApp Conversations", "AI handles customer questions naturally.", MessagesSquare], ["Knowledge Base", "Train the AI using business information.", FileText], ["Lead Qualification", "Identify intent and qualification signals.", Users], ["Automated Replies", "Respond instantly to common customer requests.", Zap], ["Human Handover", "Move conversations to a human agent when needed.", Headphones], ["Conversation Management", "Review and manage active customer conversations.", LayoutDashboard]].map(([title, description, Icon], index) => <Reveal key={title as string} delay={index * 0.05}><article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-44px_rgba(15,23,42,0.35)]"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-semibold text-[#071a3d]">{title as string}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{description as string}</p><div className="mt-5 rounded-xl bg-slate-950 p-3 text-xs text-slate-300">{title === "Knowledge Base" ? "Website · FAQs · Documents · AI ready" : title === "Human Handover" ? "AI mode  →  Agent mode" : title === "Lead Qualification" ? "Intent detected · Qualified" : "WhatsApp conversation · Active"}</div></article></Reveal>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12"><div className="grid items-center gap-10 lg:grid-cols-2"><Reveal><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Lead qualification</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">Turn customer intent into an actionable next step.</h2><p className="mt-5 max-w-xl text-base leading-8 text-slate-600">When a customer shows purchase intent, TT WhatsApp AI can keep the conversation moving and give your team a clear handover state.</p></div></Reveal><Reveal delay={0.12}><ProductShell className="p-4"><div className="flex items-center justify-between border-b border-white/10 pb-3"><p className="text-sm font-semibold text-white">Lead qualification</p><span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">Qualified</span></div><div className="mt-4 rounded-xl bg-white/10 p-3 text-xs text-slate-300">I am interested in your premium plan.</div><div className="mt-3 grid gap-2 sm:grid-cols-2">{[["Intent", "Purchase"], ["Requirement", "Premium plan"], ["Source", "WhatsApp"], ["Status", "Qualified"]].map(([label, value]) => <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] text-slate-500">{label}</p><p className="mt-1 text-xs font-semibold text-white">{value}</p></div>)}</div></ProductShell></Reveal></div></section>

        <section className="bg-slate-50"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12"><div className="grid items-center gap-10 lg:grid-cols-2"><Reveal><ProductShell className="p-4"><div className="flex items-center justify-between border-b border-white/10 pb-3"><p className="text-sm font-semibold text-white">Knowledge sources</p><span className="text-[10px] text-cyan-300">AI ready</span></div><div className="mt-4 space-y-2">{["Services", "FAQs", "Documents", "Website information"].map((source, index) => <div key={source} className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-3 py-2.5 text-xs text-slate-300"><FileText className="h-4 w-4 text-blue-300" /><span className="flex-1">{source}</span><span className="text-[10px] text-emerald-300">Indexed</span></div>)}</div><div className="mt-4 flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-3 text-xs text-cyan-200"><CheckCircle2 className="h-4 w-4" /> Syncing → Indexed → AI Ready</div></ProductShell></Reveal><Reveal delay={0.1}><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Knowledge base</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">Teach the assistant how your business works.</h2><p className="mt-5 max-w-xl text-base leading-8 text-slate-600">Connect the information your team already uses, then let the AI use it in customer conversations.</p></div></Reveal></div></div></section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12"><div className="grid items-center gap-10 lg:grid-cols-2"><Reveal><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Human handover</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">Automation with a clear path to your team.</h2><p className="mt-5 max-w-xl text-base leading-8 text-slate-600">Routine conversations can stay in AI mode. When human help is needed, the handover state stays visible and controlled.</p></div></Reveal><Reveal delay={0.1}><ProductShell className="p-4"><div className="flex items-center justify-center gap-3 text-xs"><span className="rounded-lg bg-cyan-400/10 px-3 py-2 text-cyan-200">AI Mode</span><ArrowRight className="h-4 w-4 text-slate-500" /><span className="rounded-lg bg-blue-600 px-3 py-2 font-semibold text-white">Agent Mode</span></div><div className="mt-5 rounded-xl border border-white/10 bg-white/[0.05] p-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white"><UserRound className="h-4 w-4" /></div><div><p className="text-xs font-semibold text-white">Human assistance requested</p><p className="mt-1 text-[10px] text-slate-500">Conversation context is ready for your team.</p></div></div></div></ProductShell></Reveal></div></section>

        <section className="bg-slate-50"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12"><Reveal><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Dashboard</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">One workspace for WhatsApp conversations.</h2></div></Reveal><Reveal delay={0.12} className="mt-10"><DashboardVisual /></Reveal></div></section>

        <section id="solutions" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12"><Reveal><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Solutions</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">Customer conversations that fit your business.</h2></div></Reveal><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{industries.slice(0, 8).map(({ name, icon: Icon }, index) => <Reveal key={`${name}-${index}`} delay={index * 0.04}><article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white"><Icon className="h-4 w-4" /></div><h3 className="mt-4 font-semibold text-[#071a3d]">{name}</h3><div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">Customer asks about available services.<br /><span className="font-medium text-blue-700">AI replies with business context.</span></div></article></Reveal>)}</div></section>

        <section id="pricing" className="bg-slate-50"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12"><Reveal><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Pricing</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">Plans for your next customer conversation.</h2></div></Reveal><div className="mt-10 grid gap-5 lg:grid-cols-3">{pricingPlans.map((plan) => <article key={plan.name} className={`flex h-full flex-col rounded-2xl border p-6 ${plan.highlighted ? "border-blue-400 bg-[#071a3d] text-white shadow-xl shadow-blue-950/15" : "border-slate-200 bg-white"}`}><h3 className="text-lg font-semibold">{plan.name}</h3><p className={`mt-3 text-sm leading-6 ${plan.highlighted ? "text-slate-300" : "text-slate-600"}`}>{plan.description}</p><p className="mt-6 text-3xl font-semibold">{plan.price}<span className={`ml-2 text-sm font-normal ${plan.highlighted ? "text-slate-400" : "text-slate-500"}`}>/month</span></p><ul className="mt-6 flex-1 space-y-3 text-sm">{plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 flex-none text-blue-500" />{feature}</li>)}</ul><a href="#demo" className={`mt-7 rounded-lg px-4 py-3 text-center text-sm font-semibold ${plan.highlighted ? "bg-white text-[#071a3d]" : "bg-[#071a3d] text-white"}`}>Book Demo</a></article>)}</div></div></section>

        <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-8"><Reveal><div className="text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">FAQ</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071a3d] sm:text-4xl">Questions about WhatsApp AI.</h2></div></Reveal><div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">{whatsappFaqs.map((item, index) => { const open = activeFaq === index; return <div key={item.question}><button type="button" aria-expanded={open} onClick={() => setActiveFaq(open ? null : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-slate-900"><span>{item.question}</span>{open ? <Plus className="h-4 w-4 rotate-45 text-blue-600" /> : <Plus className="h-4 w-4 text-slate-400" />}</button><AnimatePresence initial={false}>{open ? <motion.div initial={reduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-5 text-sm leading-7 text-slate-600">{item.answer}</p></motion.div> : null}</AnimatePresence></div>; })}</div></section>

        <section id="demo" className="bg-[#071a3d] text-white"><div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-8"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Ready for smarter conversations?</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Connect WhatsApp, AI, knowledge, and lead management in one workflow.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">Build a focused customer communication experience for your team.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#demo" className="rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white hover:bg-blue-500">Get Started</a><a href="mailto:account@tomartechworks.com" className="rounded-lg border border-white/15 px-6 py-3.5 font-semibold text-white hover:bg-white/10">Book a Demo</a></div></Reveal></div></section>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-8 md:grid-cols-4 lg:px-12"><div className="md:col-span-1"><img src="/tt-chat-logo.svg" alt="Tomar Techworks" className="h-10 w-auto" /><p className="mt-4 text-sm leading-7 text-slate-600">Tomar Techworks software for thoughtful customer conversations.</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Product</p><div className="mt-4 space-y-3 text-sm text-slate-600"><a className="block hover:text-blue-700" href="#top">WhatsApp AI</a><a className="block hover:text-blue-700" href="/">TT AI Chat</a></div></div><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Solutions</p><div className="mt-4 space-y-3 text-sm text-slate-600"><a className="block hover:text-blue-700" href="#features">AI Conversations</a><a className="block hover:text-blue-700" href="#solutions">Lead Generation</a><a className="block hover:text-blue-700" href="#features">Knowledge Base</a></div></div><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Company</p><div className="mt-4 space-y-3 text-sm text-slate-600"><a className="block hover:text-blue-700" href="#demo">Contact</a><a className="block hover:text-blue-700" href="https://tomartechworks.com">Services</a></div></div></div></footer>
    </div>
  );
}

export default WhatsAppPage;
