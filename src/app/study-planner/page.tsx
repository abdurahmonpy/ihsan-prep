"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronRight,
  Video,
  Plus,
  Check,
  Calendar as CalendarIcon,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

function GoogleCalendarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="18" rx="4" fill="#ffffff" stroke="#4285F4" strokeWidth="2" />
      <path d="M2 8.5H22" stroke="#4285F4" strokeWidth="1.5" />
      <path d="M7 2V6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 2V6" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="8"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        31
      </text>
    </svg>
  );
}

export default function StudyPlannerPage() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  // Current onboarding tutorial step (0 to 4):
  // 0: Welcome to your new Study Planner
  // 1: A home for all your SAT tasks, tests and deadlines (Image 1)
  // 2: Schedule study blocks and make time to focus (Image 2 - with cursor animation)
  // 3: Sync your calendar and study with friends (Image 3)
  // 4: When can you usually study? (Image 4 - drag painter)
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Completed task IDs in step 1 list
  const [completedListTasks, setCompletedListTasks] = useState<Record<string, boolean>>({});

  // Cursor animation trigger for Step 2
  const [cursorAnimKey, setCursorAnimKey] = useState<number>(0);
  const [step2MathPlaced, setStep2MathPlaced] = useState<boolean>(false);
  const [step2RwPlaced, setStep2RwPlaced] = useState<boolean>(false);

  // Time-painter state for Step 4
  const [studyDays, setStudyDays] = useState<Record<string, { start: number; end: number } | null>>({
    Mon: { start: 16, end: 19 },
    Tue: { start: 16, end: 19 },
    Wed: { start: 16, end: 19 },
    Thu: { start: 16, end: 19 },
    Fri: { start: 16, end: 19 },
    Sat: null,
    Sun: null,
  });

  // Reset / trigger cursor sequence on step 2
  useEffect(() => {
    if (currentStep === 2) {
      setStep2MathPlaced(false);
      setStep2RwPlaced(false);
      const timer1 = setTimeout(() => {
        setStep2MathPlaced(true);
      }, 1600);
      const timer2 = setTimeout(() => {
        setStep2RwPlaced(true);
      }, 2900);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [currentStep, cursorAnimKey]);

  // Calculate total hours per week in Step 4
  const totalWeeklyHours = Object.values(studyDays).reduce((acc, curr) => {
    if (!curr) return acc;
    return acc + (curr.end - curr.start);
  }, 0);

  const toggleDayPainted = (day: string) => {
    setStudyDays((prev) => {
      const existing = prev[day];
      if (existing) {
        return { ...prev, [day]: null };
      } else {
        return { ...prev, [day]: { start: 16, end: 19 } };
      }
    });
  };

  const handleClearPainter = () => {
    setStudyDays({
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
      Sat: null,
      Sun: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#dbeefd] flex flex-col font-dm-sans text-zinc-900 select-none overflow-x-hidden">
      {/* Background illustration */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[url('/study-planner-bg.png')] bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundAttachment: "fixed" }}
      />

      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-[236px] relative z-10">
        {/* Mobile Header */}
        <header className="flex md:hidden items-center justify-between px-4 py-3 bg-[#0e4369] text-white shadow-md">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <span className="font-bold text-base text-white">OnePrep</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-[#d2e4ee]">
            Study Planner
          </span>
        </header>

        {/* Content Container */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-5 sm:py-7 flex flex-col items-center justify-start">
          {/* Top Carousel Dots */}
          <div className="flex items-center justify-center gap-1.5 py-1.5">
            {[0, 1, 2, 3, 4].map((stepIdx) => (
              <button
                key={stepIdx}
                type="button"
                onClick={() => setCurrentStep(stepIdx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentStep === stepIdx
                    ? "w-6 h-1.5 bg-[#0284c7]"
                    : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to step ${stepIdx + 1}`}
              />
            ))}
          </div>

          {/* ========================================================================= */}
          {/* STEP 0: WELCOME TO YOUR NEW STUDY PLANNER (Initial Screen)                */}
          {/* ========================================================================= */}
          {currentStep === 0 && (
            <motion.div
              key="step-0-welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl flex flex-col items-center"
            >
              <div className="text-center space-y-3 pt-1">
                <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  Welcome to your new Study Planner
                </h1>

                <div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Central Calendar Card */}
              <div className="w-full mt-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-zinc-200/90 overflow-hidden relative">
                {/* Header Row */}
                <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-white">
                  <div className="py-2.5 px-3 flex items-center justify-start border-r border-zinc-200">
                    <span className="text-[11px] font-semibold text-zinc-400">GMT+0</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Mon</span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ef4444] text-white text-[11px] font-bold">
                      5
                    </span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Tue</span>
                    <span className="text-xs font-bold text-zinc-800">6</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Wed</span>
                    <span className="text-xs font-bold text-zinc-800">7</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 relative">
                    <span className="text-xs font-semibold text-zinc-600">Thu</span>
                    <span className="text-xs font-bold text-zinc-800">8</span>
                    <span className="absolute right-2 top-2.5 text-[8px] text-zinc-300">▲</span>
                  </div>
                </div>

                {/* All day Row */}
                <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-[#fafafa]">
                  <div className="py-2 px-3 border-r border-zinc-200">
                    <span className="text-[11px] font-medium text-zinc-400">All day</span>
                  </div>
                  <div className="py-1.5 px-2 border-r border-zinc-200">
                    <div className="bg-[#e5e7eb] text-zinc-700 text-[11px] font-semibold px-2 py-1 rounded-md truncate">
                      Math practice test
                    </div>
                  </div>
                  <div className="py-1.5 px-2 border-r border-zinc-200" />
                  <div className="py-1.5 px-2 border-r border-zinc-200">
                    <div className="bg-[#e5e7eb] text-zinc-700 text-[11px] font-semibold px-2 py-1 rounded-md truncate">
                      SAT registration deadline
                    </div>
                  </div>
                  <div className="py-1.5 px-2" />
                </div>

                {/* Time Slots with Tasks */}
                <div className="relative min-h-[380px] bg-white">
                  {["4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"].map((time, idx) => (
                    <div
                      key={time}
                      style={{ top: `${idx * 64}px` }}
                      className="absolute left-0 right-0 grid grid-cols-[68px_repeat(4,1fr)] h-16 border-b border-zinc-100"
                    >
                      <div className="pr-3 flex items-start justify-end pt-1 border-r border-zinc-100">
                        <span className="text-[11px] font-medium text-zinc-400">{time}</span>
                      </div>
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div />
                    </div>
                  ))}

                  {/* Tasks Grid */}
                  <div className="absolute inset-0 grid grid-cols-[68px_repeat(4,1fr)] pointer-events-none">
                    <div />
                    {/* Mon 5 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Linear equations lesson</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                      <div className="absolute left-1.5 right-1.5 top-[72px] h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Linear equations practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">5:10 PM to 6:10 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                    </div>

                    {/* Tue 6 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Advanced Math practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                      <div className="absolute left-1.5 right-1.5 top-[92px] h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Vocabulary practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">5:30 PM to 6:30 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                    </div>

                    {/* Wed 7 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Grammar practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                      <div className="absolute left-1.5 right-1.5 top-[138px] h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Reading and Writing review</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">6:15 PM to 7:15 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                    </div>

                    {/* Thu 8 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Reading and Writing review</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                    </div>
                  </div>

                  {/* Scrollbar Thumb */}
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-full bg-zinc-300 pointer-events-none" />
                </div>

                {/* Floating Mascot */}
                <div className="absolute -bottom-5 -right-5 z-20 pointer-events-none drop-shadow-2xl">
                  <motion.img
                    src="/study-planner-mascot-clean.png"
                    alt="Preppy"
                    className="w-32 sm:w-40 md:w-44 h-auto object-contain"
                    animate={{ y: [0, -5, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 1: A HOME FOR ALL YOUR SAT TASKS, TESTS AND DEADLINES (Image 1)       */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <motion.div
              key="step-1-home-tasks"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl flex flex-col items-center"
            >
              <div className="text-center space-y-3 pt-1">
                <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  A home for all your SAT tasks, tests and deadlines
                </h1>

                <div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Central List Card (Matching Image 1) */}
              <div className="w-full mt-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-zinc-200/90 p-6 sm:p-8 relative">
                {/* Scrollbar Thumb on right side */}
                <div className="absolute right-2 top-8 w-1.5 h-20 rounded-full bg-zinc-400 pointer-events-none" />

                <div className="space-y-6 max-w-3xl pr-4">
                  {/* SECTION 1: TODAY */}
                  <div className="space-y-3">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#ef4444] tracking-tight">Today</span>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                        <span>2 to do · 2h</span>
                        <button type="button" className="hover:text-zinc-700 transition-colors cursor-pointer">
                          + Add
                        </button>
                      </div>
                    </div>

                    {/* Task: Math practice test */}
                    <div className="pl-3 border-l-4 border-zinc-900 flex items-center justify-between py-1">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">Math practice test</h3>
                        <p className="text-[11px] text-zinc-400 font-medium">All day</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCompletedListTasks((p) => ({ ...p, mathPractice: !p.mathPractice }))
                        }
                        className={`text-xs font-semibold transition-colors cursor-pointer ${
                          completedListTasks.mathPractice ? "text-emerald-600 font-bold" : "text-zinc-600 hover:text-black"
                        }`}
                      >
                        {completedListTasks.mathPractice ? "Done ✓" : "Mark done"}
                      </button>
                    </div>

                    {/* Section: Your SAT plan */}
                    <div className="pl-3 border-l-4 border-[#0284c7] space-y-3 pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900">Your SAT plan</h4>
                          <p className="text-[11px] text-zinc-400 font-medium">2 tasks · 2h</p>
                        </div>
                        <button type="button" className="text-xs text-zinc-500 hover:text-black font-medium transition-colors cursor-pointer">
                          Hide tasks &gt;
                        </button>
                      </div>

                      {/* Sub-item 1: Linear equations lesson */}
                      <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setCompletedListTasks((p) => ({ ...p, lesson1: !p.lesson1 }))
                            }
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                              completedListTasks.lesson1
                                ? "bg-[#0284c7] border-[#0284c7] text-white"
                                : "border-zinc-300 hover:border-zinc-400"
                            }`}
                          >
                            {completedListTasks.lesson1 && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                                Linear equations lesson
                              </span>
                              <span className="w-4 h-3.5 rounded bg-[#9333ea] text-white flex items-center justify-center text-[9px] shadow-2xs">
                                📹
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-[#dcf3fe] text-[#0284c7] font-bold text-[10px]">
                                Math
                              </span>
                              <span className="text-[11px] text-zinc-400 font-medium">
                                Lesson video · 60 min
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="px-4 py-1 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-xs font-semibold text-zinc-800 transition-all cursor-pointer"
                        >
                          Start &gt;
                        </button>
                      </div>

                      {/* Sub-item 2: Linear equations practice (Math) */}
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setCompletedListTasks((p) => ({ ...p, practice1: !p.practice1 }))
                            }
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                              completedListTasks.practice1
                                ? "bg-[#0284c7] border-[#0284c7] text-white"
                                : "border-zinc-300 hover:border-zinc-400"
                            }`}
                          >
                            {completedListTasks.practice1 && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>

                          <div className="space-y-0.5">
                            <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                              Linear equations practice (Math)
                            </span>

                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-[#dcf3fe] text-[#0284c7] font-bold text-[10px]">
                                Math
                              </span>
                              <span className="text-[11px] text-zinc-400 font-medium">
                                60 min · 10 questions
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="px-4 py-1 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-xs font-semibold text-zinc-800 transition-all cursor-pointer"
                        >
                          Start &gt;
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: TUE, OCT 6 */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-zinc-900 tracking-tight">Tue, Oct 6</span>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                        <span>2 to do · 2h</span>
                        <button type="button" className="hover:text-zinc-700 transition-colors cursor-pointer">
                          + Add
                        </button>
                      </div>
                    </div>

                    <div className="pl-3 border-l-4 border-[#0284c7] flex items-center justify-between py-1">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900">Your SAT plan</h4>
                        <p className="text-[11px] text-zinc-400 font-medium">2 tasks · 2h</p>
                      </div>
                      <button type="button" className="text-xs text-zinc-500 hover:text-black font-medium transition-colors cursor-pointer">
                        Hide tasks &gt;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Mascot */}
                <div className="absolute -bottom-5 -right-5 z-20 pointer-events-none drop-shadow-2xl">
                  <motion.img
                    src="/study-planner-mascot-clean.png"
                    alt="Preppy"
                    className="w-32 sm:w-40 md:w-44 h-auto object-contain"
                    animate={{ y: [0, -5, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: SCHEDULE STUDY BLOCKS AND MAKE TIME TO FOCUS (Image 2 + Cursor)   */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <motion.div
              key="step-2-schedule-blocks"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl flex flex-col items-center"
            >
              <div className="text-center space-y-3 pt-1">
                <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  Schedule study blocks and make time to focus
                </h1>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCursorAnimKey((k) => k + 1)}
                    title="Replay cursor animation"
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-black border border-zinc-200 transition-all cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Central Calendar Card with Simulated Cursor Animation */}
              <div className="w-full mt-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-zinc-200/90 overflow-hidden relative">
                {/* Header Row */}
                <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-white">
                  <div className="py-2.5 px-3 flex items-center justify-start border-r border-zinc-200">
                    <span className="text-[11px] font-semibold text-zinc-400">GMT+0</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Mon</span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ef4444] text-white text-[11px] font-bold">
                      5
                    </span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Tue</span>
                    <span className="text-xs font-bold text-zinc-800">6</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Wed</span>
                    <span className="text-xs font-bold text-zinc-800">7</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 relative">
                    <span className="text-xs font-semibold text-zinc-600">Thu</span>
                    <span className="text-xs font-bold text-zinc-800">8</span>
                    <span className="absolute right-2 top-2.5 text-[8px] text-zinc-300">▲</span>
                  </div>
                </div>

                {/* All day Row */}
                <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-[#fafafa]">
                  <div className="py-2 px-3 border-r border-zinc-200">
                    <span className="text-[11px] font-medium text-zinc-400">All day</span>
                  </div>
                  <div className="py-1.5 px-2 border-r border-zinc-200">
                    <div className="bg-[#e5e7eb] text-zinc-700 text-[11px] font-semibold px-2 py-1 rounded-md truncate">
                      Math practice test
                    </div>
                  </div>
                  <div className="py-1.5 px-2 border-r border-zinc-200" />
                  <div className="py-1.5 px-2 border-r border-zinc-200">
                    <div className="bg-[#e5e7eb] text-zinc-700 text-[11px] font-semibold px-2 py-1 rounded-md truncate">
                      SAT registration deadline
                    </div>
                  </div>
                  <div className="py-1.5 px-2" />
                </div>

                {/* Grid */}
                <div className="relative min-h-[380px] bg-white">
                  {["4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"].map((time, idx) => (
                    <div
                      key={time}
                      style={{ top: `${idx * 64}px` }}
                      className="absolute left-0 right-0 grid grid-cols-[68px_repeat(4,1fr)] h-16 border-b border-zinc-100"
                    >
                      <div className="pr-3 flex items-start justify-end pt-1 border-r border-zinc-100">
                        <span className="text-[11px] font-medium text-zinc-400">{time}</span>
                      </div>
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div />
                    </div>
                  ))}

                  {/* Tasks */}
                  <div className="absolute inset-0 grid grid-cols-[68px_repeat(4,1fr)] pointer-events-none">
                    <div />
                    {/* Mon 5 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Linear equations lesson</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                      <div className="absolute left-1.5 right-1.5 top-[72px] h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Linear equations practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">5:10 PM to 6:10 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                    </div>

                    {/* Tue 6 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Advanced Math practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                      <div className="absolute left-1.5 right-1.5 top-[92px] h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Vocabulary practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">5:30 PM to 6:30 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                    </div>

                    {/* Wed 7 (Math Practice dynamically placed by cursor!) */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <AnimatePresence>
                        {step2MathPlaced && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="absolute left-1.5 right-1.5 top-[68px] h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-md ring-2 ring-[#0284c7]/40"
                          >
                            <h4 className="text-[11px] font-bold text-zinc-900 truncate">Math practice</h4>
                            <p className="text-[10px] text-zinc-500 font-medium">5:00 PM to 6:00 PM</p>
                            <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Thu 8 (Reading and Writing review placed by cursor!) */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <AnimatePresence>
                        {step2RwPlaced && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-md ring-2 ring-[#c084fc]/40"
                          >
                            <h4 className="text-[11px] font-bold text-zinc-900 truncate">Reading and Writing review</h4>
                            <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                            <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Simulated Cursor Flying in & Placing Study Blocks */}
                  <motion.div
                    key={`cursor-anim-${cursorAnimKey}`}
                    initial={{ x: 120, y: 220, opacity: 0 }}
                    animate={{
                      x: [120, 520, 520, 720, 720, 480],
                      y: [220, 110, 110, 50, 50, 320],
                      scale: [1, 1, 0.85, 1, 0.85, 1],
                      opacity: [0, 1, 1, 1, 1, 0],
                    }}
                    transition={{
                      duration: 4.2,
                      times: [0, 0.35, 0.42, 0.65, 0.72, 1],
                      ease: "easeInOut",
                    }}
                    className="absolute pointer-events-none z-30 drop-shadow-lg"
                  >
                    <img
                      src="/cursor-mac.png"
                      alt="Pointer Cursor"
                      className="w-6 h-6 object-contain"
                    />
                  </motion.div>

                  {/* Scrollbar Thumb */}
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-full bg-zinc-300 pointer-events-none" />
                </div>

                {/* Floating Mascot */}
                <div className="absolute -bottom-5 -right-5 z-20 pointer-events-none drop-shadow-2xl">
                  <motion.img
                    src="/study-planner-mascot-clean.png"
                    alt="Preppy"
                    className="w-32 sm:w-40 md:w-44 h-auto object-contain"
                    animate={{ y: [0, -5, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: SYNC YOUR CALENDAR AND STUDY WITH FRIENDS (Image 3)                */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <motion.div
              key="step-3-sync-calendar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl flex flex-col items-center"
            >
              <div className="text-center space-y-2.5 pt-1">
                <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  Sync your calendar and study with friends
                </h1>

                {/* Buttons: Connect Google Calendar & Skip */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <GoogleCalendarIcon className="w-4 h-4" />
                    <span>Connect Google Calendar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-4 py-2 rounded-full bg-[#f4f4f5] hover:bg-zinc-200 text-zinc-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    Skip
                  </button>
                </div>

                <p className="text-xs text-zinc-400 font-medium">
                  Optional. You can connect your calendar anytime in Settings.
                </p>
              </div>

              {/* Central Calendar Card with External Events (Football, Study group, Piano, Focus time) */}
              <div className="w-full mt-5 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-zinc-200/90 overflow-hidden relative">
                {/* Header Row */}
                <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-white">
                  <div className="py-2.5 px-3 flex items-center justify-start border-r border-zinc-200">
                    <span className="text-[11px] font-semibold text-zinc-400">GMT+0</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Mon</span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ef4444] text-white text-[11px] font-bold">
                      5
                    </span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Tue</span>
                    <span className="text-xs font-bold text-zinc-800">6</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-600">Wed</span>
                    <span className="text-xs font-bold text-zinc-800">7</span>
                  </div>
                  <div className="py-2 px-2 flex items-center justify-center gap-1.5 relative">
                    <span className="text-xs font-semibold text-zinc-600">Thu</span>
                    <span className="text-xs font-bold text-zinc-800">8</span>
                    <span className="absolute right-2 top-2.5 text-[8px] text-zinc-300">▲</span>
                  </div>
                </div>

                {/* All day Row */}
                <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-[#fafafa]">
                  <div className="py-2 px-3 border-r border-zinc-200">
                    <span className="text-[11px] font-medium text-zinc-400">All day</span>
                  </div>
                  <div className="py-1.5 px-2 border-r border-zinc-200">
                    <div className="bg-[#e5e7eb] text-zinc-700 text-[11px] font-semibold px-2 py-1 rounded-md truncate">
                      Math practice test
                    </div>
                  </div>
                  <div className="py-1.5 px-2 border-r border-zinc-200" />
                  <div className="py-1.5 px-2 border-r border-zinc-200">
                    <div className="bg-[#e5e7eb] text-zinc-700 text-[11px] font-semibold px-2 py-1 rounded-md truncate">
                      SAT registration deadline
                    </div>
                  </div>
                  <div className="py-1.5 px-2" />
                </div>

                {/* Grid with Striped Synced External Events */}
                <div className="relative min-h-[380px] bg-white">
                  {["4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"].map((time, idx) => (
                    <div
                      key={time}
                      style={{ top: `${idx * 64}px` }}
                      className="absolute left-0 right-0 grid grid-cols-[68px_repeat(4,1fr)] h-16 border-b border-zinc-100"
                    >
                      <div className="pr-3 flex items-start justify-end pt-1 border-r border-zinc-100">
                        <span className="text-[11px] font-medium text-zinc-400">{time}</span>
                      </div>
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div />
                    </div>
                  ))}

                  {/* Tasks and External Events */}
                  <div className="absolute inset-0 grid grid-cols-[68px_repeat(4,1fr)] pointer-events-none">
                    <div />

                    {/* Mon 5 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Linear equations lesson</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                      <div className="absolute left-1.5 right-1.5 top-[68px] h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Linear equations practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">5:10 PM to 6:10 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                      {/* External: Football training */}
                      <div
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #f4f4f5, #f4f4f5 6px, #ffffff 6px, #ffffff 12px)",
                        }}
                        className="absolute left-1.5 right-1.5 top-[148px] h-14 rounded-md p-1.5 border border-zinc-200/90 flex flex-col justify-between shadow-2xs"
                      >
                        <div>
                          <h4 className="text-[11px] font-semibold text-zinc-800 truncate">Football training</h4>
                          <p className="text-[10px] text-zinc-500 font-medium">6:30 PM to 7:30 PM</p>
                        </div>
                        <div className="flex justify-end">
                          <GoogleCalendarIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Tue 6 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Advanced Math practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                      </div>
                      <div className="absolute left-1.5 right-1.5 top-[86px] h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Vocabulary practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">5:30 PM to 6:30 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                    </div>

                    {/* Wed 7 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Grammar practice</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                      {/* External: SAT study group */}
                      <div
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #f4f4f5, #f4f4f5 6px, #ffffff 6px, #ffffff 12px)",
                        }}
                        className="absolute left-1.5 right-1.5 top-[68px] h-14 rounded-md p-1.5 border border-zinc-200/90 flex flex-col justify-between shadow-2xs"
                      >
                        <div>
                          <h4 className="text-[11px] font-semibold text-zinc-800 truncate">SAT study group</h4>
                          <p className="text-[10px] text-zinc-500 font-medium">5:10 PM to 6:00 PM</p>
                        </div>
                        <div className="flex justify-end">
                          <GoogleCalendarIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="absolute left-1.5 right-1.5 top-[138px] h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Reading and Writing review</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">6:15 PM to 7:15 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                    </div>

                    {/* Thu 8 */}
                    <div className="relative h-full pointer-events-auto px-1.5">
                      <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                        <h4 className="text-[11px] font-bold text-zinc-900 truncate">Reading and Writing review</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                        <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                      </div>
                      {/* External: Piano lesson */}
                      <div
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #f4f4f5, #f4f4f5 6px, #ffffff 6px, #ffffff 12px)",
                        }}
                        className="absolute left-1.5 right-1.5 top-[86px] h-14 rounded-md p-1.5 border border-zinc-200/90 flex flex-col justify-between shadow-2xs"
                      >
                        <div>
                          <h4 className="text-[11px] font-semibold text-zinc-800 truncate">Piano lesson</h4>
                          <p className="text-[10px] text-zinc-500 font-medium">5:30 PM to 6:30 PM</p>
                        </div>
                        <div className="flex justify-end">
                          <GoogleCalendarIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      {/* External: Focus time: weekly review */}
                      <div
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #f4f4f5, #f4f4f5 6px, #ffffff 6px, #ffffff 12px)",
                        }}
                        className="absolute left-1.5 right-1.5 top-[158px] h-14 rounded-md p-1.5 border border-zinc-200/90 flex flex-col justify-between shadow-2xs"
                      >
                        <div>
                          <h4 className="text-[11px] font-semibold text-zinc-800 truncate">Focus time: weekly review</h4>
                          <p className="text-[10px] text-zinc-500 font-medium">6:45 PM to 7:30 PM</p>
                        </div>
                        <div className="flex justify-end">
                          <GoogleCalendarIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollbar Thumb */}
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-full bg-zinc-300 pointer-events-none" />
                </div>

                {/* Floating Mascot */}
                <div className="absolute -bottom-5 -right-5 z-20 pointer-events-none drop-shadow-2xl">
                  <motion.img
                    src="/study-planner-mascot-clean.png"
                    alt="Preppy"
                    className="w-32 sm:w-40 md:w-44 h-auto object-contain"
                    animate={{ y: [0, -5, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: WHEN CAN YOU USUALLY STUDY? (Image 4 - Time Painter Grid)          */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <motion.div
              key="step-4-paint-study-hours"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl flex flex-col items-center"
            >
              <div className="text-center space-y-2 pt-1 max-w-xl mx-auto">
                <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  When can you usually study?
                </h1>

                <p className="text-xs sm:text-[13px] text-zinc-500 font-medium leading-relaxed">
                  Drag to paint when you usually study. These shared hours can be changed anytime.
                  <br />
                  Each SAT plan can also use its own Math and Reading and Writing times.
                </p>

                {/* Action Buttons: Skip & Open my planner */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/home")}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-black transition-colors cursor-pointer"
                  >
                    Skip
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/home")}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Open my planner</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Central Time Painter Grid Card (Matching Image 4) */}
              <div className="w-full mt-5 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-zinc-200/90 overflow-hidden relative">
                {/* Header of Painter Card: Study time badge + Weekly Hours + Clear */}
                <div className="px-6 py-3.5 flex items-center justify-between border-b border-zinc-100 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-[#cffafe] border border-[#38bdf8]" />
                    <span className="text-xs font-semibold text-zinc-700">Study time</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-zinc-800">{totalWeeklyHours}h per week</span>
                    <button
                      type="button"
                      onClick={handleClearPainter}
                      className="text-xs font-medium text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Weekday Column Headers */}
                <div className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-zinc-100 bg-[#fafafa]">
                  <div className="border-r border-zinc-100" />
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                    const hasHours = studyDays[day] !== null;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDayPainted(day)}
                        className="py-2 px-1 text-center border-r border-zinc-100 last:border-r-0 hover:bg-zinc-100/70 transition-colors cursor-pointer"
                      >
                        <span className="block text-xs font-bold text-zinc-700">{day}</span>
                        {hasHours && (
                          <span className="block text-[11px] font-semibold text-[#0284c7]">
                            {studyDays[day]!.end - studyDays[day]!.start}h
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Hour Rows Grid (14:00 to 20:00) */}
                <div className="relative min-h-[360px] bg-white">
                  {[
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                    "18:00",
                    "19:00",
                    "20:00",
                  ].map((hour, idx) => (
                    <div
                      key={hour}
                      style={{ top: `${idx * 48}px` }}
                      className="absolute left-0 right-0 grid grid-cols-[64px_repeat(7,1fr)] h-12 border-b border-zinc-100"
                    >
                      <div className="pr-3 flex items-start justify-end pt-1 border-r border-zinc-100 select-none">
                        <span className="text-[10px] font-medium text-zinc-400">{hour}</span>
                      </div>
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div className="border-r border-zinc-100" />
                      <div />
                    </div>
                  ))}

                  {/* Painted Blocks Layer */}
                  <div className="absolute inset-0 grid grid-cols-[64px_repeat(7,1fr)] pointer-events-none">
                    <div />
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                      const block = studyDays[day];
                      return (
                        <div key={day} className="relative h-full pointer-events-auto px-1">
                          {block && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              style={{
                                top: `${(block.start - 14) * 48 + 2}px`,
                                height: `${(block.end - block.start) * 48 - 4}px`,
                              }}
                              onClick={() => toggleDayPainted(day)}
                              className="absolute left-1 right-1 rounded-xl bg-[#cffafe]/75 hover:bg-[#cffafe] border border-[#38bdf8]/60 p-2 flex flex-col justify-between shadow-2xs transition-colors cursor-pointer select-none"
                            >
                              <div className="space-y-0.5">
                                <span className="block text-xs font-bold text-[#0284c7]">
                                  {block.end - block.start}h
                                </span>
                                <span className="block text-[10px] font-medium text-[#0284c7]/80">
                                  {block.start}:00 - {block.end}:00
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Scrollbar Thumb */}
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-20 rounded-full bg-zinc-400 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
