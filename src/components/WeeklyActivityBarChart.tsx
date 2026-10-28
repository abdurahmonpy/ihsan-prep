"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Clock, Sparkles } from "lucide-react";

interface DayData {
  day: string;
  name: string;
  minutes: number;
  target: number;
  date: string;
}

const weekData: DayData[] = [
  { day: "Dush", name: "Dushanba", minutes: 35, target: 30, date: "26 Okt" },
  { day: "Sesh", name: "Seshanba", minutes: 50, target: 30, date: "27 Okt" },
  { day: "Chor", name: "Chorshanba", minutes: 20, target: 30, date: "28 Okt" },
  { day: "Pay", name: "Payshanba", minutes: 45, target: 30, date: "29 Okt" },
  { day: "Jum", name: "Juma", minutes: 0, target: 30, date: "30 Okt" },
  { day: "Shan", name: "Shanba", minutes: 65, target: 45, date: "31 Okt" },
  { day: "Yak", name: "Yakshanba", minutes: 0, target: 45, date: "1 Noy" },
];

export default function WeeklyActivityBarChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxVal = 75;

  const totalMinutes = weekData.reduce((acc, curr) => acc + curr.minutes, 0);

  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 p-8 shadow-2xl backdrop-blur-xl transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black dark:bg-white text-white dark:text-black border border-black/10 dark:border-white/15 shadow-sm">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Weekly Study Activity</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-900 dark:text-white border border-black/10 dark:border-white/15">
                <Sparkles className="h-3 w-3" /> Faol hafta
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Haftalik reja bo&apos;yicha kunlik dars vaqtining taqsimoti
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white bg-black/5 dark:bg-white/10 px-3.5 py-1.5 rounded-xl border border-black/10 dark:border-white/15">
            <Clock className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Jami: {totalMinutes} daqiqa</span>
          </div>
        </div>
      </div>

      {/* Main Wide Bar Chart Area */}
      <div
        className="pt-10 pb-4 px-4 sm:px-8 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.05] relative"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <div className="h-48 flex items-end justify-between gap-4 sm:gap-10">
          {weekData.map((item, idx) => {
            const heightPercent = Math.min(100, (item.minutes / maxVal) * 100);
            const isHovered = hoveredIdx === idx;
            const isToday = idx === 1;

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-2.5 h-full justify-end cursor-pointer relative group"
                onMouseEnter={() => setHoveredIdx(idx)}
              >
                {/* Floating Tooltip right above the bar when hovered */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-14 z-30 pointer-events-none flex flex-col items-center"
                    >
                      <div className="rounded-xl bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 shadow-2xl text-center whitespace-nowrap border border-black/20 dark:border-white/40">
                        <p className="text-[10px] font-bold text-zinc-300 dark:text-zinc-600">
                          {item.name} ({item.date})
                        </p>
                        <p className="text-xs font-extrabold text-white dark:text-black">
                          {item.minutes} daqiqa
                          {item.minutes >= item.target && (
                            <span className="text-emerald-400 dark:text-emerald-700 font-bold ml-1">✓</span>
                          )}
                        </p>
                      </div>
                      {/* Tooltip caret */}
                      <div className="w-2 h-2 bg-black dark:bg-white rotate-45 -mt-1 shadow-sm" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The Bar */}
                <div className="w-full max-w-[56px] h-36 bg-black/[0.04] dark:bg-white/[0.04] rounded-t-2xl relative flex items-end overflow-hidden border border-black/5 dark:border-white/[0.06] group-hover:border-black/20 dark:group-hover:border-white/25 transition-all">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.04, ease: "easeOut" }}
                    className={`w-full rounded-t-2xl transition-all duration-200 ${
                      isHovered
                        ? "bg-black dark:bg-white shadow-lg"
                        : isToday
                        ? "bg-zinc-700 dark:bg-zinc-200"
                        : item.minutes > 0
                        ? "bg-zinc-400 dark:bg-zinc-500 hover:bg-zinc-500 dark:hover:bg-zinc-400"
                        : "bg-transparent"
                    }`}
                  />
                  {/* Daily Target dotted line */}
                  <div
                    className="absolute w-full border-t border-dashed border-black/20 dark:border-white/30"
                    style={{ bottom: `${(item.target / maxVal) * 100}%` }}
                  />
                </div>

                {/* Day label */}
                <div className="text-center">
                  <p
                    className={`text-xs transition-colors ${
                      isHovered || isToday ? "text-zinc-900 dark:text-white font-bold" : "text-zinc-500"
                    }`}
                  >
                    {item.day}
                  </p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-600">{item.date.split(" ")[0]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" /> Bajarilgan vaqt
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 border-t border-dashed border-black/30 dark:border-white/40" /> Kunlik reja (30 daqiqa)
          </span>
        </div>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
          * Hafta oxirigacha yana 85 daqiqa dars tavsiya etiladi
        </span>
      </div>
    </div>
  );
}
