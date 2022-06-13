import { WeightedRenderingFunctionList } from "../../graphicRendering/renderers/grid";
import {
  RenderConfigType,
  RendererEditorRegistry,
} from "../../graphicRendering/renderers/rendererRegistry";
import { RenderingFunction } from "../../graphicRendering/rendering";
import { PatternElement } from "../PatternBuilder/PatternBuilder";

// return a pattern factory
export function renderElement(elm: PatternElement): RenderingFunction {
  const rendererEntry = RendererEditorRegistry.getRendererEntry(
    elm.rendererName
  );

  function renderWeightedInfoList(
    patternElements: PatternElement[]
  ): WeightedRenderingFunctionList {
    return patternElements.map((elm: PatternElement) => {
      return {
        weight: 10,
        renderer: renderElement(elm),
      };
    });
  }

  const configValues: { [key: string]: any } = {};
  Object.keys(elm.configs).map((configKey) => {
    const config = elm.configs[configKey];

    if (config.type === RenderConfigType.WEIGHTED_RENDERER_LIST) {
      const renderedList = renderWeightedInfoList(config.value);
      configValues[configKey] = renderedList;
      return;
    }

    configValues[configKey] = config.value;
  });
  console.log(configValues);

  return rendererEntry.rendererFactory(configValues);
}
