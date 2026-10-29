"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
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
  const [selectedAnswer, setSelectedAnswer] = useState<string>("C");
  const [activeSubject, setActiveSubject] = useState<"rw" | "math">("rw");

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#38bdf8] selection:text-white">
      {/* ---------------- 1. NAVBAR ---------------- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <CloudMascot size={34} />
            <span className="text-2xl font-black tracking-tight text-zinc-950">
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
            <Link href="#pricing" className="hover:text-zinc-900 transition-colors">
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
              href="/dashboard"
              className="rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2.5 text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Sign up</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------- 2. HERO SECTION ---------------- */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Soft atmospheric gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#e0f7fa]/60 via-[#e8f6fd]/40 to-transparent blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 leading-[1.12]">
              Your{" "}
              <span className="relative inline-block">
                All–in–One
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full" />
              </span>{" "}
              Resource for SAT, ACT, AP, and College
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-medium leading-relaxed max-w-xl">
              Prepare for your exams with expert-written questions and realistic practice tests. Strengthen your college application with essay feedback and application reviews.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="rounded-full bg-black hover:bg-zinc-800 text-white px-8 py-4 text-base font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Get Started for Free</span>
              </Link>
              <button className="rounded-full bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 px-6 py-4 text-base font-bold shadow-xs transition-all">
                I&apos;m a parent
              </button>
              <button className="rounded-full bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 px-6 py-4 text-base font-bold shadow-xs transition-all">
                I&apos;m an educator
              </button>
            </div>

            {/* Direct Dashboard Shortcut */}
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Platformani ko&apos;rish uchun:</span>
              <Link href="/dashboard" className="text-[#0284c7] underline hover:text-[#0369a1]">
                Dashboardga o&apos;tish →
              </Link>
            </div>
          </div>

          {/* Right: Floating Digital SAT Mockup Card with Playful Cyan Brush */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Playful Cyan Brush Stroke behind the Card */}
            <div className="absolute -inset-4 w-[110%] h-[110%] -z-10 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 500 500" className="w-full h-full opacity-85">
                <path
                  d="M100 220 Q 250 80, 420 180 T 360 340 Q 200 460, 120 360 C 80 300, 70 240, 100 220 Z"
                  fill="#7dd3fc"
                  className="blur-xs"
                />
                {/* Hand drawn loop ribbon */}
                <path
                  d="M420 180 C 470 230, 400 360, 360 340 C 260 300, 120 400, 380 300"
                  stroke="#38bdf8"
                  strokeWidth="60"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.9"
                />
              </svg>
            </div>

            {/* The Floating Interactive SAT Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl"
            >
              {/* Header inside mockup */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  Digital SAT
                </span>
                <span className="text-xs text-zinc-400 font-semibold">
                  8 of 27 · Mark for Review
                </span>
              </div>

              {/* Score pill */}
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-3xl font-black text-zinc-950">1570</span>
                <span className="rounded-full bg-emerald-50 text-emerald-600 text-xs font-black px-2.5 py-0.5 border border-emerald-200">
                  +180 points
                </span>
              </div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                Predicted SAT Score
              </p>

              {/* Question */}
              <div className="mt-5 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-sm font-semibold text-zinc-800 leading-relaxed">
                A line in the <em>xy</em>-plane passes through (0, 4) and (2, 10). What is the slope of the line?
              </div>

              {/* Options */}
              <div className="mt-4 space-y-2.5">
                {[
                  { label: "A", val: "2" },
                  { label: "B", val: "4" },
                  { label: "C", val: "3", isCorrect: true },
                  { label: "D", val: "7" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedAnswer(opt.label)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-sm font-bold text-left transition-all ${
                      selectedAnswer === opt.label
                        ? "border-[#0284c7] bg-[#f0f9ff] text-[#0284c7] shadow-xs ring-1 ring-[#0284c7]"
                        : "border-zinc-200 hover:border-zinc-300 bg-white text-zinc-800"
                    }`}
                  >
                    <span
                      className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-black ${
                        selectedAnswer === opt.label ? "bg-[#0284c7] text-white" : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span>{opt.val}</span>
                  </button>
                ))}
              </div>

              {/* Check Answer Button */}
              <button className="w-full mt-5 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold py-3 text-sm transition-all shadow-sm">
                Check Answer
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. UNIVERSITIES TRUST BANNER (Screenshot 1) ---------------- */}
      <section className="bg-[#0E4363] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-10">
            OnePrep helps students get into top schools
          </h2>

          {/* Grid of Universities */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
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
                className="flex items-center justify-center text-white/80 hover:text-white transition-opacity font-serif font-black tracking-wider text-xs sm:text-sm text-center px-2 py-1"
              >
                {uni}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4. DIAGNOSE, PLAN, & PRACTICE SMARTER (Screenshot 3) ---------------- */}
      <section className="py-24 bg-[#FAFCFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950">
              Diagnose, plan, & practice{" "}
              <span className="relative inline-block">
                smarter
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full" />
              </span>
            </h2>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="rounded-3xl bg-white border border-zinc-200/80 p-7 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
              {/* Visual Card 1 */}
              <div className="rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] p-5 mb-8">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Predicted Score</p>
                <p className="text-4xl font-black text-zinc-900 mt-1">1420</p>
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-semibold mt-1 pb-3 border-b border-zinc-200">
                  <span>Reading & Writing: <strong>720</strong></span>
                  <span>•</span>
                  <span>Math: <strong>700</strong></span>
                </div>

                <div className="mt-3 space-y-2">
                  <p className="text-[10px] font-extrabold uppercase text-zinc-400">Focus next</p>
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
                <span className="text-3xl font-black text-zinc-300">01</span>
                <h3 className="text-xl font-bold text-zinc-900 mt-2">Take your diagnostic</h3>
                <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                  See your projected score and the domains losing you the most points.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="rounded-3xl bg-white border border-zinc-200/80 p-7 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
              {/* Visual Card 2 */}
              <div className="rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] p-5 mb-8 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Information and Ideas</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="rounded bg-rose-50 text-rose-600 font-bold text-[9px] px-1">R&W</span>
                      <span className="text-[10px] text-zinc-400">⏱ 30m</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer">Start &gt;</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Algebra</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="rounded bg-sky-50 text-sky-600 font-bold text-[9px] px-1">Math</span>
                      <span className="text-[10px] text-zinc-400">⏱ 25m</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer">Start &gt;</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Vocab</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">⏱ 15m</p>
                  </div>
                  <span className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer">Start &gt;</span>
                </div>
              </div>

              <div>
                <span className="text-3xl font-black text-zinc-300">02</span>
                <h3 className="text-xl font-bold text-zinc-900 mt-2">Get your tailored plan</h3>
                <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                  Tell us your test date and target. The schedule rebuilds itself as your accuracy changes.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="rounded-3xl bg-white border border-zinc-200/80 p-7 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
              {/* Visual Card 3 */}
              <div className="rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] p-5 mb-8 space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <p className="text-xs font-bold text-zinc-900">Question bank</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                    Work through questions at your own pace with full explanations.
                  </p>
                  <button className="mt-2 text-xs font-bold text-[#0284c7] hover:underline">
                    Continue
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <p className="text-xs font-bold text-zinc-900">Question Rush</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                    Race against the clock to practice your speed.
                  </p>
                  <button className="mt-2 text-xs font-bold text-[#0284c7] hover:underline">
                    Continue
                  </button>
                </div>
              </div>

              <div>
                <span className="text-3xl font-black text-zinc-300">03</span>
                <h3 className="text-xl font-bold text-zinc-900 mt-2">Hit your target score</h3>
                <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                  Targeted drills, questions, and exercises built around your weakest skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. QUESTION BANK WITH ASK PREPPY AI (Screenshot 5) ---------------- */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 text-purple-700 font-black text-xs px-3.5 py-1 mb-4 border border-purple-200">
              <span className="h-4 w-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">?</span>
              Question Bank
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
              Never stay stuck on a question
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-medium mt-3 leading-relaxed">
              4,000+ human-written Digital SAT questions, each with a step-by-step walkthrough and instant follow-up help when something doesn&apos;t click.
            </p>
            <div className="pt-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 text-white font-bold px-7 py-3.5 text-sm shadow-md transition-all"
              >
                <span>Get started for free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Practice Interface Mockup with Floating AI Tutor */}
          <div className="mt-12 rounded-3xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Subject selector tab inside */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setActiveSubject("rw")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeSubject === "rw"
                    ? "bg-black text-white"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:text-black"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Reading & Writing
              </button>
              <button
                onClick={() => setActiveSubject("math")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeSubject === "math"
                    ? "bg-black text-white"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:text-black"
                }`}
              >
                <Calculator className="h-3.5 w-3.5" />
                Math
              </button>
            </div>

            {/* Split Screen Practice View */}
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
                    <div className="p-3 rounded-xl border border-rose-300 bg-rose-50/70 text-xs text-rose-900 font-medium flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-[10px]">✕</span>
                      <span>By explaining that both singing and movement are important to Saturday Night Fever</span>
                    </div>
                    <div className="p-3 rounded-xl border border-zinc-200 bg-white text-xs text-zinc-800 font-medium">
                      By noting that bands other than the Bee Gees contributed songs to Saturday Night Fever
                    </div>
                    <div className="p-3 rounded-xl border border-zinc-200 bg-white text-xs text-zinc-800 font-medium">
                      By questioning the status of Saturday Night Fever as a classic film
                    </div>
                  </div>
                </div>

                {/* Floating "Ask Preppy" AI Chatbot Card */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="rounded-2xl border border-[#BAE6FD] bg-white p-4 shadow-xl space-y-3"
                >
                  <div className="flex items-center gap-2.5">
                    <CloudMascot size={28} />
                    <div>
                      <p className="text-xs font-black text-zinc-900">How can I help?</p>
                      <p className="text-[10px] text-zinc-400 font-medium">Ask Preppy any question!</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                    <input
                      type="text"
                      readOnly
                      value="Can you walk me through this and..."
                      className="text-xs text-zinc-700 bg-transparent flex-1 outline-hidden"
                    />
                    <button className="h-6 w-6 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                      <Send className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 6. TESTIMONIAL (Screenshot 4) ---------------- */}
      <section className="py-24 bg-gradient-to-b from-[#E3F5FC] via-[#EDF9FE] to-white relative overflow-hidden">
        {/* Soft Cloud Shapes Background */}
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950">
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
              <div className="h-12 w-12 rounded-full bg-cyan-200 ring-2 ring-white shadow-md flex items-center justify-center font-bold text-cyan-900 text-lg">
                👨‍🎓
              </div>
              <div className="text-center">
                <p className="font-extrabold text-zinc-900 text-base">Abid</p>
                <p className="text-xs text-zinc-500 font-medium">Dream school: Stanford University</p>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="h-2 w-2 rounded-full bg-[#0284c7]" />
              <span className="h-2 w-6 rounded-full bg-[#0284c7]" />
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 7. FOOTER & CTA TO DASHBOARD ---------------- */}
      <footer className="bg-zinc-950 text-white py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <CloudMascot size={32} />
            <div>
              <p className="text-lg font-black text-white">OnePrep</p>
              <p className="text-xs text-zinc-400">Digital SAT & MS Study Platform</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-semibold">
            <Link href="/dashboard" className="text-white hover:text-[#38bdf8] transition-colors">
              Platforma Dashboardi
            </Link>
            <Link href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-zinc-100 text-black font-bold px-6 py-3 text-xs shadow-md transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboardga kirish</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
