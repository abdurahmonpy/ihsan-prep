"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Bot,
  Calendar,
  User,
  Compass,
  FileText,
  ShieldCheck,
  Landmark,
  Users,
  GraduationCap,
  Smartphone,
  MoreHorizontal,
  Settings,
  ChevronRight,
  Search,
  ArrowUpCircle,
  PanelLeftClose,
  BarChart3,
  Bookmark,
  BookOpen,
  Calculator,
  Layers,
  Flame,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

// OnePrep Cloud Mascot SVG
function CloudMascot() {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-xs">
        <defs>
          <linearGradient id="cloudGradSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7EE7F8" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <path
          d="M9 22.5C6.5 22.5 4.5 20.5 4.5 18C4.5 15.8 6.1 13.9 8.3 13.6C9.1 10.3 12 8 15.5 8C19.3 8 22.5 10.7 23.1 14.4C24 13.8 25.2 13.5 26.5 13.5C29.5 13.5 32 16 32 19C32 22 29.5 24.5 26.5 24.5L9 24.5Z"
          fill="url(#cloudGradSide)"
        />
        <ellipse cx="14" cy="18" rx="2" ry="2.6" fill="#0C4A6E" />
        <ellipse cx="22" cy="18" rx="2" ry="2.6" fill="#0C4A6E" />
        <circle cx="14.8" cy="17.2" r="0.9" fill="#FFFFFF" />
        <circle cx="22.8" cy="17.2" r="0.9" fill="#FFFFFF" />
        <circle cx="10" cy="20" r="1.6" fill="#FB7185" opacity="0.85" />
        <circle cx="26" cy="20" r="1.6" fill="#FB7185" opacity="0.85" />
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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, closeSidebar } = useSidebar();

  // Track selection state based on current pathname
  const activeTrack: "SAT" | "ACT" | "AP" | "College" =
    pathname?.includes("/sat") || pathname === "/home" || pathname === "/study-planner"
      ? "SAT"
      : pathname?.includes("/act")
      ? "ACT"
      : pathname?.includes("/ap")
      ? "AP"
      : "College";

  const [selectedTrack, setSelectedTrack] = useState<"SAT" | "ACT" | "AP" | "College">(activeTrack);
  const [activeMenu, setActiveMenu] = useState<string>(
    pathname === "/study-planner" ? "Study Planner" : "Home"
  );

  useEffect(() => {
    if (pathname === "/study-planner") {
      setSelectedTrack("SAT");
      setActiveMenu("Study Planner");
    } else if (pathname === "/home") {
      setSelectedTrack("SAT");
      setActiveMenu("Home");
    } else if (pathname === "/college-applications" || pathname === "/dashboard") {
      setSelectedTrack("College");
    }
  }, [pathname]);

  const handleTrackClick = (track: "SAT" | "ACT" | "AP" | "College") => {
    setSelectedTrack(track);
    if (track === "SAT") {
      router.push("/home");
    } else if (track === "College") {
      router.push("/college-applications");
    }
  };

  const isSatTrack = selectedTrack === "SAT";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -260, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -260, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-0 top-0 bottom-0 z-40 flex w-[236px] flex-col bg-[#0e4369] text-white select-none shadow-2xl font-dm-sans"
        >
          {/* Header Row: Logo + Search */}
          <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
            <Link
              href={isSatTrack ? "/home" : "/dashboard"}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <CloudMascot />
              <span className="text-lg font-bold tracking-tight text-white font-dm-sans">
                OnePrep
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-[#7eaec6] hover:text-white hover:bg-[#1a5f87] transition-colors cursor-pointer"
                title="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={closeSidebar}
                aria-label="Close menu"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-[#7eaec6] hover:text-white hover:bg-[#1a5f87] transition-colors md:hidden cursor-pointer"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Top Tabs: SAT | ACT | AP | College */}
          <div className="px-3 py-1.5">
            <div className="flex items-center justify-between gap-1 text-[11px] font-medium">
              {(["SAT", "ACT", "AP", "College"] as const).map((track) => {
                const isActive = selectedTrack === track;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => handleTrackClick(track)}
                    className={`py-1 px-2.5 rounded-full transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                      isActive
                        ? "bg-white text-[#0e4369] font-bold shadow-xs"
                        : "text-[#9ec4dc] hover:text-white"
                    }`}
                  >
                    <span>{track}</span>
                    {track === "College" && selectedTrack === "College" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0e4369] inline-block" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable Navigation Area */}
          <nav className="flex-1 overflow-y-auto px-2.5 py-2 space-y-3.5 text-xs font-medium scrollbar-thin scrollbar-thumb-[#1a5f87] scrollbar-track-transparent">
            {/* ============================================================ */}
            {/* SAT TRACK MENU ITEMS (Matching Image 4 & 5)                   */}
            {/* ============================================================ */}
            {isSatTrack ? (
              <>
                <div className="space-y-0.5">
                  <Link
                    href="/home"
                    onClick={() => setActiveMenu("Home")}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
                      activeMenu === "Home" && pathname === "/home"
                        ? "bg-white text-[#0e4369] font-bold shadow-xs"
                        : "text-[#d2e4ee] hover:bg-[#16537f] hover:text-white"
                    }`}
                  >
                    <Home className={`h-4 w-4 ${activeMenu === "Home" && pathname === "/home" ? "fill-[#0e4369]" : ""}`} strokeWidth={2} />
                    <span className="text-xs font-semibold">Home</span>
                  </Link>

                  <Link
                    href="#tutor"
                    onClick={() => setActiveMenu("Tutor")}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2 transition-colors cursor-pointer ${
                      activeMenu === "Tutor"
                        ? "bg-white text-[#0e4369] font-bold shadow-xs"
                        : "text-[#d2e4ee] hover:bg-[#16537f] hover:text-white"
                    }`}
                  >
                    <Bot className="h-4 w-4" strokeWidth={2} />
                    <span className="text-xs">Ask Preppy Tutor</span>
                  </Link>

                  <Link
                    href="/study-planner"
                    onClick={() => setActiveMenu("Study Planner")}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
                      activeMenu === "Study Planner" || pathname === "/study-planner"
                        ? "bg-white text-[#0e4369] font-bold shadow-xs"
                        : "text-[#d2e4ee] hover:bg-[#16537f] hover:text-white"
                    }`}
                  >
                    <Calendar className={`h-4 w-4 ${activeMenu === "Study Planner" || pathname === "/study-planner" ? "text-[#0e4369]" : ""}`} strokeWidth={2} />
                    <span className="text-xs font-semibold">Study Planner</span>
                  </Link>

                  <Link
                    href="#analytics"
                    onClick={() => setActiveMenu("Analytics")}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors cursor-pointer"
                  >
                    <BarChart3 className="h-4 w-4" strokeWidth={2} />
                    <span className="text-xs">Analytics</span>
                  </Link>

                  <Link
                    href="#saved-mistakes"
                    onClick={() => setActiveMenu("Saved & Mistakes")}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors cursor-pointer"
                  >
                    <Bookmark className="h-4 w-4" strokeWidth={2} />
                    <span className="text-xs">Saved &amp; Mistakes</span>
                  </Link>
                </div>

                {/* MASTERCLASS Section */}
                <div className="space-y-1">
                  <div className="px-3 py-1 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7eb4d6]">
                      MASTERCLASS
                    </span>
                    <span className="rounded-md bg-[#0ea5e9] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-2xs">
                      New
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href="#reading-writing"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <BookOpen className="h-4 w-4" strokeWidth={2} />
                      <span className="text-xs">Reading &amp; Writing</span>
                    </Link>

                    <Link
                      href="#math-desmos"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <Calculator className="h-4 w-4" strokeWidth={2} />
                      <span className="text-xs">Math &amp; Desmos</span>
                    </Link>
                  </div>
                </div>

                {/* PRACTICE Section */}
                <div className="space-y-1">
                  <div className="px-3 py-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7eb4d6]">
                      PRACTICE
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href="#question-bank"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <Layers className="h-4 w-4" strokeWidth={2} />
                      <span className="text-xs">Question Bank</span>
                    </Link>

                    <Link
                      href="#question-rush"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <Flame className="h-4 w-4 text-[#fbbf24]" strokeWidth={2} />
                      <span className="text-xs">Question Rush</span>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              /* ============================================================ */
              /* COLLEGE TRACK MENU ITEMS                                     */
              /* ============================================================ */
              <>
                <div className="space-y-0.5">
                  <Link
                    href="/college-applications"
                    onClick={() => setActiveMenu("Home")}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
                      activeMenu === "Home"
                        ? "bg-white text-[#0e4369] font-bold shadow-xs"
                        : "text-[#d2e4ee] hover:bg-[#16537f] hover:text-white"
                    }`}
                  >
                    <Home className={`h-4 w-4 ${activeMenu === "Home" ? "fill-[#0e4369]" : ""}`} strokeWidth={2} />
                    <span className="text-xs font-semibold">Home</span>
                  </Link>

                  <Link
                    href="#advisor"
                    onClick={() => setActiveMenu("Advisor")}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors cursor-pointer"
                  >
                    <Bot className="h-4 w-4" strokeWidth={2} />
                    <span className="text-xs">Ask Preppy Advisor</span>
                  </Link>

                  <Link
                    href="#planner"
                    onClick={() => setActiveMenu("Planner")}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" strokeWidth={2} />
                    <span className="text-xs">Planner</span>
                  </Link>
                </div>

                {/* MY APPLICATION Section */}
                <div className="space-y-1">
                  <div className="px-3 py-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7eb4d6]">
                      MY APPLICATION
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href="#profile"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <User className="h-4 w-4" strokeWidth={2} />
                      <span className="text-xs">My Profile</span>
                    </Link>

                    <Link
                      href="#chance-me"
                      className="flex items-center justify-between rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Compass className="h-4 w-4" strokeWidth={2} />
                        <span className="text-xs">Chance Me</span>
                      </div>
                      <span className="rounded-md bg-[#0ea5e9] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-2xs">
                        New
                      </span>
                    </Link>

                    <Link
                      href="#essay-grader"
                      className="flex items-center justify-between rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" strokeWidth={2} />
                        <span className="text-xs">Essay Grader</span>
                      </div>
                      <span className="rounded-md bg-[#0ea5e9] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-2xs">
                        New
                      </span>
                    </Link>

                    <Link
                      href="#final-read"
                      className="flex items-center justify-between rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                        <span className="text-xs">Final Read</span>
                      </div>
                      <span className="rounded-md bg-[#0ea5e9] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-2xs">
                        New
                      </span>
                    </Link>
                  </div>
                </div>

                {/* DISCOVER Section */}
                <div className="space-y-1">
                  <div className="px-3 py-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7eb4d6]">
                      DISCOVER
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href="#colleges"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <Landmark className="h-4 w-4" strokeWidth={2} />
                      <span className="text-xs">Colleges</span>
                    </Link>

                    <Link
                      href="#profiles"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <Users className="h-4 w-4" strokeWidth={2} />
                      <span className="text-xs">Profiles</span>
                    </Link>

                    <Link
                      href="#essays"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <FileText className="h-4 w-4" strokeWidth={2} />
                      <span className="text-xs">Essays</span>
                    </Link>

                    <Link
                      href="#scholarships"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-1.5 text-[#d2e4ee] hover:bg-[#16537f] hover:text-white transition-colors"
                    >
                      <GraduationCap className="h-4 w-4" strokeWidth={2} />
                      <span className="text-xs">Scholarships</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </nav>

          {/* Footer Actions & Profile */}
          <div className="px-3 pt-2 pb-3 border-t border-[#1a5f87]/60 space-y-1.5 bg-[#0b3756]">
            {/* Getting started 0/6 (For SAT track) */}
            {isSatTrack && (
              <div className="flex items-center justify-between px-2.5 py-1.5 text-xs text-[#d2e4ee] hover:bg-[#16537f] rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#7eaec6] flex items-center justify-center text-[8px] font-bold">
                    0
                  </div>
                  <span className="text-xs font-semibold">Getting started</span>
                </div>
                <span className="text-[11px] font-bold text-[#7eaec6]">0/6</span>
              </div>
            )}

            {/* Upgrade with 40% Off */}
            <Link
              href="/onboarding"
              className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#16537f] rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ArrowUpCircle className="h-4 w-4 text-[#fbbf24]" />
                <span className="text-xs font-bold text-white">Upgrade</span>
              </div>
              <span className="bg-[#fbbf24] text-black font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                40% Off
              </span>
            </Link>

            {/* Get the app */}
            <button
              type="button"
              className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-[#d2e4ee] hover:text-white hover:bg-[#16537f] rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" strokeWidth={2} />
                <span className="text-xs">Get the app</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-[#7eaec6]" />
            </button>

            {/* More */}
            <button
              type="button"
              className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-[#d2e4ee] hover:text-white hover:bg-[#16537f] rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
                <span className="text-xs">More</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-[#7eaec6]" />
            </button>

            {/* User Profile Row */}
            <div className="pt-2 border-t border-[#1a5f87]/50 flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src="/user-avatar.png"
                  alt="Abdurahmon avatar"
                  className="w-6 h-6 rounded-full object-cover shrink-0 border border-white/20"
                />
                <span className="text-xs font-semibold text-white truncate max-w-[110px]">
                  Abdurahmon ...
                </span>
              </div>
              <button
                type="button"
                className="text-[#7eaec6] hover:text-white transition-colors p-1 rounded-lg cursor-pointer"
                title="Settings"
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
