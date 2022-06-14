import React, { useMemo, useState } from "react";
import { useFileDrop } from "../../hooks/FileDrop/useFileDrop";
import { useFileSave } from "../../hooks/FileDrop/useFileSave";
import { PatternElement } from "../PatternBuilder/PatternBuilder";

type IPatternDocumentContext = {
  setBaseElement: React.Dispatch<
    React.SetStateAction<PatternElement | undefined>
  >;
  baseElement: PatternElement | undefined;
};
const PatternDocumentContext = React.createContext<IPatternDocumentContext>({
  setBaseElement: () => {},
  baseElement: undefined,
});

type Props = {
  children: React.ReactNode;
};

export const usePatternDocumentContext = () =>
  React.useContext(PatternDocumentContext);

const PatternDocumentContextProvider = ({ children }: Props) => {
  const [basePatternElement, setBasePatternElement] =
    useState<PatternElement>();

  useFileSave(basePatternElement as PatternElement);

  // grab body element
  const body = useMemo(() => document.body, []);
  // create drop area
  useFileDrop(["application/json"], body, (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const patternObject = JSON.parse(reader.result as string);
      setBasePatternElement(patternObject);
    };
    reader.onerror = () => console.log(reader.error);
    reader.readAsText(file);
  });

  return (
    <PatternDocumentContext.Provider
      value={{
        baseElement: basePatternElement,
        setBaseElement: setBasePatternElement,
      }}
    >
      {children}
    </PatternDocumentContext.Provider>
  );
};

export default PatternDocumentContextProvider;
