import { RenderingFunction } from "../rendering";
import { RendererEditorRegistry } from "./rendererRegistry";

export function empty(): RenderingFunction {
  return () => {};
}

RendererEditorRegistry.register("empty", empty, {});
