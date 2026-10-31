"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronRight,
  Video,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  BookOpen,
  Award,
  Target,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

// Google Calendar SVG Icon
function GoogleCalendarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="18" rx="4" fill="#ffffff" stroke="#4285F4" strokeWidth="1.5" />
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

// Calculator watermark for "Start from scratch" card
function CalculatorWatermark({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="4" stroke="currentColor" />
      <rect x="7" y="5" width="10" height="3" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" />
      <circle cx="8" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="16" cy="12" r="1.2" fill="currentColor" />
      <circle cx="8" cy="16" r="1.2" fill="currentColor" />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" />
      <circle cx="16" cy="16" r="1.2" fill="currentColor" />
    </svg>
  );
}

// Document / score report watermark for "Upload your SAT score report" card
function DocumentWatermark({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" />
      <polyline points="14 2 14 8 20 8" stroke="currentColor" />
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" />
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" />
      <circle cx="14" cy="17" r="2.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" />
    </svg>
  );
}

export default function StudyPlannerPage() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  // Mode: "game-plan" (Matching latest image media_1793415985013_7f009eca.png)
  // or "tutorial" (5-step walkthrough from previous images)
  const [viewMode, setViewMode] = useState<"game-plan" | "tutorial">("game-plan");

  // =========================================================================
  // ANIMATION STATE FOR "Create a game plan for your exams" PAGE
  // =========================================================================
  const [leftScore, setLeftScore] = useState<number>(1000);
  const [rightScore, setRightScore] = useState<number>(1000);
  const [hasSettledScore, setHasSettledScore] = useState<boolean>(false);
  const [animIteration, setAnimIteration] = useState<number>(0);

  // 6-second looping state for the 3 colorful cards
  // blockStage progresses from 0 (cards empty) to 8 (all colorful blocks placed)
  const [blockStage, setBlockStage] = useState<number>(0);

  // Counter animation: counts upwards from 1000 to 1350 and 1550
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1400; // ms

    const animateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentLeft = Math.round(1000 + (1350 - 1000) * eased);
      const currentRight = Math.round(1000 + (1550 - 1000) * eased);

      setLeftScore(currentLeft);
      setRightScore(currentRight);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        setLeftScore(1350);
        setRightScore(1550);
        // After settling, shrink down and move to the top
        setTimeout(() => {
          setHasSettledScore(true);
        }, 200);
      }
    };

    const animFrame = requestAnimationFrame(animateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [animIteration]);

  // 6-second repeating loop for the 3 colorful cards
  useEffect(() => {
    if (!hasSettledScore) return;

    let timerId: NodeJS.Timeout;
    const timeouts: NodeJS.Timeout[] = [];

    const runCardCycle = () => {
      setBlockStage(0);

      // Card 1: block 1 (Yellow)
      timeouts.push(setTimeout(() => setBlockStage(1), 300));
      // Card 1: block 2 (Blue)
      timeouts.push(setTimeout(() => setBlockStage(2), 650));
      // Card 2: block 1 (Green)
      timeouts.push(setTimeout(() => setBlockStage(3), 1000));
      // Card 2: block 2 (Pink)
      timeouts.push(setTimeout(() => setBlockStage(4), 1350));
      // Card 2: block 3 (Purple)
      timeouts.push(setTimeout(() => setBlockStage(5), 1700));
      // Card 3: block 1 (Blue)
      timeouts.push(setTimeout(() => setBlockStage(6), 2050));
      // Card 3: block 2 (Yellow)
      timeouts.push(setTimeout(() => setBlockStage(7), 2400));
      // Card 3: block 3 (Green)
      timeouts.push(setTimeout(() => setBlockStage(8), 2750));

      // After 6 seconds, fade out and repeat
      timerId = setTimeout(() => {
        setBlockStage(0);
        setTimeout(runCardCycle, 400);
      }, 6000);
    };

    runCardCycle();

    return () => {
      clearTimeout(timerId);
      timeouts.forEach(clearTimeout);
    };
  }, [hasSettledScore]);

  // Restart counter and cards animation
  const handleReplayScoreAnim = () => {
    setHasSettledScore(false);
    setLeftScore(1000);
    setRightScore(1000);
    setBlockStage(0);
    setAnimIteration((prev) => prev + 1);
  };

  // =========================================================================
  // TUTORIAL WALKTHROUGH STATE (5 STEPS)
  // =========================================================================
  const [tutorialStep, setTutorialStep] = useState<number>(0);
  const [completedListTasks, setCompletedListTasks] = useState<Record<string, boolean>>({});
  const [cursorAnimKey, setCursorAnimKey] = useState<number>(0);
  const [step2MathPlaced, setStep2MathPlaced] = useState<boolean>(false);
  const [step2RwPlaced, setStep2RwPlaced] = useState<boolean>(false);

  const [studyDays, setStudyDays] = useState<Record<string, { start: number; end: number } | null>>({
    Mon: { start: 16, end: 19 },
    Tue: { start: 16, end: 19 },
    Wed: { start: 16, end: 19 },
    Thu: { start: 16, end: 19 },
    Fri: { start: 16, end: 19 },
    Sat: null,
    Sun: null,
  });

  useEffect(() => {
    if (viewMode === "tutorial" && tutorialStep === 2) {
      setStep2MathPlaced(false);
      setStep2RwPlaced(false);
      const timer1 = setTimeout(() => setStep2MathPlaced(true), 1600);
      const timer2 = setTimeout(() => setStep2RwPlaced(true), 2900);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [viewMode, tutorialStep, cursorAnimKey]);

  const totalWeeklyHours = Object.values(studyDays).reduce((acc, curr) => {
    if (!curr) return acc;
    return acc + (curr.end - curr.start);
  }, 0);

  const toggleDayPainted = (day: string) => {
    setStudyDays((prev) => {
      const existing = prev[day];
      return {
        ...prev,
        [day]: existing ? null : { start: 16, end: 19 },
      };
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
    <div className="min-h-screen bg-white flex flex-col font-dm-sans text-zinc-900 select-none overflow-x-hidden">
      {/* Background illustration */}
      {viewMode === "tutorial" && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-[url('/study-planner-bg.png')] bg-cover bg-center bg-no-repeat opacity-95"
          style={{ backgroundAttachment: "fixed" }}
        />
      )}

      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-[236px] relative z-10 bg-white">
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

        {/* View Switcher Bar (Optional quick tab to switch between Game Plan and Tutorial Walkthrough) */}
        <div className="w-full flex items-center justify-between px-6 pt-4 pb-1">
          <div className="flex items-center gap-2">
            {viewMode === "tutorial" ? (
              <button
                type="button"
                onClick={() => setViewMode("game-plan")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Game Plan</span>
              </button>
            ) : (
              <span className="text-xs text-zinc-400 font-medium">SAT Study Planner</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (viewMode === "game-plan") {
                  handleReplayScoreAnim();
                } else {
                  setCursorAnimKey((k) => k + 1);
                }
              }}
              title="Replay animation"
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-black transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-zinc-100"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE 1: CREATE A GAME PLAN FOR YOUR EXAMS (Matching Latest Image)          */}
        {/* ========================================================================= */}
        {viewMode === "game-plan" && (
          <main className="flex-1 px-4 sm:px-6 md:px-8 pt-4 pb-16 flex flex-col items-center justify-start max-w-4xl mx-auto w-full">
            {/* Top Score Banner: Starts large with rolling count from 1000, then shrinks into place */}
            <div className="relative w-full flex flex-col items-center justify-center pt-2 pb-6 min-h-[90px]">
              <motion.div
                layout
                animate={{
                  scale: hasSettledScore ? 1 : 1.35,
                  y: hasSettledScore ? 0 : 25,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className="inline-flex items-center gap-3 font-dm-sans"
              >
                <span
                  className={`font-extrabold tracking-tight text-zinc-950 transition-all ${
                    hasSettledScore ? "text-xl sm:text-2xl" : "text-4xl sm:text-5xl text-[#0284c7]"
                  }`}
                >
                  {leftScore}
                </span>

                <span
                  className={`text-zinc-400 font-bold ${
                    hasSettledScore ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"
                  }`}
                >
                  ›
                </span>

                <span
                  className={`font-extrabold tracking-tight text-zinc-950 transition-all ${
                    hasSettledScore ? "text-xl sm:text-2xl" : "text-4xl sm:text-5xl text-emerald-600"
                  }`}
                >
                  {rightScore}
                </span>
              </motion.div>
            </div>

            {/* 3 Colorful Study Cards + Preppy Mascot (Animated 6-second repeating loop) */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-6 py-2">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="w-28 sm:w-36 h-36 sm:h-44 rounded-2xl bg-white border border-zinc-200/90 shadow-sm p-3 flex flex-col gap-2.5 relative"
              >
                {/* Header line placeholder */}
                <div className="w-8 h-1.5 rounded-full bg-zinc-200" />

                {/* Block 1 (Yellow/Amber) */}
                <AnimatePresence>
                  {blockStage >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full h-8 sm:h-9 rounded-xl bg-[#fef3c7] border border-[#fde68a]/60 shadow-2xs"
                    />
                  )}
                </AnimatePresence>

                {/* Block 2 (Blue) */}
                <AnimatePresence>
                  {blockStage >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full h-8 sm:h-9 rounded-xl bg-[#dbeafe] border border-[#bfdbfe]/60 shadow-2xs"
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                className="w-28 sm:w-36 h-36 sm:h-44 rounded-2xl bg-white border border-zinc-200/90 shadow-sm p-3 flex flex-col gap-2 relative"
              >
                {/* Header line placeholder */}
                <div className="w-8 h-1.5 rounded-full bg-zinc-200" />

                {/* Block 1 (Green) */}
                <AnimatePresence>
                  {blockStage >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full h-7 sm:h-8 rounded-xl bg-[#dcfce7] border border-[#bbf7d0]/60 shadow-2xs"
                    />
                  )}
                </AnimatePresence>

                {/* Block 2 (Pink/Coral) */}
                <AnimatePresence>
                  {blockStage >= 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full h-7 sm:h-8 rounded-xl bg-[#ffe4e6] border border-[#fecdd3]/60 shadow-2xs"
                    />
                  )}
                </AnimatePresence>

                {/* Block 3 (Lavender/Purple) */}
                <AnimatePresence>
                  {blockStage >= 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full h-7 sm:h-8 rounded-xl bg-[#f3e8ff] border border-[#e9d5ff]/60 shadow-2xs"
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Card 3 (With Peeking Preppy Mascot) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.4 }}
                className="w-28 sm:w-36 h-36 sm:h-44 rounded-2xl bg-white border border-zinc-200/90 shadow-sm p-3 flex flex-col gap-2 relative"
              >
                {/* Header line placeholder */}
                <div className="w-8 h-1.5 rounded-full bg-zinc-200" />

                {/* Block 1 (Blue) */}
                <AnimatePresence>
                  {blockStage >= 6 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full h-7 sm:h-8 rounded-xl bg-[#dbeafe] border border-[#bfdbfe]/60 shadow-2xs"
                    />
                  )}
                </AnimatePresence>

                {/* Block 2 (Yellow) */}
                <AnimatePresence>
                  {blockStage >= 7 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full h-7 sm:h-8 rounded-xl bg-[#fef3c7] border border-[#fde68a]/60 shadow-2xs"
                    />
                  )}
                </AnimatePresence>

                {/* Block 3 (Green) */}
                <AnimatePresence>
                  {blockStage >= 8 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full h-7 sm:h-8 rounded-xl bg-[#dcfce7] border border-[#bbf7d0]/60 shadow-2xs"
                    />
                  )}
                </AnimatePresence>

                {/* Peeking Preppy Mascot on the right */}
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-6 sm:-right-8 top-16 sm:top-20 z-10 pointer-events-none drop-shadow-lg"
                >
                  <img
                    src="/study-planner-mascot-clean.png"
                    alt="Preppy"
                    className="w-16 sm:w-20 h-auto object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Title */}
            <div className="pt-8 text-center space-y-2">
              <h1 className="text-3xl sm:text-[38px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                Create a game plan for your exams
              </h1>
            </div>

            {/* 2 Option Cards: Start from scratch & Upload score report */}
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-7">
              {/* Option 1: Start from scratch */}
              <div className="rounded-3xl bg-[#f4f4f5]/80 hover:bg-[#f4f4f5] border border-zinc-200/60 p-6 flex flex-col justify-between min-h-[175px] relative overflow-hidden transition-all group">
                <div className="space-y-1.5 relative z-10 max-w-[85%]">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-950">Start from scratch</h3>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    Answer a few questions and we&apos;ll build a plan from your goals.
                  </p>
                </div>

                <div className="pt-4 relative z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("tutorial");
                      setTutorialStep(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>
                </div>

                {/* Translucent Watermark Icon */}
                <div className="absolute right-4 bottom-3 text-zinc-300 opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none">
                  <CalculatorWatermark className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
              </div>

              {/* Option 2: Upload your SAT score report */}
              <div className="rounded-3xl bg-[#f4f4f5]/80 hover:bg-[#f4f4f5] border border-zinc-200/60 p-6 flex flex-col justify-between min-h-[175px] relative overflow-hidden transition-all group">
                <div className="space-y-1.5 relative z-10 max-w-[85%]">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-950">Upload your SAT score report</h3>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    We&apos;ll read your skills report and tailor checkpoints to your strengths and gaps.
                  </p>
                </div>

                <div className="pt-4 relative z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("tutorial");
                      setTutorialStep(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>
                </div>

                {/* Translucent Watermark Icon */}
                <div className="absolute right-4 bottom-3 text-zinc-300 opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none">
                  <DocumentWatermark className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
              </div>
            </div>

            {/* "How It Works" Section */}
            <div className="w-full max-w-2xl pt-14 pb-8 text-center space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-dm-sans">
                How It Works
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-[#dcf3fe] text-[#0284c7] flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900">Choose test date</h4>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                    Set target scores and timeline to establish your pacing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-[#fae8ff] text-[#9333ea] flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900">Daily study blocks</h4>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                    Bite-sized Math and R&amp;W lessons customized to your weak spots.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-[#dcfce7] text-emerald-700 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900">Hit your goal</h4>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                    Track skill mastery and practice tests to conquer test day.
                  </p>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: 5-STEP TUTORIAL WALKTHROUGH (When Continue is clicked)            */}
        {/* ========================================================================= */}
        {viewMode === "tutorial" && (
          <main className="flex-1 px-4 sm:px-6 md:px-8 py-5 sm:py-7 flex flex-col items-center justify-start">
            {/* Top Carousel Dots */}
            <div className="flex items-center justify-center gap-1.5 py-1.5">
              {[0, 1, 2, 3, 4].map((stepIdx) => (
                <button
                  key={stepIdx}
                  type="button"
                  onClick={() => setTutorialStep(stepIdx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    tutorialStep === stepIdx
                      ? "w-6 h-1.5 bg-[#0284c7]"
                      : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to step ${stepIdx + 1}`}
                />
              ))}
            </div>

            {/* STEP 0: Welcome to your new Study Planner */}
            {tutorialStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-4xl flex flex-col items-center text-center space-y-3 pt-1"
              >
                <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  Welcome to your new Study Planner
                </h1>

                <div>
                  <button
                    type="button"
                    onClick={() => setTutorialStep(1)}
                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>
                </div>

                {/* Calendar Card */}
                <div className="w-full mt-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-200/90 overflow-hidden relative">
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

                  <div className="relative min-h-[360px] bg-white">
                    {["4 PM", "5 PM", "6 PM", "7 PM", "8 PM"].map((time, idx) => (
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

                    <div className="absolute inset-0 grid grid-cols-[68px_repeat(4,1fr)] pointer-events-none">
                      <div />
                      <div className="relative h-full pointer-events-auto px-1.5">
                        <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                          <h4 className="text-[11px] font-bold text-zinc-900 truncate">Linear equations lesson</h4>
                          <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                          <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                        </div>
                      </div>
                      <div className="relative h-full pointer-events-auto px-1.5">
                        <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-2xs">
                          <h4 className="text-[11px] font-bold text-zinc-900 truncate">Advanced Math practice</h4>
                          <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                          <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                        </div>
                      </div>
                      <div className="relative h-full pointer-events-auto px-1.5">
                        <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                          <h4 className="text-[11px] font-bold text-zinc-900 truncate">Grammar practice</h4>
                          <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                          <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                        </div>
                      </div>
                      <div className="relative h-full pointer-events-auto px-1.5">
                        <div className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-2xs">
                          <h4 className="text-[11px] font-bold text-zinc-900 truncate">Reading and Writing review</h4>
                          <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                          <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-5 -right-5 z-20 pointer-events-none drop-shadow-2xl">
                    <motion.img
                      src="/study-planner-mascot-clean.png"
                      alt="Preppy"
                      className="w-32 sm:w-40 h-auto object-contain"
                      animate={{ y: [0, -5, 0], rotate: [0, 1.5, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 1: A home for all your SAT tasks, tests and deadlines */}
            {tutorialStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-4xl flex flex-col items-center"
              >
                <div className="text-center space-y-3 pt-1">
                  <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                    A home for all your SAT tasks, tests and deadlines
                  </h1>

                  <div>
                    <button
                      type="button"
                      onClick={() => setTutorialStep(2)}
                      className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                <div className="w-full mt-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-200/90 p-6 sm:p-8 relative max-w-3xl">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#ef4444] tracking-tight">Today</span>
                        <span className="text-xs text-zinc-400 font-medium">2 to do · 2h</span>
                      </div>

                      <div className="pl-3 border-l-4 border-zinc-900 flex items-center justify-between py-1">
                        <div>
                          <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">Math practice test</h3>
                          <p className="text-[11px] text-zinc-400 font-medium">All day</p>
                        </div>
                        <span className="text-xs font-semibold text-zinc-600">Mark done</span>
                      </div>

                      <div className="pl-3 border-l-4 border-[#0284c7] space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900">Your SAT plan</h4>
                          <span className="text-xs text-zinc-500 font-medium">Hide tasks &gt;</span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-md border border-zinc-300" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                                  Linear equations lesson
                                </span>
                                <span className="w-4 h-3.5 rounded bg-[#9333ea] text-white flex items-center justify-center text-[9px]">
                                  📹
                                </span>
                              </div>
                              <span className="text-[11px] text-zinc-400">Lesson video · 60 min</span>
                            </div>
                          </div>
                          <span className="px-4 py-1 rounded-full border border-zinc-200 text-xs font-semibold text-zinc-800">
                            Start &gt;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-5 -right-5 z-20 pointer-events-none drop-shadow-2xl">
                    <motion.img
                      src="/study-planner-mascot-clean.png"
                      alt="Preppy"
                      className="w-32 sm:w-40 h-auto object-contain"
                      animate={{ y: [0, -5, 0], rotate: [0, 1.5, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Schedule study blocks (Animated Cursor) */}
            {tutorialStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-4xl flex flex-col items-center"
              >
                <div className="text-center space-y-3 pt-1">
                  <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                    Schedule study blocks and make time to focus
                  </h1>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTutorialStep(3)}
                      className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCursorAnimKey((k) => k + 1)}
                      className="p-2 rounded-full bg-white text-zinc-600 border border-zinc-200 hover:text-black cursor-pointer shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="w-full mt-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-200/90 overflow-hidden relative">
                  <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-white">
                    <div className="py-2.5 px-3 border-r border-zinc-200 text-[11px] font-semibold text-zinc-400">
                      GMT+0
                    </div>
                    <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200 text-xs font-semibold text-zinc-600">
                      Mon <span className="w-5 h-5 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-[11px] font-bold">5</span>
                    </div>
                    <div className="py-2 px-2 text-center border-r border-zinc-200 text-xs font-semibold text-zinc-600">
                      Tue <span className="font-bold text-zinc-800">6</span>
                    </div>
                    <div className="py-2 px-2 text-center border-r border-zinc-200 text-xs font-semibold text-zinc-600">
                      Wed <span className="font-bold text-zinc-800">7</span>
                    </div>
                    <div className="py-2 px-2 text-center text-xs font-semibold text-zinc-600">
                      Thu <span className="font-bold text-zinc-800">8</span>
                    </div>
                  </div>

                  <div className="relative min-h-[360px] bg-white">
                    {["4 PM", "5 PM", "6 PM", "7 PM"].map((time, idx) => (
                      <div
                        key={time}
                        style={{ top: `${idx * 64}px` }}
                        className="absolute left-0 right-0 grid grid-cols-[68px_repeat(4,1fr)] h-16 border-b border-zinc-100"
                      >
                        <div className="pr-3 flex items-start justify-end pt-1 border-r border-zinc-100 text-[11px] font-medium text-zinc-400">
                          {time}
                        </div>
                        <div className="border-r border-zinc-100" />
                        <div className="border-r border-zinc-100" />
                        <div className="border-r border-zinc-100" />
                        <div />
                      </div>
                    ))}

                    <div className="absolute inset-0 grid grid-cols-[68px_repeat(4,1fr)] pointer-events-none">
                      <div />
                      <div />
                      <div />
                      {/* Wed 7 Math practice placed by cursor */}
                      <div className="relative h-full pointer-events-auto px-1.5">
                        {step2MathPlaced && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute left-1.5 right-1.5 top-[68px] h-14 rounded-md p-1.5 bg-[#dcf3fe] border-l-[3.5px] border-[#0284c7] flex flex-col justify-between shadow-md"
                          >
                            <h4 className="text-[11px] font-bold text-zinc-900 truncate">Math practice</h4>
                            <p className="text-[10px] text-zinc-500 font-medium">5:00 PM to 6:00 PM</p>
                            <span className="text-[9.5px] font-bold text-[#0284c7]">0/1 done</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Thu 8 Reading & Writing review placed by cursor */}
                      <div className="relative h-full pointer-events-auto px-1.5">
                        {step2RwPlaced && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute left-1.5 right-1.5 top-2 h-14 rounded-md p-1.5 bg-[#fae8ff] border-l-[3.5px] border-[#c084fc] flex flex-col justify-between shadow-md"
                          >
                            <h4 className="text-[11px] font-bold text-zinc-900 truncate">Reading and Writing review</h4>
                            <p className="text-[10px] text-zinc-500 font-medium">4:00 PM to 5:00 PM</p>
                            <span className="text-[9.5px] font-bold text-[#9333ea]">0/1 done</span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Animated Cursor */}
                    <motion.div
                      key={`cursor-step2-${cursorAnimKey}`}
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
                      <img src="/cursor-mac.png" alt="Cursor" className="w-6 h-6 object-contain" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Sync your calendar and study with friends */}
            {tutorialStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-4xl flex flex-col items-center"
              >
                <div className="text-center space-y-2.5 pt-1">
                  <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                    Sync your calendar and study with friends
                  </h1>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setTutorialStep(4)}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <GoogleCalendarIcon className="w-4 h-4" />
                      <span>Connect Google Calendar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTutorialStep(4)}
                      className="px-4 py-2 rounded-full bg-[#f4f4f5] hover:bg-zinc-200 text-zinc-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                    >
                      Skip
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Optional. You can connect your calendar anytime in Settings.
                  </p>
                </div>

                <div className="w-full mt-5 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-200/90 overflow-hidden relative">
                  <div className="p-8 text-center text-xs text-zinc-500">
                    <span className="font-semibold text-zinc-800">External events synced:</span> Football training, SAT study group, Piano lesson, and Focus time.
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: When can you usually study? (Time painter) */}
            {tutorialStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-4xl flex flex-col items-center"
              >
                <div className="text-center space-y-2 pt-1 max-w-xl mx-auto">
                  <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                    When can you usually study?
                  </h1>

                  <p className="text-xs sm:text-[13px] text-zinc-500 font-medium leading-relaxed">
                    Drag to paint when you usually study. These shared hours can be changed anytime.
                  </p>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setViewMode("game-plan")}
                      className="px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-black transition-colors cursor-pointer"
                    >
                      Skip
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode("game-plan")}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Open my planner</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Time painter card */}
                <div className="w-full mt-5 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-200/90 overflow-hidden relative">
                  <div className="px-6 py-3 flex items-center justify-between border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#cffafe] border border-[#38bdf8]" />
                      <span className="text-xs font-semibold text-zinc-700">Study time</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-800">{totalWeeklyHours}h per week</span>
                  </div>

                  <div className="grid grid-cols-7 border-b border-zinc-100 bg-[#fafafa] text-center py-2 text-xs font-bold text-zinc-700">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>

                  <div className="p-8 text-center text-xs text-zinc-400">
                    Interactive hours painted: 16:00 to 19:00 across weekdays.
                  </div>
                </div>
              </motion.div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
