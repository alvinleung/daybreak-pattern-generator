import React, { useMemo, useState } from "react";
import {
  RendererEditorRegistry,
  RendererInfo,
} from "../../graphicRendering/renderers/rendererRegistry";
import {
  PatternElement,
  PatternElementConfigCollection,
} from "./PatternBuilder";

type Props = {
  onPatternElementAdded?: (newElement: PatternElement) => void;
};

const ElementPalette = ({ onPatternElementAdded }: Props) => {
  const allRenderers = useMemo(
    () => RendererEditorRegistry.getAllRenderer(),
    []
  );

  const [isShowingMenu, setIsShowingMenu] = useState(false);

  const handleElementAdd = (rendererName: string) => {
    setIsShowingMenu(false);

    const rendererInfo = RendererEditorRegistry.getRendererEntry(rendererName);

    const newpatternElementConfig: PatternElementConfigCollection = {};
    Object.keys(rendererInfo.configs).forEach((configName) => {
      newpatternElementConfig[configName] = {
        type: rendererInfo.configs[configName].type,
        value: rendererInfo.configs[configName].value,
      };
    });
    const newPatternElement: PatternElement = {
      rendererName: rendererInfo.rendererName,
      configs: newpatternElementConfig,
    };

    onPatternElementAdded && onPatternElementAdded(newPatternElement);
  };

  return (
    <div>
      <button onClick={() => setIsShowingMenu(!isShowingMenu)}>
        {isShowingMenu ? "" : "Add"}
      </button>
      <div className="grid grid-cols-2 gap-4">
        {isShowingMenu &&
          Object.keys(allRenderers).map((rendererName, index) => {
            return (
              <button
                key={index}
                className="py-8 rounded-lg bg-[#EEE] text-center hover:opacity-50"
                onClick={() => handleElementAdd(rendererName)}
              >
                {rendererName}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default ElementPalette;
