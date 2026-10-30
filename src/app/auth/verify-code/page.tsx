"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function CharacterMascot({
  size = 36,
  isHappy = true,
}: {
  size?: number;
  isHappy?: boolean;
}) {
  return (
    <div
      className="relative flex flex-col items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="charGradVerify" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#76E4F7" />
              <stop offset="50%" stopColor="#48CAE4" />
              <stop offset="100%" stopColor="#00B4D8" />
            </linearGradient>
          </defs>

          <path
            d="M 28 65 
               C 18 65, 12 55, 15 45 
               C 12 36, 18 28, 28 28 
               C 32 20, 42 16, 52 18 
               C 60 14, 72 18, 76 28 
               C 85 28, 90 36, 88 46 
               C 92 56, 84 66, 74 65 
               Z"
            fill="url(#charGradVerify)"
          />

          {isHappy ? (
            <>
              <path
                d="M 36 46 Q 41 40 46 46"
                stroke="#0C4A6E"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 58 46 Q 63 40 68 46"
                stroke="#0C4A6E"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              <ellipse cx="40" cy="46" rx="4.5" ry="6" fill="#0C4A6E" />
              <ellipse cx="62" cy="46" rx="4.5" ry="6" fill="#0C4A6E" />
              <circle cx="42" cy="44" r="2" fill="#FFFFFF" />
              <circle cx="39" cy="48" r="0.8" fill="#FFFFFF" />
              <circle cx="64" cy="44" r="2" fill="#FFFFFF" />
              <circle cx="61" cy="48" r="0.8" fill="#FFFFFF" />
            </>
          )}

          <circle cx="29" cy="52" r="4.2" fill="#FB7185" opacity="0.85" />
          <circle cx="73" cy="52" r="4.2" fill="#FB7185" opacity="0.85" />

          <path
            d="M 46 53 Q 51 58 56 53"
            stroke="#0C4A6E"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

function VerifyCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "diwexo8522@hopefunder.com";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(59);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    const fullCode = nextOtp.join("");
    if (fullCode.length === 6) {
      triggerVerify();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const nextOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      nextOtp[i] = pasted[i] || "";
    }
    setOtp(nextOtp);

    const nextFocus = Math.min(pasted.length, 5);
    otpInputRefs.current[nextFocus]?.focus();

    if (pasted.length === 6) {
      triggerVerify();
    }
  };

  const triggerVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-dm-sans flex flex-col justify-between selection:bg-[#38bdf8] selection:text-white relative">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full space-y-6"
        >
          {/* Mascot + Logo */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <CharacterMascot size={36} isHappy={true} />
            <span className="text-2xl font-bold tracking-tight text-zinc-950 font-dm-sans">OnePrep</span>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 font-dm-sans">
              Verify your email
            </h1>
            <div className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              <p>Enter the code sent to</p>
              <p className="font-medium text-zinc-900">{emailParam}</p>
            </div>
          </div>

          {/* 6 OTP Code Input Boxes */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 pt-2" onPaste={handleOtpPaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  otpInputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className="w-10 h-12 sm:w-11 sm:h-13 rounded-xl border border-zinc-200 bg-white text-center text-lg sm:text-xl font-medium text-zinc-900 shadow-2xs focus:border-[#1cb0f6] focus:ring-2 focus:ring-[#1cb0f6]/30 focus:outline-none transition-all"
              />
            ))}
          </div>

          {/* Resend Timer Prompt */}
          <div className="text-xs text-zinc-500 pt-1">
            Didn&apos;t receive a code?{" "}
            {resendTimer > 0 ? (
              <span className="text-zinc-500">Resend ({resendTimer})</span>
            ) : (
              <button
                type="button"
                onClick={() => setResendTimer(59)}
                className="underline font-medium text-zinc-800 hover:text-black cursor-pointer"
              >
                Resend
              </button>
            )}
          </div>

          {/* Verify Button */}
          <div className="w-full max-w-xs mx-auto pt-1">
            <button
              type="button"
              disabled={otp.join("").length < 6 || isVerifying}
              onClick={triggerVerify}
              className={`w-full py-3 rounded-full text-sm font-medium text-white transition-all shadow-xs cursor-pointer ${
                isVerifying
                  ? "bg-[#8b8b8b] cursor-wait"
                  : otp.join("").length === 6
                  ? "bg-black hover:bg-zinc-800"
                  : "bg-[#adadad] cursor-not-allowed opacity-90"
              }`}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </button>
          </div>

          {/* Wrong email? Go back */}
          <div className="pt-2 text-xs text-zinc-500">
            Wrong email?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-zinc-900 underline hover:text-black cursor-pointer ml-0.5"
            >
              Go back
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerifyCodeContent />
    </Suspense>
  );
}
