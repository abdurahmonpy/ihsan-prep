"use client";

import { motion } from "framer-motion";
import { PieChart, CheckCircle2, AlertCircle } from "lucide-react";

interface Topic {
  name: string;
  category: "Math" | "Reading";
  mastery: number;
  questions: number;
}

const topics: Topic[] = [
  { name: "Algebra & Linear Functions", category: "Math", mastery: 84, questions: 142 },
  { name: "Advanced Math & Quadratics", category: "Math", mastery: 71, questions: 98 },
  { name: "Information & Ideas (Reading)", category: "Reading", mastery: 64, questions: 110 },
  { name: "Craft & Structure (Vocabulary)", category: "Reading", mastery: 78, questions: 135 },
];

export default function SubjectMastery() {
  // SVG Donut calculation
  const total = 100;
  const mathScore = 74; // overall math accuracy
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (mathScore / total) * circumference;

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white border border-white/15">
            <PieChart className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Topic Mastery</h3>
            <p className="text-[11px] text-zinc-400">SAT bo&apos;limlari bo&apos;yicha aniqlik darajasi</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-white bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
          O&apos;rtacha 74%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left: Interactive Radial Donut */}
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              {/* Background circle */}
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="text-zinc-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress stroke */}
              <motion.circle
                cx="56"
                cy="56"
                r={radius}
                stroke="#ffffff"
                strokeWidth="8"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Center Text */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-white">74%</span>
              <span className="text-[9px] uppercase tracking-wider text-zinc-400">Aniqlik</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-white font-medium">
              <span className="h-2 w-2 rounded-full bg-white" /> Math (78%)
            </span>
            <span className="flex items-center gap-1 text-zinc-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-zinc-600" /> R&W (70%)
            </span>
          </div>
        </div>

        {/* Right: Progress bars list for each main SAT area */}
        <div className="md:col-span-2 space-y-3">
          {topics.map((t) => (
            <div
              key={t.name}
              className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-white/[0.05]"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-white flex items-center gap-1.5 truncate">
                  {t.mastery >= 75 ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                  )}
                  {t.name}
                </span>
                <span className="font-bold text-white ml-2">{t.mastery}%</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.mastery}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    t.mastery >= 80 ? "bg-white" : t.mastery >= 70 ? "bg-zinc-300" : "bg-zinc-500"
                  }`}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-zinc-500 mt-1">
                <span>{t.category} bo&apos;limi</span>
                <span>{t.questions} ta mashq bajarildi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
