"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, BookOpen, Clock, ArrowRight, Star } from "lucide-react";

export default function FeaturedHeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 shadow-2xl"
    >
      {/* Decorative vector background meshes */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-0 h-48 w-48 rounded-full bg-zinc-500/10 blur-2xl" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Text & Action */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white border border-white/15 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Digital SAT 2026 Yangi Format
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Hard Math & Desmos Tricks Masterclass
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
            SAT Math bo&apos;limida eng ko&apos;p vaqt oladigan 8 xil murakkab savollarni Desmos kalkulyatorida 20 soniyada yechish usullari.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="group inline-flex items-center gap-2.5 rounded-2xl bg-white hover:bg-zinc-200 px-6 py-3.5 text-sm font-bold text-black transition-all shadow-md">
              <Play className="h-4 w-4 fill-black text-black" />
              Darsni ko&apos;rish (18 daq)
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="flex items-center text-amber-400">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400" />
              </span>
              <span>4.9 (1.4k o&apos;quvchi)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Interactive Video Card / Illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group cursor-pointer">
            {/* Visual Header / Thumbnail with abstract geometric art */}
            <div className="h-44 relative bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center overflow-hidden">
              {/* Abstract grid & circles */}
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute w-36 h-36 rounded-full border border-white/20 animate-pulse" />
              <div className="absolute w-24 h-24 rounded-full border border-white/10" />

              {/* Play Button Icon */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play className="h-6 w-6 fill-black translate-x-0.5" />
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-bold text-white flex items-center gap-1">
                <Clock className="h-3 w-3 text-zinc-400" />
                18:45
              </div>
            </div>

            {/* Thumbnail Details */}
            <div className="p-4 bg-zinc-950/90 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <BookOpen className="h-3.5 w-3.5" /> Module 4 · Desmos Mastery
                </span>
                <span className="text-white font-bold text-[10px] bg-white/10 px-2 py-0.5 rounded">HD 1080p</span>
              </div>
              <p className="text-sm font-bold text-white group-hover:text-zinc-300 transition-colors">
                Quadratic & Exponential System Shortcuts
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
