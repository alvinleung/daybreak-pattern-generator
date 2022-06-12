import { RenderingFunction } from "./rendering";
import { Seed } from "./seed";

export interface GraphicInfo {
  width: number;
  height: number;
  context?: CanvasRenderingContext2D;
  seed: Seed;
}

export function renderGraphic(info: GraphicInfo, renderer: RenderingFunction) {
  // render the graphic here

  // if size changed, change the size
  const baseCanvas = info.context
    ? info.context.canvas
    : document.createElement("canvas");
  if (baseCanvas.width !== info.width) baseCanvas.width = info.width;
  if (baseCanvas.height !== info.height) baseCanvas.height = info.height;

  const context =
    info.context || (baseCanvas.getContext("2d") as CanvasRenderingContext2D);

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
