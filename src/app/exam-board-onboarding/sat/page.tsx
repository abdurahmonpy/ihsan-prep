"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar as CalendarIcon,
  Check,
} from "lucide-react";

// OnePrep Cloud Mascot SVG
function CloudMascot({ size = 32 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
        <defs>
          <linearGradient id="satCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#76E4F7" />
            <stop offset="50%" stopColor="#48CAE4" />
            <stop offset="100%" stopColor="#00B4D8" />
          </linearGradient>
        </defs>
        <path
          d="M 28 65 C 18 65, 12 55, 15 45 C 12 36, 18 28, 28 28 C 32 20, 42 16, 52 18 C 60 14, 72 18, 76 28 C 85 28, 90 36, 88 46 C 92 56, 84 66, 74 65 Z"
          fill="url(#satCloudGrad)"
        />
        <circle cx="29" cy="52" r="4.2" fill="#FB7185" opacity="0.85" />
        <circle cx="73" cy="52" r="4.2" fill="#FB7185" opacity="0.85" />
        <ellipse cx="40" cy="46" rx="4.5" ry="6" fill="#0C4A6E" />
        <ellipse cx="62" cy="46" rx="4.5" ry="6" fill="#0C4A6E" />
        <circle cx="42" cy="44" r="2" fill="#FFFFFF" />
        <circle cx="39" cy="48" r="0.8" fill="#FFFFFF" />
        <circle cx="64" cy="44" r="2" fill="#FFFFFF" />
        <circle cx="61" cy="48" r="0.8" fill="#FFFFFF" />
        <path
          d="M 46 53 Q 51 58 56 53"
          stroke="#0C4A6E"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

const satDates = [
  { id: "nov_7_2026", label: "November 7, 2026" },
  { id: "dec_5_2026", label: "December 5, 2026" },
  { id: "mar_6_2027", label: "March 6, 2027" },
  { id: "may_1_2027", label: "May 1, 2027" },
  { id: "jun_5_2027", label: "June 5, 2027" },
  { id: "aug_28_2027", label: "August 28, 2027*" },
  { id: "sep_18_2027", label: "September 18, 2027*" },
  { id: "oct_2_2027", label: "October 2, 2027*" },
  { id: "nov_6_2027", label: "November 6, 2027*" },
  { id: "dec_4_2027", label: "December 4, 2027*" },
  { id: "mar_4_2028", label: "March 4, 2028*" },
  { id: "may_6_2028", label: "May 6, 2028*" },
  { id: "jun_3_2028", label: "June 3, 2028*" },
];

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const years = [2026, 2027, 2028, 2029, 2030];

// Stair-step score checkpoints for Step 3
const scoreCheckpoints = [
  400, 500, 600, 700, 800, 900, 1000, 1100,
  1200, 1280, 1350, 1420, 1500, 1550, 1580, 1600
];

function SatOnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/home";

  // Step state: 1, 2, or 3
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1 STATE: Selected pre-set dates + Custom date
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [customDate, setCustomDate] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Calendar popover internal state
  const [calMonth, setCalMonth] = useState<number>(9); // 0-indexed: 9 = October
  const [calYear, setCalYear] = useState<number>(2026);
  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false);

  // STEP 2 STATE: Best score to date
  const [bestScore, setBestScore] = useState<string>("");

  // STEP 3 STATE: Goal score
  const [goalScoreIndex, setGoalScoreIndex] = useState<number>(8); // index 8 = 1200
  const currentGoalScore = scoreCheckpoints[goalScoreIndex];

  // Close calendar popover on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDate = (dateId: string) => {
    if (selectedDates.includes(dateId)) {
      setSelectedDates(selectedDates.filter((id) => id !== dateId));
    } else {
      setSelectedDates([...selectedDates, dateId]);
    }
  };

  const hasStep1Selection = selectedDates.length > 0 || customDate.trim() !== "";

  // Calendar logic to generate 42 slots (6 weeks)
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay(); // 0 = Sun
  const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();

  const handleDaySelect = (day: number) => {
    const monthName = new Date(calYear, calMonth, 1).toLocaleString("en-US", {
      month: "long",
    });
    setCustomDate(`${monthName} ${day}, ${calYear}`);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((prev) => prev - 1);
    } else {
      setCalMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((prev) => prev + 1);
    } else {
      setCalMonth((prev) => prev + 1);
    }
  };

  // Step Navigation
  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.push("/college-applications");
    }
  };

  const handleFinishSetup = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sat_goal_score", String(currentGoalScore));
    }
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-dm-sans flex flex-col justify-between selection:bg-[#38bdf8] selection:text-white">
      {/* ---------------- TOP HEADER BAR ---------------- */}
      <header className="w-full px-4 sm:px-8 pt-5 pb-3 flex items-center justify-between border-b border-zinc-100 select-none">
        {/* Go back */}
        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center gap-1 text-xs sm:text-sm font-medium text-zinc-600 hover:text-black transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          <span>Go back</span>
        </button>

        {/* Centered Brand Logo */}
        <div className="flex items-center gap-2">
          <CloudMascot size={30} />
          <span className="text-xl font-bold tracking-tight text-zinc-950 font-dm-sans">
            OnePrep
          </span>
        </div>

        {/* Step Indicator: 1 of 3, 2 of 3, 3 of 3 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                currentStep >= 1 ? "bg-[#0ea5e9]" : "bg-zinc-200"
              }`}
            />
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                currentStep >= 2 ? "bg-[#0ea5e9]" : "bg-zinc-200"
              }`}
            />
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                currentStep >= 3 ? "bg-[#0ea5e9]" : "bg-zinc-200"
              }`}
            />
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            {currentStep} of 3
          </span>
        </div>
      </header>

      {/* ---------------- MAIN ONBOARDING FORM ---------------- */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {/* ============================================================ */}
          {/* STEP 1: WHEN ARE YOU TAKING THE SAT? (With Custom Calendar)   */}
          {/* ============================================================ */}
          {currentStep === 1 && (
            <motion.div
              key="sat-step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full max-w-md space-y-5 text-center"
            >
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  When are you taking the SAT?
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                  Select all dates you&apos;re considering.
                </p>
              </div>

              {/* 2-Column Dates Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 text-left">
                {satDates.map((item) => {
                  const isSelected = selectedDates.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleDate(item.id)}
                      className={`w-full py-3 px-3.5 rounded-2xl text-xs sm:text-[13px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                          : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-700"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-3.5 w-3.5 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                          <Check className="h-2 w-2 stroke-[3.5]" />
                        </span>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footnote */}
              <div className="w-full text-left pt-0.5">
                <p className="text-[11px] text-zinc-400 font-medium">
                  * anticipated
                </p>
              </div>

              {/* OR Divider */}
              <div className="relative w-full my-3 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200" />
                </div>
                <div className="relative bg-white px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  OR
                </div>
              </div>

              {/* Custom Date Input with Interactive Calendar Popover (Image 1) */}
              <div className="w-full text-left space-y-1.5 relative" ref={calendarRef}>
                <label className="block text-xs font-semibold text-zinc-800">
                  Custom date
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full py-3 px-4 rounded-xl border border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-xs sm:text-sm font-medium text-zinc-800 text-left flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span className={customDate ? "text-zinc-900 font-semibold" : "text-zinc-500"}>
                      {customDate || "Choose a date"}
                    </span>
                    <CalendarIcon className="w-4 h-4 text-zinc-400" />
                  </button>

                  {/* Calendar Popover (Matching Image 1) */}
                  <AnimatePresence>
                    {showCalendar && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-0 mb-2 z-50 w-[290px] rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-2xl"
                      >
                        {/* Header: Prev, Month Select, Year Select, Next */}
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-1 rounded-lg hover:bg-zinc-100 text-zinc-600 transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <div className="flex items-center gap-1.5">
                            {/* Month Dropdown Button */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowMonthDropdown(!showMonthDropdown);
                                  setShowYearDropdown(false);
                                }}
                                className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-xs font-semibold text-zinc-800 flex items-center gap-1 hover:bg-zinc-50 cursor-pointer"
                              >
                                <span>{months[calMonth]}</span>
                                <ChevronDown className="w-3 h-3 text-zinc-400" />
                              </button>
                              {showMonthDropdown && (
                                <div className="absolute top-full left-0 mt-1 z-30 max-h-36 w-24 overflow-y-auto rounded-xl border border-zinc-200 bg-white shadow-lg p-1 text-xs">
                                  {months.map((m, idx) => (
                                    <button
                                      key={m}
                                      type="button"
                                      onClick={() => {
                                        setCalMonth(idx);
                                        setShowMonthDropdown(false);
                                      }}
                                      className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                                        calMonth === idx
                                          ? "bg-[#cefbff] text-[#0284c7] font-bold"
                                          : "hover:bg-zinc-100 text-zinc-700"
                                      }`}
                                    >
                                      {m}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Year Dropdown Button */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowYearDropdown(!showYearDropdown);
                                  setShowMonthDropdown(false);
                                }}
                                className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-xs font-semibold text-zinc-800 flex items-center gap-1 hover:bg-zinc-50 cursor-pointer"
                              >
                                <span>{calYear}</span>
                                <ChevronDown className="w-3 h-3 text-zinc-400" />
                              </button>
                              {showYearDropdown && (
                                <div className="absolute top-full left-0 mt-1 z-30 max-h-36 w-24 overflow-y-auto rounded-xl border border-zinc-200 bg-white shadow-lg p-1 text-xs">
                                  {years.map((y) => (
                                    <button
                                      key={y}
                                      type="button"
                                      onClick={() => {
                                        setCalYear(y);
                                        setShowYearDropdown(false);
                                      }}
                                      className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                                        calYear === y
                                          ? "bg-[#cefbff] text-[#0284c7] font-bold"
                                          : "hover:bg-zinc-100 text-zinc-700"
                                      }`}
                                    >
                                      {y}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-1 rounded-lg hover:bg-zinc-100 text-zinc-600 transition-colors cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Weekday Labels (Su Mo Tu We Th Fr Sa) */}
                        <div className="grid grid-cols-7 gap-1 pt-2 text-center">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <span key={day} className="text-[11px] font-semibold text-zinc-400 py-0.5">
                              {day}
                            </span>
                          ))}
                        </div>

                        {/* Calendar Days Grid */}
                        <div className="grid grid-cols-7 gap-1 pt-1 text-center">
                          {/* Previous Month Padding Days */}
                          {Array.from({ length: firstDayOfWeek }).map((_, i) => {
                            const prevDay = daysInPrevMonth - firstDayOfWeek + i + 1;
                            return (
                              <span
                                key={`prev-${i}`}
                                className="h-8 flex items-center justify-center text-xs text-zinc-300 select-none"
                              >
                                {prevDay}
                              </span>
                            );
                          })}

                          {/* Current Month Days */}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isOct31 = day === 31 && calMonth === 9 && calYear === 2026;
                            return (
                              <button
                                key={`day-${day}`}
                                type="button"
                                onClick={() => handleDaySelect(day)}
                                className={`h-8 w-8 mx-auto rounded-xl flex items-center justify-center text-xs font-medium transition-colors cursor-pointer ${
                                  isOct31
                                    ? "bg-[#f4f4f5] text-zinc-900 font-bold border border-zinc-200"
                                    : "hover:bg-[#cefbff] hover:text-[#0284c7] text-zinc-700"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Continue Button */}
              <div className="w-full pt-3">
                <button
                  type="button"
                  disabled={!hasStep1Selection}
                  onClick={() => setCurrentStep(2)}
                  className={`w-full py-3.5 rounded-full text-sm font-medium transition-all shadow-xs ${
                    hasStep1Selection
                      ? "bg-black hover:bg-zinc-800 text-white cursor-pointer active:scale-[0.99]"
                      : "bg-[#8b8b8b] text-white cursor-not-allowed opacity-90"
                  }`}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* STEP 2: ENTER YOUR BEST SAT SCORE TO DATE (Matching Image 2)  */}
          {/* ============================================================ */}
          {currentStep === 2 && (
            <motion.div
              key="sat-step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full max-w-md space-y-6 text-center"
            >
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  Enter your best SAT score to date
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium max-w-sm mx-auto">
                  Official scores and full practice tests both count. You can skip this for now.
                </p>
              </div>

              {/* Score Input Box */}
              <div className="space-y-2 pt-2 text-left">
                <label className="block text-xs font-semibold text-zinc-800">
                  Total score
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={bestScore}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setBestScore(clean);
                  }}
                  placeholder="Enter best score"
                  className="w-full py-3.5 px-4 rounded-xl border-2 border-zinc-950 bg-white text-base sm:text-lg text-center font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] transition-all"
                />

                {/* "I don't have a score yet" button */}
                <button
                  type="button"
                  onClick={() => {
                    setBestScore("");
                    setCurrentStep(3);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#f5f5f5] hover:bg-zinc-200/80 text-xs font-semibold text-zinc-600 transition-colors cursor-pointer text-center mt-2"
                >
                  I don&apos;t have a score yet
                </button>
              </div>

              {/* Navigation buttons: Previous & Continue */}
              <div className="flex items-center justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-2.5 rounded-full bg-[#f5f5f5] hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-2.5 rounded-full bg-black hover:bg-zinc-800 text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* STEP 3: WHAT'S YOUR SAT GOAL SCORE? (Matching Image 3)        */}
          {/* ============================================================ */}
          {currentStep === 3 && (
            <motion.div
              key="sat-step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full max-w-md space-y-6 text-center select-none"
            >
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  What&apos;s your SAT goal score?
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                  An estimate works great if you&apos;re not sure yet.
                </p>
              </div>

              {/* Interactive Ascending Bar Chart Selector */}
              <div className="pt-4 pb-2">
                <div className="flex items-end justify-center gap-1.5 h-32 px-2">
                  {scoreCheckpoints.map((score, idx) => {
                    const isPassed = idx < goalScoreIndex;
                    const isFocal = idx === goalScoreIndex;
                    const heightPercent = 22 + (idx / (scoreCheckpoints.length - 1)) * 78;

                    return (
                      <div
                        key={score}
                        onClick={() => setGoalScoreIndex(idx)}
                        className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer group"
                      >
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-sm transition-all duration-200 ${
                            isFocal
                              ? "bg-[#135073] shadow-md ring-2 ring-[#0ea5e9]/40 scale-y-[1.02]"
                              : isPassed
                              ? "bg-[#1cb0f6] group-hover:bg-[#0ea5e9]"
                              : "border-2 border-dashed border-zinc-200 bg-transparent group-hover:border-zinc-400"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Left & Right arrow controls under focal bar */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setGoalScoreIndex((prev) => Math.max(0, prev - 1))}
                    disabled={goalScoreIndex <= 0}
                    className="p-1 rounded-full text-zinc-600 hover:text-black hover:bg-zinc-100 disabled:opacity-30 cursor-pointer"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setGoalScoreIndex((prev) => Math.min(scoreCheckpoints.length - 1, prev + 1))
                    }
                    disabled={goalScoreIndex >= scoreCheckpoints.length - 1}
                    className="p-1 rounded-full text-zinc-600 hover:text-black hover:bg-zinc-100 disabled:opacity-30 cursor-pointer"
                  >
                    ▶
                  </button>
                </div>

                {/* Min 400 and Max 1600 labels */}
                <div className="flex items-center justify-between text-left text-xs font-bold text-zinc-900 pt-1">
                  <div>
                    <span className="block text-[10px] text-zinc-400 uppercase font-semibold">MIN</span>
                    <span>400</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-zinc-400 uppercase font-semibold">MAX</span>
                    <span>1600</span>
                  </div>
                </div>

                {/* YOUR GOAL Display Box */}
                <div className="pt-6 space-y-1.5">
                  <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    YOUR GOAL
                  </span>
                  <div className="w-full py-4 rounded-2xl bg-[#f5f5f5] text-3xl font-extrabold text-zinc-950 font-dm-sans shadow-2xs">
                    {currentGoalScore}
                  </div>
                </div>
              </div>

              {/* Navigation buttons: Previous & Finish setup */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-2.5 rounded-full bg-[#f5f5f5] hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleFinishSetup}
                  className="px-8 py-2.5 rounded-full bg-black hover:bg-zinc-800 text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Finish setup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ---------------- BOTTOM FOOTER ---------------- */}
      <footer className="w-full py-4 text-center text-xs text-zinc-400">
        <span>© OnePrep. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default function SatOnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-zinc-400">
          Loading...
        </div>
      }
    >
      <SatOnboardingContent />
    </Suspense>
  );
}
