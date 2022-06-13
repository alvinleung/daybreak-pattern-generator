import React, { useState } from "react";

export const TextInput = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => (
  <input
    {...props}
    className="px-[.5em] py-[.25em] rounded-sm bg-[transparent] w-full"
  />
);

interface NumberInputProps {
  stepSize?: number;
  value: number;
  roundValue?: boolean;
  range?: [number, number];
  onChange: (value: number) => void;
}

export const NumberInput = ({
  stepSize = 1,
  roundValue,
  range,
  onChange,
  value,
}: NumberInputProps) => {
  const [rawValue, setRawValue] = useState<string>("");

  const propagateChange = (newValue: number) => {
    if (!onChange) return;

    let value = newValue;

    // validate and propogate
    if (roundValue) value = Math.round(value);

    if (range) {
      const min = range[0];
      const max = range[1];

      if (min) value = Math.max(min, value);
      if (max) value = Math.min(max, value);
    }

    onChange(value);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const valueNumber = parseFloat(target.value);

    // make sure this is not a readonly controlled component
    if (isNaN(valueNumber)) return;

    // make sure this is not a readonly controlled component
    // if (!props.onChange) return;

    if (e.code === "ArrowUp") {
      // numbers go up
      const newValue = valueNumber + stepSize;
      target.value = `${newValue}`;
      propagateChange(newValue);
    }

    if (e.code === "ArrowDown") {
      // numbers go down
      const newValue = valueNumber - stepSize;
      target.value = `${newValue}`;
      propagateChange(newValue);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;

    const rawValue = (e.target as HTMLInputElement).value;
    setRawValue(rawValue);

    // handle chnag here
    propagateChange(parseFloat(rawValue));
  };

  return (
    <input
      onKeyUp={handleKeyUp}
      value={isNaN(value) ? rawValue : value}
      onChange={handleChange}
      className="px-[.5em] py-[.25em] rounded-sm bg-[transparent] w-full"
    />
  );
};

type FieldProps = {
  children: React.ReactNode;
  label: string;
};
export const Field = ({ children, label }: FieldProps) => {
  return (
    <label className="flex">
      <div className="mr-[.5em] opacity-60 py-[.25em]">{label}</div>
      {children}
    </label>
  );
};

function round(value: number, decimals: number) {
  return Number(value.toFixed(decimals));
  //@ts-ignore
  // return Number(Math.round(Number(value + "E" + decimals)) + "E-" + decimals);
}

//https://www.codegrepper.com/code-examples/javascript/regex+to+check+if+string+contains+only+numbers+and+special+characters+js
function isOnlyNumericSymbols(value: string) {
  // allow white space
  if (value === " ") return true;
  return /([0-9]|[\-+#])+/.test(value);
}

function isValidNumber(value: string) {
  return !isNaN(Number(value));
}
