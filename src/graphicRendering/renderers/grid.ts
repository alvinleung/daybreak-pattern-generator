import { render } from "@testing-library/react";
import { RenderingFunction, RenderingFunctionInfo } from "../rendering";
import { Seed } from "../seed";

type GridInfo = {
  cols: number;
  rows: number;
  seed?: Seed;
};

type GridItem = {
  renderer: RenderingFunction;
  weight: number;
};
export type WeightedRenderingFunctionList = Array<GridItem>;

export function gridItem(weight: number, renderer: RenderingFunction) {
  return {
    renderer: renderer,
    weight: weight,
  };
}

export function grid(
  { cols, rows, seed }: GridInfo,
  renderers: WeightedRenderingFunctionList
): RenderingFunction {
  const suggestedSeed = seed;

  // populate an array according to the suggested probability
  const weightedInfoList = (() => {
    const resultList: WeightedRenderingFunctionList = [];
    renderers.forEach((renderInfo) => {
      for (let i = 0; i < renderInfo.weight; i++) {
        resultList.push(renderInfo);
      }
    });
    return resultList;
  })();

  // drawing a cell
  function renderCell(
    context: CanvasRenderingContext2D,
    col: number,
    row: number,
    cellWidth: number,
    cellHeight: number,
    seed: Seed
  ) {
    const rand = Math.round(
      ((seed.openSimplexNoise.noise2D(col, row) + 1) / 2) *
        (weightedInfoList.length - 1)
    );

    weightedInfoList[rand].renderer({
      context: context,
      x: col * cellWidth,
      y: row * cellHeight,
      width: cellWidth,
      height: cellHeight,
      seed: suggestedSeed || seed,
    });
  }

  // render function here
  return ({ context, seed, x, y, width, height }: RenderingFunctionInfo) => {
    for (let currCol = 0; currCol < cols; currCol++) {
      for (let currRow = 0; currRow < rows; currRow++) {
        context.save();
        context.translate(x, y);
        const cellWidth = width / cols;
        const cellHeight = height / rows;
        renderCell(context, currCol, currRow, cellWidth, cellHeight, seed);
        context.restore();
      }
    }
  };
}
