"use client";

import { useState, useMemo } from "react";
import { TrendingUp, ArrowUpRight, Award } from "lucide-react";

interface DataPoint {
  month: string;
  score: number;
  math: number;
  rw: number;
}

const data: DataPoint[] = [
  { month: "Iyun", score: 820, math: 420, rw: 400 },
  { month: "Iyul", score: 940, math: 490, rw: 450 },
  { month: "Avgust", score: 1060, math: 560, rw: 500 },
  { month: "Sentabr", score: 1180, math: 630, rw: 550 },
  { month: "Oktabr", score: 1290, math: 690, rw: 600 },
  { month: "Prognoz (Noy)", score: 1420, math: 740, rw: 680 },
];

export default function ScoreChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // Default Oktabr
  const [activeFilter, setActiveFilter] = useState<"all" | "math" | "rw">("all");
  const activePoint = data[activeIdx];

  // Fixed SVG coordinate calculations
  const width = 1000;
  const height = 300;
  const paddingX = 60;
  const paddingY = 40;

  const minScore = 700;
  const maxScore = 1500;

  // Memoize coordinates to prevent re-calculations and lag
  const { points, pathD, areaD } = useMemo(() => {
    const pts = data.map((d, i) => {
      const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
      const val = activeFilter === "math" ? d.math * 2 : activeFilter === "rw" ? d.rw * 2 : d.score;
      const y = height - paddingY - ((val - minScore) / (maxScore - minScore)) * (height - paddingY * 2);
      return { x, y };
    });

    const pD = pts.reduce((acc, p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cp1x = prev.x + (p.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = prev.x + (p.x - prev.x) / 2;
      const cp2y = p.y;
      return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
    }, "");

    const aD = `${pD} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`;

    return { points: pts, pathD: pD, areaD: aD };
  }, [width, height, paddingX, paddingY, minScore, maxScore, activeFilter]);

  const targetY = height - paddingY - ((1450 - minScore) / (maxScore - minScore)) * (height - paddingY * 2);

  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-colors relative overflow-hidden group">
      {/* Subtle ambient light */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-black/[0.02] dark:bg-white/[0.03] blur-3xl" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Award className="h-4 w-4" />
              SAT Score Prediction & Growth
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="h-3.5 w-3.5" /> +470 ball o&apos;sish
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-4 mt-2">
            <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              {activePoint.score}
              <span className="text-base font-semibold text-zinc-500 ml-1.5">/ 1600</span>
            </h3>
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.06] px-4 py-1.5 rounded-xl border border-black/10 dark:border-white/10">
              <span>Math: <strong className="text-zinc-900 dark:text-white text-base">{activePoint.math}</strong></span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span>R&W: <strong className="text-zinc-900 dark:text-white text-base">{activePoint.rw}</strong></span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-zinc-900 dark:text-white font-bold">{activePoint.month}</span>
            </div>
          </div>
        </div>

        {/* Tab filters */}
        <div className="flex items-center gap-1.5 bg-black/[0.04] dark:bg-white/[0.06] p-1.5 rounded-2xl border border-black/10 dark:border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === "all"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Umumiy
          </button>
          <button
            onClick={() => setActiveFilter("math")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === "math"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Math
          </button>
          <button
            onClick={() => setActiveFilter("rw")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === "rw"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Reading
          </button>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full overflow-hidden pt-4 pb-2 z-10">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-72 sm:h-84 overflow-visible will-change-transform"
        >
          <defs>
            {/* Dark & Light Area Gradient */}
            <linearGradient id="scoreArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" className="text-zinc-900 dark:text-white" stopOpacity="0.14" />
              <stop offset="60%" stopColor="currentColor" className="text-zinc-900 dark:text-white" stopOpacity="0.03" />
              <stop offset="100%" stopColor="currentColor" className="text-zinc-900 dark:text-white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[800, 1000, 1200, 1400].map((sc) => {
            const y = height - paddingY - ((sc - minScore) / (maxScore - minScore)) * (height - paddingY * 2);
            return (
              <g key={sc}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  className="text-black/10 dark:text-white/10"
                  strokeDasharray="6 6"
                />
                <text
                  x={paddingX - 12}
                  y={y + 4}
                  fill="currentColor"
                  className="text-zinc-400 dark:text-zinc-600 font-mono text-[11px] font-semibold"
                  textAnchor="end"
                >
                  {sc}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill="url(#scoreArea)" />

          {/* Stroke curve */}
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            className="text-zinc-900 dark:text-white"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Target line (1450 goal) */}
          <line
            x1={paddingX}
            y1={targetY}
            x2={width - paddingX}
            y2={targetY}
            stroke="currentColor"
            className="text-zinc-400/60 dark:text-zinc-600/70"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={width - paddingX}
            y={targetY - 8}
            fill="currentColor"
            className="text-zinc-500 dark:text-zinc-400 text-[11px] font-bold tracking-wider"
            textAnchor="end"
          >
            TARGET: 1450 BALL ★
          </text>

          {/* Data Points */}
          {points.map((p, i) => {
            const isSelected = i === activeIdx;
            const isPredicted = i === points.length - 1;
            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => {
                  if (activeIdx !== i) setActiveIdx(i);
                }}
              >
                {/* Generous Click/Hover target area */}
                <circle cx={p.x} cy={p.y} r="28" fill="transparent" />

                {/* Vertical guide on hover */}
                {isSelected && (
                  <line
                    x1={p.x}
                    y1={p.y}
                    x2={p.x}
                    y2={height - 20}
                    stroke="currentColor"
                    className="text-black/20 dark:text-white/30"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Outer halo when selected */}
                {isSelected && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="14"
                    fill="currentColor"
                    className="text-black/10 dark:text-white/20"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? "8" : "5.5"}
                  fill={isPredicted ? "currentColor" : isSelected ? "currentColor" : "currentColor"}
                  className={
                    isSelected
                      ? "text-black dark:text-white"
                      : isPredicted
                      ? "text-zinc-400 dark:text-zinc-500"
                      : "text-zinc-700 dark:text-zinc-300"
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                />

                {/* Month label below */}
                <text
                  x={p.x}
                  y={height - 6}
                  fill="currentColor"
                  className={`text-[12px] transition-colors duration-150 ${
                    isSelected
                      ? "text-zinc-950 dark:text-white font-bold"
                      : "text-zinc-500 dark:text-zinc-400 font-medium"
                  }`}
                  textAnchor="middle"
                >
                  {data[i].month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-black/10 dark:border-white/10 relative z-10">
        <div className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-4 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
          <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">Hozirgi daraja</p>
          <p className="text-xl font-black text-zinc-900 dark:text-white mt-1">1290 ball</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Top 15% barcha o&apos;quvchilar orasida</p>
        </div>
        <div className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-4 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
          <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">Prognoz maqsad</p>
          <p className="text-xl font-black text-zinc-900 dark:text-white mt-1">1420 - 1480</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Noyabr rasmiy SAT imtihoni</p>
        </div>
        <div className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-4 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">Yechilgan testlar</p>
            <p className="text-xl font-black text-zinc-900 dark:text-white mt-1">14 ta to&apos;liq test</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Har biri 134 ta savoldan iborat</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-sm">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
