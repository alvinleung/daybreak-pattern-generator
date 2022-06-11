import React, { useEffect, useState } from "react";
import "./App.css";
import Controls from "./components/Controls/Controls";
import { GenerativePattern } from "./components/GenerativePattern";

function App() {
  const [seed, setSeed] = useState(34214321);

  useEffect(() => {
    const seedHash = window.location.hash.replace("#", "");
    const seedNumber = parseInt(seedHash);

    if (!isNaN(seedNumber)) setSeed(seedNumber);
  }, []);

  return (
    <div className="w-screen h-screen">
      <Controls seed={seed} onSeedChange={(newSeed) => setSeed(newSeed)} />
      <GenerativePattern seed={seed} />
    </div>
  );
}

export default App;
