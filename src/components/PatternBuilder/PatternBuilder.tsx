import React, { useMemo, useState } from "react";
import {
  ParameterType,
  RendererInfo,
} from "../../graphicRendering/renderers/rendererRegistry";
import { RenderingFunction } from "../../graphicRendering/rendering";
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
  const [basePatternElement, setBasePatternElement] =
    useState<PatternElement>();

  const handlePatternElementAdd = (patternElement: PatternElement) => {
    setBasePatternElement(patternElement);
  };

  const handleBaseElementChange = (
    newConfig: PatternElementConfigCollection
  ) => {
    const withNewConfig: PatternElement = {
      ...basePatternElement,
    } as PatternElement;
    withNewConfig.configs = newConfig;
    setBasePatternElement(withNewConfig);
  };

  return (
    <div className="border-t px-3 py-3">
      {basePatternElement && (
        <PatternElementEditor
          patternElement={basePatternElement}
          onChange={handleBaseElementChange}
          onDelete={() => setBasePatternElement(undefined)}
        />
      )}
      {!basePatternElement && (
        <ElementPalette onPatternElementAdded={handlePatternElementAdd} />
      )}
    </div>
  );
};

export default PatternBuilder;
