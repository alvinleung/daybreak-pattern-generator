import React, { MutableRefObject, useRef } from "react";

type FieldProps = {
  children: React.ReactNode;
  label: string;
};
const Field = ({ children, label }: FieldProps) => {
  return (
    <div className="flex">
      <div className="mr-2 opacity-60">{label}</div>
      {children}
    </div>
  );
};

type Props = {
  seed: number;
  onSeedChange: (seed: number) => void;
};

const Controls = ({ onSeedChange, seed }: Props) => {
  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberChange = parseInt(e.target.value);
    onSeedChange(numberChange);
  };

  return (
    <div className="fixed z-10">
      <div className="bg-[#FFF] px-2 py-2 rounded-sm shadow-md grid gap-[.2em]">
        <Field label="Seed">
          <input
            type="text"
            value={seed}
            onChange={handleSeedChange}
            className="px-1 rounded-sm"
          />
        </Field>
      </div>
    </div>
  );
};

export default Controls;
