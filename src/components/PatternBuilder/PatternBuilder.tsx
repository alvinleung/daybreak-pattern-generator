import React, { useMemo, useState } from "react";
import { RenderConfigType } from "../../graphicRendering/renderers/rendererRegistry";
import { usePatternDocumentContext } from "../GenerativePattern/PatternDocumentContext";
import ElementPalette from "./ElementPalette";
import PatternElementEditor from "./PatternElementEditor/PatternElementEditor";

import "../../graphicRendering/renderers/graphic";

type Props = {};

export interface PatternElement {
  rendererName: string;
  configs: PatternElementConfigCollection;
}

export interface PatternElementConfig<T> {
  type: RenderConfigType;
  value: T;
}

export interface PatternElementConfigCollection {
  [key: string]: PatternElementConfig<any>;
}

const PatternBuilder = (props: Props) => {
  const { baseElement, setBaseElement } = usePatternDocumentContext();

  const handlePatternElementAdd = (patternElement: PatternElement) => {
    setBaseElement && setBaseElement(patternElement);
  };

  const handleBaseElementChange = (
    newConfig: PatternElementConfigCollection
  ) => {
    const withNewConfig: PatternElement = {
      ...baseElement,
    } as PatternElement;
    withNewConfig.configs = newConfig;
    setBaseElement && setBaseElement(withNewConfig);
  };

  return (
    <div className="border-t px-3 py-3">
      {baseElement && (
        <PatternElementEditor
          patternElement={baseElement}
          onChange={handleBaseElementChange}
          onDelete={() => setBaseElement && setBaseElement(undefined)}
        />
      )}
      {!baseElement && (
        <ElementPalette onPatternElementAdded={handlePatternElementAdd} />
      )}
    </div>
  );
};

export default PatternBuilder;
