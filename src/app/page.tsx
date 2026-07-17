"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
        {loading ? (
          <WelcomeLoader
            key="loader"
            onComplete={() => setLoading(false)}
          />
        ) : (
          <motion.div
            key="app"
            className="h-full w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SplitPaneLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

