import React from "react";
import { ParameterType } from "../../../graphicRendering/renderers/rendererRegistry";
import { NumberSlider } from "../../ControlPanel/controls/NumberSlider";
import { Field, NumberInput, TextInput } from "../../ControlPanel/formUI";
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

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

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

  const handlePatternElementDelete = (index: number) => {
    const newRendererList = [...renderers.value];
    newRendererList.splice(index, 1);

    onChange({
      rows: rows,
      cols: cols,
      renderers: {
        type: ParameterType.WEIGHTED_RENDERER_LIST,
        value: newRendererList,
      },
    });
  };

  const handleRowsChange = (value: number) => {
    const newRows = { ...rows };
    newRows.value = value;

    onChange({
      rows: newRows,
      cols: cols,
      renderers: renderers,
    });
  };
  const handleColsChange = (value: number) => {
    const newCols = { ...cols };
    newCols.value = value;

    onChange({
      rows: rows,
      cols: newCols,
      renderers: renderers,
    });
  };

  return (
    <>
      <div className="px-2">
        <Field label="rows">
          {/* <NumberInput value={rows.value} onChange={handleRowsChange} /> */}
          <NumberSlider
            stepMode
            stepSize={1}
            value={rows.value}
            onChange={handleRowsChange}
          />
        </Field>
        <Field label="cols">
          <NumberSlider
            stepMode
            stepSize={1}
            value={cols.value}
            onChange={handleColsChange}
          />
        </Field>
      </div>
      <div className="mb-2 mt-2 opacity-50 px-2">
        <h3>Renderers</h3>
        {/* <button>+</button> */}
      </div>
      <div className="px-2">
        {renderers.value.length > 0 &&
          renderers.value.map((patternElement, index) => {
            return (
              <PatternElementEditor
                patternElement={patternElement}
                onChange={(newConfigs) => {
                  handlePatternElementChange(newConfigs, index);
                }}
                onDelete={() => {
                  handlePatternElementDelete(index);
                }}
              />
            );
          })}
        <ElementPalette onPatternElementAdded={handlePatternElementAdd} />
      </div>
    </>
  );
};

export default GridEditor;
