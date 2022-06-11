import {
  createRandomGridItemRenderer,
  GridItemRenderer,
  RendererInfoList,
} from "./gridItemRenderer";

import OpenSimplexNoise from "@minttu/open-simplex-noise";

export interface PatternConfig {
  canvas?: HTMLCanvasElement;
  rows: number;
  cols: number;
  cellHeight: number;
  cellWidth: number;
  renderers: RendererInfoList;
  seed?: number;
}
export function generatePatternImage({
  canvas,
  rows,
  cols,
  cellHeight,
  cellWidth,
  renderers,
  seed = 2046,
}: PatternConfig): HTMLCanvasElement {
  const width = rows * cellHeight;
  const height = cols * cellWidth;

  const baseCanvas = canvas || document.createElement("canvas");
  baseCanvas.width = width;
  baseCanvas.height = height;
  const context = baseCanvas.getContext("2d") as CanvasRenderingContext2D;

  // background colour
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);

  const renderGridItem = createRandomGridItemRenderer(renderers, seed);

  // render the pattern
  for (let currRow = 0; currRow < rows; currRow++) {
    for (let currCol = 0; currCol < cols; currCol++) {
      // expect 0 - 1, control which icon to choose

      renderGridItem(context, currCol, currRow, cellWidth, cellHeight);
    }
  }

  return baseCanvas;
}
