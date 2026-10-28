"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Flame, Layers, Award } from "lucide-react";

interface CourseModule {
  id: string;
  title: string;
  category: string;
  lessons: number;
  duration: string;
  progress: number;
  iconBg: string;
  tag: string;
}

const modules: CourseModule[] = [
  {
    id: "math",
    title: "Advanced Math & Quadratics",
    category: "Math · Desmos & Algebra",
    lessons: 28,
    duration: "4.5 soat",
    progress: 84,
    iconBg: "from-zinc-800 to-zinc-950",
    tag: "Eng faol",
  },
  {
    id: "reading",
    title: "Reading: Information & Ideas",
    category: "Reading · Scientific Passages",
    lessons: 22,
    duration: "3.2 soat",
    progress: 60,
    iconBg: "from-zinc-800 to-zinc-950",
    tag: "Tavsiya",
  },
  {
    id: "mock",
    title: "Digital SAT Full Adaptive Mock #3",
    category: "Imtihon · Rasmiy Bluebook standarti",
    lessons: 134,
    duration: "2s 14daq",
    progress: 0,
    iconBg: "from-zinc-800 to-zinc-950",
    tag: "Yangi",
  },
];

export default function VisualCourseCards() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white border border-white/15">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight text-white">
              Sizning darslaringiz va modullar
            </h3>
            <p className="text-xs text-zinc-400">O&apos;rganishni to&apos;xtagan joyingizdan davom ettiring</p>
          </div>
        </div>
        <button className="text-xs font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
          Barcha kurslar <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Visual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {modules.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.35 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-3xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl shadow-xl hover:border-white/25 transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Top Badge & Tag */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/15">
                  {m.tag}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {m.duration} · {m.lessons} dars
                </span>
              </div>

              {/* Visual Decorative Mini Canvas / Icon Art */}
              <div className="h-28 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent p-4 mb-4 border border-white/[0.06] flex items-center justify-between relative overflow-hidden group-hover:border-white/15 transition-all">
                {/* SVG Graphics specific to module */}
                {m.id === "math" && (
                  <svg className="w-full h-full opacity-60" viewBox="0 0 200 80">
                    <path
                      d="M 10 70 Q 60 10, 100 40 T 190 20"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    <circle cx="100" cy="40" r="4" fill="#ffffff" />
                    <line x1="10" y1="75" x2="190" y2="75" stroke="#52525b" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                )}

                {m.id === "reading" && (
                  <svg className="w-full h-full opacity-60" viewBox="0 0 200 80">
                    <rect x="20" y="15" width="70" height="50" rx="4" fill="none" stroke="#ffffff" strokeWidth="2" />
                    <rect x="110" y="15" width="70" height="50" rx="4" fill="none" stroke="#ffffff" strokeWidth="2" />
                    <line x1="30" y1="28" x2="80" y2="28" stroke="#ffffff" strokeWidth="2" />
                    <line x1="30" y1="38" x2="70" y2="38" stroke="#71717a" strokeWidth="1.5" />
                    <line x1="30" y1="48" x2="80" y2="48" stroke="#71717a" strokeWidth="1.5" />
                    <line x1="120" y1="28" x2="170" y2="28" stroke="#ffffff" strokeWidth="2" />
                    <line x1="120" y1="38" x2="160" y2="38" stroke="#71717a" strokeWidth="1.5" />
                    <line x1="120" y1="48" x2="170" y2="48" stroke="#71717a" strokeWidth="1.5" />
                  </svg>
                )}

                {m.id === "mock" && (
                  <svg className="w-full h-full opacity-60" viewBox="0 0 200 80">
                    <circle cx="100" cy="40" r="28" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                    <line x1="100" y1="40" x2="100" y2="22" stroke="#ffffff" strokeWidth="2" />
                    <line x1="100" y1="40" x2="114" y2="40" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="100" cy="40" r="2.5" fill="#ffffff" />
                  </svg>
                )}
              </div>

              {/* Module Title & Category */}
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                {m.category}
              </p>
              <h4 className="text-base font-extrabold text-white group-hover:text-zinc-200 transition-colors line-clamp-1">
                {m.title}
              </h4>
            </div>

            {/* Bottom Progress Bar & Button */}
            <div className="mt-5 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-400 font-medium">Bajarildi</span>
                <span className="text-white font-bold">{m.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800 mb-4">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${m.progress}%` }}
                />
              </div>

              <button className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white/10 hover:bg-white hover:text-black text-white border border-white/15 transition-all flex items-center justify-center gap-1.5 shadow-sm">
                Davom ettirish
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
