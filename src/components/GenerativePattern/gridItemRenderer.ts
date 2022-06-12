import OpenSimplexNoise from "@minttu/open-simplex-noise";

interface GridItemInfo {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  seed: number;
}

export type GridItemRenderer = (info: GridItemInfo) => void;
export type CellRendererInfoList = Array<CellRendererInfo>;

export interface CellRendererInfo {
  renderer: GridItemRenderer;
  weight: number;
}

export function createRandomGridItemRenderer(
  rendererInfoList: CellRendererInfoList,
  seed: number
) {
  const openSimplex = new OpenSimplexNoise(seed);

  const weightedInfoList = (() => {
    const finalList: CellRendererInfoList = [];
    rendererInfoList.forEach((renderInfo) => {
      for (let i = 0; i < renderInfo.weight; i++) {
        finalList.push(renderInfo);
      }
    });
    return finalList;
  })();

  function renderGridItem(
    context: CanvasRenderingContext2D,
    col: number,
    row: number,
    width: number,
    height: number
  ) {
    const rand = Math.round(
      ((openSimplex.noise2D(col, row) + 1) / 2) * (weightedInfoList.length - 1)
    );

    // Render whitespace when options out of range
    weightedInfoList[rand].renderer({
      context: context,
      x: col * width,
      y: row * height,
      width: width,
      height: height,
      seed: seed,
    });
  }
  return renderGridItem;
}
