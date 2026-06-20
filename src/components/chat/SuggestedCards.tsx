"use client";
import { motion } from "framer-motion";
import { useChatStore } from "@/store/useChatStore";

interface CardConfig {
  emoji: string;
  label: string;
  desc: string;
  badge: string;
  nextNodeId: string;
  accent: string;          // CSS hex for glow
  gradFrom: string;
  gradTo: string;
  borderColor: string;
  glowColor: string;
  shape: "circle" | "ring" | "dots" | "grid" | "hex" | "wave";
}

const CARDS: CardConfig[] = [
  {
    emoji: "👔",
    label: "I'm a Recruiter",
    desc: "Resume · Highlights · Contact",
    badge: "< 2 min read",
    nextNodeId: "path_recruiter",
    accent: "#818cf8",
    gradFrom: "#1e1b4b",
    gradTo: "#0f0a2e",
    borderColor: "rgba(99,102,241,0.35)",
    glowColor: "rgba(99,102,241,0.18)",
    shape: "circle",
  },
  {
    emoji: "💻",
    label: "I'm an Engineer",
    desc: "Architectures · Code · Depth",
    badge: "Technical",
    nextNodeId: "path_engineer",
    accent: "#22d3ee",
    gradFrom: "#0c1f2e",
    gradTo: "#050d1a",
    borderColor: "rgba(6,182,212,0.35)",
    glowColor: "rgba(6,182,212,0.15)",
    shape: "grid",
  },
  {
    emoji: "🚀",
    label: "I'm a Founder",
    desc: "Products · Impact · Metrics",
    badge: "PM Focus",
    nextNodeId: "path_founder",
    accent: "#34d399",
    gradFrom: "#0a1f1a",
    gradTo: "#030f0d",
    borderColor: "rgba(52,211,153,0.30)",
    glowColor: "rgba(52,211,153,0.12)",
    shape: "ring",
  },
  {
    emoji: "🎓",
    label: "I'm a Student",
    desc: "Journey · Timeline · Growth",
    badge: "2023 → 2026",
    nextNodeId: "path_student",
    accent: "#a78bfa",
    gradFrom: "#1a0f2e",
    gradTo: "#0d0618",
    borderColor: "rgba(139,92,246,0.35)",
    glowColor: "rgba(139,92,246,0.15)",
    shape: "dots",
  },
  {
    emoji: "⚡",
    label: "Show All Projects",
    desc: "6 AI/ML Projects Built",
    badge: "Production",
    nextNodeId: "projects_hub",
    accent: "#fb923c",
    gradFrom: "#1f1008",
    gradTo: "#0f0804",
    borderColor: "rgba(251,146,60,0.30)",
    glowColor: "rgba(251,146,60,0.12)",
    shape: "hex",
  },
  {
    emoji: "✨",
    label: "Surprise Me",
    desc: "Random story from Ayush",
    badge: "Fun",
    nextNodeId: "surprise",
    accent: "#f472b6",
    gradFrom: "#1f0a1a",
    gradTo: "#0f050d",
    borderColor: "rgba(244,114,182,0.30)",
    glowColor: "rgba(244,114,182,0.12)",
    shape: "wave",
  },
];

// Decorative background SVG shapes per card type
function DecorativeShape({ shape, accent }: { shape: CardConfig["shape"]; accent: string }) {
  const op = "0.12";
  switch (shape) {
    case "circle":
      return (
        <svg className="absolute right-0 top-0 w-20 h-20 pointer-events-none" viewBox="0 0 80 80">
          <circle cx="65" cy="15" r="35" fill="none" stroke={accent} strokeWidth="1" opacity={op} />
          <circle cx="65" cy="15" r="22" fill="none" stroke={accent} strokeWidth="1" opacity={op} />
          <circle cx="65" cy="15" r="10" fill={accent} opacity="0.07" />
        </svg>
      );
    case "grid":
      return (
        <svg className="absolute right-0 top-0 w-24 h-24 pointer-events-none opacity-[0.07]" viewBox="0 0 96 96">
          {[0,1,2,3,4,5].map(r => [0,1,2,3,4,5].map(c => (
            <circle key={`${r}-${c}`} cx={8 + c*16} cy={8 + r*16} r="1.5" fill={accent} />
          )))}
        </svg>
      );
    case "ring":
      return (
        <svg className="absolute -right-4 -top-4 w-24 h-24 pointer-events-none" viewBox="0 0 96 96">
          <circle cx="72" cy="24" r="40" fill="none" stroke={accent} strokeWidth="0.8" opacity={op} />
          <circle cx="72" cy="24" r="28" fill="none" stroke={accent} strokeWidth="0.8" opacity={op} />
          <circle cx="72" cy="24" r="6" fill={accent} opacity="0.1" />
        </svg>
      );
    case "dots":
      return (
        <svg className="absolute right-1 top-1 w-20 h-16 pointer-events-none opacity-[0.1]" viewBox="0 0 80 64">
          {[0,1,2,3].map(r => [0,1,2,3,4].map(c => (
            <rect key={`${r}-${c}`} x={4 + c*16} y={4 + r*14} width="3" height="3" rx="1.5" fill={accent} />
          )))}
        </svg>
      );
    case "hex":
      return (
        <svg className="absolute right-1 top-0 w-20 h-20 pointer-events-none" viewBox="0 0 80 80">
          <polygon points="55,5 75,16 75,38 55,49 35,38 35,16" fill="none" stroke={accent} strokeWidth="1" opacity={op} />
          <polygon points="62,15 74,22 74,36 62,43 50,36 50,22" fill="none" stroke={accent} strokeWidth="1" opacity={op} />
          <polygon points="62,22 70,27 70,37 62,42 54,37 54,27" fill={accent} opacity="0.06" />
        </svg>
      );
    case "wave":
      return (
        <svg className="absolute right-0 top-0 w-24 h-16 pointer-events-none" viewBox="0 0 96 64" preserveAspectRatio="none">
          <path d="M0 32 Q12 16 24 32 Q36 48 48 32 Q60 16 72 32 Q84 48 96 32" fill="none" stroke={accent} strokeWidth="1" opacity={op} />
          <path d="M0 20 Q12 4 24 20 Q36 36 48 20 Q60 4 72 20 Q84 36 96 20" fill="none" stroke={accent} strokeWidth="1" opacity={op} />
          <path d="M0 44 Q12 28 24 44 Q36 60 48 44 Q60 28 72 44 Q84 60 96 44" fill="none" stroke={accent} strokeWidth="1" opacity={op} />
        </svg>
      );
  }
}

export default function SuggestedCards() {
  const { selectOption } = useChatStore();

  return (
    <motion.div
      className="grid grid-cols-2 gap-3 w-full"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {CARDS.map((card, i) => (
        <motion.button
          key={i}
          onClick={() => selectOption(card.label, card.nextNodeId)}
          className="group relative flex flex-col items-start gap-2 p-4 rounded-2xl
                     text-left cursor-pointer overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
            border: `1px solid ${card.borderColor}`,
            boxShadow: `0 0 0 0 ${card.glowColor}`,
          }}
          variants={{
            hidden: { opacity: 0, y: 16, scale: 0.95 },
            visible: {
              opacity: 1, y: 0, scale: 1,
              transition: { type: "spring", stiffness: 280, damping: 22 },
            },
          }}
          whileHover={{
            scale: 1.025,
            boxShadow: `0 0 24px 2px ${card.glowColor}, 0 8px 32px -8px rgba(0,0,0,0.6)`,
            borderColor: card.accent + "66",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {/* Decorative background shape */}
          <DecorativeShape shape={card.shape} accent={card.accent} />

          {/* Badge */}
          <span
            className="relative z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: card.accent + "18",
              color: card.accent,
              border: `1px solid ${card.accent}28`,
            }}
          >
            {card.badge}
          </span>

          {/* Emoji + Label */}
          <div className="relative z-10">
            <div className="text-2xl mb-1 leading-none">{card.emoji}</div>
            <div className="text-sm font-bold text-white leading-tight">
              {card.label}
            </div>
          </div>

          {/* Description */}
          <p className="relative z-10 text-[11px] text-zinc-500 group-hover:text-zinc-400
                         transition-colors duration-200 leading-relaxed">
            {card.desc}
          </p>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0
                         group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${card.accent}80, transparent)` }}
          />
        </motion.button>
      ))}
    </motion.div>
  );
}
