"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronRight,
  CheckCircle2,
  Calendar as CalendarIcon,
  Sparkles,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

interface CalendarTask {
  id: string;
  day: number; // 0: Mon 5, 1: Tue 6, 2: Wed 7, 3: Thu 8
  title: string;
  time: string;
  topOffset: number; // in pixels relative to 4 PM start
  heightPx: number;
  type: "math" | "rw";
  isDone?: boolean;
}

const INITIAL_TASKS: CalendarTask[] = [
  // Monday 5
  {
    id: "mon-1",
    day: 0,
    title: "Linear equations lesson",
    time: "4:00 PM to 5:00 PM",
    topOffset: 8,
    heightPx: 56,
    type: "math",
  },
  {
    id: "mon-2",
    day: 0,
    title: "Linear equations practice",
    time: "5:10 PM to 6:10 PM",
    topOffset: 72,
    heightPx: 56,
    type: "math",
  },
  // Tuesday 6
  {
    id: "tue-1",
    day: 1,
    title: "Advanced Math practice",
    time: "4:00 PM to 5:00 PM",
    topOffset: 8,
    heightPx: 56,
    type: "math",
  },
  {
    id: "tue-2",
    day: 1,
    title: "Vocabulary practice",
    time: "5:30 PM to 6:30 PM",
    topOffset: 92,
    heightPx: 56,
    type: "rw",
  },
  // Wednesday 7
  {
    id: "wed-1",
    day: 2,
    title: "Grammar practice",
    time: "4:00 PM to 5:00 PM",
    topOffset: 8,
    heightPx: 56,
    type: "rw",
  },
  {
    id: "wed-2",
    day: 2,
    title: "Reading and Writing review",
    time: "6:15 PM to 7:15 PM",
    topOffset: 136,
    heightPx: 56,
    type: "rw",
  },
  // Thursday 8
  {
    id: "thu-1",
    day: 3,
    title: "Reading and Writing review",
    time: "4:00 PM to 5:00 PM",
    topOffset: 8,
    heightPx: 56,
    type: "rw",
  },
];

const TUTORIAL_STEPS = [
  {
    title: "Welcome to your new Study Planner",
    subtitle: "A balanced roadmap mapped to your target test date and daily schedule.",
  },
  {
    title: "Smart Daily Tasks",
    subtitle: "Short, bite-sized lessons and targeted practice sets for maximum retention.",
  },
  {
    title: "Real Deadlines & Milestone Tests",
    subtitle: "Stay ahead of official SAT registrations and full practice exams.",
  },
  {
    title: "Adaptive Practice Flow",
    subtitle: "Sessions automatically adjust to your strengths and areas needing review.",
  },
  {
    title: "You're All Set!",
    subtitle: "Complete your daily tasks each day to hit your target score.",
  },
];

export default function StudyPlannerPage() {
  const { toggleSidebar } = useSidebar();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [tasks, setTasks] = useState<CalendarTask[]>(INITIAL_TASKS);

  const toggleTaskDone = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % TUTORIAL_STEPS.length);
  };

  return (
    <div className="min-h-screen bg-[#dbeefd] flex flex-col font-dm-sans text-zinc-900 select-none overflow-x-hidden">
      {/* Background illustration styling */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[url('/study-planner-bg.png')] bg-cover bg-center bg-no-repeat opacity-95"
        style={{
          backgroundAttachment: "fixed",
        }}
      />

      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Study Planner Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-[236px] relative z-10">
        {/* Mobile Top Header */}
        <header className="flex md:hidden items-center justify-between px-4 py-3 bg-[#0e4369] text-white shadow-md">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <span className="font-bold text-base text-white">OnePrep</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-[#d2e4ee]">
            SAT Planner
          </span>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col items-center justify-start">
          {/* Top Carousel Navigation: Dots + Title + Next Button */}
          <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-3 pt-2">
            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-1.5 py-1">
              {TUTORIAL_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentStep(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentStep === idx
                      ? "w-6 h-1.5 bg-[#0284c7]"
                      : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Dynamic Step Title */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-1"
            >
              <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                {TUTORIAL_STEPS[currentStep].title}
              </h1>
            </motion.div>

            {/* "Next >" Pill Button */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>{currentStep === TUTORIAL_STEPS.length - 1 ? "Finish" : "Next"}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Central Tablet / Calendar Mockup (Matching Image 1) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-zinc-200/90 overflow-hidden relative font-dm-sans"
          >
            {/* Calendar Table Header */}
            <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-white">
              {/* GMT+0 Timezone Indicator */}
              <div className="py-2.5 px-3 flex items-center justify-start border-r border-zinc-200">
                <span className="text-[11px] font-semibold text-zinc-400">GMT+0</span>
              </div>

              {/* Mon 5 Column Header */}
              <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                <span className="text-xs font-semibold text-zinc-600">Mon</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ef4444] text-white text-[11px] font-bold shadow-2xs">
                  5
                </span>
              </div>

              {/* Tue 6 Column Header */}
              <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                <span className="text-xs font-semibold text-zinc-600">Tue</span>
                <span className="text-xs font-bold text-zinc-800">6</span>
              </div>

              {/* Wed 7 Column Header */}
              <div className="py-2 px-2 flex items-center justify-center gap-1.5 border-r border-zinc-200">
                <span className="text-xs font-semibold text-zinc-600">Wed</span>
                <span className="text-xs font-bold text-zinc-800">7</span>
              </div>

              {/* Thu 8 Column Header */}
              <div className="py-2 px-2 flex items-center justify-center gap-1.5 relative">
                <span className="text-xs font-semibold text-zinc-600">Thu</span>
                <span className="text-xs font-bold text-zinc-800">8</span>
                {/* Scroll triangle symbol top right */}
                <span className="absolute right-2 top-2.5 text-[8px] text-zinc-300">▲</span>
              </div>
            </div>

            {/* "All day" Row */}
            <div className="grid grid-cols-[68px_repeat(4,1fr)] border-b border-zinc-200 bg-[#fafafa]">
              <div className="py-2 px-3 border-r border-zinc-200 flex items-center">
                <span className="text-[11px] font-medium text-zinc-400">All day</span>
              </div>

              {/* Mon 5: Math practice test */}
              <div className="py-1.5 px-2 border-r border-zinc-200 flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="w-full bg-[#e5e7eb] hover:bg-zinc-300 text-zinc-700 text-[11px] font-semibold px-2 py-1 rounded-md transition-colors truncate cursor-pointer shadow-2xs"
                >
                  Math practice test
                </motion.div>
              </div>

              {/* Tue 6: Empty */}
              <div className="py-1.5 px-2 border-r border-zinc-200" />

              {/* Wed 7: SAT registration deadline */}
              <div className="py-1.5 px-2 border-r border-zinc-200 flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="w-full bg-[#e5e7eb] hover:bg-zinc-300 text-zinc-700 text-[11px] font-semibold px-2 py-1 rounded-md transition-colors truncate cursor-pointer shadow-2xs"
                >
                  SAT registration deadline
                </motion.div>
              </div>

              {/* Thu 8: Empty */}
              <div className="py-1.5 px-2" />
            </div>

            {/* Time Grid with Tasks */}
            <div className="relative min-h-[380px] bg-white">
              {/* Hour Lines */}
              {[
                { time: "4 PM", offset: 0 },
                { time: "5 PM", offset: 64 },
                { time: "6 PM", offset: 128 },
                { time: "7 PM", offset: 192 },
                { time: "8 PM", offset: 256 },
                { time: "9 PM", offset: 320 },
              ].map((slot) => (
                <div
                  key={slot.time}
                  style={{ top: `${slot.offset}px` }}
                  className="absolute left-0 right-0 grid grid-cols-[68px_repeat(4,1fr)] h-16 border-b border-zinc-100"
                >
                  <div className="pr-3 flex items-start justify-end pt-1 border-r border-zinc-100 select-none">
                    <span className="text-[11px] font-medium text-zinc-400 leading-none">
                      {slot.time}
                    </span>
                  </div>
                  <div className="border-r border-zinc-100" />
                  <div className="border-r border-zinc-100" />
                  <div className="border-r border-zinc-100" />
                  <div />
                </div>
              ))}

              {/* Task Cards Layer (Animated sequentially with staggered delay) */}
              <div className="absolute inset-0 grid grid-cols-[68px_repeat(4,1fr)] pointer-events-none">
                <div /> {/* Left time label spacer */}

                {/* 4 Days Columns */}
                {[0, 1, 2, 3].map((dayIdx) => {
                  const dayTasks = tasks.filter((t) => t.day === dayIdx);
                  return (
                    <div key={dayIdx} className="relative h-full pointer-events-auto px-1.5">
                      {dayTasks.map((task, tIndex) => {
                        const isMath = task.type === "math";
                        return (
                          <motion.div
                            key={task.id}
                            style={{
                              top: `${task.topOffset}px`,
                              height: `${task.heightPx}px`,
                            }}
                            initial={{ opacity: 0, scale: 0.88, y: 14 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                              delay: 0.35 + (dayIdx * 2 + tIndex) * 0.08,
                              duration: 0.45,
                              type: "spring",
                              stiffness: 280,
                              damping: 22,
                            }}
                            whileHover={{
                              scale: 1.02,
                              y: -2,
                              boxShadow: "0 6px 16px -2px rgba(0,0,0,0.12)",
                            }}
                            onClick={() => toggleTaskDone(task.id)}
                            className={`absolute left-1.5 right-1.5 rounded-md p-1.5 transition-all cursor-pointer flex flex-col justify-between overflow-hidden border-l-[3.5px] select-none ${
                              isMath
                                ? "bg-[#dcf3fe] border-[#0284c7] hover:bg-[#cbeefe]"
                                : "bg-[#fae8ff] border-[#c084fc] hover:bg-[#f5d0fe]"
                            } ${
                              task.isDone
                                ? "opacity-60 line-through ring-1 ring-emerald-500"
                                : "shadow-xs"
                            }`}
                          >
                            <div className="space-y-0.5">
                              <h4
                                className={`text-[11px] font-bold leading-tight truncate ${
                                  isMath ? "text-zinc-900" : "text-zinc-900"
                                }`}
                              >
                                {task.title}
                              </h4>
                              <p className="text-[10px] text-zinc-500 font-medium leading-none">
                                {task.time}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-0.5">
                              <span
                                className={`text-[9.5px] font-bold ${
                                  task.isDone
                                    ? "text-emerald-600"
                                    : isMath
                                    ? "text-[#0284c7]"
                                    : "text-[#9333ea]"
                                }`}
                              >
                                {task.isDone ? "1/1 done ✓" : "0/1 done"}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Right Sleek Scrollbar Indicator */}
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-full bg-zinc-300 pointer-events-none" />
            </div>

            {/* Zooming / Floating Mascot at Bottom Right (Matching Image 1) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3, x: 50, y: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.65,
                duration: 0.65,
                type: "spring",
                stiffness: 240,
                damping: 20,
              }}
              className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 z-20 pointer-events-none drop-shadow-2xl"
            >
              <motion.img
                src="/study-planner-mascot-clean.png"
                alt="Preppy Study Planner Cloud"
                className="w-32 sm:w-40 md:w-44 h-auto object-contain"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
