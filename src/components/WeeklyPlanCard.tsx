"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles, Calendar, BookMarked, GraduationCap } from "lucide-react";

export default function WeeklyPlanCard() {
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = 0; // 0%
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 p-8 sm:p-12 shadow-2xl transition-colors group"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-black/[0.02] dark:bg-white/[0.04] blur-3xl transition-opacity group-hover:opacity-100" />

      {/* Main 2-column Grid: Left Content + Right Circular Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Typography, descriptions and badges */}
        <div className="lg:col-span-7 space-y-4">
          {/* Eyebrow tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 px-3.5 py-1 text-xs font-bold text-zinc-900 dark:text-white border border-black/10 dark:border-white/20">
              <Sparkles className="h-3.5 w-3.5" />
              This week · Week 1
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300 border border-black/5 dark:border-white/10 font-medium">
              <Calendar className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              26 Okt – 1 Noyabr
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <GraduationCap className="h-3.5 w-3.5" /> SAT Prep
            </span>
          </div>

          {/* Big Prominent Title */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            This week&apos;s plan
          </h2>

          {/* Subtitle with larger text */}
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed">
            Pick up where you left off on this week&apos;s tasks.
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
            Your target is a stretch at this pace — see what would close the gap.
          </p>

          {/* Badges / Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="rounded-xl bg-black/[0.04] dark:bg-white/[0.08] px-4 py-2.5 border border-black/10 dark:border-white/15 flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white animate-pulse" />
              <span className="text-sm font-bold text-zinc-900 dark:text-white">0 / 155 min bajarildi</span>
            </div>
            <div className="rounded-xl bg-black/[0.02] dark:bg-white/[0.04] px-4 py-2.5 border border-black/5 dark:border-white/10 flex items-center gap-2.5">
              <BookMarked className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">0 weeks left</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn inline-flex items-center gap-3 rounded-2xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 px-7 py-4 text-base font-bold text-white dark:text-black transition-all shadow-lg"
            >
              View plan
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </motion.button>

            <button className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all border border-transparent hover:border-black/10 dark:hover:border-white/10">
              <Compass className="h-4 w-4" />
              Mavzular xaritasi
            </button>
          </div>
        </div>

        {/* Right column: Large Circular Progress Diagram */}
        <div className="lg:col-span-5 flex items-center justify-center py-2">
          <div className="relative w-60 h-60 sm:w-68 sm:h-68 flex items-center justify-center">
            <svg viewBox="0 0 220 220" className="w-full h-full -rotate-90">
              {/* Background circle track */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                className="text-zinc-200 dark:text-zinc-800/80"
                strokeWidth="14"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress stroke */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                className="text-black dark:text-white"
                stroke="currentColor"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Center Content - Big & Bold */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                0%
              </span>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.25em] mt-2">
                Progress
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.06] px-3 py-1 rounded-full border border-black/10 dark:border-white/10 mt-3">
                0 / 155 min
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
