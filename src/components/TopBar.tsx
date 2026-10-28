"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Search, Zap, Sun, Moon, PanelLeft, PanelLeftClose } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";

export default function TopBar() {
  const [dateStr, setDateStr] = useState("Tuesday, 27 October");
  const { theme, toggleTheme } = useTheme();
  const { isOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    const now = new Date();
    const dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday",
    ];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    setDateStr(`${dayNames[now.getDay()]}, ${now.getDate()} ${monthNames[now.getMonth()]}`);
  }, []);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 border-b border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-black/80 backdrop-blur-xl mb-6 transition-colors"
    >
      <div className="flex items-center gap-3.5">
        {/* Sidebar Toggle Button (Menyuni yopish / ochish) */}
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all shadow-sm active:scale-95"
          title={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
        >
          {isOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeft className="h-4 w-4" />
          )}
        </button>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
            {dateStr}
          </p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            Welcome back, Abdurrohmon!
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button (Light / Dark Mode) */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all shadow-sm"
          title={theme === "dark" ? "Light rejimga o'tish" : "Dark rejimga o'tish"}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-300 transition-transform hover:rotate-45" />
          ) : (
            <Moon className="h-4 w-4 text-zinc-700 transition-transform hover:-rotate-12" />
          )}
        </button>

        {/* Search */}
        <button
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all"
        >
          <Search className="h-4 w-4" strokeWidth={1.8} />
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all"
        >
          <Bell className="h-4 w-4" strokeWidth={1.8} />
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-black dark:bg-white ring-2 ring-white dark:ring-black" />
        </button>

        {/* Quick action button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 px-4 py-2 text-xs font-bold text-white dark:text-black transition-all shadow-sm"
        >
          <Zap className="h-3.5 w-3.5 fill-current" />
          Start Practice
        </motion.button>
      </div>
    </motion.header>
  );
}
