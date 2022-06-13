import { RenderingFunction } from "../rendering";
import { RenderConfigType, RendererEditorRegistry } from "./rendererRegistry";

export function image(img: HTMLImageElement): RenderingFunction {
  return ({ context, x, y, width, height }) => {
    context.drawImage(img, x, y, width, height);
  };
}

RendererEditorRegistry.register("image", image, {
  image: {
    type: RenderConfigType.STRING,
    value: "",
  },
});
