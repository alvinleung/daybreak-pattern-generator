import React, { useEffect, useState } from "react";
import "./App.css";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import { GenerativePattern } from "./components/GenerativePattern";
import PatternDocumentContextProvider from "./components/GenerativePattern/PatternDocumentContext";
import { PatternElement } from "./components/PatternBuilder/PatternBuilder";

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
    <PatternDocumentContextProvider>
      <WorkspaceContainer>
        <ControlPanel
          seed={seed}
          onSeedChange={(newSeed) => setSeed(newSeed)}
        />
        <GenerativePattern seed={seed} />
      </WorkspaceContainer>
    </PatternDocumentContextProvider>
  );
}

export default App;
