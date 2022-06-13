import { RenderingFunction } from "../rendering";
import { RendererEditorRegistry } from "./rendererRegistry";

export function circle(): RenderingFunction {
  return ({ context, x, y, width }) => {
    context.strokeStyle = "#000";
    context.fillStyle = "#000";
    context.beginPath();
    context.arc(x + width / 2, y + width / 2, width / 2, 0, 2 * Math.PI);
    context.stroke();
  };
}

RendererEditorRegistry.register("circle", circle, {});
