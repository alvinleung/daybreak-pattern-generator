import { RenderingFunction } from "../rendering";

export function image(img: HTMLImageElement): RenderingFunction {
  return ({ context, x, y, width, height }) => {
    context.drawImage(img, x, y, width, height);
  };
}
