import React, { useState } from "react";
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
