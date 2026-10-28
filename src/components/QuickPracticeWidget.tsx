"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Check, X, RotateCcw, Sparkles } from "lucide-react";

interface Option {
  id: string;
  text: string;
}

export default function QuickPracticeWidget() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const question = "If 3x + 7 = 22, what is the value of 6x - 4?";
  const correctAnswer = "B";

  const options: Option[] = [
    { id: "A", text: "24" },
    { id: "B", text: "26" },
    { id: "C", text: "30" },
    { id: "D", text: "34" },
  ];

  const handleSelect = (id: string) => {
    if (submitted) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  const isCorrect = selectedOption === correctAnswer;

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 text-white border border-white/15">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Daily SAT Warmup</h3>
              <p className="text-[10px] text-zinc-400">Math · Linear Equations</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
            +10 XP
          </span>
        </div>

        {/* Question Text */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4">
          <p className="text-sm font-semibold text-white leading-relaxed">
            {question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {options.map((opt) => {
            const isChosen = selectedOption === opt.id;
            let btnStyle = "border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white";

            if (submitted) {
              if (opt.id === correctAnswer) {
                btnStyle = "border-white bg-white text-black font-bold";
              } else if (isChosen && !isCorrect) {
                btnStyle = "border-red-500/50 bg-red-950/40 text-red-300";
              } else {
                btnStyle = "border-white/5 opacity-40 text-zinc-500";
              }
            } else if (isChosen) {
              btnStyle = "border-white bg-white/20 text-white font-bold ring-1 ring-white/40";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={submitted}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold">
                  {opt.id}
                </span>
                <span className="truncate">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation / Result banner */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-3 rounded-xl border text-xs mb-3 ${
                isCorrect
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-zinc-900 border-white/10 text-zinc-300"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                {isCorrect ? (
                  <>
                    <Check className="h-4 w-4 text-white" />
                    <span>To&apos;g&apos;ri javob! (+10 XP)</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-zinc-400" />
                    <span>Noto&apos;g&apos;ri! To&apos;g&apos;ri javob: B</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 leading-tight">
                3x + 7 = 22 ⇒ 3x = 15 ⇒ x = 5. U holda 6(5) - 4 = 30 - 4 = 26.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <div>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              selectedOption
                ? "bg-white hover:bg-zinc-200 text-black shadow-md cursor-pointer"
                : "bg-white/10 text-zinc-500 cursor-not-allowed"
            }`}
          >
            Javobni tekshirish
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Yana ishlash
          </button>
        )}
      </div>
    </div>
  );
}
