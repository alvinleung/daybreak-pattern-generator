import { RenderingFunction, RenderingFunctionInfo } from "../rendering";

export function layer(layers: Array<RenderingFunction>): RenderingFunction {
  return (info: RenderingFunctionInfo) => {
    layers.forEach((layerRenderingFunction) => {
      layerRenderingFunction(info);
    });
  };
}
