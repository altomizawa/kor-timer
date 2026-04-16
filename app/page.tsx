'use client'
import { useState } from "react";
import Menu from "./components/Menu";
import Tabata from "./components/Tabata";
import Welcome from "./components/Welcome";

type TimerMode = "TABATA" | "AMRAP" | "EMOM" | "FOR TIME";

export default function Home() {
  const [currentMode, setCurrentMode] = useState<TimerMode | null>(null);
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-12 font-sans dark:bg-black">
      <Welcome />
      {currentMode === null && <Menu setCurrentMode={setCurrentMode} />}
      {currentMode !== null && <Tabata currentMode={currentMode} setCurrentMode={setCurrentMode} />}
    </div>
  );
}
