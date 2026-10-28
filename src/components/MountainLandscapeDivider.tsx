"use client";

import { motion } from "framer-motion";

export default function MountainLandscapeDivider() {
  return (
    <div className="relative w-full overflow-hidden -mb-1 select-none pointer-events-none">
      <svg
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto min-h-[100px] preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Golden metallic gradient */}
          <linearGradient id="goldMountainStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="85%" stopColor="#d97706" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.4" />
          </linearGradient>

          {/* Golden soft fill for back mountains */}
          <linearGradient id="goldBackFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Layer 1: Back Mountain Peaks (Orqa tog' tizmasi) */}
        <path
          d="M0 90 L120 55 L240 85 L380 40 L520 75 L680 30 L820 65 L980 25 L1140 70 L1300 35 L1440 80 L1440 180 L0 180 Z"
          fill="url(#goldBackFill)"
          opacity="0.7"
        />
        <path
          d="M0 90 L120 55 L240 85 L380 40 L520 75 L680 30 L820 65 L980 25 L1140 70 L1300 35 L1440 80"
          stroke="url(#goldMountainStroke)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Layer 2: Main Mountain Ridges & Peaks (Asosiy oldingi tog' cho'qqilari) */}
        <path
          d="M0 130 L160 85 L290 120 L440 60 L590 105 L760 50 L910 95 L1060 45 L1220 100 L1360 65 L1440 110 L1440 180 L0 180 Z"
          fill="#ffffff"
        />

        {/* Golden luminous ridge contour line on top of main mountains */}
        <path
          d="M0 130 L160 85 L290 120 L440 60 L590 105 L760 50 L910 95 L1060 45 L1220 100 L1360 65 L1440 110"
          stroke="url(#goldMountainStroke)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          filter="url(#goldGlow)"
        />
      </svg>
    </div>
  );
}
