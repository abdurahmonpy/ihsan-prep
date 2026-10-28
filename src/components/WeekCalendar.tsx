"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

const days = [
  { label: "M", full: "Dush", active: false },
  { label: "T", full: "Sesh", active: true },
  { label: "W", full: "Chor", active: false },
  { label: "T", full: "Pay", active: false },
  { label: "F", full: "Jum", active: false },
  { label: "S", full: "Shan", active: false },
  { label: "S", full: "Yak", active: false },
];

export default function WeekCalendar() {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 text-white border border-white/15">
              <CalendarIcon className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">This week</h3>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium bg-white/[0.05] px-2.5 py-1 rounded-lg border border-white/10">
            <Clock className="h-3 w-3 text-zinc-400" />
            0 / 155 min
          </span>
        </div>

        {/* Calendar days pills */}
        <div className="grid grid-cols-7 gap-1.5 mb-5">
          {days.map((day, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.03, duration: 0.25 }}
              className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-200 ${
                day.active
                  ? "bg-white text-black font-extrabold shadow-md"
                  : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="text-xs">{day.label}</span>
              {day.active && (
                <div className="mt-1 h-1 w-1 rounded-full bg-black" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/[0.08]">
        <p className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-bold text-white">155 daqiqa</span> qoldi bu haftada — o&apos;zingizga qulay paytda bajaring.
        </p>
      </div>
    </div>
  );
}
