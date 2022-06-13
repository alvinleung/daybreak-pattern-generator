import React, { MutableRefObject, useRef } from "react";
import { Field, TextInput } from "./formUI";
import PatternBuilder from "../PatternBuilder/PatternBuilder";

type Props = {
  seed: number;
  onSeedChange: (seed: number) => void;
};

const ControlPanel = ({ onSeedChange, seed }: Props) => {
  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberChange = parseInt(e.target.value);
    // only contraint to number
    !isNaN(numberChange) && onSeedChange(numberChange);
  };

  return (
    <div className="z-10 border-r text-xs cursor-default w-64 h-screen flex flex-col">
      <div className="px-3 py-3 grid gap-[.2em] sticky top-0 bg-[#FFF] z-10 border-b">
        <h1 className="mb-4 tracking-wide">Pattern Generator</h1>
        <Field label="Seed">
          <TextInput type="text" value={seed} onChange={handleSeedChange} />
        </Field>
      </div>
      <div className="overflow-y-scroll">
        <PatternBuilder />
      </div>
    </div>
  );
};

export default ControlPanel;
