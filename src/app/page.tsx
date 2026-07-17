import AmbientBackground from "@/components/core/AmbientBackground";
import SplitPaneLayout from "@/components/core/SplitPaneLayout";

export default function Home() {
  return (
    <main
      className="relative h-[100dvh] w-screen overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <AmbientBackground />
      <SplitPaneLayout />
    </main>
  );
}
