"use client";

import { motion } from "framer-motion";
import { Clock, Target, Flame, CheckCircle, Sparkles } from "lucide-react";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. This week's plan */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        whileHover={{ y: -3 }}
        className="group relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/80 p-5 backdrop-blur-xl transition-all hover:border-black/20 dark:hover:border-white/25 overflow-hidden flex flex-col justify-between shadow-md"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-md transition-transform group-hover:scale-105">
            <Clock className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10">
            Hafta 1
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white">0%</p>
            <span className="text-xs font-semibold text-zinc-500">bajarildi</span>
          </div>
          <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200 mt-0.5">This week&apos;s plan</p>
          <p className="text-[11px] text-zinc-500 mt-1">0 / 155 min sarflandi</p>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-black dark:bg-white rounded-full w-0" />
          </div>
        </div>
      </motion.div>

      {/* 2. Predicted Score */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        whileHover={{ y: -3 }}
        className="group relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/80 p-5 backdrop-blur-xl transition-all hover:border-black/20 dark:hover:border-white/25 overflow-hidden flex flex-col justify-between shadow-md"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-md transition-transform group-hover:scale-105">
            <Target className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-900 dark:text-white bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full border border-black/10 dark:border-white/15">
            <Sparkles className="h-3 w-3" /> Prognoz
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <p className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white">~505</p>
            <span className="text-xs font-bold text-zinc-500">/ 1600</span>
          </div>
          <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200 mt-0.5">Predicted Score</p>
          <p className="text-[11px] text-zinc-500 mt-1">Target 1000 ball</p>
        </div>

        {/* Visual Score Target Bar */}
        <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-black dark:bg-white rounded-full" style={{ width: "50.5%" }} />
          </div>
        </div>
      </motion.div>

      {/* 3. Day Streak */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        whileHover={{ y: -3 }}
        className="group relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/80 p-5 backdrop-blur-xl transition-all hover:border-black/20 dark:hover:border-white/25 overflow-hidden flex flex-col justify-between shadow-md"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-md transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 fill-current" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10">
            Seriya
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <p className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white">0</p>
            <span className="text-xs font-semibold text-zinc-500">kun</span>
          </div>
          <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200 mt-0.5">Day Streak</p>
          <p className="text-[11px] text-zinc-500 mt-1">Longest streak: 0 kun</p>
        </div>

        {/* Visual Streak Steps */}
        <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div
              key={day}
              className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800"
              title={`Kun ${day}`}
            />
          ))}
        </div>
      </motion.div>

      {/* 4. Questions Today */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        whileHover={{ y: -3 }}
        className="group relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/80 p-5 backdrop-blur-xl transition-all hover:border-black/20 dark:hover:border-white/25 overflow-hidden flex flex-col justify-between shadow-md"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-md transition-transform group-hover:scale-105">
            <CheckCircle className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10">
            Bugun
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <p className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white">0</p>
            <span className="text-xs font-semibold text-zinc-500">savol</span>
          </div>
          <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200 mt-0.5">Questions Today</p>
          <p className="text-[11px] text-zinc-500 mt-1">Accuracy: 0% aniqlik</p>
        </div>

        {/* Visual Questions Bar */}
        <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-black dark:bg-white rounded-full w-0" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
