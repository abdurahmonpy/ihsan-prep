"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Plus,
  ChevronRight,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

interface DeadlinePreviewItem {
  id: string;
  title: string;
  subtitle: string;
  dateGroup: string;
  dayOfWeek?: string;
  category: "Deadlines" | "Tasks";
}

const deadlinesData: DeadlinePreviewItem[] = [
  {
    id: "1",
    title: "Finish Common App personal essay",
    subtitle: "Final read-through before sending to your counselor.",
    dateGroup: "Today",
    dayOfWeek: "Friday",
    category: "Tasks",
  },
  {
    id: "2",
    title: "Submit Early Action to MIT & Stanford",
    subtitle: "Check submission checklist and verify financial aid forms.",
    dateGroup: "Nov 1",
    dayOfWeek: "Friday",
    category: "Deadlines",
  },
  {
    id: "3",
    title: "Request Counselor Recommendation",
    subtitle: "Send final reminder email with updated resume.",
    dateGroup: "Nov 1",
    dayOfWeek: "Friday",
    category: "Tasks",
  },
  {
    id: "4",
    title: "University of California Application Deadline",
    subtitle: "Submit all 4 Personal Insight Questions (PIQs).",
    dateGroup: "Nov 15",
    dayOfWeek: "Friday",
    category: "Deadlines",
  },
  {
    id: "5",
    title: "Send Official SAT Scores via College Board",
    subtitle: "Verify recipient score report codes.",
    dateGroup: "Nov 15",
    dayOfWeek: "Friday",
    category: "Tasks",
  },
  {
    id: "6",
    title: "UT Austin Priority Deadline",
    subtitle: "Complete honors program supplemental essays.",
    dateGroup: "Dec 1",
    dayOfWeek: "Sunday",
    category: "Deadlines",
  },
  {
    id: "7",
    title: "Draft Regular Decision Supplemental Essays",
    subtitle: "Outline supplemental essays for Harvard and Rice.",
    dateGroup: "Dec 1",
    dayOfWeek: "Sunday",
    category: "Tasks",
  },
];

export default function CollegeDashboardPage() {
  const router = useRouter();
  const { isOpen } = useSidebar();

  // Carousel indicator dot
  const [activeSlide, setActiveSlide] = useState<number>(3); // 4th dot active

  // Unique date groups for timeline grouping
  const dateGroups = Array.from(new Set(deadlinesData.map((i) => i.dateGroup)));

  return (
    <div className="min-h-screen bg-[#0e4369] text-zinc-900 font-dm-sans flex selection:bg-[#38bdf8] selection:text-white overflow-x-hidden">
      {/* ---------------- SIDEBAR ---------------- */}
      <Sidebar />

      {/* ---------------- FULL-BLEED MAIN CONTENT WRAPPER ---------------- */}
      <div
        className={`flex-1 min-h-screen flex flex-col relative transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "ml-[236px]" : "ml-0"
        } bg-[#d8ecf9]`}
      >
        {/* Full-bleed background image covering the entire main pane without any container */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/keep-it-together-bg.png"
            alt="OnePrep Keep It All Together Background"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* ---------------- TOP BANNER (Full width across pane) ---------------- */}
        <div className="w-full px-2 sm:px-3 pt-2 pb-1 relative z-30">
          <div className="w-full py-2.5 px-4 rounded-2xl bg-[#cffafe] border border-[#a5f3fc] shadow-2xs text-center">
            <span className="text-xs sm:text-sm font-bold text-[#0284c7] tracking-tight">
              OnePrep for Colleges uses NO ORBS till November 1!
            </span>
          </div>
        </div>

        {/* ---------------- MAIN HERO CONTENT (Directly on Background) ---------------- */}
        <main className="flex-1 w-full flex flex-col justify-between items-center text-center pt-3 pb-0 px-4 sm:px-8 relative z-10">
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
              onClick={() => router.push("/exam-board-onboarding/sat?returnTo=%2Fcollege-applications")}
              className="rounded-full bg-black hover:bg-zinc-800 text-white px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Build my college profile</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* ============================================================ */}
          {/* TABLET MOCKUP WITH DEADLINES DISPLAY                         */}
          {/* Rises directly from the background, non-interactive          */}
          {/* ============================================================ */}
          <div className="w-full max-w-3xl sm:max-w-4xl mx-auto mt-12 sm:mt-16 select-none relative z-20">
            <div className="rounded-t-[32px] sm:rounded-t-[40px] border-[10px] sm:border-[12px] border-b-0 border-zinc-950 bg-white shadow-2xl pt-2 px-5 sm:px-8 pb-16 text-left">
              {/* Tablet Top Camera Notch Dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 mx-auto my-2 opacity-80" />

              {/* Deadlines Header inside Mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-dm-sans">
                    Deadlines
                  </h2>
                </div>

                <div className="rounded-full bg-black text-white px-4 py-2 text-xs font-semibold shadow-xs flex items-center gap-1.5 opacity-90 cursor-default">
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add date</span>
                </div>
              </div>

              {/* Filter Pills (All 7 | Deadlines 3 | Tasks 4) */}
              <div className="flex items-center gap-2 pt-4 pb-4">
                <div className="py-1.5 px-3.5 rounded-full text-xs font-semibold bg-black text-white shadow-xs cursor-default">
                  All 7
                </div>
                <div className="py-1.5 px-3.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 cursor-default">
                  Deadlines 3
                </div>
                <div className="py-1.5 px-3.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 cursor-default">
                  Tasks 4
                </div>
              </div>

              {/* Grouped Timeline Display */}
              <div className="space-y-6 pt-2">
                {dateGroups.map((dateGroup) => {
                  const groupItems = deadlinesData.filter((i) => i.dateGroup === dateGroup);
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
                            className="p-4 rounded-2xl border border-zinc-200/90 bg-white flex items-start justify-between gap-3 shadow-2xs"
                          >
                            <div className="space-y-1 text-left">
                              <h5 className="text-sm sm:text-[15px] font-semibold text-zinc-900 leading-snug">
                                {item.title}
                              </h5>
                              <p className="text-xs text-zinc-500 leading-relaxed">
                                {item.subtitle}
                              </p>
                            </div>

                            <div className="shrink-0 pt-0.5">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                                  item.category === "Deadlines"
                                    ? "bg-rose-50 text-rose-600 border border-rose-200"
                                    : "bg-blue-50 text-blue-600 border border-blue-200"
                                }`}
                              >
                                {item.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
