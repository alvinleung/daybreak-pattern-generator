import { RenderingFunction } from "../rendering";
import { RendererEditorRegistry } from "./rendererRegistry";

export function square(): RenderingFunction {
  return ({ context, x, y, width, height }) => {
    context.strokeStyle = "#000";
    context.fillStyle = "#000";
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();
  };
}

RendererEditorRegistry.register("square", square, {});
