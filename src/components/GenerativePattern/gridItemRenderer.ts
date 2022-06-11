interface GridItemInfo {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  seed: number;
}

export type GridItemRenderer = (info: GridItemInfo) => void;

export function createRandomGridItemRenderer(
  renderFunctions: Array<GridItemRenderer>
) {
  function renderGridItem(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    option: number,
    seed: number
  ) {
    // Render whitespace when options out of range
    if (option > renderFunctions.length - 1) return;

    renderFunctions[option]({
      context: context,
      x: x,
      y: y,
      width: width,
      height: height,
      seed: seed,
    });
  }
  return renderGridItem;
}
