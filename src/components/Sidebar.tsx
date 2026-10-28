"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  CalendarDays,
  Target,
  ClipboardCheck,
  Bot,
  BookOpen,
  Languages,
  Layers3,
  BarChart3,
  ChevronRight,
  Sparkles,
  Command,
  PanelLeftClose,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const navSections = [
  {
    label: "Study",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" },
      { icon: CalendarDays, label: "Study plan", href: "#study-plan" },
      { icon: Target, label: "Practice", href: "#practice" },
      { icon: ClipboardCheck, label: "Mock Tests", href: "#mock-tests" },
      { icon: Bot, label: "AI Tutor", href: "#ai-tutor", badge: "AI" },
    ],
  },
  {
    label: "Learn",
    items: [
      { icon: BookOpen, label: "Courses", href: "#courses" },
      { icon: Languages, label: "Vocabulary", href: "#vocabulary" },
      { icon: Layers3, label: "Flashcards", href: "#flashcards" },
    ],
  },
  {
    label: "Insights",
    items: [
      { icon: BarChart3, label: "Progress & Analytics", href: "#analytics" },
    ],
  },
];

const sidebarVariants: Variants = {
  hidden: { x: -260, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.02,
    },
  },
  exit: {
    x: -260,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed left-0 top-0 bottom-0 z-40 flex w-[260px] flex-col border-r border-black/[0.08] dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-2xl transition-colors shadow-xl"
        >
          {/* Logo with Crown Icon & Close Button */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between gap-2 px-5 py-5 border-b border-black/[0.06] dark:border-white/[0.08]"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-md">
                <Command className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="truncate">
                <h1 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5 truncate">
                  Ihsan Prep
                  <Image
                    src="/crown.png"
                    alt="Crown"
                    width={18}
                    height={18}
                    className="inline-block object-contain -mt-0.5 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] shrink-0"
                  />
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-medium truncate">
                  Study Platform
                </p>
              </div>
            </div>

            {/* Close Sidebar Button */}
            <button
              onClick={closeSidebar}
              aria-label="Menyuni yopish"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-black/10 dark:hover:border-white/10"
              title="Menyuni yopish"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {navSections.map((section) => (
              <div key={section.label}>
                <motion.p
                  variants={itemVariants}
                  className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
                >
                  {section.label}
                </motion.p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                      <motion.div key={item.label} variants={itemVariants}>
                        <Link
                          href={item.href}
                          className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white"
                          }`}
                        >
                          <item.icon
                            className={`h-[18px] w-[18px] transition-colors duration-200 ${
                              isActive
                                ? "text-white dark:text-black"
                                : "text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:hover:text-white"
                            }`}
                            strokeWidth={1.75}
                          />
                          <span className="flex-1 truncate">{item.label}</span>
                          {"badge" in item && item.badge && (
                            <span
                              className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                                isActive
                                  ? "bg-white/20 dark:bg-black/10 text-white dark:text-black border-transparent"
                                  : "bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 border-black/10 dark:border-white/20"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Upgrade card */}
          <motion.div variants={itemVariants} className="px-3 pb-3">
            <div className="rounded-2xl p-4 bg-zinc-100 dark:bg-zinc-950 border border-black/[0.08] dark:border-white/10 backdrop-blur-xl relative overflow-hidden transition-colors">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10 text-black dark:text-white border border-black/10 dark:border-white/15">
                  <Sparkles className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">Free Plan</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Unlock full SAT questions</p>
                </div>
              </div>
              <button className="group flex w-full items-center justify-between rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 px-3.5 py-2 text-xs font-semibold text-white dark:text-black transition-all active:scale-[0.98] shadow-sm">
                Explore plans
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>

          {/* User with Real Avatar Image */}
          <motion.div
            variants={itemVariants}
            className="border-t border-black/[0.06] dark:border-white/[0.08] px-4 py-3.5 bg-zinc-50 dark:bg-zinc-950/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0">
                <Image
                  src="/avatar.png"
                  alt="Abdurrohmon Avatar"
                  width={36}
                  height={36}
                  className="rounded-xl object-cover shadow-sm ring-1 ring-black/10 dark:ring-white/20"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-black bg-emerald-500" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
                  Abdurrohmon
                </p>
                <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">Student · Ihsan SAT</p>
              </div>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
