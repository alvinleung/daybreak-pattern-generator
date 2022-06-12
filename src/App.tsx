import React, { useEffect, useState } from "react";
import "./App.css";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import { GenerativePattern } from "./components/GenerativePattern";

const WorkspaceContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-screen h-screen flex">{children}</div>
);

function App() {
  const [seed, setSeed] = useState(34214321);

  useEffect(() => {
    const seedHash = window.location.hash.replace("#", "");
    const seedNumber = parseInt(seedHash);

    if (!isNaN(seedNumber)) setSeed(seedNumber);
  }, []);

  return (
    <WorkspaceContainer>
      <ControlPanel seed={seed} onSeedChange={(newSeed) => setSeed(newSeed)} />
      <GenerativePattern seed={seed} />
    </WorkspaceContainer>
  );
}

export default App;
