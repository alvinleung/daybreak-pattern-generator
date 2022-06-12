import { RenderingFunction } from "./rendering";
import { Seed } from "./seed";

export interface GraphicInfo {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  seed: Seed;
}

export function generateGraphic(
  info: GraphicInfo,
  renderer: RenderingFunction
) {
  // render the graphic here
  const baseCanvas = info.canvas || document.createElement("canvas");
  baseCanvas.width = info.width;
  baseCanvas.height = info.height;

  // baseCanvas.style.width = info.width / window.devicePixelRatio + "px";
  // baseCanvas.style.height = info.height / window.devicePixelRatio + "px";

  const context = baseCanvas.getContext("2d") as CanvasRenderingContext2D;

  // background colour
  context.fillStyle = "#fff";
  context.fillRect(0, 0, info.width, info.height);

  // call the base renderer
  renderer({
    context: context,
    x: 0,
    y: 0,
    width: info.width,
    height: info.height,
    seed: info.seed,
  });

  return;
}

export interface CellInfo {
  rows: number;
  cols: number;
  cellWidth: number;
  cellHeight: number;
}
export function getCanvasSizeFromCellInfo({
  rows,
  cols,
  cellWidth,
  cellHeight,
}: CellInfo) {
  return {
    width: cols * cellWidth,
    height: rows * cellHeight,
  };
}
