import {
  createRandomGridItemRenderer,
  GridItemRenderer,
} from "./gridItemRenderer";

import OpenSimplexNoise from "@minttu/open-simplex-noise";

export interface PatternConfig {
  canvas?: HTMLCanvasElement;
  rows: number;
  cols: number;
  cellHeight: number;
  cellWidth: number;
  patternGenerators: Array<GridItemRenderer>;
  seed?: number;
}
export function createPatternImage({
  canvas,
  rows,
  cols,
  cellHeight,
  cellWidth,
  patternGenerators,
  seed = 2046,
}: PatternConfig): HTMLCanvasElement {
  const openSimplex = new OpenSimplexNoise(seed);

  const width = rows * cellHeight;
  const height = cols * cellWidth;

  const baseCanvas = canvas || document.createElement("canvas");
  baseCanvas.width = width;
  baseCanvas.height = height;
  const context = baseCanvas.getContext("2d") as CanvasRenderingContext2D;

  // background colour
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);

  const renderGridItem = createRandomGridItemRenderer(patternGenerators);

  // render the pattern
  for (let currRow = 0; currRow < rows; currRow++) {
    for (let currCol = 0; currCol < cols; currCol++) {
      // expect 0 - 1, control which icon to choose
      const scale = 10;
      const renderOption = Math.round(
        ((openSimplex.noise2D(currCol, currRow) + 1) / 2) * scale
      );

      renderGridItem(
        context,
        currCol * cellWidth,
        currRow * cellHeight,
        cellWidth,
        cellHeight,
        renderOption
      );
    }
  }

  return baseCanvas;
}
