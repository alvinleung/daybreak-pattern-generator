import { RenderingFunction } from "../rendering";
import { RendererEditorRegistry } from "./rendererRegistry";

export function horizontalLine(): RenderingFunction {
  return ({ context, x, y, width, height }) => {
    context.strokeStyle = "#000";
    context.fillStyle = "#000";

    context.beginPath();
    context.moveTo(x, y + height / 2);
    context.lineTo(x + width, y + height / 2);
    context.stroke();
  };
}

export function verticalLine(): RenderingFunction {
  return ({ context, x, y, width, height }) => {
    context.strokeStyle = "#000";
    context.fillStyle = "#000";

    context.beginPath();
    context.moveTo(x + width / 2, y);
    context.lineTo(x + width / 2, y + height);
    context.stroke();
  };
}

RendererEditorRegistry.register("-", horizontalLine, {});
RendererEditorRegistry.register("|", verticalLine, {});
