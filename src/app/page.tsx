import AmbientBackground from "@/components/core/AmbientBackground";
import SplitPaneLayout from "@/components/core/SplitPaneLayout";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#09090B]">
      <AmbientBackground />
      <SplitPaneLayout />
    </main>
  );
}
