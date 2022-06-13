import React, { useMemo, useState } from "react";
import {
  ParameterType,
  RendererInfo,
} from "../../graphicRendering/renderers/rendererRegistry";
import { RenderingFunction } from "../../graphicRendering/rendering";
import { usePatternDocumentContext } from "../GenerativePattern/PatternDocumentContext";
import ElementPalette from "./ElementPalette";
import GridEditor from "./PatternElementEditor/GridEditor";
import PatternElementEditor from "./PatternElementEditor/PatternElementEditor";

type Props = {};

export interface PatternElement {
  rendererName: string;
  configs: PatternElementConfigCollection;
}

export interface PatternElementConfig<T> {
  type: ParameterType;
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
