"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Sparkles,
  User,
  Check,
  Clock,
  ChevronRight,
  Pencil,
  Tag,
  Zap,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

export default function SatHomePage() {
  const { isOpen } = useSidebar();

  // Target score from setup or default 1150
  const [targetScore, setTargetScore] = useState<string>("1150");

  // Countdown timer for 40% off banner (23h 46m 16s)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 46,
    seconds: 16,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGoal = localStorage.getItem("sat_goal_score");
      if (savedGoal) {
        setTargetScore(savedGoal);
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigits = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#f3f7fa] text-zinc-900 font-dm-sans flex selection:bg-[#38bdf8] selection:text-white">
      {/* ---------------- SIDEBAR ---------------- */}
      <Sidebar />

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div
        className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "ml-[236px]" : "ml-0"
        }`}
      >
        {/* ---------------- TOP YELLOW BANNER (Welcome offer 40% off) ---------------- */}
        <div className="w-full bg-[#fef3c7] border-b border-[#fde68a] px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#78350f]">
            <Tag className="w-4 h-4 fill-current text-[#b45309]" />
            <span>Welcome offer <span className="font-bold text-[#b45309]">40% off</span></span>
            <span className="font-mono text-xs font-bold text-[#92400e] ml-1 bg-white/70 px-2 py-0.5 rounded-md">
              {formatDigits(timeLeft.hours)}h {formatDigits(timeLeft.minutes)}m {formatDigits(timeLeft.seconds)}s
            </span>
          </div>

          <Link
            href="/onboarding"
            className="rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold text-xs px-4 py-1.5 shadow-xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <span>Get 40% off</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ---------------- MAIN DASHBOARD VIEW ---------------- */}
        <main className="flex-1 px-4 sm:px-8 py-5 max-w-5xl w-full mx-auto space-y-6">
          {/* Promo Card: All full-length tests & challenge questions */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#d9f2fd] via-[#e5f5fd] to-[#f4faff] border border-[#bae6fd] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-3 z-10">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-950 font-dm-sans">
                  All full-length tests &amp; challenge questions
                </span>
              </div>

              <Link
                href="/onboarding"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-zinc-950 font-bold text-xs shadow-xs transition-all"
              >
                <span>View plans</span>
                <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-md">40% Off</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-64 pointer-events-none opacity-85 hidden sm:block">
              <img
                src="/sat-top-hero.png"
                alt="SAT Promo Hero"
                className="w-full h-full object-cover object-right"
              />
            </div>
          </div>

          {/* Daily Questions Section + Score Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left 2 Columns: Daily Questions */}
            <div className="lg:col-span-2 space-y-3">
              {/* Daily Questions Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className="w-5 h-5 text-zinc-700" />
                  <h2 className="text-base sm:text-lg font-bold text-zinc-950 font-dm-sans">
                    Daily Questions
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#cffafe] text-[#0284c7] text-xs font-bold shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
                    3 orbs to claim today
                  </span>
                </div>

                <button
                  type="button"
                  className="text-xs font-semibold text-zinc-500 hover:text-black transition-colors cursor-pointer"
                >
                  View history
                </button>
              </div>

              {/* 2 Question Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Question 1: Math Hard */}
                <div className="p-4 rounded-2xl border border-zinc-200/90 bg-white hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between space-y-3 cursor-pointer group">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#e0f7fe] text-[#0284c7] font-bold text-[11px]">
                        Math
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#ffe4e6] text-[#e11d48] font-bold text-[11px]">
                        Hard
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#cffafe] text-[#0284c7] font-bold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                        +1 orb
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#0284c7] transition-colors leading-snug flex items-center justify-between">
                      <span>Inference from sample statist...</span>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium pt-1 border-t border-zinc-100">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      1,502
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      43%
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      1:12
                    </span>
                  </div>
                </div>

                {/* Question 2: R&W Medium */}
                <div className="p-4 rounded-2xl border border-zinc-200/90 bg-white hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between space-y-3 cursor-pointer group">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#f3e8ff] text-[#7e22ce] font-bold text-[11px]">
                        R&amp;W
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#fef3c7] text-[#d97706] font-bold text-[11px]">
                        Medium
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#cffafe] text-[#0284c7] font-bold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                        +1 orb
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#0284c7] transition-colors leading-snug flex items-center justify-between">
                      <span>Command of Evidence</span>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium pt-1 border-t border-zinc-100">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      1,168
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      38%
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      59s
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Score Widget */}
            <div className="p-4 rounded-2xl border border-zinc-200/90 bg-white shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-[#f4f4f5] hover:bg-zinc-200 text-xs font-semibold text-zinc-800 transition-colors cursor-pointer"
                  >
                    + Set score
                  </button>
                  <p className="text-[11px] text-zinc-400 font-medium mt-1">Current score</p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-extrabold text-zinc-950 font-dm-sans leading-none">
                    {targetScore}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium mt-1">
                    <span>Target score</span>
                    <Pencil className="w-3 h-3 text-zinc-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Study Plan Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-zinc-600" />
              <h2 className="text-base sm:text-lg font-bold text-zinc-950 font-dm-sans">
                My Study Plan
              </h2>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 bg-white p-8 text-center flex flex-col items-center justify-center space-y-4 shadow-xs">
              <div className="h-16 flex items-center justify-center">
                <img
                  src="/sat-study-mascots-clean.png"
                  alt="Preppy Study Plan Friends"
                  className="h-14 w-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-dm-sans">
                  Create a study plan
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium max-w-sm mx-auto">
                  Get a personalized study plan based on your test date and skill level.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/study-planner"
                  className="inline-block rounded-full bg-[#1cb0f6] hover:bg-[#0ea5e9] text-white px-7 py-3 text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Create my study plan
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
