import {
  createRandomGridItemRenderer,
  GridItemRenderer,
} from "./RandomGridItemRenderer";

export interface PatternConfig {
  canvas?: HTMLCanvasElement;
  rows: number;
  cols: number;
  cellHeight: number;
  cellWidth: number;
  patternGenerators: Array<GridItemRenderer>;
}
export function generatePatternImage({
  canvas,
  rows,
  cols,
  cellHeight,
  cellWidth,
  patternGenerators,
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

  const renderGridItem = createRandomGridItemRenderer(patternGenerators);

  // render the pattern
  for (let currRow = 0; currRow < rows; currRow++) {
    for (let currCol = 0; currCol < cols; currCol++) {
      // expect 0 - 1, control which icon to choose
      const renderOption = Math.round(Math.random() * 10);

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
