"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Send,
  Star,
  BookOpen,
  Calculator,
  Zap,
  Clock,
  LayoutDashboard,
  Calendar,
  Play,
  Volume2,
  Maximize2,
  TrendingUp,
  BarChart3,
  Flame,
  Award,
  Layers,
  FileText,
  Search,
  CheckCircle2,
  Compass,
  GraduationCap
} from "lucide-react";

// OnePrep Cute Cloud Mascot Logo
function CloudMascot({ size = 32 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-xs">
        <defs>
          <linearGradient id="cloudGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7EE7F8" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <path
          d="M9 22.5C6.5 22.5 4.5 20.5 4.5 18C4.5 15.8 6.1 13.9 8.3 13.6C9.1 10.3 12 8 15.5 8C19.3 8 22.5 10.7 23.1 14.4C24 13.8 25.2 13.5 26.5 13.5C29.5 13.5 32 16 32 19C32 22 29.5 24.5 26.5 24.5L9 24.5Z"
          fill="url(#cloudGradHero)"
        />
        <ellipse cx="14" cy="18" rx="2" ry="2.6" fill="#0C4A6E" />
        <ellipse cx="22" cy="18" rx="2" ry="2.6" fill="#0C4A6E" />
        <circle cx="14.8" cy="17.2" r="0.9" fill="#FFFFFF" />
        <circle cx="22.8" cy="17.2" r="0.9" fill="#FFFFFF" />
        <circle cx="10" cy="20" r="1.6" fill="#FB7185" opacity="0.85" />
        <circle cx="26" cy="20" r="1.6" fill="#FB7185" opacity="0.85" />
        <path d="M16 20.5Q18 22.5 20 20.5" stroke="#0C4A6E" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

// Hand-drawn Organic Underline SVG
function HandDrawnUnderline({ className = "w-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 16" fill="none" className={`inline-block ${className} text-[#38BDF8] h-3`}>
      <path
        d="M3 12C50 4, 150 4, 197 10C140 14, 60 14, 15 13"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LandingPage() {
  // Hero question state
  const [heroOption, setHeroOption] = useState<string>("C");
  const [heroAnswerChecked, setHeroAnswerChecked] = useState<boolean>(true);

  // Question bank state
  const [qbSubject, setQbSubject] = useState<"rw" | "math">("rw");
  const [qbOption, setQbOption] = useState<string>("A");

  // Masterclass state
  const [masterclassTab, setMasterclassTab] = useState<"rw" | "math">("rw");

  // Selected feature in 15+ carousel
  const [activeFeature, setActiveFeature] = useState<number>(0);

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonialsList = [
  {
    "name": "Atri A.",
    "fromScore": "1340",
    "toScore": "1490",
    "diff": "+150 points",
    "color": "#E8AE3D",
    "quote": "Oneprep was helpful during my intense SAT prep, especially with a short timeline. Interface is super user-friendly and Preppy keeps every question engaging."
  },
  {
    "name": "Bennett G.",
    "fromScore": "1430",
    "toScore": "1550",
    "diff": "+120 points",
    "color": "#32C992",
    "quote": "The cleanest SAT prep interface I've used. The questions feel comparable to official tests, and the analytics showed me exactly where to focus each week."
  },
  {
    "name": "Sameera S.",
    "fromScore": "1120",
    "toScore": "1370",
    "diff": "+250 points",
    "color": "#E8AE3D",
    "quote": "OnePrep helped me more than I expected. Preppy AI is genuinely useful when I'm stuck because it explains the reasoning instead of simply giving me the answer."
  },
  {
    "name": "Chris A.",
    "fromScore": "1190",
    "toScore": "1470",
    "diff": "+280 points",
    "color": "#32C992",
    "quote": "Honestly didn't think an AI tutor would be that helpful, but it actually explains stuff like a person would. A bunch of math I'd been guessing on for ages finally made sense."
  },
  {
    "name": "Chase D.",
    "fromScore": "1200",
    "toScore": "1520",
    "diff": "+320 points",
    "color": "#DE53B4",
    "quote": "Adaptive practice helped me focus on exactly what I kept missing. After two months, I stopped repeating the same mistakes and my mock scores started jumping every week."
  },
  {
    "name": "Henry S.",
    "fromScore": "1300",
    "toScore": "1450",
    "diff": "+150 points",
    "color": "#DE53B4",
    "quote": "The practice tests feel accurate, even slightly harder than the official ones. The pacing practice made test day much less stressful."
  },
  {
    "name": "Mai H.",
    "fromScore": "1300",
    "toScore": "1550",
    "diff": "+250 points",
    "color": "#DE53B4",
    "quote": "I like that the explanations actually make sense. Some other platforms just give you the answer but this one breaks it down."
  },
  {
    "name": "Mahmoud T.",
    "fromScore": "1240",
    "toScore": "1510",
    "diff": "+270 points",
    "color": "#DE53B4",
    "quote": "The explanations are detailed and helped me finally understand the reading concepts I'd struggled with for weeks."
  },
  {
    "name": "Mattias M.",
    "fromScore": "1220",
    "toScore": "1370",
    "diff": "+150 points",
    "color": "#32C992",
    "quote": "OnePrep puts every question bank in one place and organizes everything by topic, so studying finally feels structured."
  }
];

  const faqItems = [
    {
      q: "Is OnePrep free to use?",
      a: "Yes! You can get started completely for free without entering a credit card. Free accounts give you full access to diagnostic assessments, a curated set of practice questions, and basic performance analytics."
    },
    {
      q: "What makes OnePrep different from other SAT prep?",
      a: "Unlike traditional static question banks, OnePrep combines authentic adaptive tests, real-time interactive Socratic guidance with Preppy AI, video walkthroughs from a 1580 scorer, and automated study schedules that adapt to your weaknesses."
    },
    {
      q: "How accurate is the score prediction?",
      a: "Our score prediction engine is calibrated against tens of thousands of official College Board Digital SAT exams. Most students see their official score fall within ±30 points of their predicted score on OnePrep."
    },
    {
      q: "How does Preppy AI work?",
      a: "Preppy is an intelligent tutor built directly into every question. Instead of simply giving away the final answer, Preppy identifies your conceptual misconception, provides tailored hints, and guides you step-by-step through the problem."
    },
    {
      q: "Which exams does OnePrep cover?",
      a: "OnePrep currently offers complete preparation for the Digital SAT, Enhanced ACT, AP exams (including Calculus AB/BC, Chemistry, US History, and Biology), plus college admissions guidance."
    },
    {
      q: "Can OnePrep help with my college applications?",
      a: "Yes. With our College track, students can explore university admission stats, track application deadlines, organize supplemental essays, and receive personalized feedback on their personal statement drafts."
    },
    {
      q: "Can I use OnePrep on my phone?",
      a: "Yes, OnePrep is fully mobile-responsive and works seamlessly on iOS, Android, tablets, and desktop browsers. You can practice questions on the go whenever you have a few minutes."
    }
  ];

  const featuresList = [
    { name: "Lessons", desc: "Short, high-yield lessons covering every skill on the test.", icon: "📚", color: "bg-amber-50 text-amber-600 border-amber-200" },
    { name: "Question Bank", desc: "4,000+ realistic questions with thorough explanations.", icon: "❓", color: "bg-purple-50 text-purple-600 border-purple-200" },
    { name: "Question Rush", desc: "Race against the clock to build rapid recall and pacing.", icon: "⚡", color: "bg-blue-50 text-blue-600 border-blue-200" },
    { name: "Challenge Questions", desc: "Toughest 99th percentile problems to secure an 800.", icon: "🎯", color: "bg-rose-50 text-rose-600 border-rose-200" },
    { name: "Preppy AI Tutor", desc: "Instant conversational hints without spoiling the final answer.", icon: "🤖", color: "bg-sky-50 text-sky-600 border-sky-200" },
    { name: "Study Planner", desc: "Auto-recalibrating schedule syncing with Google Calendar.", icon: "📅", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { name: "Full-Length Mocks", desc: "True adaptive multi-stage test simulations with Bluebook scoring.", icon: "⏱️", color: "bg-teal-50 text-teal-600 border-teal-200" },
    { name: "Desmos Walkthroughs", desc: "Master every Desmos graphing shortcut for digital Math.", icon: "📈", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { name: "Mistake Notebook", desc: "Every missed problem auto-categorized for spaced repetition.", icon: "📓", color: "bg-orange-50 text-orange-600 border-orange-200" },
    { name: "Vocab Builder", desc: "Contextual vocabulary drills for High-Frequency SAT words.", icon: "🔤", color: "bg-pink-50 text-pink-600 border-pink-200" },
    { name: "Pacing Analytics", desc: "Identify exact seconds lost per question difficulty band.", icon: "📊", color: "bg-cyan-50 text-cyan-600 border-cyan-200" },
    { name: "College List", desc: "Compare target scores, acceptance rates, and GPA requirements.", icon: "🏛️", color: "bg-slate-50 text-slate-600 border-slate-200" }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#38bdf8] selection:text-white">
      {/* ---------------- 1. NAVBAR ---------------- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <CloudMascot size={34} />
            <span className="text-2xl font-medium tracking-tight text-zinc-950">
              OnePrep
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-zinc-600">
            <Link href="/dashboard" className="text-zinc-900 font-bold hover:text-[#0284c7] transition-colors">
              Digital SAT
            </Link>
            <Link href="/dashboard" className="hover:text-zinc-900 transition-colors">
              Enhanced ACT
            </Link>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-900 transition-colors">
              <span>AP</span>
              <span className="rounded bg-[#0284c7] text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
                New
              </span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-900 transition-colors">
              <span>College</span>
              <span className="rounded bg-[#0284c7] text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
                New
              </span>
            </div>
            <Link href="#planner" className="hover:text-zinc-900 transition-colors">
              For Schools
            </Link>
            <Link href="#pricing" className="hover:text-zinc-900 transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-bold text-zinc-700 hover:text-black transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2.5 text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Sign up</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------- 2. HERO SECTION (User Snippet with Animation & Cyan Ribbon) ---------------- */}
      <section className="relative overflow-hidden pt-6 pb-20 lg:pt-12 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 grid min-h-[640px] items-center gap-14 lg:min-h-[700px] lg:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)] lg:gap-12">
          {/* Left Text Column */}
          <div className="order-last -mt-8 w-full max-w-4xl lg:order-first lg:mt-0">
            <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">
              <h1 className="text-balance text-4xl leading-[1.1] tracking-[-0.045em] sm:text-5xl md:text-5xl lg:text-6xl text-zinc-950 font-medium">
                Your{" "}
                <span className="relative inline-block whitespace-nowrap">
                  All-in-One
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[0.06em] left-0 h-[0.22em] w-full overflow-visible text-[#38BDF8]"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 12"
                  >
                    <path d="M 3 9 Q 50 2 97 9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
                  </svg>
                </span>
                <br />
                Resource for
                <br />
                SAT, ACT, AP, and College
              </h1>

              <p className="text-balance text-xl leading-snug tracking-tight sm:text-2xl text-zinc-600 font-sans font-normal max-w-xl">
                Prepare for your exams with expert-written questions and realistic practice tests. Strengthen your college application with essay feedback and application reviews.
              </p>

              <div className="flex w-full flex-wrap items-center justify-center gap-4 lg:justify-start pt-2">
                <Link
                  href="/auth/signup"
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-bold transition-all rounded-full bg-black hover:bg-zinc-800 text-white h-13 px-8 text-lg shadow-lg active:scale-95"
                >
                  Get Started for Free
                </Link>
                <button className="inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-semibold transition-all border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 h-13 px-6 text-base rounded-full shadow-xs">
                  I&apos;m a parent
                </button>
                <button className="inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-semibold transition-all border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 h-13 px-6 text-base rounded-full shadow-xs">
                  I&apos;m an educator
                </button>
              </div>

              {/* Direct Dashboard Link */}
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-zinc-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>OnePrep Dashboard tizimiga kirish:</span>
                <Link href="/dashboard" className="text-[#0284c7] font-medium underline hover:text-[#0369a1]">
                  Platforma Dashboardi →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Card + Cyan Painterly Ribbon */}
          <div className="relative flex w-full justify-center">
            {/* The Vibrant Cyan Brush Stroke Behind */}
            <div className="pointer-events-none absolute -inset-10 sm:-inset-16 flex items-center justify-center -z-10">
              <svg viewBox="0 0 540 560" className="w-[125%] h-[125%] max-w-none opacity-90 drop-shadow-md">
                <path
                  d="M 380 90 C 490 120, 520 220, 440 280 C 350 350, 200 240, 160 360 C 130 450, 240 520, 390 480 C 450 460, 470 410, 430 380"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="90"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
              </svg>
            </div>

            {/* Interactive Digital SAT Card Preview */}
            <div className="relative w-full max-w-[420px] rounded-3xl bg-white/95 border border-zinc-200 shadow-2xl p-6 backdrop-blur-md">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xs font-medium">
                    8
                  </span>
                  <span className="text-xs font-bold text-zinc-500 flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-zinc-400" />
                    Mark for Review
                  </span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                  Digital SAT
                </span>
              </div>

              {/* Floating Predicted Score Badge */}
              <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Predicted Score</p>
                  <p className="text-2xl font-medium text-white">1570</p>
                </div>
                <div className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 text-xs font-medium">
                  +180 points
                </div>
              </div>

              {/* Question Text */}
              <div className="mt-4 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 font-serif text-sm leading-relaxed text-zinc-800">
                A line in the <em>xy</em>-plane passes through (0, 4) and (2, 10). What is the slope of the line?
              </div>

              {/* Options */}
              <div className="mt-3.5 space-y-2">
                {[
                  { key: "A", val: "2" },
                  { key: "B", val: "4" },
                  { key: "C", val: "3", correct: true },
                  { key: "D", val: "7" }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setHeroOption(opt.key)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-sm font-bold text-left transition-all ${
                      heroOption === opt.key
                        ? "border-[#0284c7] bg-sky-50/70 text-[#0284c7] ring-1 ring-[#0284c7]"
                        : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-800"
                    }`}
                  >
                    <span
                      className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-medium ${
                        heroOption === opt.key ? "bg-[#0284c7] text-white" : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span>{opt.val}</span>
                  </button>
                ))}
              </div>

              {/* Check Answer Button */}
              <button
                onClick={() => setHeroAnswerChecked(!heroAnswerChecked)}
                className="w-full mt-4 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold py-3 text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>{heroAnswerChecked ? "Correct! Slope = 3" : "Check Answer"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. UNIVERSITIES TRUST BANNER ---------------- */}
      <section className="bg-[#0E4363] text-white py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-8">
            OnePrep helps students get into top schools
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
            {[
              "Stanford University",
              "MIT",
              "HARVARD UNIVERSITY",
              "PRINCETON UNIVERSITY",
              "Yale University",
              "COLUMBIA UNIVERSITY",
              "Penn",
              "Caltech",
              "THE UNIVERSITY OF CHICAGO",
              "Dartmouth",
              "Cornell University",
              "Duke UNIVERSITY",
            ].map((uni, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center text-white/80 hover:text-white transition-opacity font-serif font-medium tracking-wider text-xs sm:text-sm text-center px-2 py-1"
              >
                {uni}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4. DIAGNOSE, PLAN, & PRACTICE SMARTER ---------------- */}
      <section className="py-24 bg-[#FAFCFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950">
              Diagnose, plan, & practice{" "}
              <span className="relative inline-block">
                smarter
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="rounded-3xl bg-white border border-zinc-200/80 p-7 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] p-5 mb-8">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Predicted Score</p>
                <p className="text-4xl font-medium text-zinc-900 mt-1">1420</p>
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-semibold mt-1 pb-3 border-b border-zinc-200">
                  <span>Reading & Writing: <strong>720</strong></span>
                  <span>•</span>
                  <span>Math: <strong>700</strong></span>
                </div>

                <div className="mt-3 space-y-2">
                  <p className="text-[10px] font-medium uppercase text-zinc-400">Focus next</p>
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-zinc-700">
                      <span>Information and Ideas</span>
                      <span>72%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-[#0284c7] rounded-full" style={{ width: "72%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-zinc-700">
                      <span>Craft and Structure</span>
                      <span>58%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-[#0284c7] rounded-full" style={{ width: "58%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-zinc-700">
                      <span>Standard English Conventions</span>
                      <span>81%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-[#0284c7] rounded-full" style={{ width: "81%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-3xl font-medium text-zinc-300">01</span>
                <h3 className="text-xl font-bold text-zinc-900 mt-2">Take your diagnostic</h3>
                <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                  See your projected score and the domains losing you the most points.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="rounded-3xl bg-white border border-zinc-200/80 p-7 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] p-5 mb-8 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Information and Ideas</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="rounded bg-rose-50 text-rose-600 font-bold text-[9px] px-1">R&W</span>
                      <span className="text-[10px] text-zinc-400">⏱ 30m</span>
                    </div>
                  </div>
                  <Link href="/dashboard" className="text-xs font-bold text-[#0284c7] hover:underline">Start &gt;</Link>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Algebra</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="rounded bg-sky-50 text-sky-600 font-bold text-[9px] px-1">Math</span>
                      <span className="text-[10px] text-zinc-400">⏱ 25m</span>
                    </div>
                  </div>
                  <Link href="/dashboard" className="text-xs font-bold text-[#0284c7] hover:underline">Start &gt;</Link>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Vocab</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">⏱ 15m</p>
                  </div>
                  <Link href="/dashboard" className="text-xs font-bold text-[#0284c7] hover:underline">Start &gt;</Link>
                </div>
              </div>

              <div>
                <span className="text-3xl font-medium text-zinc-300">02</span>
                <h3 className="text-xl font-bold text-zinc-900 mt-2">Get your tailored plan</h3>
                <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                  Tell us your test date and target. The schedule rebuilds itself as your accuracy changes.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="rounded-3xl bg-white border border-zinc-200/80 p-7 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] p-5 mb-8 space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <p className="text-xs font-bold text-zinc-900">Question bank</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                    Work through questions at your own pace with full explanations.
                  </p>
                  <Link href="/dashboard" className="mt-2 inline-block text-xs font-bold text-[#0284c7] hover:underline">
                    Continue
                  </Link>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <p className="text-xs font-bold text-zinc-900">Question Rush</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                    Race against the clock to practice your speed.
                  </p>
                  <Link href="/dashboard" className="mt-2 inline-block text-xs font-bold text-[#0284c7] hover:underline">
                    Continue
                  </Link>
                </div>
              </div>

              <div>
                <span className="text-3xl font-medium text-zinc-300">03</span>
                <h3 className="text-xl font-bold text-zinc-900 mt-2">Hit your target score</h3>
                <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                  Targeted drills, questions, and exercises built around your weakest skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. TESTIMONIAL ABID ---------------- */}
      <section className="py-24 bg-gradient-to-b from-[#E3F5FC] via-[#EDF9FE] to-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950">
            Achieve a{" "}
            <span className="relative inline-block">
              life-changing
              <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full" />
            </span>{" "}
            score
          </h2>

          <div className="relative">
            <blockquote className="text-xl sm:text-2xl font-bold text-zinc-800 leading-relaxed font-serif">
              “OnePrep stands out for its high-quality practice questions and detailed video explanations. I&apos;m using OnePrep Pro to work toward my target SAT score of 1550.”
            </blockquote>

            <div className="mt-8 flex flex-col items-center justify-center gap-2">
              <div className="h-14 w-14 rounded-full bg-cyan-200 ring-4 ring-white shadow-md flex items-center justify-center font-bold text-cyan-900 text-2xl">
                👨‍🎓
              </div>
              <div className="text-center">
                <p className="font-medium text-zinc-900 text-lg">Abid</p>
                <p className="text-sm text-zinc-500 font-medium">Dream school: Stanford University</p>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
              <span className="h-2 w-6 rounded-full bg-[#0284c7]" />
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 6. QUESTION BANK WITH ASK PREPPY AI ---------------- */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 text-purple-700 font-medium text-xs px-3.5 py-1 mb-4 border border-purple-200">
              <span className="h-4 w-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">?</span>
              Question Bank
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950 leading-tight">
              Never stay stuck on a question
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-medium mt-3 leading-relaxed">
              4,000+ human-written Digital SAT questions, each with a step-by-step walkthrough and instant follow-up help when something doesn&apos;t click.
            </p>
            <div className="pt-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 text-white font-bold px-7 py-3.5 text-sm shadow-md transition-all active:scale-95"
              >
                <span>Get started for free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Practice Interface Mockup with Floating AI Tutor */}
          <div className="mt-12 rounded-3xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setQbSubject("rw")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  qbSubject === "rw"
                    ? "bg-black text-white"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:text-black"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Reading & Writing
              </button>
              <button
                onClick={() => setQbSubject("math")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  qbSubject === "math"
                    ? "bg-black text-white"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:text-black"
                }`}
              >
                <Calculator className="h-3.5 w-3.5" />
                Math
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Passage */}
              <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-zinc-200 text-xs text-zinc-700 leading-relaxed font-serif space-y-3">
                <p className="font-sans font-bold text-zinc-900 text-[11px] uppercase tracking-wider">
                  Text 1
                </p>
                <p>
                  The film <em>Saturday Night Fever</em> draws much of its inspiration from the music of a single band—the Bee Gees. Songs by this 1970s disco group animate key moments in the film. For example, in the iconic opening scene, actor John Travolta walks down a city street as the Bee Gees classic &quot;Stayin&apos; Alive&quot; pulses in the background. Music by the Bee Gees is so integral to <em>Saturday Night Fever</em> that some viewers assume (incorrectly) that characters in this drama sing along to Bee Gees songs.
                </p>
                <p className="font-sans font-bold text-zinc-900 text-[11px] uppercase tracking-wider pt-2">
                  Text 2
                </p>
                <p>
                  <em>Saturday Night Fever</em> is not in any way a musical, even though the songs of a single band, the Bee Gees, can be heard prominently throughout the film. To be classified as a musical, the film would require characters who sing along to the songs themselves. Instead, the music of the Bee Gees provides more of a commentary.
                </p>
              </div>

              {/* Right Column: Question & Explanation */}
              <div className="lg:col-span-6 space-y-3">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                    <span>Question 1</span>
                    <span>Mark for Review</span>
                  </div>
                  <p className="text-xs font-bold text-zinc-900">
                    Based on the texts, how would the author of Text 2 respond to the underlined portion of Text 1?
                  </p>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setQbOption("A")}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-2 ${
                        qbOption === "A"
                          ? "border-rose-400 bg-rose-50 text-rose-900 font-medium"
                          : "border-zinc-200 bg-white text-zinc-800"
                      }`}
                    >
                      <span className="h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-[10px]">✕</span>
                      <span>By explaining that both singing and movement are important to Saturday Night Fever</span>
                    </button>
                    <button
                      onClick={() => setQbOption("B")}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        qbOption === "B"
                          ? "border-[#0284c7] bg-sky-50 text-[#0284c7] font-bold"
                          : "border-zinc-200 bg-white text-zinc-800"
                      }`}
                    >
                      By noting that bands other than the Bee Gees contributed songs to Saturday Night Fever
                    </button>
                    <button
                      onClick={() => setQbOption("C")}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        qbOption === "C"
                          ? "border-[#0284c7] bg-sky-50 text-[#0284c7] font-bold"
                          : "border-zinc-200 bg-white text-zinc-800"
                      }`}
                    >
                      By questioning the status of Saturday Night Fever as a classic film
                    </button>
                  </div>
                </div>

                {/* Floating "Ask Preppy" AI Chatbot Card */}
                <div className="rounded-2xl border border-[#BAE6FD] bg-white p-4 shadow-xl space-y-3">
                  <div className="flex items-center gap-2.5">
                    <CloudMascot size={28} />
                    <div>
                      <p className="text-xs font-medium text-zinc-900">How can I help?</p>
                      <p className="text-[10px] text-zinc-400 font-medium">Ask Preppy any question!</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                    <input
                      type="text"
                      readOnly
                      value="Can you walk me through this question step-by-step?"
                      className="text-xs text-zinc-700 bg-transparent flex-1 outline-none"
                    />
                    <Link
                      href="/dashboard"
                      className="h-7 w-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0 hover:bg-zinc-800"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 7. STUDY PLANNER SECTION ---------------- */}
      <section id="planner" className="py-24 bg-[#FAFCFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-xs px-3.5 py-1 mb-4 border border-blue-200">
              <Calendar className="h-3.5 w-3.5" />
              Study Planner
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950 leading-tight">
              Stop wondering what to study next
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-medium mt-3 leading-relaxed">
              Each week&apos;s schedule is built from your test date and latest activity. The plan recalibrates as your accuracy changes.
            </p>
            <div className="pt-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 text-white font-bold px-7 py-3.5 text-sm shadow-md transition-all active:scale-95"
              >
                <span>Get started for free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Card: Your week at a glance */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-xl font-medium text-zinc-950">Your week at a glance</h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                  See what to work on each day, how long it takes, and where to start when you sit down.
                </p>
              </div>

              {/* Day Tasks */}
              <div className="space-y-6">
                {/* Thu 21 May */}
                <div className="flex gap-4">
                  <div className="w-12 text-center shrink-0">
                    <p className="text-[10px] font-bold uppercase text-zinc-400">Thu</p>
                    <p className="text-2xl font-medium text-zinc-900">21</p>
                    <p className="text-[10px] font-bold text-zinc-400">May</p>
                  </div>
                  <div className="flex-1 space-y-2.5">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-zinc-900">Reading synthesis drill</p>
                          <p className="text-[10px] text-zinc-400">Reading / 30 min / 10 questions</p>
                        </div>
                      </div>
                      <Link href="/dashboard" className="text-xs font-bold text-[#0284c7] hover:underline">Start &gt;</Link>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-zinc-300 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-zinc-900">Expression of ideas review</p>
                          <p className="text-[10px] text-zinc-400">Writing / 20 min / 5 questions</p>
                        </div>
                      </div>
                      <Link href="/dashboard" className="text-xs font-bold text-[#0284c7] hover:underline">Start &gt;</Link>
                    </div>
                  </div>
                </div>

                {/* Sat 23 May */}
                <div className="flex gap-4">
                  <div className="w-12 text-center shrink-0">
                    <p className="text-[10px] font-bold uppercase text-zinc-400">Sat</p>
                    <p className="text-2xl font-medium text-zinc-900">23</p>
                    <p className="text-[10px] font-bold text-zinc-400">May</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-sky-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-sky-950">Cross-topic practice set</p>
                          <p className="text-[10px] text-sky-600 font-medium">Mixed / 45 min / 20 questions</p>
                        </div>
                      </div>
                      <Link href="/dashboard" className="px-4 py-1.5 rounded-full bg-[#0284c7] text-white text-xs font-bold hover:bg-[#0369a1] shadow-xs">
                        Start
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sun 24 May */}
                <div className="flex gap-4">
                  <div className="w-12 text-center shrink-0">
                    <p className="text-[10px] font-bold uppercase text-zinc-400">Sun</p>
                    <p className="text-2xl font-medium text-zinc-900">24</p>
                    <p className="text-[10px] font-bold text-zinc-400">May</p>
                  </div>
                  <div className="flex-1 space-y-2.5">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-zinc-300 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-zinc-900">Full-length digital SAT practice</p>
                          <p className="text-[10px] text-zinc-400">Practice test / 134 min / 98 questions</p>
                        </div>
                      </div>
                      <Link href="/dashboard" className="text-xs font-bold text-[#0284c7] hover:underline">Start &gt;</Link>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-zinc-300 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-zinc-900">Mistakes review</p>
                          <p className="text-[10px] text-zinc-400">Review / 30 min / Allocated session</p>
                        </div>
                      </div>
                      <Link href="/dashboard" className="text-xs font-bold text-[#0284c7] hover:underline">Start &gt;</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2 Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Never lose track of test day */}
              <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Time left to SAT exam</span>
                  <Clock className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-medium text-zinc-950">8</span>
                  <span className="text-xs font-bold text-zinc-400 uppercase">days</span>
                  <span className="text-3xl font-medium text-zinc-950 ml-2">09</span>
                  <span className="text-xs font-bold text-zinc-400 uppercase">hrs</span>
                  <span className="text-3xl font-medium text-zinc-950 ml-2">20</span>
                  <span className="text-xs font-bold text-zinc-400 uppercase">min</span>
                </div>
                <p className="text-xs font-bold text-[#0284c7] bg-sky-50 py-1.5 px-3 rounded-xl inline-block border border-sky-100">
                  Saturday, November 7
                </p>
                <div className="pt-2 border-t border-zinc-100">
                  <h4 className="text-base font-bold text-zinc-900">Never lose track of test day</h4>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    Always see time left alongside your weekly plan.
                  </p>
                </div>
              </div>

              {/* Card 2: Syncs with Google Calendar */}
              <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xl space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
                  <span className="text-xl font-medium">31</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-900">Syncs with Google Calendar</h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">
                    Your study sessions show up in Google Calendar, and your plan works around what is already there.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 8. MASTERCLASS SECTION ---------------- */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-rose-700 font-medium text-xs px-3.5 py-1 mb-4 border border-rose-200">
              <Play className="h-3.5 w-3.5 fill-current" />
              Masterclass
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950 leading-tight">
              Learn with the OnePrep Masterclass
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-medium mt-3 leading-relaxed">
              Work through 110+ SAT lessons across Reading & Writing and Math skills. Learn with examples and guided Desmos walkthroughs.
            </p>
            <div className="pt-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 text-white font-bold px-7 py-3.5 text-sm shadow-md transition-all active:scale-95"
              >
                <span>Get started for free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Toggle pill */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setMasterclassTab("rw")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                masterclassTab === "rw"
                  ? "bg-black text-white"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:text-black"
              }`}
            >
              Reading & Writing
            </button>
            <button
              onClick={() => setMasterclassTab("math")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                masterclassTab === "math"
                  ? "bg-black text-white"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:text-black"
              }`}
            >
              Math
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Video Player Mockup */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-2xl">
              <div className="aspect-video relative flex flex-col justify-between p-6 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase text-zinc-400 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    Lesson 4: Verb Elimination Rules
                  </span>
                  <CloudMascot size={26} />
                </div>

                {/* Center Play Button */}
                <div className="flex items-center justify-center">
                  <Link
                    href="/dashboard"
                    className="h-18 w-18 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
                  >
                    <Play className="h-8 w-8 ml-1 fill-current" />
                  </Link>
                </div>

                {/* Video controls */}
                <div className="space-y-2 bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#38bdf8] rounded-full" style={{ width: "28%" }} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/80 font-mono">
                    <div className="flex items-center gap-3">
                      <Play className="h-3.5 w-3.5 fill-current cursor-pointer hover:text-white" />
                      <Volume2 className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                      <span>1:00 / 8:24</span>
                    </div>
                    <Maximize2 className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: 2 Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: 1580 Scorer */}
              <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xl space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                    👨‍🏫
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                        Georgia Tech
                      </span>
                      <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                        800 Math
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-zinc-950 mt-1">Learn from a 1580 scorer</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                  Scott has mentored hundreds of students to transformative 1500+ scores through real exam-proven techniques.
                </p>
              </div>

              {/* Card 2: Strategy Tags */}
              <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xl space-y-4">
                <h4 className="text-lg font-medium text-zinc-950">Master proven test-day strategies</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "The Three Versus One Rule",
                    "Non-Main Verb Elimination",
                    "Modifier Agreement",
                    "SOHCAHTOA Acronym",
                    "Identify the main claim",
                    "Respect assigned variables",
                    "Plug and play method"
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 font-medium mt-1">
                  Understand frameworks to stay calm and avoid traps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 9. ADVANCED ANALYTICS SECTION ---------------- */}
      <section className="py-24 bg-[#FAFCFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 text-purple-700 font-medium text-xs px-3.5 py-1 mb-4 border border-purple-200">
              <BarChart3 className="h-3.5 w-3.5" />
              Advanced Analytics
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950 leading-tight">
              Know your weak spots before test day
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-medium mt-3 leading-relaxed">
              See your accuracy by topic, your pacing against other students, and the difficulty bands where you&apos;re losing time.
            </p>
            <div className="pt-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 text-white font-bold px-7 py-3.5 text-sm shadow-md transition-all active:scale-95"
              >
                <span>Get started for free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Card: Know exactly where you stand */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-medium text-zinc-950">Know exactly where you stand</h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                  See weekly activity, accuracy by topic, and time share by difficulty so you know exactly what to practice.
                </p>
              </div>

              {/* Stacked Bar Chart */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-3">
                  <span>WEEKLY ACCURACY PROGRESSION</span>
                  <span>11 WEEKS</span>
                </div>
                <div className="flex items-end justify-between h-36 gap-2 pt-2">
                  {[
                    { date: "Mar 24", green: 40, orange: 30, red: 15 },
                    { date: "Mar 31", green: 45, orange: 28, red: 12 },
                    { date: "Apr 7",  green: 50, orange: 25, red: 14 },
                    { date: "Apr 14", green: 55, orange: 24, red: 10 },
                    { date: "Apr 21", green: 62, orange: 20, red: 11 },
                    { date: "Apr 28", green: 68, orange: 18, red: 8 },
                    { date: "May 5",  green: 74, orange: 15, red: 6 },
                    { date: "May 12", green: 78, orange: 14, red: 5 },
                    { date: "May 19", green: 82, orange: 12, red: 4 },
                    { date: "May 26", green: 85, orange: 10, red: 3 },
                    { date: "Jun 2",  green: 89, orange: 8,  red: 2 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[20px] flex flex-col gap-0.5 rounded-t-md overflow-hidden">
                        <div className="bg-emerald-400" style={{ height: `${bar.green}%` }} />
                        <div className="bg-amber-400" style={{ height: `${bar.orange}%` }} />
                        <div className="bg-rose-400" style={{ height: `${bar.red}%` }} />
                      </div>
                      <span className="text-[9px] font-semibold text-zinc-400 truncate">{bar.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accuracy Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-800">
                      <span>Information and Ideas</span>
                      <span className="text-sky-600">72%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: "72%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-800">
                      <span>Craft and Structure</span>
                      <span className="text-sky-600">58%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: "58%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-800">
                      <span>Standard English Conventions</span>
                      <span className="text-sky-600">81%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: "81%" }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-800">
                      <span>Algebra</span>
                      <span className="text-emerald-600">64%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "64%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-800">
                      <span>Advanced Math</span>
                      <span className="text-emerald-600">47%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "47%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-800">
                      <span>Problem-Solving & Data</span>
                      <span className="text-emerald-600">76%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "76%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Pacing Dials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <div className="h-12 w-12 rounded-full border-4 border-sky-400 flex items-center justify-center font-medium text-xs text-zinc-900">
                    2m 12s
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Reading & Writing</p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                      <span>🟢 46s</span>
                      <span>🟡 1m 14s</span>
                      <span>🔴 2m 52s</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <div className="h-12 w-12 rounded-full border-4 border-emerald-400 flex items-center justify-center font-medium text-xs text-zinc-900">
                    1m 58s
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Math</p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                      <span>🟢 55s</span>
                      <span>🟡 1m 35s</span>
                      <span>🔴 2m 01s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2 Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: See how you pace */}
              <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xl space-y-4">
                <h4 className="text-lg font-medium text-zinc-950">See how you pace</h4>
                <p className="text-xs text-zinc-500 font-medium">
                  Compare your pacing to thousands of other students on the platform to see where you stand.
                </p>

                {/* Range candles */}
                <div className="h-32 flex items-end justify-between gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                  {[
                    { range: "0:45", user: "0:30" },
                    { range: "0:35", user: "0:25" },
                    { range: "0:50", user: "0:40" },
                    { range: "1:00", user: "0:55" },
                    { range: "0:30", user: "0:20" },
                    { range: "0:40", user: "0:35" },
                    { range: "0:25", user: "0:15" },
                  ].map((p, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative">
                      <div className="w-1.5 bg-sky-200 rounded-full h-24 relative flex items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-[#0284c7] ring-2 ring-white shadow-xs absolute" style={{ bottom: `${(idx * 12) + 20}%` }} />
                      </div>
                      <span className="text-[9px] text-zinc-400 mt-2 font-mono">Q{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Track your daily activity Heatmap */}
              <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xl space-y-4">
                <h4 className="text-lg font-medium text-zinc-950">Track your daily activity</h4>
                <p className="text-xs text-zinc-500 font-medium">
                  See how daily practice adds up over time.
                </p>

                {/* Heatmap grid */}
                <div className="space-y-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <div className="flex justify-between text-[11px] font-bold text-zinc-500">
                    <span>Sep 2026</span>
                    <span>Oct 2026</span>
                  </div>
                  <div className="grid grid-cols-14 gap-1.5">
                    {Array.from({ length: 70 }).map((_, i) => {
                      const intensities = ["bg-zinc-200", "bg-sky-200", "bg-sky-400", "bg-sky-600"];
                      const color = intensities[i % intensities.length];
                      return (
                        <div
                          key={i}
                          className={`h-3 w-3 rounded-xs ${color} transition-all hover:scale-125`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-zinc-400">
                    <span>Less</span>
                    <div className="h-2.5 w-2.5 rounded-xs bg-zinc-200" />
                    <div className="h-2.5 w-2.5 rounded-xs bg-sky-200" />
                    <div className="h-2.5 w-2.5 rounded-xs bg-sky-400" />
                    <div className="h-2.5 w-2.5 rounded-xs bg-sky-600" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 10. 15+ OTHER FEATURES SECTION ---------------- */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950">
            15+ other features to help you study{" "}
            <span className="relative inline-block">
              effectively
              <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-medium mt-3">
            Explore the toolkit that makes OnePrep the top choice for Digital SAT students.
          </p>

          {/* Active Feature Spotlight */}
          <div className="mt-8 inline-block px-5 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-sm font-bold text-zinc-800">
            {featuresList[activeFeature].name}: {featuresList[activeFeature].desc}
          </div>

          {/* Feature Badges Carousel */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
            {featuresList.map((feat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFeature(idx)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  activeFeature === idx
                    ? `${feat.color} shadow-lg scale-105 ring-2 ring-black`
                    : "bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700 shadow-xs"
                }`}
              >
                <span className="text-3xl">{feat.icon}</span>
                <span className="text-xs font-bold">{feat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 11. ONEPREP USERS CRUSH THEIR EXAMS (9 Testimonials) ---------------- */}
      <section className="py-24 bg-[#FAFCFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950">
              OnePrep Users Crush Their Exams
            </h2>
            <p className="text-base sm:text-xl text-zinc-500 font-medium mt-3">
              Real students, real score jumps. See how OnePrep helped them walk into test day confident.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsList.map((t, idx) => (
              <article
                key={idx}
                className="rounded-3xl bg-white border border-zinc-200 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                {/* Score Pill */}
                <div className="flex items-center justify-between">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium"
                    style={{ backgroundColor: `${t.color}20`, color: t.color }}
                  >
                    <span>{t.fromScore}</span>
                    <span>→</span>
                    <span>{t.toScore}</span>
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: t.color }}
                  >
                    {t.diff}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-sm font-medium text-zinc-700 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                  <div className="h-10 w-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-zinc-700 text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-950">{t.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium">OnePrep User</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 12. FREQUENTLY ASKED QUESTIONS ---------------- */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-base text-zinc-950 hover:bg-zinc-50 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-black" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-sm text-zinc-600 font-medium leading-relaxed border-t border-zinc-100">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- 13. FINAL CTA BANNER ---------------- */}
      <section className="py-20 bg-[#0E4363] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight leading-tight">
            Join 450k+ students on the #1 DSAT Platform. Now with APs and ACTs.
          </h2>
          <p className="text-base sm:text-xl text-sky-100 max-w-2xl mx-auto">
            Take a free diagnostic test in 15 minutes and unlock your personalized study path today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/auth/signup"
              className="rounded-full bg-white hover:bg-zinc-100 text-black font-medium px-8 py-4 text-base shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-sky-900/60 hover:bg-sky-900 border border-sky-400/30 text-white font-bold px-7 py-4 text-base transition-all"
            >
              Sign in to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- 14. FOOTER ---------------- */}
      <footer className="bg-zinc-950 text-white py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-800">
            {/* Brand */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <CloudMascot size={32} />
                <span className="text-2xl font-medium text-white">OnePrep</span>
              </div>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                The all-in-one preparation platform for the Digital SAT, Enhanced ACT, AP exams, and College Admissions.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-zinc-100 text-black font-bold px-5 py-2.5 text-xs shadow-md transition-all"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Platform Dashboardi</span>
                </Link>
              </div>
            </div>

            {/* Exam Tracks */}
            <div>
              <p className="text-xs font-medium uppercase text-zinc-400 tracking-wider mb-3">Exams</p>
              <ul className="space-y-2 text-xs text-zinc-400 font-medium">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Digital SAT</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Enhanced ACT</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">AP Calculus AB/BC</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">AP Biology & Chemistry</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">AP US History</Link></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-medium uppercase text-zinc-400 tracking-wider mb-3">Features</p>
              <ul className="space-y-2 text-xs text-zinc-400 font-medium">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Question Bank</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Study Planner</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Masterclass</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Ask Preppy AI</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Score Analytics</Link></li>
              </ul>
            </div>

            {/* Company & Legal */}
            <div>
              <p className="text-xs font-medium uppercase text-zinc-400 tracking-wider mb-3">Company</p>
              <ul className="space-y-2 text-xs text-zinc-400 font-medium">
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">For Schools</Link></li>
                <li><Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-medium gap-4">
            <p>© 2026 OnePrep Inc. All rights reserved.</p>
            <p>SAT® is a registered trademark of the College Board, which was not involved in the production of, and does not endorse, this product.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
