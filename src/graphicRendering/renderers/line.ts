import { RenderingFunction } from "../rendering";

export enum Line {
  HORIZONTAL,
  VERTICAL,
}

export function line(type: Line): RenderingFunction {
  return ({ context, x, y, width, height }) => {
    context.strokeStyle = "#000";
    context.fillStyle = "#000";

    context.beginPath();
    context.moveTo(x, y + height / 2);
    context.lineTo(x + width, y + height / 2);
    context.stroke();
  };
}
