"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShieldCheck, Tag, Sparkles, ChevronRight } from "lucide-react";

// ============================================================================
// SVG ICONS & LAUREL WREATH
// ============================================================================

function LaurelWreathRating() {
  return (
    <div className="flex items-center justify-center gap-3 select-none">
      {/* Left Laurel Branch */}
      <svg viewBox="0 0 40 80" className="w-8 h-16 text-[#eab308] fill-current shrink-0">
        <path d="M35 75 C25 65 15 50 18 35 C20 25 25 15 32 5 C30 12 24 20 22 30 C20 42 28 58 35 75 Z" opacity="0.3" />
        {/* Leaves */}
        <path d="M30 68 C22 66 18 58 24 54 C28 56 31 62 30 68 Z" />
        <path d="M24 55 C16 52 13 44 20 40 C23 42 26 49 24 55 Z" />
        <path d="M21 42 C14 38 12 30 19 26 C22 28 24 35 21 42 Z" />
        <path d="M22 28 C16 23 15 15 22 12 C24 15 25 22 22 28 Z" />
        <path d="M26 15 C22 9 24 3 30 2 C31 5 30 11 26 15 Z" />
        <path d="M35 60 C31 58 30 52 34 50 C37 52 38 56 35 60 Z" />
        <path d="M30 46 C27 44 26 38 30 36 C33 38 34 42 30 46 Z" />
        <path d="M29 33 C26 31 26 25 29 23 C32 25 33 29 29 33 Z" />
      </svg>

      {/* Center Rating Content */}
      <div className="flex flex-col items-center justify-center text-center px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight font-dm-sans">
            4.9
          </span>
          <div className="flex items-center gap-0.5 text-[#facc15]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-[13px] font-medium text-[#fb923c] mt-0.5 tracking-tight">
          Loved by 450k+ students worldwide
        </p>
      </div>

      {/* Right Laurel Branch */}
      <svg viewBox="0 0 40 80" className="w-8 h-16 text-[#eab308] fill-current shrink-0 -scale-x-100">
        <path d="M35 75 C25 65 15 50 18 35 C20 25 25 15 32 5 C30 12 24 20 22 30 C20 42 28 58 35 75 Z" opacity="0.3" />
        <path d="M30 68 C22 66 18 58 24 54 C28 56 31 62 30 68 Z" />
        <path d="M24 55 C16 52 13 44 20 40 C23 42 26 49 24 55 Z" />
        <path d="M21 42 C14 38 12 30 19 26 C22 28 24 35 21 42 Z" />
        <path d="M22 28 C16 23 15 15 22 12 C24 15 25 22 22 28 Z" />
        <path d="M26 15 C22 9 24 3 30 2 C31 5 30 11 26 15 Z" />
        <path d="M35 60 C31 58 30 52 34 50 C37 52 38 56 35 60 Z" />
        <path d="M30 46 C27 44 26 38 30 36 C33 38 34 42 30 46 Z" />
        <path d="M29 33 C26 31 26 25 29 23 C32 25 33 29 29 33 Z" />
      </svg>
    </div>
  );
}

// Perforated Tearable Golden Coupon Component
function GoldenCouponTicket({ isTorn }: { isTorn: boolean }) {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[120px] flex items-center justify-center select-none filter drop-shadow-[0_10px_25px_rgba(202,138,4,0.18)]">
      {/* Sparkle burst when torn */}
      <AnimatePresence>
        {isTorn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 1.8] }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <Sparkles className="w-16 h-16 text-[#facc15] animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full flex items-center justify-center relative">
        {/* LEFT PIECE: Golden 40% Off Ticket */}
        <motion.div
          animate={
            isTorn
              ? {
                  x: -36,
                  y: 10,
                  rotate: -8,
                  opacity: 0.88,
                  scale: 0.95,
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[72%] h-full rounded-l-2xl overflow-hidden shadow-md flex flex-col justify-center px-6"
          style={{
            background:
              "linear-gradient(135deg, #f7d58b 0%, #d4a341 45%, #b5831f 100%)",
          }}
        >
          {/* Top Notch Cutout */}
          <div className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#131418] border border-black/10 z-20" />
          {/* Bottom Notch Cutout */}
          <div className="absolute -bottom-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#131418] border border-black/10 z-20" />

          {/* Left subtle ticket scallops */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-5 rounded-r-full bg-[#131418]" />

          {/* Ticket Content */}
          <div className="relative z-10 space-y-0.5">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#18181b] tracking-tight leading-none font-dm-sans">
              40% Off
            </h3>
            <p className="text-xs font-semibold text-[#451a03]/80 tracking-normal">
              One-time offer
            </p>
          </div>

          {/* Inner metallic gold sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/10 pointer-events-none" />
        </motion.div>

        {/* RIGHT PIECE: White Ticket Stub */}
        <motion.div
          animate={
            isTorn
              ? {
                  x: 36,
                  y: -10,
                  rotate: 8,
                  opacity: 0.88,
                  scale: 0.95,
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[28%] h-full bg-white rounded-r-2xl overflow-hidden shadow-md flex items-center justify-center border-l border-dashed border-zinc-400"
        >
          {/* Top Notch Cutout */}
          <div className="absolute -top-3.5 -left-3.5 w-7 h-7 rounded-full bg-[#131418] border border-black/10 z-20" />
          {/* Bottom Notch Cutout */}
          <div className="absolute -bottom-3.5 -left-3.5 w-7 h-7 rounded-full bg-[#131418] border border-black/10 z-20" />

          {/* Right perforated scalloped edge */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 -mr-1.5 rounded-full bg-[#131418]"
              />
            ))}
          </div>

          {/* Subtle watermark logo on stub */}
          <div className="w-7 h-7 rounded-full border border-zinc-300/60 flex items-center justify-center text-zinc-300 font-bold text-[10px]">
            1P
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN ONBOARDING WELCOME OFFER & PRO PAGE
// ============================================================================

export default function OnboardingOfferFlow() {
  const router = useRouter();

  // Screen 1: "offer" (Welcome offer for you with coupon)
  // Screen 2: "pro" (Unlock everything with PRO)
  const [currentScreen, setCurrentScreen] = useState<"offer" | "pro">("offer");

  // Press & Hold State
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [isTorn, setIsTorn] = useState<boolean>(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Pro Pricing Selection ("monthly" | "quarterly" | "annually")
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly" | "annually">("annually");

  // Countdown timer for 40% offer (Image 2: 47:57:31)
  const [secondsLeft, setSecondsLeft] = useState<number>(47 * 3600 + 57 * 60 + 31);

  // Payment "Coming Soon" Modal
  const [showSoonModal, setShowSoonModal] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
  };

  // Press and Hold Handlers
  const startHold = () => {
    if (isTorn) return;
    setIsPressing(true);

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds to fill

    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setIsPressing(false);
        triggerCouponTear();
      }
    }, 20);
  };

  const endHold = () => {
    if (isTorn) return;
    setIsPressing(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    // Smooth drain back to 0
    setHoldProgress(0);
  };

  const triggerCouponTear = () => {
    setIsTorn(true);
    // After 650ms tear animation, transition cleanly into Screen 2 (PRO)
    setTimeout(() => {
      setCurrentScreen("pro");
    }, 650);
  };

  const handleSkipToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-dm-sans flex flex-col justify-between selection:bg-[#38bdf8] selection:text-black relative overflow-x-hidden">
      {/* ---------------- TOP PROGRESS BAR ---------------- */}
      <div className="w-full pt-6 pb-2 px-6 flex flex-col items-center">
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "50%" }}
              animate={{ width: currentScreen === "offer" ? "68%" : "88%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full bg-[#0ea5e9] rounded-full"
            />
          </div>
        </div>
      </div>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-6 max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {/* ============================================================ */}
          {/* SCREEN 1: A WELCOME OFFER FOR YOU (Screenshot 1)             */}
          {/* ============================================================ */}
          {currentScreen === "offer" && (
            <motion.div
              key="screen-welcome-offer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md flex flex-col items-center text-center space-y-6"
            >
              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white leading-tight font-dm-sans">
                A welcome offer for you
              </h1>

              {/* Laurel Wreath & Rating */}
              <LaurelWreathRating />

              {/* Coupon Container Card */}
              <div className="w-full p-6 sm:p-7 rounded-3xl bg-[#131418] border border-zinc-800/80 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                {/* Subtle golden ambient glow behind the ticket */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-[#ca8a04]/15 blur-3xl pointer-events-none rounded-full" />

                <GoldenCouponTicket isTorn={isTorn} />
              </div>

              {/* Buttons */}
              <div className="w-full space-y-3 pt-2">
                {/* Press & Hold to Claim Button */}
                <div
                  onMouseDown={startHold}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                  className={`w-full relative overflow-hidden rounded-2xl py-3.5 px-6 font-semibold text-sm transition-all select-none cursor-pointer text-center shadow-lg active:scale-[0.98] ${
                    isTorn
                      ? "bg-[#22c55e] text-white"
                      : "bg-[#d4a341] text-[#18181b] hover:bg-[#deb459]"
                  }`}
                  style={{
                    boxShadow: isPressing
                      ? "0 0 25px rgba(234, 179, 8, 0.45)"
                      : "0 4px 14px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Progress Fill Layer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#b5831f] to-[#ca8a04] pointer-events-none"
                    style={{
                      width: `${holdProgress}%`,
                      transition: isPressing ? "width 0.05s linear" : "width 0.25s ease-out",
                    }}
                  />

                  {/* Button Label */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isTorn ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Claimed! Opening offer...</span>
                      </>
                    ) : (
                      <>
                        <span>Press & Hold to Claim</span>
                        {holdProgress > 0 && (
                          <span className="text-xs opacity-75 font-mono">
                            {Math.round(holdProgress)}%
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </div>

                {/* Skip Offer Button */}
                <button
                  type="button"
                  onClick={handleSkipToDashboard}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#18191f] hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-all cursor-pointer"
                >
                  Skip offer
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* SCREEN 2: UNLOCK EVERYTHING WITH PRO (Screenshot 2)          */}
          {/* ============================================================ */}
          {currentScreen === "pro" && (
            <motion.div
              key="screen-unlock-pro"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg space-y-6 pb-6"
            >
              {/* Top Countdown Pill Banner */}
              <div className="rounded-2xl border border-[#ca8a04]/40 bg-[#171510] px-4 py-2.5 flex items-center justify-between text-xs shadow-lg max-w-md mx-auto">
                <div className="flex items-center gap-2 text-[#facc15] font-semibold">
                  <Tag className="w-3.5 h-3.5 rotate-90" />
                  <span>Welcome offer 40%</span>
                </div>
                <div className="font-mono text-zinc-200 font-semibold tracking-wider">
                  {formatTimer(secondsLeft)}
                </div>
              </div>

              {/* Title with PRO Badge */}
              <div className="text-center pt-1">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white flex items-center justify-center gap-2">
                  <span>Unlock everything with</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#d97706] text-white font-bold text-sm tracking-wide shadow-xs">
                    PRO
                  </span>
                </h2>
              </div>

              {/* Comparison Table */}
              <div className="w-full rounded-3xl bg-[#111216] border border-zinc-800/80 p-5 sm:p-6 shadow-xl relative overflow-hidden">
                {/* Header Row */}
                <div className="grid grid-cols-12 pb-3.5 border-b border-zinc-800/60 text-xs text-zinc-400 font-medium items-center">
                  <div className="col-span-8 text-left" />
                  <div className="col-span-2 text-center text-zinc-400 font-medium">Free</div>
                  <div className="col-span-2 text-center text-[#facc15] font-bold">Pro</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-zinc-800/40 text-xs sm:text-[13px]">
                  {[
                    {
                      title: "SAT practice questions",
                      free: true,
                      pro: true,
                    },
                    {
                      title: "Unlimited Preppy AI chat & feedback",
                      free: false,
                      pro: true,
                    },
                    {
                      title: "Unlimited question walkthroughs",
                      free: false,
                      pro: true,
                    },
                    {
                      title: "14 full-length practice tests",
                      free: false,
                      pro: true,
                    },
                    {
                      title: "Unlock 300+ challenge questions",
                      free: false,
                      pro: true,
                    },
                    {
                      title: "Access to the OnePrep SAT Masterclass",
                      free: false,
                      pro: true,
                    },
                  ].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 py-3 items-center">
                      <div className="col-span-8 text-left text-zinc-200 font-normal pr-2">
                        {row.title}
                      </div>

                      {/* Free Column */}
                      <div className="col-span-2 flex justify-center">
                        {row.free ? (
                          <div className="w-4 h-4 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-600 flex items-center justify-center">
                            <X className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                        )}
                      </div>

                      {/* Pro Column */}
                      <div className="col-span-2 flex justify-center">
                        <div className="w-4 h-4 rounded-full bg-[#ca8a04] text-black flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="space-y-3 pt-1">
                {/* 1. Monthly */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan("monthly")}
                  className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all text-left flex items-center justify-between cursor-pointer ${
                    selectedPlan === "monthly"
                      ? "border-[#eab308] bg-[#1a1711] shadow-lg ring-1 ring-[#eab308]/40"
                      : "border-zinc-800 bg-[#111216] hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-4 h-4 mt-0.5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${
                        selectedPlan === "monthly"
                          ? "border-[#eab308] bg-[#eab308] text-black"
                          : "border-zinc-600 bg-transparent"
                      }`}
                    >
                      {selectedPlan === "monthly" && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-sm font-semibold text-white">Monthly</h4>
                      <p className="text-xs text-zinc-400">Billed monthly, cancel anytime.</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#fb923c] pt-0.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#fb923c]" />
                        <span>Money-back guarantee</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#eab308] text-black font-bold text-[10px] tracking-wide">
                      40% off
                    </span>
                    <div className="flex items-baseline gap-1.5 justify-end">
                      <span className="text-xs text-zinc-500 line-through font-medium">$165</span>
                      <span className="text-lg font-bold text-white">$99</span>
                      <span className="text-xs text-zinc-400">/month</span>
                    </div>
                  </div>
                </button>

                {/* 2. Quarterly */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan("quarterly")}
                  className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all text-left flex items-center justify-between cursor-pointer ${
                    selectedPlan === "quarterly"
                      ? "border-[#eab308] bg-[#1a1711] shadow-lg ring-1 ring-[#eab308]/40"
                      : "border-zinc-800 bg-[#111216] hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-4 h-4 mt-0.5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${
                        selectedPlan === "quarterly"
                          ? "border-[#eab308] bg-[#eab308] text-black"
                          : "border-zinc-600 bg-transparent"
                      }`}
                    >
                      {selectedPlan === "quarterly" && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-sm font-semibold text-white">Quarterly</h4>
                      <p className="text-xs text-zinc-400">Billed every 3 months, cancel anytime.</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#fb923c] pt-0.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#fb923c]" />
                        <span>Money-back guarantee</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#eab308] text-black font-bold text-[10px] tracking-wide">
                      40% off
                    </span>
                    <div className="flex items-baseline gap-1.5 justify-end">
                      <span className="text-xs text-zinc-500 line-through font-medium">$115</span>
                      <span className="text-lg font-bold text-white">$69</span>
                      <span className="text-xs text-zinc-400">/month</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">$207 every 3 months</p>
                  </div>
                </button>

                {/* 3. Annually (Selected by default in screenshot) */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan("annually")}
                  className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all text-left flex items-center justify-between cursor-pointer ${
                    selectedPlan === "annually"
                      ? "border-[#eab308] bg-[#1a1711] shadow-lg ring-1 ring-[#eab308]/40"
                      : "border-zinc-800 bg-[#111216] hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-4 h-4 mt-0.5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${
                        selectedPlan === "annually"
                          ? "border-[#eab308] bg-[#eab308] text-black"
                          : "border-zinc-600 bg-transparent"
                      }`}
                    >
                      {selectedPlan === "annually" && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">Annually</h4>
                        <span className="text-[10px] font-bold text-[#facc15] bg-[#ca8a04]/20 border border-[#ca8a04]/40 px-1.5 py-0.2 rounded">
                          Best value
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">Billed annually, cancel anytime.</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#fb923c] pt-0.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#fb923c]" />
                        <span>Money-back guarantee</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#eab308] text-black font-bold text-[10px] tracking-wide">
                      40% off
                    </span>
                    <div className="flex items-baseline gap-1.5 justify-end">
                      <span className="text-xs text-zinc-500 line-through font-medium">$65</span>
                      <span className="text-lg font-bold text-white">$39</span>
                      <span className="text-xs text-zinc-400">/month</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">$468 billed annually</p>
                  </div>
                </button>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-3 pt-3">
                {/* Pay / Continue Button -> Triggers "Soon" notification */}
                <button
                  type="button"
                  onClick={() => setShowSoonModal(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d4a341] to-[#eab308] hover:from-[#deb459] hover:to-[#facc15] text-[#18181b] font-bold text-sm tracking-wide transition-all shadow-xl shadow-[#ca8a04]/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    Continue with {selectedPlan === "annually" ? "$39/mo" : selectedPlan === "quarterly" ? "$69/mo" : "$99/mo"}
                  </span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>

                {/* Skip to Dashboard */}
                <button
                  type="button"
                  onClick={handleSkipToDashboard}
                  className="w-full py-3 px-6 text-zinc-400 hover:text-white text-xs font-medium transition-colors text-center cursor-pointer"
                >
                  Skip offer & go to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ---------------- "SOON" PAYMENT MODAL ---------------- */}
      <AnimatePresence>
        {showSoonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm rounded-3xl bg-[#17181d] border border-zinc-800 p-6 text-center space-y-4 shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ca8a04]/20 border border-[#ca8a04]/40 text-[#facc15] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ca8a04] text-black font-bold text-[11px] uppercase tracking-wider">
                  Soon
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  To&apos;lov tizimi tez kunda!
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Xavfsiz to&apos;lov integratsiyasi yakunlanmoqda. Hozircha platformaning barcha imkoniyatlaridan bepul foydalanishingiz mumkin!
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSoonModal(false);
                    router.push("/dashboard");
                  }}
                  className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-all shadow-md cursor-pointer"
                >
                  Dashboardga o&apos;tish
                </button>
                <button
                  type="button"
                  onClick={() => setShowSoonModal(false)}
                  className="w-full py-2 rounded-xl text-zinc-500 hover:text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Yopish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
