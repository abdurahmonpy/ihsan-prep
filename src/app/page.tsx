"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import WeeklyPlanCard from "@/components/WeeklyPlanCard";
import WeeklyActivityBarChart from "@/components/WeeklyActivityBarChart";
import StatsGrid from "@/components/StatsGrid";
import ScoreChart from "@/components/ScoreChart";
import SmoothCursor from "@/components/SmoothCursor";
import { useSidebar } from "@/context/SidebarContext";

export default function DashboardPage() {
  const { isOpen } = useSidebar();

  return (
    <div className="relative min-h-screen bg-[#f4f4f5] dark:bg-black text-zinc-900 dark:text-white bg-grid overflow-x-hidden transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Interactive Cursor Follower Effect */}
      <SmoothCursor />

      {/* Subtle ambient light */}
      <div className="pointer-events-none fixed top-0 left-1/3 h-[500px] w-[600px] rounded-full bg-black/[0.02] dark:bg-white/[0.025] blur-[150px]" />

      {/* Lower-half Luxury Slanted Diagonal Gold Grid Overlay */}
      <div className="gold-grid-overlay-container" aria-hidden="true">
        <div className="gold-grid-overlay-lines" />
      </div>

      {/* Main layout */}
      <div className="flex relative z-10">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area with dynamic margin based on sidebar state */}
        <main
          className={`flex-1 min-h-screen pb-20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "ml-[260px]" : "ml-0"
          }`}
        >
          <TopBar />

          <div className="px-8 space-y-7 max-w-7xl mx-auto">
            {/* 1. This week's plan with Circular Progress Gauge */}
            <div>
              <WeeklyPlanCard />
            </div>

            {/* 2. Weekly Activity Bar Chart */}
            <div>
              <WeeklyActivityBarChart />
            </div>

            {/* 3. 4 ta asosiy Stats Cards */}
            <div>
              <StatsGrid />
            </div>

            {/* 4. SAT Score Growth Curve Chart */}
            <div>
              <ScoreChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
