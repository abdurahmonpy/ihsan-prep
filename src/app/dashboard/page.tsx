"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Plus,
  Check,
  ChevronRight,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

interface DeadlineItem {
  id: string;
  title: string;
  subtitle: string;
  dateGroup: string;
  dayOfWeek?: string;
  category: "Deadlines" | "Tasks";
  completed: boolean;
}

const initialDeadlines: DeadlineItem[] = [
  {
    id: "1",
    title: "Finish Common App personal essay",
    subtitle: "Final read-through before sending to your counselor.",
    dateGroup: "Today",
    dayOfWeek: "Friday",
    category: "Tasks",
    completed: false,
  },
  {
    id: "2",
    title: "Submit Early Action to MIT & Stanford",
    subtitle: "Check submission checklist and verify financial aid forms.",
    dateGroup: "Nov 1",
    dayOfWeek: "Friday",
    category: "Deadlines",
    completed: false,
  },
  {
    id: "3",
    title: "Request Counselor Recommendation",
    subtitle: "Send final reminder email with updated resume.",
    dateGroup: "Nov 1",
    dayOfWeek: "Friday",
    category: "Tasks",
    completed: false,
  },
  {
    id: "4",
    title: "University of California Application Deadline",
    subtitle: "Submit all 4 Personal Insight Questions (PIQs).",
    dateGroup: "Nov 15",
    dayOfWeek: "Friday",
    category: "Deadlines",
    completed: false,
  },
  {
    id: "5",
    title: "Send Official SAT Scores via College Board",
    subtitle: "Verify recipient score report codes.",
    dateGroup: "Nov 15",
    dayOfWeek: "Friday",
    category: "Tasks",
    completed: false,
  },
  {
    id: "6",
    title: "UT Austin Priority Deadline",
    subtitle: "Complete honors program supplemental essays.",
    dateGroup: "Dec 1",
    dayOfWeek: "Sunday",
    category: "Deadlines",
    completed: false,
  },
  {
    id: "7",
    title: "Draft Regular Decision Supplemental Essays",
    subtitle: "Outline supplemental essays for Harvard and Rice.",
    dateGroup: "Dec 1",
    dayOfWeek: "Sunday",
    category: "Tasks",
    completed: false,
  },
];

export default function CollegeDashboardPage() {
  const { isOpen } = useSidebar();

  // Carousel dot index
  const [activeSlide, setActiveSlide] = useState<number>(3); // 4th dot active in screenshot

  // Filter state ("All" | "Deadlines" | "Tasks")
  const [filter, setFilter] = useState<"All" | "Deadlines" | "Tasks">("All");

  // Deadlines list
  const [items, setItems] = useState<DeadlineItem[]>(initialDeadlines);

  // Add date dialog
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newSubtitle, setNewSubtitle] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("Today");
  const [newCategory, setNewCategory] = useState<"Deadlines" | "Tasks">("Tasks");

  const toggleComplete = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const filteredItems = items.filter((item) => {
    if (filter === "Deadlines") return item.category === "Deadlines";
    if (filter === "Tasks") return item.category === "Tasks";
    return true;
  });

  // Group items by dateGroup
  const dateGroups = Array.from(new Set(filteredItems.map((i) => i.dateGroup)));

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: DeadlineItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || "Added from College Planner",
      dateGroup: newDate,
      dayOfWeek: "Scheduled",
      category: newCategory,
      completed: false,
    };

    setItems([newItem, ...items]);
    setNewTitle("");
    setNewSubtitle("");
    setShowAddModal(false);
  };

  const totalAll = items.length;
  const totalDeadlines = items.filter((i) => i.category === "Deadlines").length;
  const totalTasks = items.filter((i) => i.category === "Tasks").length;

  return (
    <div className="min-h-screen bg-[#f3f7fa] text-zinc-900 font-dm-sans flex selection:bg-[#38bdf8] selection:text-white">
      {/* ---------------- SIDEBAR ---------------- */}
      <Sidebar />

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div
        className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "ml-[236px]" : "ml-0"
        }`}
      >
        {/* ---------------- TOP BANNER ---------------- */}
        <div className="w-full px-4 sm:px-6 pt-3 pb-1">
          <div className="w-full py-2.5 px-4 rounded-2xl bg-[#cffafe] border border-[#a5f3fc] shadow-2xs text-center flex items-center justify-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#0284c7] tracking-tight">
              OnePrep for Colleges uses NO ORBS till November 1!
            </span>
          </div>
        </div>

        {/* ---------------- MAIN DASHBOARD VIEW ---------------- */}
        <main className="flex-1 px-4 sm:px-6 py-3 max-w-5xl w-full mx-auto space-y-4">
          {/* ============================================================ */}
          {/* HERO BANNER SECTION (Floating Castles + Keep It All Together) */}
          {/* ============================================================ */}
          <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#c9e4f7] via-[#dcedfa] to-[#eaf3fa] border border-[#b9dcf5]/60 pt-5 pb-10 px-6 text-center min-h-[250px] sm:min-h-[270px] flex flex-col justify-between items-center shadow-xs">
            {/* Left Floating Castle Island (Paper Airplane + Tower) */}
            <div className="absolute left-0 bottom-0 top-6 w-48 sm:w-60 pointer-events-none opacity-90 hidden sm:block">
              <motion.img
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                src="/hero-castle-left-clean.png"
                alt="Left floating castle tower"
                className="h-full w-full object-contain object-left-bottom"
              />
            </div>

            {/* Right Floating Castle Island (Preppy mascot + Telescope + Castles) */}
            <div className="absolute right-0 bottom-0 top-6 w-60 sm:w-72 pointer-events-none opacity-90 hidden sm:block">
              <motion.img
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                src="/hero-castle-right-clean.png"
                alt="Right floating castle with Preppy"
                className="h-full w-full object-contain object-right-bottom"
              />
            </div>

            {/* 5 Carousel Indicator Dots at Top */}
            <div className="flex items-center justify-center gap-1.5 z-10 pt-1">
              {[0, 1, 2, 3, 4].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => setActiveSlide(dot)}
                  className={`h-1.5 transition-all rounded-full cursor-pointer ${
                    activeSlide === dot
                      ? "w-4 bg-zinc-900"
                      : "w-1.5 bg-zinc-400 hover:bg-zinc-600"
                  }`}
                  aria-label={`Slide ${dot + 1}`}
                />
              ))}
            </div>

            {/* Center Hero Heading & Subtitle */}
            <div className="relative z-10 max-w-xl mx-auto space-y-2 py-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 font-dm-sans leading-tight">
                Keep it all together
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 font-medium max-w-md mx-auto leading-relaxed">
                Track every application, requirement, and deadline from first draft to final review.
              </p>
            </div>

            {/* Hero Action Buttons */}
            <div className="relative z-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : 4))}
                className="text-xs font-semibold text-zinc-700 hover:text-black transition-colors cursor-pointer px-3 py-2"
              >
                &lt; Back
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="rounded-full bg-black hover:bg-zinc-800 text-white px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Build my college profile</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* DEADLINES CARD (Overlapping White Card from Screenshot)      */}
          {/* ============================================================ */}
          <div className="relative z-20 w-full rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-md -mt-5 sm:-mt-6">
            {/* Card Header Row: Title + Add Date Button */}
            <div className="flex items-center justify-between pb-5 border-b border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-dm-sans">
                  Deadlines
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="rounded-full bg-black hover:bg-zinc-800 text-white px-4 py-2 text-xs font-semibold shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add date</span>
              </button>
            </div>

            {/* Filter Pills: All 7 | Deadlines 3 | Tasks 4 */}
            <div className="flex items-center gap-2 pt-4 pb-4">
              <button
                type="button"
                onClick={() => setFilter("All")}
                className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === "All"
                    ? "bg-black text-white shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                }`}
              >
                All {totalAll}
              </button>

              <button
                type="button"
                onClick={() => setFilter("Deadlines")}
                className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === "Deadlines"
                    ? "bg-black text-white shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                }`}
              >
                Deadlines {totalDeadlines}
              </button>

              <button
                type="button"
                onClick={() => setFilter("Tasks")}
                className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === "Tasks"
                    ? "bg-black text-white shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                }`}
              >
                Tasks {totalTasks}
              </button>
            </div>

            {/* Timeline Groups */}
            <div className="space-y-6 pt-2">
              {dateGroups.map((dateGroup) => {
                const groupItems = filteredItems.filter((i) => i.dateGroup === dateGroup);
                const dayOfWeek = groupItems[0]?.dayOfWeek;

                return (
                  <div key={dateGroup} className="grid grid-cols-12 gap-3 sm:gap-4 items-start">
                    {/* Left Date Column */}
                    <div className="col-span-3 sm:col-span-2 pt-1 text-left">
                      <h4 className="text-sm sm:text-base font-bold text-zinc-950 font-dm-sans leading-none">
                        {dateGroup}
                      </h4>
                      {dayOfWeek && (
                        <p className="text-xs text-zinc-400 font-medium mt-1">
                          {dayOfWeek}
                        </p>
                      )}
                    </div>

                    {/* Right Timeline Node + Items */}
                    <div className="col-span-9 sm:col-span-10 relative pl-4 sm:pl-6 border-l-2 border-zinc-200 space-y-3">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[7px] top-2.5 w-3 h-3 rounded-full border-2 border-zinc-400 bg-white" />

                      {groupItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                            item.completed
                              ? "bg-zinc-50 border-zinc-200/60 opacity-60"
                              : "bg-white border-zinc-200/90 hover:border-zinc-300 hover:shadow-xs"
                          }`}
                        >
                          <div className="space-y-1 text-left">
                            <h5
                              className={`text-sm sm:text-[15px] font-semibold text-zinc-900 leading-snug ${
                                item.completed ? "line-through text-zinc-500" : ""
                              }`}
                            >
                              {item.title}
                            </h5>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                              {item.subtitle}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 pt-0.5">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                                item.category === "Deadlines"
                                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                                  : "bg-blue-50 text-blue-600 border border-blue-200"
                              }`}
                            >
                              {item.category}
                            </span>

                            <button
                              type="button"
                              onClick={() => toggleComplete(item.id)}
                              className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                                item.completed
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : "border-zinc-300 hover:border-zinc-500 bg-white"
                              }`}
                              title={item.completed ? "Mark incomplete" : "Mark complete"}
                            >
                              {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="py-12 text-center text-zinc-400 text-sm">
                  No {filter.toLowerCase()} found.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ---------------- ADD DATE MODAL ---------------- */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-2xl relative space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <h3 className="text-lg font-bold text-zinc-950 font-dm-sans">
                  Add Deadline or Task
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-zinc-400 hover:text-zinc-600 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-3.5 text-left text-xs">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Submit Harvard Application"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] text-sm text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">
                    Description / Subtext
                  </label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="e.g. Review supplementary essays and recommendations"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] text-sm text-zinc-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-zinc-700 mb-1">
                      Date Group
                    </label>
                    <select
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] text-sm text-zinc-900"
                    >
                      <option value="Today">Today</option>
                      <option value="Nov 1">Nov 1</option>
                      <option value="Nov 15">Nov 15</option>
                      <option value="Dec 1">Dec 1</option>
                      <option value="Jan 1">Jan 1</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-zinc-700 mb-1">
                      Type
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as "Deadlines" | "Tasks")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] text-sm text-zinc-900"
                    >
                      <option value="Tasks">Tasks</option>
                      <option value="Deadlines">Deadlines</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-black hover:bg-zinc-800 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
                  >
                    Add to Deadlines
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
