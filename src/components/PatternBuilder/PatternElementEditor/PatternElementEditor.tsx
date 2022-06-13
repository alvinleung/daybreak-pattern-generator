import React from "react";
import {
  PatternElement,
  PatternElementConfigCollection,
} from "../PatternBuilder";
import CircleEditor from "./CircleEditor";
import GridEditor from "./GridEditor";

type Props = {
  patternElement: PatternElement;
  onChange: (newConfig: PatternElementConfigCollection) => void;
};

const PatternElementEditor = ({ patternElement, onChange }: Props) => {
  if (patternElement.rendererName === "grid") {
    return (
      //@ts-ignore
      <GridEditor
        {...patternElement.configs}
        onChange={(newConfig: PatternElementConfigCollection) =>
          onChange(newConfig)
        }
      />
    );
  }

  if (patternElement.rendererName === "circle") {
    return <CircleEditor />;
  }

  return <div>Editor for {patternElement.rendererName} not implemented</div>;
};

export default PatternElementEditor;
