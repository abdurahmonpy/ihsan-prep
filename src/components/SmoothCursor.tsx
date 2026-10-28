"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function SmoothCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isDark = theme === "dark";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden transition-opacity duration-300"
      style={{
        background: isDark
          ? `radial-gradient(420px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 35%, transparent 70%)`
          : `radial-gradient(380px circle at ${position.x}px ${position.y}px, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.015) 35%, transparent 70%)`,
      }}
    />
  );
}
