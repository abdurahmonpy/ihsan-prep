"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Languages,
  BookOpen,
  ChevronRight,
  ListTodo,
  type LucideIcon,
} from "lucide-react";

interface TodoItemData {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  progress?: number;
  badge?: string;
}

export default function TodoList() {
  const items: TodoItemData[] = [
    {
      icon: CalendarDays,
      title: "This week's plan",
      subtitle: "0 / 155 min",
      progress: 0,
    },
    {
      icon: Languages,
      title: "Vocabulary",
      subtitle: "0 due · 132 new",
      badge: "132",
    },
    {
      icon: BookOpen,
      title: "Algebra & Linear Equations",
      subtitle: "Module 1 · Key Concepts",
      progress: 25,
    },
  ];

  return (
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white border border-white/15">
            <ListTodo className="h-4 w-4" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              What to do now
            </h3>
            <p className="text-[11px] text-zinc-400">Tavsiya etilgan topshiriqlar</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors">
          Barchasini ko&apos;rish
        </button>
      </div>

      <div className="divide-y divide-white/[0.06] space-y-1">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.06, duration: 0.3, ease: "easeOut" }}
              whileHover={{ x: 3 }}
              className="group flex cursor-pointer items-center gap-4 rounded-xl px-3 py-3.5 transition-all duration-200 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white border border-white/10 transition-colors group-hover:bg-white group-hover:text-black">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-xs text-zinc-400 truncate">{item.subtitle}</p>
              </div>

              {item.progress !== undefined && (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-24">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-zinc-400 min-w-[28px] text-right">
                    {item.progress}%
                  </span>
                </div>
              )}

              {item.badge && (
                <span className="rounded-full px-2.5 py-0.5 text-xs font-bold bg-white/10 text-white border border-white/20">
                  {item.badge}
                </span>
              )}

              <ChevronRight className="h-4 w-4 text-zinc-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
