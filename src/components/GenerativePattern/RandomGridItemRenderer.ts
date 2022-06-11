export type GridItemRenderer = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => void;

export function createRandomGridItemRenderer(
  renderFunctions: Array<GridItemRenderer>
) {
  function renderGridItem(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    option: number
  ) {
    // Render whitespace when options out of range
    if (option > renderFunctions.length - 1) return;

    context.save();
    context.translate(x, y);
    renderFunctions[option](context, width, height);
    context.restore();
  }
  return renderGridItem;
}
