import React from "react";
import {
  ParameterType,
  RendererInfo,
} from "../../../graphicRendering/renderers/rendererRegistry";
import { Field, TextInput } from "../../ControlPanel/formUI";
import ElementPalette from "../ElementPalette";
import {
  PatternElement,
  PatternElementConfig,
  PatternElementConfigCollection,
} from "../PatternBuilder";
import CircleEditor from "./CircleEditor";
import PatternElementEditor from "./PatternElementEditor";

type Props = {
  rows: PatternElementConfig<number>;
  cols: PatternElementConfig<number>;
  renderers: PatternElementConfig<Array<PatternElement>>;
  onChange: (newConfig: PatternElementConfigCollection) => void;
};

const GridEditor = ({ onChange, rows, cols, renderers }: Props) => {
  const handlePatternElementAdd = (newPatternElement: PatternElement) => {
    onChange({
      rows: rows,
      cols: cols,
      renderers: {
        type: ParameterType.WEIGHTED_RENDERER_LIST,
        value: [...renderers.value, newPatternElement],
      },
    });
  };
  const handlePatternElementChange = (
    newConfigs: PatternElementConfigCollection,
    index: number
  ) => {
    const updatedRenderers = {
      type: ParameterType.WEIGHTED_RENDERER_LIST,
      value: renderers.value,
    };
    updatedRenderers.value[index].configs = newConfigs;

    onChange({
      rows: rows,
      cols: cols,
      renderers: updatedRenderers,
    });
  };
  return (
    <div>
      <h2 className="opacity-50 text-xs font-bold">Grid</h2>
      <Field label="rows">
        <TextInput value={rows.value} />
      </Field>
      <Field label="cols">
        <TextInput value={cols.value} />
      </Field>
      <div className="pl-4">
        <h3 className="opacity-50 text-xs">Renderers</h3>
        {renderers.value.map((patternElement, index) => {
          return (
            <PatternElementEditor
              patternElement={patternElement}
              onChange={(newConfigs) => {
                handlePatternElementChange(newConfigs, index);
              }}
            />
          );
        })}
        <ElementPalette onPatternElementAdded={handlePatternElementAdd} />
      </div>
    </div>
  );
};

export default GridEditor;
