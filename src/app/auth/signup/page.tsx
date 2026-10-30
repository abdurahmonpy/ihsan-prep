"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";

// ============================================================================
// ICONS & MASCOTS
// ============================================================================

function CharacterMascot({
  size = 100,
  isHappy = false,
  isSmall = false,
}: {
  size?: number;
  isHappy?: boolean;
  isSmall?: boolean;
}) {
  return (
    <div
      className="relative flex flex-col items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={{
          y: isSmall ? [0, -3, 0] : [0, -7, 0],
          rotate: isSmall ? [0, 1, 0, -1, 0] : [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full relative flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="charGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#76E4F7" />
              <stop offset="50%" stopColor="#48CAE4" />
              <stop offset="100%" stopColor="#00B4D8" />
            </linearGradient>
          </defs>
          <path
            d="M 28 65 C 18 65, 12 55, 15 45 C 12 36, 18 28, 28 28 C 32 20, 42 16, 52 18 C 60 14, 72 18, 76 28 C 85 28, 90 36, 88 46 C 92 56, 84 66, 74 65 Z"
            fill="url(#charGrad)"
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
      </motion.div>
      <motion.div
        animate={{ scale: [1, 0.85, 1], opacity: [0.35, 0.22, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="bg-zinc-300 rounded-full blur-[2px] mt-1"
        style={{
          width: isSmall ? "36px" : "60px",
          height: isSmall ? "5px" : "9px",
        }}
      />
    </div>
  );
}

function EnvelopeMascot() {
  return (
    <div className="relative flex flex-col items-center justify-center mb-4">
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2 right-8 text-[#38bdf8] pointer-events-none"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
        </svg>
      </motion.div>
      <motion.div
        animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-12 left-6 text-[#38bdf8] pointer-events-none"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
        </svg>
      </motion.div>
      <div className="relative">
        <svg viewBox="0 0 160 120" className="w-36 h-28 drop-shadow-sm -rotate-6">
          <rect x="10" y="25" width="140" height="90" rx="8" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="2" />
          <polygon points="10,25 80,75 150,25" fill="#BAE6FD" opacity="0.6" />
          <polyline points="10,115 65,65" stroke="#BAE6FD" strokeWidth="2" />
          <polyline points="150,115 95,65" stroke="#BAE6FD" strokeWidth="2" />
        </svg>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10">
          <CharacterMascot size={74} isHappy={true} isSmall={true} />
        </div>
      </div>
    </div>
  );
}

function StudentIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      <polygon points="24,11 43,18 24,25 5,18" fill="#312E81" />
      <path d="M12 21.5 V 29 C 12 34, 36 34, 36 29 V 21.5" fill="#1E1B4B" />
      <path d="M37 19.5 L39 28 L40.5 31" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="40.5" cy="31.5" r="1.5" fill="#F59E0B" />
      <circle cx="24" cy="18" r="1.8" fill="#FBBF24" />
    </svg>
  );
}

function ParentIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      <polygon points="24,10 41,23 37,23 37,36 11,36 11,23 7,23" fill="#FDA4AF" />
      <polygon points="24,10 41,23 38,23 24,13 10,23 7,23" fill="#FB7185" />
      <rect x="13" y="22" width="22" height="15" rx="3" fill="#FFF1F2" />
      <path
        d="M24 32 C24 32 20 28.5 20 26.5 C20 25 21.5 24 23 25 C23.5 25.5 24 26 24 26 C24 26 24.5 25.5 25 25 C26.5 24 28 25 28 26.5 C28 28.5 24 32 24 32 Z"
        fill="#F43F5E"
      />
    </svg>
  );
}

function TutorIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <line x1="24" y1="6" x2="24" y2="9" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="12" x2="14" y2="14" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="12" x2="34" y2="14" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="23" x2="11" y2="23" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="23" x2="37" y2="23" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M24 11 C17.5 11 14 16 14 21 C14 24.5 17 28 19 30 L19 33 L29 33 L29 30 C31 28 34 24.5 34 21 C34 16 30.5 11 24 11 Z"
        fill="#FACC15"
      />
      <path d="M21 16 Q24 14 27 16" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="20" y="33" width="8" height="2.5" rx="1" fill="#94A3B8" />
      <rect x="21" y="35.5" width="6" height="2" rx="1" fill="#64748B" />
      <path d="M22 37.5 Q24 39 26 37.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function TeacherIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <line x1="16" y1="36" x2="12" y2="43" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="36" x2="36" y2="43" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="9" y="13" width="30" height="22" rx="4" fill="#B45309" />
      <rect x="11.5" y="15.5" width="25" height="17" rx="2.5" fill="#047857" />
      <text
        x="24"
        y="27.5"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="bold"
        fontFamily="sans-serif"
        fill="#FFFFFF"
        letterSpacing="0.5"
      >
        A+
      </text>
      <rect x="14" y="33" width="20" height="2" rx="1" fill="#F59E0B" />
      <rect x="26" y="32" width="4" height="1.5" rx="0.5" fill="#FFFFFF" />
    </svg>
  );
}

function FriendFamilyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9">
      <circle cx="19" cy="16" r="4.5" fill="#F472B6" />
      <path d="M12 32 C12 25.5, 26 25.5, 26 32" fill="#F472B6" />
      <circle cx="29" cy="19" r="4.5" fill="#38BDF8" />
      <path d="M22 33 C22 27, 36 27, 36 33" fill="#38BDF8" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <path
        d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.112a2.896 2.896 0 0 1 2.373-4.529c.358 0 .7.067 1.016.188V9.431a6.34 6.34 0 0 0-1.016-.082A6.341 6.341 0 0 0 3.136 15.69a6.341 6.341 0 0 0 6.342 6.341c3.502 0 6.341-2.839 6.341-6.341V8.653a8.21 8.21 0 0 0 4.77 1.517v-3.484h-1z"
        fill="#000000"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <defs>
        <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igGrad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#5865F2]" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-zinc-900">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.05 1.69-.92 2.71 1 .08 2.02-.51 2.61-1.2" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="2" y="2" width="9" height="9" fill="#F25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
      <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function CommonAppLogo({ isSelected }: { isSelected?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-5 h-5 shrink-0 ${isSelected ? "text-[#0284c7]" : "text-[#0ea5e9]"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 L5 15 L12 11 L19 15 Z" />
      <path d="M12 11 L12 21" />
    </svg>
  );
}

function UCLogo() {
  return (
    <div className="w-5 h-5 rounded bg-[#005581] flex items-center justify-center text-white shrink-0 shadow-2xs">
      <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.5" />
        <path d="M6.5 7.5h7M6.5 10.5h7M6.5 13.5h4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function UCASLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0 text-zinc-900"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 16L12 8L19 16" />
    </svg>
  );
}

function MITLogo() {
  return (
    <svg viewBox="0 0 32 16" className="w-6 h-3.5 shrink-0 text-zinc-700" fill="currentColor">
      <rect x="0" y="0" width="3" height="16" />
      <rect x="5" y="6" width="3" height="10" />
      <rect x="10" y="0" width="3" height="16" />
      <rect x="15" y="0" width="3" height="16" />
      <rect x="20" y="6" width="3" height="10" />
      <rect x="25" y="0" width="3" height="16" />
    </svg>
  );
}

// ============================================================================
// ANIMATIONS & SHARED UI HELPERS
// ============================================================================

function WordBlurReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, filter: "blur(8px)", y: 3 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.35,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}{i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

function SpeechBubbleHeader({
  title,
  subtitle,
  isStatic = false,
  highlightUnderlineText,
}: {
  title: string;
  subtitle?: string;
  isStatic?: boolean;
  highlightUnderlineText?: string;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <CharacterMascot size={64} isHappy={true} isSmall={true} />
      <div className="relative flex-1">
        <div className="rounded-2xl border border-zinc-200/90 bg-white px-5 py-3 shadow-2xs relative">
          <h2 className="text-xl tracking-[-0.01em] font-medium leading-[1.25] text-zinc-950">
            {highlightUnderlineText ? (
              <>
                {title.split(highlightUnderlineText)[0]}
                <span className="underline decoration-[#1cb0f6] decoration-2 underline-offset-4">
                  {highlightUnderlineText}
                </span>
                {title.split(highlightUnderlineText)[1]}
              </>
            ) : isStatic ? (
              title
            ) : (
              <WordBlurReveal text={title} delay={0.1} />
            )}
          </h2>
          {subtitle && (
            <p className="text-sm text-zinc-500 mt-0.5 leading-snug">{subtitle}</p>
          )}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[7px] border-r-white" />
          <div className="absolute top-1/2 -left-[9px] -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[8px] border-r-zinc-200 -z-10" />
        </div>
      </div>
    </div>
  );
}

function StepNavigationFooter({
  onBack,
  onContinue,
  continueDisabled = false,
  showSkip = false,
  onSkip,
  continueText = "Continue",
}: {
  onBack?: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  showSkip?: boolean;
  onSkip?: () => void;
  continueText?: string;
}) {
  return (
    <div className="space-y-4 pt-3">
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium transition-all cursor-pointer"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-4">
          {showSkip && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
            >
              Skip
            </button>
          )}

          <button
            type="button"
            onClick={onContinue}
            disabled={continueDisabled}
            className={`rounded-full px-7 py-2.5 text-xs font-medium transition-all flex items-center gap-1 ${
              !continueDisabled
                ? "bg-black hover:bg-zinc-800 text-white shadow-md active:scale-95 cursor-pointer"
                : "bg-zinc-400/70 text-white cursor-not-allowed opacity-75"
            }`}
          >
            <span>{continueText}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-zinc-500 font-medium">
        Already have an account?{" "}
        <Link href="/dashboard" className="underline font-bold text-zinc-800 hover:text-black">
          Sign in
        </Link>
      </p>
    </div>
  );
}

const pageVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? -60 : 60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? 60 : -60,
    opacity: 0,
  }),
};

type RoleType = "student" | "parent" | "tutor" | "teacher" | null;

// ============================================================================
// MAIN COMPONENT & STATE MACHINE
// ============================================================================

export default function SignupFlow() {
  const router = useRouter();

  // Root Step State
  // 1: Intro 1 ("Hey there, I'm Preppy!")
  // 2: Intro 2 ("I'm here to help you get the best score possible.")
  // 3: Role Selection ("Let's start! Who are you?")
  // >= 4: Role-specific step index based on selectedRole
  const [step, setStep] = useState<number>(1);
  const [roleStepIndex, setRoleStepIndex] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Selections
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const isParent = selectedRole === "parent";
  const isTutor = selectedRole === "tutor";
  const isTeacher = selectedRole === "teacher";

  // Role Questions
  const [studentYear, setStudentYear] = useState<string>("Class of 2029");
  const [parentYear, setParentYear] = useState<string>("Other");
  const [parentGoal, setParentGoal] = useState<string | null>(null);
  const [tutorCount, setTutorCount] = useState<string>("6–10 students");
  const [teacherCount, setTeacherCount] = useState<string | null>(null);

  // Exams (Multi-select)
  const [prepExams, setPrepExams] = useState<string[]>(["College Applications"]);

  // Colleges (Multi-select)
  const [selectedColleges, setSelectedColleges] = useState<string[]>(["Common App"]);

  // Shared Final Steps State
  const [heardSource, setHeardSource] = useState<string | null>(null);
  const [sendEmailUpdates, setSendEmailUpdates] = useState<boolean>(true);

  // Step 10: Create Account Form
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [redirectingProvider, setRedirectingProvider] = useState<"google" | "apple" | "microsoft" | null>(null);

  // Step 11: OTP Verification
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(59);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sequence of Step IDs per role
  const getRoleSteps = (role: RoleType): string[] => {
    if (role === "parent") {
      return [
        "parent-year",
        "parent-goal",
        "parent-achieve",
        "parent-results",
        "heard",
        "stay-updated",
        "create-account",
        "verify-email",
      ];
    }
    if (role === "tutor" || role === "teacher") {
      return [
        "exams",
        "colleges",
        "heard",
        "stay-updated",
        "create-account",
        "verify-email",
      ];
    }
    // student
    return [
      "student-year",
      "exams",
      "colleges",
      "heard",
      "stay-updated",
      "create-account",
      "verify-email",
    ];
  };

  const currentRoleSteps = getRoleSteps(selectedRole);
  const currentStepId = step < 4 ? `intro-${step}` : currentRoleSteps[roleStepIndex] || "heard";

  // Navigation handlers
  const navigateForward = () => {
    setDirection(1);
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else if (step === 3) {
      // Role selected -> enter role steps
      if (selectedRole === "tutor" || selectedRole === "teacher") {
        setPrepExams(["College Applications", "IB MYP"]);
      }
      setRoleStepIndex(0);
      setStep(4);
    } else {
      if (roleStepIndex < currentRoleSteps.length - 1) {
        setRoleStepIndex((prev) => prev + 1);
      }
    }
  };

  const navigateBackward = () => {
    setDirection(-1);
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step >= 4) {
      if (roleStepIndex > 0) {
        setRoleStepIndex((prev) => prev - 1);
      } else {
        setStep(3); // back to role selection
      }
    }
  };

  const jumpToRoleStep = (targetId: string) => {
    const idx = currentRoleSteps.indexOf(targetId);
    if (idx !== -1) {
      setDirection(idx > roleStepIndex ? 1 : -1);
      setRoleStepIndex(idx);
      setStep(4);
    } else {
      setDirection(-1);
      setStep(3);
    }
  };

  const handleTutorCountSelect = (item: string) => {
    setTutorCount(item);
    setPrepExams(["College Applications", "IB MYP"]);
    setTimeout(() => {
      setDirection(1);
      setRoleStepIndex(0);
      setStep(4);
    }, 150);
  };

  const handleTeacherCountSelect = (item: string) => {
    setTeacherCount(item);
    setPrepExams(["College Applications", "IB MYP"]);
    setTimeout(() => {
      setDirection(1);
      setRoleStepIndex(0);
      setStep(4);
    }, 150);
  };

  // OTP Countdown Timer
  useEffect(() => {
    if (currentStepId !== "verify-email") return;
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStepId, resendTimer]);

  const toggleExam = (exam: string) => {
    if (prepExams.includes(exam)) {
      setPrepExams(prepExams.filter((e) => e !== exam));
    } else {
      setPrepExams([...prepExams, exam]);
    }
  };

  const toggleCollege = (college: string) => {
    if (college === "Not sure yet") {
      if (selectedColleges.includes("Not sure yet")) {
        setSelectedColleges([]);
      } else {
        setSelectedColleges(["Not sure yet"]);
      }
      return;
    }

    const cleaned = selectedColleges.filter((c) => c !== "Not sure yet");
    if (cleaned.includes(college)) {
      setSelectedColleges(cleaned.filter((c) => c !== college));
    } else {
      setSelectedColleges([...cleaned, college]);
    }
  };

  const formattedExams =
    prepExams.length > 0
      ? prepExams
          .map((e) => (e === "College Applications" ? "COLLEGE" : e.replace("®", "")))
          .join(", ")
      : "COLLEGE";

  // Progress Bar percentage
  const getProgress = () => {
    if (step <= 2) return 0;
    if (step === 3) {
      if (isTutor || isTeacher) return 38;
      return 20;
    }
    // In role steps
    if (currentStepId === "create-account" || currentStepId === "verify-email") return 100;

    if (isParent) {
      const map: Record<string, number> = {
        "parent-year": 35,
        "parent-goal": 50,
        "parent-achieve": 65,
        "parent-results": 78,
        heard: 88,
        "stay-updated": 95,
      };
      return map[currentStepId] || 80;
    }

    if (isTutor || isTeacher) {
      const map: Record<string, number> = {
        exams: 46,
        colleges: 66,
        heard: 84,
        "stay-updated": 95,
      };
      return map[currentStepId] || 80;
    }

    // Student default
    const map: Record<string, number> = {
      "student-year": 38,
      exams: 52,
      colleges: 68,
      heard: 84,
      "stay-updated": 95,
    };
    return map[currentStepId] || 80;
  };

  // Social Login Click (Shows spinner + Redirecting...)
  const handleSocialClick = (provider: "google" | "apple" | "microsoft") => {
    setRedirectingProvider(provider);
    setTimeout(() => {
      router.push("/onboarding");
    }, 1400);
  };

  // Email Submit on Create Account Step -> Advances to verify-email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailToUse = email.trim() || "diwexo8522@hopefunder.com";
    setEmail(emailToUse);
    const fName = firstName.trim() || "John";
    const lName = lastName.trim() || "Doe";
    setFirstName(fName);
    setLastName(lName);

    if (typeof window !== "undefined") {
      window.history.pushState(
        null,
        "",
        `/auth/verify-code?email=${encodeURIComponent(emailToUse)}&firstName=${encodeURIComponent(fName)}&lastName=${encodeURIComponent(lName)}`
      );
    }

    setOtp(["", "", "", "", "", ""]);
    setResendTimer(59);
    setIsVerifying(false);

    navigateForward();
  };

  // OTP Digit Change
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

  const handleGoBackFromVerify = () => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/auth/signup");
    }
    navigateBackward();
  };

  const showProgressBar = step >= 3 && currentStepId !== "create-account" && currentStepId !== "verify-email";

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-dm-sans flex flex-col justify-between selection:bg-[#38bdf8] selection:text-white relative overflow-x-hidden">
      {/* ---------------- TOP HEADER / PROGRESS BAR ---------------- */}
      {showProgressBar && (
        <div className="w-full pt-6 pb-2 px-6 flex flex-col items-center">
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-[#0ea5e9] rounded-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MAIN CONTENT AREA WITH PAGE TRANSITIONS ---------------- */}
      <main
        className={`flex-1 flex flex-col items-center justify-center w-full relative ${
          currentStepId === "create-account" ? "p-0 max-w-none" : "px-4 py-8 max-w-2xl mx-auto"
        }`}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {/* ============================================================ */}
          {/* PAGES 1 & 2: INTRO WITH CHARACTER IN CENTER                  */}
          {/* ============================================================ */}
          {step <= 2 && (
            <motion.div
              key={`intro-step-${step}`}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center max-w-md w-full space-y-6"
            >
              <CharacterMascot size={110} isHappy={step === 2} />

              <div className="relative w-full max-w-xs">
                <div className="rounded-2xl border border-zinc-200/90 bg-white px-5 py-3.5 shadow-2xs relative">
                  <p className="text-base sm:text-lg font-medium tracking-tight text-zinc-950">
                    <WordBlurReveal
                      key={step === 1 ? "page-1-text" : "page-2-text"}
                      text={
                        step === 1
                          ? "Hey there, I'm Preppy!"
                          : "I'm here to help you get the best score possible."
                      }
                      delay={0.15}
                    />
                  </p>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white" />
                  <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[7px] border-b-zinc-200 -z-10" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={navigateForward}
                  className="rounded-full bg-black hover:bg-zinc-800 text-white px-7 py-2.5 text-xs font-medium shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <span>{step === 1 ? "Next" : "Let's go"}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PAGE 3: ROLE SELECTION ("Let's start! Who are you?")          */}
          {/* ============================================================ */}
          {step === 3 && (
            <motion.div
              key="step-3-role"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg space-y-6"
            >
              <SpeechBubbleHeader
                title="Let's start! Who are you?"
                subtitle="This helps us personalize your experience"
              />

              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "student", label: "Student", icon: <StudentIcon /> },
                  { id: "parent", label: "Parent", icon: <ParentIcon /> },
                  { id: "tutor", label: "Tutor", icon: <TutorIcon /> },
                  { id: "teacher", label: "Teacher", icon: <TeacherIcon /> },
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      if (selectedRole === role.id && (role.id === "student" || role.id === "parent")) {
                        navigateForward();
                      } else {
                        setSelectedRole(role.id as RoleType);
                      }
                    }}
                    onDoubleClick={() => {
                      setSelectedRole(role.id as RoleType);
                      if (role.id === "student" || role.id === "parent") {
                        navigateForward();
                      }
                    }}
                    className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer select-none ${
                      selectedRole === role.id
                        ? "border-[#1cb0f6] bg-[#cefbff] shadow-md ring-2 ring-[#1cb0f6]/40"
                        : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70"
                    }`}
                  >
                    {role.icon}
                    <span
                      className={`text-sm font-medium ${
                        selectedRole === role.id ? "text-[#0284c7]" : "text-zinc-800"
                      }`}
                    >
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Inline Questions for Tutor / Teacher */}
              <AnimatePresence mode="wait">
                {isTutor && (
                  <motion.div
                    key="tutor-inline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="pt-2 text-center space-y-4"
                  >
                    <h3 className="text-xl tracking-[-0.01em] font-medium leading-[1.25] text-zinc-950">
                      How many students do you tutor?
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        "1 student",
                        "2–5 students",
                        "6–10 students",
                        "11–20 students",
                        "21–50 students",
                        "50+ students",
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleTutorCountSelect(item)}
                          className={`py-3 px-4 rounded-xl text-center text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            tutorCount === item
                              ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                              : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-700"
                          }`}
                        >
                          {tutorCount === item && (
                            <span className="h-3.5 w-3.5 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                              <Check className="h-2 w-2 stroke-[3.5]" />
                            </span>
                          )}
                          <span>{item}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => handleTutorCountSelect("No students yet")}
                        className={`col-span-2 py-3 px-4 rounded-xl text-center text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          tutorCount === "No students yet"
                            ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                            : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-700"
                        }`}
                      >
                        {tutorCount === "No students yet" && (
                          <span className="h-3.5 w-3.5 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                            <Check className="h-2 w-2 stroke-[3.5]" />
                          </span>
                        )}
                        <span>No students yet</span>
                      </button>
                    </div>

                    <div className="pt-2 flex justify-center">
                      <button
                        onClick={navigateForward}
                        className="rounded-full bg-black hover:bg-zinc-800 text-white px-7 py-2.5 text-xs font-medium shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Continue</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {isTeacher && (
                  <motion.div
                    key="teacher-inline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="pt-2 text-center space-y-4"
                  >
                    <h3 className="text-xl tracking-[-0.01em] font-medium leading-[1.25] text-zinc-950">
                      How many students are taking the SAT at your school?
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        "1–10 students",
                        "11–25 students",
                        "26–50 students",
                        "51–100 students",
                        "101–250 students",
                        "250+ students",
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleTeacherCountSelect(item)}
                          className={`py-3 px-4 rounded-xl text-center text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            teacherCount === item
                              ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                              : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-700"
                          }`}
                        >
                          {teacherCount === item && (
                            <span className="h-3.5 w-3.5 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                              <Check className="h-2 w-2 stroke-[3.5]" />
                            </span>
                          )}
                          <span>{item}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => handleTeacherCountSelect("I don't know")}
                        className={`col-span-2 py-3 px-4 rounded-xl text-center text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          teacherCount === "I don't know"
                            ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                            : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-700"
                        }`}
                      >
                        {teacherCount === "I don't know" && (
                          <span className="h-3.5 w-3.5 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                            <Check className="h-2 w-2 stroke-[3.5]" />
                          </span>
                        )}
                        <span>I don&apos;t know</span>
                      </button>
                    </div>

                    <div className="pt-2 flex justify-center">
                      <button
                        onClick={navigateForward}
                        className="rounded-full bg-black hover:bg-zinc-800 text-white px-7 py-2.5 text-xs font-medium shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Continue</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {(!selectedRole || selectedRole === "student" || selectedRole === "parent") && (
                  <motion.div
                    key="student-parent-actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="pt-2 flex justify-center">
                      <button
                        onClick={navigateForward}
                        disabled={!selectedRole}
                        className={`rounded-full px-7 py-2.5 text-xs font-medium transition-all flex items-center gap-1 ${
                          selectedRole
                            ? "bg-black hover:bg-zinc-800 text-white shadow-md active:scale-95 cursor-pointer"
                            : "bg-zinc-400/70 text-white cursor-not-allowed opacity-75"
                        }`}
                      >
                        <span>Continue</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-xs text-zinc-500 font-medium">
                Already have an account?{" "}
                <Link href="/dashboard" className="underline font-bold text-zinc-800 hover:text-black">
                  Sign in
                </Link>
              </p>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* STUDENT STEP: GRADUATION YEAR                                */}
          {/* ============================================================ */}
          {currentStepId === "student-year" && (
            <motion.div
              key="student-year"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md space-y-6"
            >
              <SpeechBubbleHeader title="What year are you graduating?" />

              <div className="space-y-2.5 pt-1">
                {[
                  "Class of 2027",
                  "Class of 2028",
                  "Class of 2029",
                  "Class of 2030",
                  "Class of 2031",
                  "I've graduated",
                ].map((yr) => {
                  const isSelected = studentYear === yr;
                  return (
                    <button
                      key={yr}
                      onClick={() => setStudentYear(yr)}
                      className={`w-full py-3 px-6 rounded-2xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected
                          ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                          : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/80 text-zinc-700"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                        </span>
                      )}
                      <span>{yr}</span>
                    </button>
                  );
                })}
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
                continueDisabled={!studentYear}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PARENT STEP 1: CHILD'S GRADUATION YEAR                       */}
          {/* ============================================================ */}
          {currentStepId === "parent-year" && (
            <motion.div
              key="parent-year"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md space-y-6"
            >
              <SpeechBubbleHeader title="What's your child's graduation year?" />

              <div className="space-y-2.5 pt-1">
                {[
                  "Class of 2027",
                  "Class of 2028",
                  "Class of 2029",
                  "Class of 2030",
                  "Class of 2031",
                  "Other",
                ].map((yr) => {
                  const isSelected = parentYear === yr;
                  return (
                    <button
                      key={yr}
                      onClick={() => setParentYear(yr)}
                      className={`w-full py-3 px-6 rounded-2xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected
                          ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                          : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/80 text-zinc-700"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                        </span>
                      )}
                      <span>{yr}</span>
                    </button>
                  );
                })}
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
                continueDisabled={!parentYear}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PARENT STEP 2: WHAT BRINGS YOU TO ONEPREP?                   */}
          {/* ============================================================ */}
          {currentStepId === "parent-goal" && (
            <motion.div
              key="parent-goal"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg space-y-6"
            >
              <SpeechBubbleHeader
                title="What brings you to OnePrep?"
                subtitle="Either way, you can change this later"
              />

              <div className="grid grid-cols-2 gap-4 pt-1">
                {/* Card 1 */}
                <button
                  type="button"
                  onClick={() => setParentGoal("To explore OnePrep's resources")}
                  className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between text-left relative cursor-pointer min-h-[220px] ${
                    parentGoal === "To explore OnePrep's resources"
                      ? "border-[#1cb0f6] bg-[#cefbff] shadow-md ring-2 ring-[#1cb0f6]/40"
                      : "border-zinc-200/90 bg-white hover:bg-zinc-50/80"
                  }`}
                >
                  <div className="w-full flex justify-end">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                        parentGoal === "To explore OnePrep's resources"
                          ? "border-[#1cb0f6] bg-[#1cb0f6] text-white"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {parentGoal === "To explore OnePrep's resources" && (
                        <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                      )}
                    </div>
                  </div>

                  <div className="my-2 flex justify-center items-center h-20">
                    <img
                      src="/parent-explore.png"
                      alt="Explore resources"
                      className="h-16 w-auto object-contain drop-shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-950 leading-tight">
                      To explore OnePrep&apos;s resources
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-500 leading-snug">
                      Browse the question bank, practice tests, and study tools your child would use
                    </p>
                  </div>
                </button>

                {/* Card 2 */}
                <button
                  type="button"
                  onClick={() => setParentGoal("To link my child's account")}
                  className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between text-left relative cursor-pointer min-h-[220px] ${
                    parentGoal === "To link my child's account"
                      ? "border-[#1cb0f6] bg-[#cefbff] shadow-md ring-2 ring-[#1cb0f6]/40"
                      : "border-zinc-200/90 bg-white hover:bg-zinc-50/80"
                  }`}
                >
                  <div className="w-full flex justify-end">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                        parentGoal === "To link my child's account"
                          ? "border-[#1cb0f6] bg-[#1cb0f6] text-white"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {parentGoal === "To link my child's account" && (
                        <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                      )}
                    </div>
                  </div>

                  <div className="my-2 flex justify-center items-center h-20">
                    <img
                      src="/parent-link.png"
                      alt="Link account"
                      className="h-16 w-auto object-contain drop-shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-950 leading-tight">
                      To link my child&apos;s account
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-500 leading-snug">
                      See your child&apos;s study progress and support them along the way
                    </p>
                  </div>
                </button>
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
                continueDisabled={!parentGoal}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PARENT STEP 3: HERE'S WHAT YOU CAN ACHIEVE!                  */}
          {/* ============================================================ */}
          {currentStepId === "parent-achieve" && (
            <motion.div
              key="parent-achieve"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md space-y-6"
            >
              <SpeechBubbleHeader title="Here's what you can achieve!" />

              <div className="space-y-5 pt-3">
                <div className="flex items-start gap-4">
                  <img
                    src="/achieve-chart.png"
                    alt="Gain chart"
                    className="w-9 h-9 object-contain shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-xl font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                      +180
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-500 leading-snug">
                      Average gain across 1,063 surveyed students{" "}
                      <a href="#" className="underline text-zinc-400 hover:text-zinc-700">
                        Really?
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img
                    src="/achieve-calendar.png"
                    alt="Test day calendar"
                    className="w-9 h-9 object-contain shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-xl font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                      Test day
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-500 leading-snug">
                      A daily study plan paced to test day
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img
                    src="/achieve-users.png"
                    alt="Students community"
                    className="w-9 h-9 object-contain shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-xl font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                      450k+
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-500 leading-snug">
                      Students on OnePrep, 92% raised their score
                    </p>
                  </div>
                </div>
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PARENT STEP 4: STUDENTS GET REAL RESULTS WITH ONEPREP        */}
          {/* ============================================================ */}
          {currentStepId === "parent-results" && (
            <motion.div
              key="parent-results"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl space-y-6"
            >
              <SpeechBubbleHeader
                title="Students get real results with OnePrep"
                highlightUnderlineText="real results"
              />

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <img
                    src="/student-card-anjali.png"
                    alt="Anjali - Rice University"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <img
                    src="/student-card-bibek.png"
                    alt="Bibek - Harvard"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <img
                    src="/student-card-abid.png"
                    alt="Abid - Stanford"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* EXAMS STEP: "What are you preparing for?" OR "What do you tutor?" */}
          {/* ============================================================ */}
          {currentStepId === "exams" && (
            <motion.div
              key="step-exams"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md space-y-6"
            >
              <SpeechBubbleHeader
                title={
                  isTeacher
                    ? "What do you teach?"
                    : isTutor
                    ? "What do you tutor?"
                    : "What are you preparing for?"
                }
                subtitle="Select all that apply"
              />

              <div className="space-y-2.5 pt-1">
                {[
                  "SAT®",
                  "ACT®",
                  "AP®",
                  "College Applications",
                ].map((exam) => {
                  const isSelected = prepExams.includes(exam);
                  return (
                    <button
                      key={exam}
                      onClick={() => toggleExam(exam)}
                      className={`w-full py-3.5 px-6 rounded-2xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected
                          ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                          : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/80 text-zinc-700"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                        </span>
                      )}
                      <span>{exam}</span>
                    </button>
                  );
                })}

                <div className="relative py-2.5 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-200" />
                  </div>
                  <div className="relative bg-white px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Other exams
                  </div>
                </div>

                {["IB DP", "IB MYP"].map((exam) => {
                  const isSelected = prepExams.includes(exam);
                  return (
                    <button
                      key={exam}
                      onClick={() => toggleExam(exam)}
                      className={`w-full py-3.5 px-6 rounded-2xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected
                          ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                          : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/80 text-zinc-700"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                        </span>
                      )}
                      <span>{exam}</span>
                    </button>
                  );
                })}
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
                continueDisabled={prepExams.length === 0}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* COLLEGES STEP: "Where are you going to college?"             */}
          {/* ============================================================ */}
          {currentStepId === "colleges" && (
            <motion.div
              key="step-colleges"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md space-y-6"
            >
              <SpeechBubbleHeader
                title="Where are you going to college?"
                subtitle="Select all that apply"
              />

              <div className="pt-1 space-y-3">
                <button
                  onClick={() => toggleCollege("Not sure yet")}
                  className={`w-full py-3.5 px-6 rounded-2xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedColleges.includes("Not sure yet")
                      ? "border-2 border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                      : "border-2 border-transparent bg-[#f5f5f5] hover:bg-zinc-200/80 text-zinc-700"
                  }`}
                >
                  {selectedColleges.includes("Not sure yet") && (
                    <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                    </span>
                  )}
                  <span>Not sure yet</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => toggleCollege("Common App")}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      selectedColleges.includes("Common App")
                        ? "border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                        : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CommonAppLogo isSelected={selectedColleges.includes("Common App")} />
                      <span className="text-sm font-medium">Common App</span>
                    </div>
                    {selectedColleges.includes("Common App") && (
                      <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => toggleCollege("University of California")}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      selectedColleges.includes("University of California")
                        ? "border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                        : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <UCLogo />
                      <span className="text-xs font-medium leading-tight">
                        University of<br />California
                      </span>
                    </div>
                    {selectedColleges.includes("University of California") && (
                      <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => toggleCollege("UCAS")}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      selectedColleges.includes("UCAS")
                        ? "border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                        : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <UCASLogo />
                      <span className="text-sm font-medium">UCAS</span>
                    </div>
                    {selectedColleges.includes("UCAS") && (
                      <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => toggleCollege("MIT")}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      selectedColleges.includes("MIT")
                        ? "border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs"
                        : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MITLogo />
                      <span className="text-sm font-medium">MIT</span>
                    </div>
                    {selectedColleges.includes("MIT") && (
                      <span className="h-4 w-4 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
                continueDisabled={selectedColleges.length === 0}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* SHARED POST-ROLE STEP 1: "How did you hear about us?"        */}
          {/* ============================================================ */}
          {currentStepId === "heard" && (
            <motion.div
              key="step-heard"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg space-y-6"
            >
              <SpeechBubbleHeader
                title="How did you hear about us?"
                subtitle="Where did you first hear of OnePrep?"
              />

              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { id: "Teacher", label: "Teacher", icon: <TeacherIcon className="w-8 h-8" /> },
                    { id: "Friend/Family", label: "Friend/Family", icon: <FriendFamilyIcon /> },
                    { id: "Tutor", label: "Tutor", icon: <TutorIcon className="w-8 h-8" /> },
                    { id: "TikTok", label: "TikTok", icon: <TikTokIcon /> },
                  ].map((card) => {
                    const isSelected = heardSource === card.id;
                    return (
                      <button
                        key={card.id}
                        onClick={() => setHeardSource(card.id)}
                        className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer select-none ${
                          isSelected
                            ? "border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs ring-2 ring-[#1cb0f6]/40"
                            : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-700"
                        }`}
                      >
                        <div className="h-9 flex items-center justify-center">
                          {card.icon}
                        </div>
                        <span className="text-xs font-medium tracking-tight text-center truncate w-full">
                          {card.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center gap-3">
                  {[
                    { id: "Google", label: "Google", icon: <GoogleIcon /> },
                    { id: "Instagram", label: "Instagram", icon: <InstagramIcon /> },
                    { id: "Discord", label: "Discord", icon: <DiscordIcon /> },
                  ].map((card) => {
                    const isSelected = heardSource === card.id;
                    return (
                      <button
                        key={card.id}
                        onClick={() => setHeardSource(card.id)}
                        className={`w-[calc((100%-2.25rem)/4)] p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer select-none ${
                          isSelected
                            ? "border-[#1cb0f6] bg-[#cefbff] text-[#0284c7] shadow-xs ring-2 ring-[#1cb0f6]/40"
                            : "border-transparent bg-[#f5f5f5] hover:bg-zinc-200/70 text-zinc-700"
                        }`}
                      >
                        <div className="h-9 flex items-center justify-center">
                          {card.icon}
                        </div>
                        <span className="text-xs font-medium tracking-tight text-center truncate w-full">
                          {card.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
                showSkip={true}
                onSkip={navigateForward}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* SHARED POST-ROLE STEP 2: "Stay updated!"                     */}
          {/* ============================================================ */}
          {currentStepId === "stay-updated" && (
            <motion.div
              key="step-stay-updated"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md space-y-6 text-center"
            >
              <EnvelopeMascot />

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950">
                  <WordBlurReveal text="Stay updated!" delay={0.1} />
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
                  Get notified of OnePrep updates, discounts, and resources for SAT®, ACT®, AP®, and college applications.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSendEmailUpdates(!sendEmailUpdates)}
                  className="w-full py-3.5 px-5 rounded-2xl border-2 border-zinc-950 bg-white hover:bg-zinc-50 flex items-center gap-3 transition-all cursor-pointer shadow-2xs text-left"
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                      sendEmailUpdates ? "bg-black text-white" : "border-2 border-zinc-300 bg-white"
                    }`}
                  >
                    {sendEmailUpdates && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="font-medium text-sm text-zinc-900">Send me email updates</span>
                </button>
              </div>

              <StepNavigationFooter
                onBack={navigateBackward}
                onContinue={navigateForward}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* SHARED POST-ROLE STEP 3: CREATE ACCOUNT (Two-Column Layout)  */}
          {/* ============================================================ */}
          {currentStepId === "create-account" && (
            <motion.div
              key="step-create-account"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full min-h-screen bg-white text-zinc-900 font-dm-sans flex flex-col lg:flex-row justify-between relative overflow-hidden"
            >
              {/* Left Column: Form */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-xl mx-auto min-h-screen">
                <div>
                  <div className="flex items-center gap-2 mb-8">
                    <CharacterMascot size={32} isSmall={true} isHappy={true} />
                    <span className="text-xl font-bold tracking-tight text-zinc-950 font-dm-sans">OnePrep</span>
                  </div>

                  {/* Heading & Subtitle (Static text, NO animation as requested) */}
                  <div className="space-y-2 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 font-dm-sans">
                      Create your free account to continue
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-snug">
                      Save your answers and continue with your personalized setup.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1 mb-6 text-xs font-medium">
                    <p className="text-zinc-600 uppercase tracking-wide">
                      {isParent ? (
                        <>
                          Account type: <span className="font-bold text-zinc-900">PARENT</span>
                        </>
                      ) : isTutor ? (
                        <>
                          Account type: <span className="font-bold text-zinc-900">TUTOR</span>
                        </>
                      ) : isTeacher ? (
                        <>
                          Account type: <span className="font-bold text-zinc-900">TEACHER</span>
                        </>
                      ) : (
                        <>
                          Your exams: <span className="font-bold text-zinc-900">{formattedExams}</span>
                        </>
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        jumpToRoleStep(
                          isParent
                            ? "parent-year"
                            : isTutor || isTeacher
                            ? "exams"
                            : "student-year"
                        )
                      }
                      className="text-zinc-500 hover:text-zinc-900 underline cursor-pointer"
                    >
                      Edit answers
                    </button>
                  </div>

                  {/* Social Auth Buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => handleSocialClick("google")}
                      disabled={redirectingProvider !== null}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 shadow-2xs cursor-pointer ${
                        redirectingProvider === "google"
                          ? "bg-[#e6e6e6] border-zinc-200"
                          : "border-zinc-200/90 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      {redirectingProvider === "google" ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-zinc-400 border-t-zinc-700 animate-spin my-0.5" />
                          <span className="text-xs font-medium text-zinc-700">Redirecting...</span>
                        </>
                      ) : (
                        <>
                          <GoogleIcon />
                          <span className="text-xs font-medium text-zinc-800">Google</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialClick("apple")}
                      disabled={redirectingProvider !== null}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 shadow-2xs cursor-pointer ${
                        redirectingProvider === "apple"
                          ? "bg-[#e6e6e6] border-zinc-200"
                          : "border-zinc-200/90 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      {redirectingProvider === "apple" ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-zinc-400 border-t-zinc-700 animate-spin my-0.5" />
                          <span className="text-xs font-medium text-zinc-700">Redirecting...</span>
                        </>
                      ) : (
                        <>
                          <AppleIcon />
                          <span className="text-xs font-medium text-zinc-800">Apple</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialClick("microsoft")}
                      disabled={redirectingProvider !== null}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 shadow-2xs cursor-pointer ${
                        redirectingProvider === "microsoft"
                          ? "bg-[#e6e6e6] border-zinc-200"
                          : "border-zinc-200/90 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      {redirectingProvider === "microsoft" ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-zinc-400 border-t-zinc-700 animate-spin my-0.5" />
                          <span className="text-xs font-medium text-zinc-700">Redirecting...</span>
                        </>
                      ) : (
                        <>
                          <MicrosoftIcon />
                          <span className="text-xs font-medium text-zinc-800">Microsoft</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Divider: or */}
                  <div className="relative my-5 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-200" />
                    </div>
                    <div className="relative bg-white px-3 text-xs text-zinc-400">or</div>
                  </div>

                  {/* Email Registration Form */}
                  <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1">First name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-[#f4f4f5]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] text-sm text-zinc-900 placeholder:text-zinc-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1">Last name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-[#f4f4f5]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] text-sm text-zinc-900 placeholder:text-zinc-400 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-[#f4f4f5]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] text-sm text-zinc-900 placeholder:text-zinc-400 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-medium text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer mt-2"
                    >
                      Continue with email
                    </button>
                  </form>
                </div>

                <p className="text-center text-xs text-zinc-500 font-medium pt-6">
                  Already have an account?{" "}
                  <Link href="/dashboard" className="underline font-bold text-zinc-800 hover:text-black">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Right Column: Illustration Banner */}
              <div className="hidden lg:block lg:w-1/2 p-4 h-screen sticky top-0">
                <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-lg bg-[#0c1427]">
                  <img
                    src="/signup-banner.png"
                    alt="OnePrep Campfire Illustration"
                    className="w-full h-full object-cover object-bottom"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* SHARED POST-ROLE STEP 4: VERIFY EMAIL (OTP Input)            */}
          {/* ============================================================ */}
          {currentStepId === "verify-email" && (
            <motion.div
              key="step-verify-email"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full min-h-[80vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CharacterMascot size={36} isSmall={true} isHappy={true} />
                <span className="text-2xl font-bold tracking-tight text-zinc-950 font-dm-sans">OnePrep</span>
              </div>

              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 font-dm-sans">
                  Verify your email
                </h1>
                <div className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  <p>Enter the code sent to</p>
                  <p className="font-medium text-zinc-900">{email || "diwexo8522@hopefunder.com"}</p>
                </div>
              </div>

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

              <div className="w-full max-w-xs pt-1">
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

              <div className="pt-2 text-xs text-zinc-500">
                Wrong email?{" "}
                <button
                  type="button"
                  onClick={handleGoBackFromVerify}
                  className="font-semibold text-zinc-900 underline hover:text-black cursor-pointer ml-0.5"
                >
                  Go back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ---------------- BOTTOM FOOTER (Cookie banner on intro steps) ---------------- */}
      {step <= 2 && (
        <footer className="w-full p-4 flex justify-between items-center text-xs text-zinc-400">
          <div />
          <div className="max-w-xs p-3.5 rounded-2xl bg-white border border-zinc-200/90 shadow-xl text-left space-y-2.5">
            <p className="text-[11px] text-zinc-600 leading-relaxed font-normal">
              We use optional cookies for analytics and advertising. Choose either purpose separately, or learn more in our{" "}
              <a href="#" className="underline font-semibold text-zinc-800">Cookie Policy</a>
            </p>
            <div className="flex items-center gap-2">
              <button className="flex-1 py-1 px-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[11px] font-medium transition-all">
                Reject optional
              </button>
              <button className="flex-1 py-1 px-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[11px] font-medium transition-all">
                Allow all
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
