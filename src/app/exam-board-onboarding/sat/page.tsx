"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Calendar as CalendarIcon, Check } from "lucide-react";

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

function SatOnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/college-applications";

  // Step state (1 of 3, 2 of 3, 3 of 3)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected dates (multi-select)
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [customDate, setCustomDate] = useState<string>("");

  // Step 2 & 3 state
  const [targetScore, setTargetScore] = useState<string>("1500+");
  const [practiceFrequency, setPracticeFrequency] = useState<string>("30 mins / day");

  const toggleDate = (dateId: string) => {
    if (selectedDates.includes(dateId)) {
      setSelectedDates(selectedDates.filter((id) => id !== dateId));
    } else {
      setSelectedDates([...selectedDates, dateId]);
    }
  };

  const hasSelection = selectedDates.length > 0 || customDate.trim() !== "";

  const handleContinue = () => {
    if (currentStep === 1) {
      if (!hasSelection) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      // Completed, return to previous page
      router.push(returnTo);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push(returnTo);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-dm-sans flex flex-col justify-between selection:bg-[#38bdf8] selection:text-white">
      {/* ---------------- TOP HEADER BAR ---------------- */}
      <header className="w-full px-4 sm:px-8 pt-5 pb-3 flex items-center justify-between border-b border-zinc-100">
        {/* Go back */}
        <button
          type="button"
          onClick={handleBack}
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

        {/* Step Indicator: 1 of 3 */}
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
          {/* STEP 1: WHEN ARE YOU TAKING THE SAT?                         */}
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

              {/* Custom Date Input */}
              <div className="w-full text-left space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-800">
                  Custom date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    placeholder="Choose a date"
                    className="w-full py-3 px-4 rounded-xl border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 focus:bg-white focus:border-[#1cb0f6] focus:ring-2 focus:ring-[#1cb0f6]/30 text-xs sm:text-sm font-medium text-zinc-800 focus:outline-none transition-all cursor-pointer"
                  />
                  {!customDate && (
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Continue Button */}
              <div className="w-full pt-3">
                <button
                  type="button"
                  disabled={!hasSelection}
                  onClick={handleContinue}
                  className={`w-full py-3.5 rounded-full text-sm font-medium transition-all shadow-xs ${
                    hasSelection
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
          {/* STEP 2: WHAT IS YOUR TARGET SCORE?                           */}
          {/* ============================================================ */}
          {currentStep === 2 && (
            <motion.div
              key="sat-step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full max-w-md space-y-5 text-center"
            >
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  What is your target score?
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                  We&apos;ll build your study plan around your score goal.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {[
                  { range: "1500–1600", desc: "Top 1% — Ivy League & elite colleges" },
                  { range: "1400–1490", desc: "Top 5% — Highly competitive schools" },
                  { range: "1300–1390", desc: "Top 15% — Strong universities & merit aid" },
                  { range: "1200–1290", desc: "Solid score for nationwide admissions" },
                ].map((item) => {
                  const isSelected = targetScore === item.range;
                  return (
                    <button
                      key={item.range}
                      type="button"
                      onClick={() => setTargetScore(item.range)}
                      className={`w-full p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "border-[#1cb0f6] bg-[#cefbff] shadow-xs"
                          : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span
                          className={`text-sm font-bold block ${
                            isSelected ? "text-[#0284c7]" : "text-zinc-900"
                          }`}
                        >
                          {item.range}
                        </span>
                        <span className="text-xs text-zinc-500">{item.desc}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-[#1cb0f6] bg-[#1cb0f6] text-white"
                            : "border-zinc-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="w-full pt-3">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-medium text-sm transition-all shadow-xs cursor-pointer active:scale-[0.99]"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* STEP 3: PRACTICE SCHEDULE & FINALIZE                         */}
          {/* ============================================================ */}
          {currentStep === 3 && (
            <motion.div
              key="sat-step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full max-w-md space-y-5 text-center"
            >
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                  How often do you want to practice?
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                  Consistency is the number one driver of SAT score improvement.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {[
                  { title: "15 mins / day", note: "Casual pace (5–7 questions daily)" },
                  { title: "30 mins / day", note: "Recommended (15 questions + review)" },
                  { title: "45 mins / day", note: "Intensive (Practice test sections)" },
                  { title: "Weekends only", note: "2–3 hours on Saturday or Sunday" },
                ].map((item) => {
                  const isSelected = practiceFrequency === item.title;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setPracticeFrequency(item.title)}
                      className={`w-full p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "border-[#1cb0f6] bg-[#cefbff] shadow-xs"
                          : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span
                          className={`text-sm font-bold block ${
                            isSelected ? "text-[#0284c7]" : "text-zinc-900"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-xs text-zinc-500">{item.note}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-[#1cb0f6] bg-[#1cb0f6] text-white"
                            : "border-zinc-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="w-full pt-3">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-medium text-sm transition-all shadow-xs cursor-pointer active:scale-[0.99]"
                >
                  Save and go to College Applications
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
