"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AmbientBackground from "@/components/core/AmbientBackground";
import SplitPaneLayout from "@/components/core/SplitPaneLayout";
import WelcomeLoader from "@/components/core/WelcomeLoader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main
      className="relative h-[100dvh] w-screen overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <AmbientBackground />
      
      <AnimatePresence mode="wait">
        {loading && (
          <WelcomeLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <SplitPaneLayout />
    </main>
  );
}
