"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronRight,
  RotateCcw,
  ArrowLeft,
  Check,
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
function CalculatorWatermark({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="4" stroke="currentColor" />
      <rect x="7" y="5" width="10" height="3" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" />
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
function DocumentWatermark({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" />
      <polyline points="14 2 14 8 20 8" stroke="currentColor" />
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" />
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" />
      <circle cx="14" cy="17" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" />
    </svg>
  );
}

export default function StudyPlannerPage() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  // Mode: "game-plan" (Matching 1st image media_1793416590580_83b7b0e2.png)
  // or "tutorial" (5-step interactive walkthrough)
  const [viewMode, setViewMode] = useState<"game-plan" | "tutorial">("game-plan");

  // =========================================================================
  // ANIMATION STATE FOR "Create a game plan for your exams"
  // =========================================================================
  const [leftScore, setLeftScore] = useState<number>(1000);
  const [rightScore, setRightScore] = useState<number>(1000);
  const [hasSettledScore, setHasSettledScore] = useState<boolean>(false);
  const [animIteration, setAnimIteration] = useState<number>(0);

  // 6-second looping state for the colorful blocks inside the 3 cards
  // Stages: 0 (empty) -> 1..8 (each block pops in) -> holds until 5.5s -> resets at 6s
  const [blockStage, setBlockStage] = useState<number>(0);

  // Counter animation: counts upwards starting from 1000 to 1350 and 1550
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1300; // ms

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
        setTimeout(() => {
          setHasSettledScore(true);
        }, 150);
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

      // Card 1: Block 1 (Blue #bddcff)
      timeouts.push(setTimeout(() => setBlockStage(1), 220));
      // Card 1: Block 2 (Green #a1f3ca)
      timeouts.push(setTimeout(() => setBlockStage(2), 440));
      // Card 1: Block 3 (Yellow #ffe59f)
      timeouts.push(setTimeout(() => setBlockStage(3), 660));

      // Card 2: Block 1 (Purple #e8cdff)
      timeouts.push(setTimeout(() => setBlockStage(4), 900));
      // Card 2: Block 2 (Blue #bddcff)
      timeouts.push(setTimeout(() => setBlockStage(5), 1150));

      // Card 3: Block 1 (Pink #ffc4cf)
      timeouts.push(setTimeout(() => setBlockStage(6), 1400));
      // Card 3: Block 2 (Green #a1f3ca)
      timeouts.push(setTimeout(() => setBlockStage(7), 1650));
      // Card 3: Block 3 (Yellow #ffe59f)
      timeouts.push(setTimeout(() => setBlockStage(8), 1900));

      // Hold until 5.5s, then fade out and repeat at 6.0s
      timerId = setTimeout(() => {
        setBlockStage(0);
        setTimeout(runCardCycle, 350);
      }, 6000);
    };

    runCardCycle();

    return () => {
      clearTimeout(timerId);
      timeouts.forEach(clearTimeout);
    };
  }, [hasSettledScore]);

  // Replay animation handler
  const handleReplay = () => {
    setHasSettledScore(false);
    setLeftScore(1000);
    setRightScore(1000);
    setBlockStage(0);
    setAnimIteration((prev) => prev + 1);
  };

  // =========================================================================
  // TUTORIAL STATE
  // =========================================================================
  const [tutorialStep, setTutorialStep] = useState<number>(0);
  const [cursorAnimKey, setCursorAnimKey] = useState<number>(0);
  const [step2MathPlaced, setStep2MathPlaced] = useState<boolean>(false);
  const [step2RwPlaced, setStep2RwPlaced] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen bg-white flex flex-col font-dm-sans text-zinc-900 select-none overflow-x-hidden">
      {/* Background illustration in tutorial mode */}
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

        {/* Back button in tutorial mode */}
        {viewMode === "tutorial" && (
          <div className="px-6 pt-3 pb-0">
            <button
              type="button"
              onClick={() => setViewMode("game-plan")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Game Plan</span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 1: CREATE A GAME PLAN FOR YOUR EXAMS (Matching Image 1 EXACTLY)       */}
        {/* ========================================================================= */}
        {viewMode === "game-plan" && (
          <main className="flex-1 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-12 flex flex-col items-center justify-start max-w-4xl mx-auto w-full">
            {/* Top Score Banner (1350 > 1550) */}
            <div className="relative w-full flex items-center justify-center pt-1 pb-3 min-h-[44px]">
              <motion.div
                layout
                animate={{
                  scale: hasSettledScore ? 1 : 1.35,
                  y: hasSettledScore ? 0 : 15,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                }}
                onClick={handleReplay}
                title="Click to replay score count"
                className="inline-flex items-center gap-2 font-dm-sans cursor-pointer hover:opacity-90"
              >
                <span
                  className={`font-bold tracking-tight text-zinc-950 transition-all ${
                    hasSettledScore ? "text-base sm:text-lg" : "text-3xl sm:text-4xl text-[#0284c7]"
                  }`}
                >
                  {leftScore}
                </span>

                <span
                  className={`text-zinc-400 font-medium ${
                    hasSettledScore ? "text-sm sm:text-base" : "text-xl sm:text-2xl"
                  }`}
                >
                  ›
                </span>

                <span
                  className={`font-bold tracking-tight text-zinc-950 transition-all ${
                    hasSettledScore ? "text-base sm:text-lg" : "text-3xl sm:text-4xl text-emerald-600"
                  }`}
                >
                  {rightScore}
                </span>
              </motion.div>
            </div>

            {/* 3 Colorful Study Cards + Preppy Mascot (Exact colors: #bddcff, #a1f3ca, #ffe59f, #e8cdff, #ffc4cf) */}
            <div className="relative flex items-center justify-center gap-3 py-1">
              {/* CARD 1 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="w-[104px] sm:w-[110px] h-[132px] sm:h-[138px] rounded-2xl bg-white border border-zinc-200/90 shadow-2xs p-2.5 flex flex-col gap-2 relative"
              >
                {/* Header placeholder line */}
                <div className="w-6 h-1 rounded-full bg-zinc-200" />

                {/* Block 1 (Blue #bddcff) */}
                <div className="w-full h-7 rounded-xl flex items-center justify-center">
                  <AnimatePresence>
                    {blockStage >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        style={{ backgroundColor: "#bddcff" }}
                        className="w-full h-full rounded-xl shadow-2xs"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Block 2 (Green #a1f3ca) */}
                <div className="w-full h-7 rounded-xl flex items-center justify-center">
                  <AnimatePresence>
                    {blockStage >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        style={{ backgroundColor: "#a1f3ca" }}
                        className="w-full h-full rounded-xl shadow-2xs"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Block 3 (Yellow #ffe59f) */}
                <div className="w-full h-7 rounded-xl flex items-center justify-center">
                  <AnimatePresence>
                    {blockStage >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        style={{ backgroundColor: "#ffe59f" }}
                        className="w-full h-full rounded-xl shadow-2xs"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* CARD 2 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.3 }}
                className="w-[104px] sm:w-[110px] h-[132px] sm:h-[138px] rounded-2xl bg-white border border-zinc-200/90 shadow-2xs p-2.5 flex flex-col gap-2 relative"
              >
                {/* Header placeholder line */}
                <div className="w-6 h-1 rounded-full bg-zinc-200" />

                {/* Block 1 (Purple #e8cdff) */}
                <div className="w-full h-7 rounded-xl flex items-center justify-center">
                  <AnimatePresence>
                    {blockStage >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        style={{ backgroundColor: "#e8cdff" }}
                        className="w-full h-full rounded-xl shadow-2xs"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Block 2 (Blue #bddcff) */}
                <div className="w-full h-7 rounded-xl flex items-center justify-center">
                  <AnimatePresence>
                    {blockStage >= 5 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        style={{ backgroundColor: "#bddcff" }}
                        className="w-full h-full rounded-xl shadow-2xs"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Empty lower area */}
                <div className="w-full h-7" />
              </motion.div>

              {/* CARD 3 (With Peeking Preppy Mascot) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.3 }}
                className="w-[104px] sm:w-[110px] h-[132px] sm:h-[138px] rounded-2xl bg-white border border-zinc-200/90 shadow-2xs p-2.5 flex flex-col gap-2 relative"
              >
                {/* Header placeholder line */}
                <div className="w-6 h-1 rounded-full bg-zinc-200" />

                {/* Block 1 (Pink #ffc4cf) */}
                <div className="w-full h-7 rounded-xl flex items-center justify-center">
                  <AnimatePresence>
                    {blockStage >= 6 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        style={{ backgroundColor: "#ffc4cf" }}
                        className="w-full h-full rounded-xl shadow-2xs"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Block 2 (Green #a1f3ca) */}
                <div className="w-full h-7 rounded-xl flex items-center justify-center">
                  <AnimatePresence>
                    {blockStage >= 7 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        style={{ backgroundColor: "#a1f3ca" }}
                        className="w-full h-full rounded-xl shadow-2xs"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Block 3 (Yellow #ffe59f) */}
                <div className="w-full h-7 rounded-xl flex items-center justify-center">
                  <AnimatePresence>
                    {blockStage >= 8 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        style={{ backgroundColor: "#ffe59f" }}
                        className="w-full h-full rounded-xl shadow-2xs"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Preppy Mascot peeking right on the card edge */}
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-5 bottom-0 z-20 pointer-events-none drop-shadow-md"
                >
                  <img
                    src="/card3-mascot-clean.png"
                    alt="Preppy"
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Title (Matching Image 1: Create a game plan for your exams) */}
            <div className="pt-6 pb-2 text-center">
              <h1 className="text-2xl sm:text-[34px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                Create a game plan for your exams
              </h1>
            </div>

            {/* 2 Option Cards: Start from scratch & Upload your SAT score report */}
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {/* Option 1: Start from scratch */}
              <div className="rounded-3xl bg-[#f4f4f5] hover:bg-[#efeff0] border border-zinc-200/40 p-5 sm:p-6 flex flex-col justify-between min-h-[150px] relative overflow-hidden transition-all group">
                <div className="space-y-1 relative z-10 max-w-[85%]">
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
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>
                </div>

                {/* Translucent Calculator Watermark */}
                <div className="absolute right-3.5 bottom-2.5 text-zinc-300 opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none">
                  <CalculatorWatermark className="w-16 h-16 sm:w-18 sm:h-18" />
                </div>
              </div>

              {/* Option 2: Upload your SAT score report */}
              <div className="rounded-3xl bg-[#f4f4f5] hover:bg-[#efeff0] border border-zinc-200/40 p-5 sm:p-6 flex flex-col justify-between min-h-[150px] relative overflow-hidden transition-all group">
                <div className="space-y-1 relative z-10 max-w-[85%]">
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
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
                  </button>
                </div>

                {/* Translucent Document Watermark */}
                <div className="absolute right-3.5 bottom-2.5 text-zinc-300 opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none">
                  <DocumentWatermark className="w-16 h-16 sm:w-18 sm:h-18" />
                </div>
              </div>
            </div>

            {/* "How It Works" Section (Matching User Image Exactly) */}
            <div className="w-full max-w-3xl pt-12 pb-16 text-center">
              <h2 className="text-2xl sm:text-[26px] font-bold tracking-tight text-zinc-950 font-dm-sans">
                How It Works
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 text-center">
                {/* Column 1: Set Your Goals */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#cefbff] flex items-center justify-center shadow-2xs">
                    <svg className="w-6 h-6 text-[#1cb0f6]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm-12-9h3v3H7zm5 0h3v3h-3zm5 0h3v3h-3zm-10 5h3v3H7zm5 0h3v3h-3zm5 0h3v3h-3z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[17px] font-bold text-zinc-950 tracking-tight font-dm-sans">
                      Set Your Goals
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-500 font-medium leading-relaxed max-w-[220px] mx-auto">
                      Tell us your test date and target score, and we&apos;ll build a personalized day-by-day plan.
                    </p>
                  </div>
                </div>

                {/* Column 2: Study Smarter */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#cefbff] flex items-center justify-center shadow-2xs">
                    <svg className="w-6 h-6 text-[#1cb0f6]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11 3.5C9.6 3.3 8.2 4 7.5 5.2c-.9.1-1.8.6-2.4 1.3-1 1.2-1 2.9-.6 4.3-.9.8-1.4 2.1-1.2 3.4.2 1.6 1.2 3 2.6 3.4 0 .6.2 1.2.6 1.6.9 1.4 2.6 2.1 4.2 1.7.3 0 .6-.1.9-.2.2.5.5.9.8 1.2.8.7 1.9 1.1 3 1.1v-20c-1.4 0-2.8.5-4.4 1.7zm2 0c1.4-.2 2.8.5 3.5 1.7.9.1 1.8.6 2.4 1.3 1 1.2 1 2.9.6 4.3.9.8 1.4 2.1 1.2 3.4-.2 1.6-1.2 3-2.6 3.4 0 .6-.2 1.2-.6 1.6-.9 1.4-2.6 2.1-4.2 1.7-.3 0-.6-.1-.9-.2-.2.5-.5.9-.8 1.2-.8.7-1.9 1.1-3 1.1v-20c1.4 0 2.8.5 4.4 1.7z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[17px] font-bold text-zinc-950 tracking-tight font-dm-sans">
                      Study Smarter
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-500 font-medium leading-relaxed max-w-[220px] mx-auto">
                      Follow daily sessions with questions, notes, and practice tailored to your weak areas.
                    </p>
                  </div>
                </div>

                {/* Column 3: Track Your Growth */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#cefbff] flex items-center justify-center shadow-2xs">
                    <svg className="w-6 h-6 text-[#1cb0f6]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8v8h8c0 4.41-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[17px] font-bold text-zinc-950 tracking-tight font-dm-sans">
                      Track Your Growth
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-500 font-medium leading-relaxed max-w-[220px] mx-auto">
                      See your progress across topics and adjust your plan as you improve.
                    </p>
                  </div>
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

                <div className="w-full mt-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-200/90 overflow-hidden relative">
                  <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-white">
                    <div className="py-2.5 px-3 border-r border-zinc-200 text-[11px] font-semibold text-zinc-400">GMT+0</div>
                    <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200 text-xs font-semibold text-zinc-600">
                      Mon <span className="w-5 h-5 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-[11px] font-bold">5</span>
                    </div>
                    <div className="py-2 px-2 text-center border-r border-zinc-200 text-xs font-semibold text-zinc-600">Tue <span className="font-bold text-zinc-800">6</span></div>
                    <div className="py-2 px-2 text-center border-r border-zinc-200 text-xs font-semibold text-zinc-600">Wed <span className="font-bold text-zinc-800">7</span></div>
                    <div className="py-2 px-2 text-center text-xs font-semibold text-zinc-600">Thu <span className="font-bold text-zinc-800">8</span></div>
                  </div>

                  <div className="relative min-h-[340px] bg-white">
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
                    <img
                      src="/study-planner-mascot-clean.png"
                      alt="Preppy"
                      className="w-32 sm:w-40 h-auto object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 1: A home for all your SAT tasks */}
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
                  <div className="space-y-4">
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
                            <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                              Linear equations lesson 📹
                            </span>
                            <div className="text-[11px] text-zinc-400">Lesson video · 60 min</div>
                          </div>
                        </div>
                        <span className="px-4 py-1 rounded-full border border-zinc-200 text-xs font-semibold text-zinc-800">
                          Start &gt;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Schedule study blocks with animated cursor */}
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
                  <div className="relative min-h-[340px] bg-white">
                    {/* Tasks */}
                    <div className="absolute inset-0 grid grid-cols-[68px_repeat(4,1fr)] pointer-events-none">
                      <div />
                      <div />
                      <div />
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

            {/* STEP 3 & 4 */}
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
                </div>
              </motion.div>
            )}

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

                  <div className="flex items-center justify-center gap-3 pt-2">
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
              </motion.div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
