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
    <div className="z-10 border-r text-sm">
      <div className="px-3 py-3 rounded-sm  grid gap-[.2em] ">
        <h1 className="mb-4 uppercase tracking-wide opacity-50">
          Pattern Generator
        </h1>
        <Field label="Seed">
          <TextInput type="text" value={seed} onChange={handleSeedChange} />
        </Field>
      </div>
      <div>
        <PatternBuilder />
      </div>
    </div>
  );
};

export default ControlPanel;
