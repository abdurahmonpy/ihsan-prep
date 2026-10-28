"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Award, Zap, Check } from "lucide-react";

interface BadgeItem {
  title: string;
  desc: string;
  status: "Unlocked" | "In Progress";
  progress: string;
  icon: typeof Trophy;
}

const badges: BadgeItem[] = [
  {
    title: "SAT 1400+ Club",
    desc: "Prognoz ball 1400 dan oshdi",
    status: "Unlocked",
    progress: "Bajarildi",
    icon: Trophy,
  },
  {
    title: "Math Ninja",
    desc: "100 ta Algebra savoli yechildi",
    status: "Unlocked",
    progress: "142 / 100",
    icon: Zap,
  },
  {
    title: "Consistency Champ",
    desc: "7 kun ketma-ket dars qilish",
    status: "In Progress",
    progress: "3 / 7 kun",
    icon: Flame,
  },
  {
    title: "Vocab Master",
    desc: "200 ta yangi SAT so'z yodlash",
    status: "In Progress",
    progress: "132 / 200",
    icon: Award,
  },
];

export default function VisualBadgesShowcase() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white border border-white/15">
            <Trophy className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Yutuqlar & Nishonlar</h3>
            <p className="text-[11px] text-zinc-400">O&apos;quv yutuqlaringiz kolleksiyasi</p>
          </div>
        </div>
        <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
          2 / 4 ochilgan
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {badges.map((b, idx) => {
          const Icon = b.icon;
          const isUnlocked = b.status === "Unlocked";
          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -3 }}
              className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                isUnlocked
                  ? "bg-white/[0.04] border-white/15 hover:border-white/30"
                  : "bg-white/[0.01] border-white/5 opacity-60"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-3 shadow-md ${
                  isUnlocked
                    ? "bg-white text-black ring-4 ring-white/10"
                    : "bg-white/5 text-zinc-500 border border-white/10"
                }`}
              >
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>

              <div>
                <h4 className="text-xs font-bold text-white mb-0.5">{b.title}</h4>
                <p className="text-[10px] text-zinc-400 line-clamp-1">{b.desc}</p>
              </div>

              <div className="mt-3 w-full pt-2 border-t border-white/[0.06] flex items-center justify-center gap-1 text-[10px] font-bold">
                {isUnlocked ? (
                  <span className="text-white flex items-center gap-1">
                    <Check className="h-3 w-3" /> Ochilgan
                  </span>
                ) : (
                  <span className="text-zinc-500">{b.progress}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
