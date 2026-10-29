"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Bot,
  Calendar,
  BarChart2,
  Bookmark,
  BookOpen,
  Zap,
  Swords,
  Clock,
  Layers,
  Smartphone,
  MoreHorizontal,
  Settings,
  ChevronRight,
  Search,
  ArrowUpCircle,
  PanelLeftClose,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

// Cute OnePrep Cloud Mascot SVG
function CloudMascot() {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7EE7F8" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        {/* Fluffy Cloud Body */}
        <path
          d="M9 22.5C6.5 22.5 4.5 20.5 4.5 18C4.5 15.8 6.1 13.9 8.3 13.6C9.1 10.3 12 8 15.5 8C19.3 8 22.5 10.7 23.1 14.4C24 13.8 25.2 13.5 26.5 13.5C29.5 13.5 32 16 32 19C32 22 29.5 24.5 26.5 24.5L9 24.5Z"
          fill="url(#cloudGrad)"
        />
        {/* Cute Big Eyes */}
        <ellipse cx="14" cy="18" rx="2" ry="2.6" fill="#0C4A6E" />
        <ellipse cx="22" cy="18" rx="2" ry="2.6" fill="#0C4A6E" />
        <circle cx="14.8" cy="17.2" r="0.9" fill="#FFFFFF" />
        <circle cx="22.8" cy="17.2" r="0.9" fill="#FFFFFF" />
        {/* Pink Rosy Cheeks */}
        <circle cx="10" cy="20" r="1.6" fill="#FB7185" opacity="0.85" />
        <circle cx="26" cy="20" r="1.6" fill="#FB7185" opacity="0.85" />
        {/* Happy Smile */}
        <path
          d="M16 20.5Q18 22.5 20 20.5"
          stroke="#0C4A6E"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// User Profile Mascot Avatar
function UserMascotAvatar() {
  return (
    <div className="relative h-8 w-8 rounded-full bg-[#38bdf8] p-0.5 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <circle cx="18" cy="18" r="17" fill="#67e8f9" />
        {/* Glasses Frame */}
        <circle cx="12.5" cy="18" r="5" fill="#0284c7" stroke="#7e22ce" strokeWidth="1.6" />
        <circle cx="23.5" cy="18" r="5" fill="#0284c7" stroke="#7e22ce" strokeWidth="1.6" />
        <line x1="17.5" y1="18" x2="18.5" y2="18" stroke="#7e22ce" strokeWidth="2" />
        {/* Eyes inside glasses */}
        <circle cx="12.5" cy="18" r="2" fill="#ffffff" />
        <circle cx="13" cy="17.5" r="1" fill="#000000" />
        <circle cx="23.5" cy="18" r="2" fill="#ffffff" />
        <circle cx="24" cy="17.5" r="1" fill="#000000" />
        {/* Cheeks */}
        <circle cx="7.5" cy="22" r="2" fill="#f43f5e" opacity="0.9" />
        <circle cx="28.5" cy="22" r="2" fill="#f43f5e" opacity="0.9" />
        {/* Mouth */}
        <path d="M15.5 23Q18 25.5 20.5 23" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

// Custom Math & Desmos Icon
function MathSymbolsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="7" x2="11" y2="7" />
      <line x1="8" y1="4" x2="8" y2="10" />
      <line x1="14" y1="7" x2="20" y2="7" />
      <circle cx="17" cy="14" r="1" fill="currentColor" />
      <line x1="14" y1="17" x2="20" y2="17" />
      <circle cx="17" cy="20" r="1" fill="currentColor" />
      <line x1="5" y1="14" x2="11" y2="20" />
      <line x1="11" y1="14" x2="5" y2="20" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();
  const [selectedTrack, setSelectedTrack] = useState<"SAT" | "MS">("SAT");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -260, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -260, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-0 top-0 bottom-0 z-40 flex w-[248px] flex-col bg-[#135073] text-white select-none shadow-2xl font-sans"
        >
          {/* Header Row: Logo + Search + Close */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2.5">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity" title="Tanishtiruv sahifasiga qaytish">
              <CloudMascot />
              <span className="text-xl font-extrabold tracking-tight text-white">
                OnePrep
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                className="h-8 w-8 rounded-xl flex items-center justify-center text-[#7eaec6] hover:text-white hover:bg-[#1a5f87] transition-colors"
                title="Qidiruv"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={closeSidebar}
                aria-label="Menyuni yopish"
                className="h-8 w-8 rounded-xl flex items-center justify-center text-[#7eaec6] hover:text-white hover:bg-[#1a5f87] transition-colors md:hidden"
                title="Menyuni yopish"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Top Pill Selector: Faqat SAT va MS */}
          <div className="px-3 py-2">
            <div className="bg-[#245e80] p-1 rounded-full flex items-center shadow-inner">
              <button
                onClick={() => setSelectedTrack("SAT")}
                className={`flex-1 py-1.5 rounded-full text-xs font-black transition-all text-center ${
                  selectedTrack === "SAT"
                    ? "bg-white text-[#135073] shadow-sm"
                    : "text-[#c2dded] hover:text-white"
                }`}
              >
                SAT
              </button>
              <button
                onClick={() => setSelectedTrack("MS")}
                className={`flex-1 py-1.5 rounded-full text-xs font-black transition-all text-center ${
                  selectedTrack === "MS"
                    ? "bg-white text-[#135073] shadow-sm"
                    : "text-[#c2dded] hover:text-white"
                }`}
              >
                MS
              </button>
            </div>
          </div>

          {/* Scrollable Navigation Area */}
          <nav className="flex-1 overflow-y-auto px-2.5 py-1.5 space-y-4 text-xs font-medium scrollbar-thin scrollbar-thumb-[#245e80] scrollbar-track-transparent">
            {/* General Menu Items */}
            <div className="space-y-1">
              {/* Home (Active Item) */}
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-full bg-white text-[#135073] font-bold px-3.5 py-2.5 shadow-sm transition-all"
              >
                <Home className="h-4 w-4 fill-[#135073]" strokeWidth={1.5} />
                <span className="text-[13px] font-bold">Home</span>
              </Link>

              <Link
                href="#tutor"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
              >
                <Bot className="h-4 w-4" strokeWidth={2} />
                <span className="text-[13px]">Ask Preppy Tutor</span>
              </Link>

              <Link
                href="#planner"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
              >
                <Calendar className="h-4 w-4" strokeWidth={2} />
                <span className="text-[13px]">Study Planner</span>
              </Link>

              <Link
                href="#analytics"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
              >
                <BarChart2 className="h-4 w-4" strokeWidth={2} />
                <span className="text-[13px]">Analytics</span>
              </Link>

              <Link
                href="#saved"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
              >
                <Bookmark className="h-4 w-4" strokeWidth={2} />
                <span className="text-[13px]">Saved & Mistakes</span>
              </Link>
            </div>

            {/* MASTERCLASS Section */}
            <div>
              <div className="flex items-center gap-2 px-3 py-1 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#6e9bb3]">
                  MASTERCLASS
                </span>
                <span className="rounded bg-[#009bd6] px-1.5 py-0.5 text-[9px] font-extrabold text-white leading-none shadow-xs">
                  New
                </span>
              </div>
              <div className="space-y-0.5">
                <Link
                  href="#reading"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
                >
                  <BookOpen className="h-4 w-4" strokeWidth={2} />
                  <span className="text-[13px]">Reading & Writing</span>
                </Link>

                <Link
                  href="#math"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
                >
                  <MathSymbolsIcon className="h-4 w-4" />
                  <span className="text-[13px]">Math & Desmos</span>
                </Link>
              </div>
            </div>

            {/* PRACTICE Section */}
            <div>
              <div className="px-3 py-1 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#6e9bb3]">
                  PRACTICE
                </span>
              </div>
              <div className="space-y-0.5">
                <Link
                  href="#question-bank"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
                >
                  <div className="h-4 w-4 rounded border border-current flex items-center justify-center text-[10px] font-black">
                    ?
                  </div>
                  <span className="text-[13px]">Question Bank</span>
                </Link>

                <Link
                  href="#rush"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
                >
                  <Zap className="h-4 w-4 fill-current text-[#7ee7f8]" />
                  <span className="text-[13px]">Question Rush</span>
                </Link>

                <Link
                  href="#challenge"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
                >
                  <Swords className="h-4 w-4" strokeWidth={2} />
                  <span className="text-[13px]">Challenge Questions</span>
                </Link>

                <Link
                  href="#full-tests"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
                >
                  <Clock className="h-4 w-4" strokeWidth={2} />
                  <span className="text-[13px]">Full-Length Tests</span>
                </Link>

                <Link
                  href="#vocab"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#1a5f87] hover:text-white transition-colors"
                >
                  <Layers className="h-4 w-4" strokeWidth={2} />
                  <span className="text-[13px]">Vocab</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Footer Items (Getting Started, Upgrade, App, More, Profile) */}
          <div className="px-3 pt-2 pb-3 border-t border-[#1a5f87]/60 space-y-2 bg-[#104868]">
            {/* Getting started 0/6 pill */}
            <div className="bg-[#245e80] rounded-xl px-3 py-2 flex items-center justify-between text-xs font-semibold shadow-inner cursor-pointer hover:bg-[#2b6d93] transition-colors">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-[#7ee7f8] flex items-center justify-center" />
                <span className="text-white text-[12px] font-bold">Getting started</span>
              </div>
              <span className="text-[#8ec1db] text-[11px] font-extrabold">0/6</span>
            </div>

            {/* Upgrade with 40% Off Gold Badge */}
            <button className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-bold text-white hover:bg-[#1a5f87] rounded-xl transition-colors">
              <div className="flex items-center gap-2.5">
                <ArrowUpCircle className="h-4 w-4 text-[#fbbf24]" />
                <span className="text-white text-[12px] font-bold">Upgrade</span>
              </div>
              <span className="bg-[#fbbf24] text-black font-black text-[10px] px-2 py-0.5 rounded-lg shadow-sm">
                40% Off
              </span>
            </button>

            {/* Get the app */}
            <button className="w-full flex items-center justify-between px-2 py-1 text-xs font-semibold text-[#d2e4ee] hover:text-white hover:bg-[#1a5f87] rounded-xl transition-colors">
              <div className="flex items-center gap-2.5">
                <Smartphone className="h-4 w-4" strokeWidth={2} />
                <span className="text-[12px]">Get the app</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-[#7eaec6]" />
            </button>

            {/* More */}
            <button className="w-full flex items-center justify-between px-2 py-1 text-xs font-semibold text-[#d2e4ee] hover:text-white hover:bg-[#1a5f87] rounded-xl transition-colors">
              <div className="flex items-center gap-2.5">
                <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
                <span className="text-[12px]">More</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-[#7eaec6]" />
            </button>

            {/* User Profile Row */}
            <div className="pt-2 border-t border-[#1a5f87]/50 flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <UserMascotAvatar />
                <span className="text-[13px] font-bold text-white truncate">
                  Abdurrohman
                </span>
              </div>
              <button
                className="text-[#7eaec6] hover:text-white transition-colors p-1 rounded-lg"
                title="Sozlamalar"
              >
                <Settings className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
