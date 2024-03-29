import { render } from "@testing-library/react";
import { RenderingFunction, RenderingFunctionInfo } from "../rendering";
import { Seed } from "../seed";
import { RenderConfigType, RendererEditorRegistry } from "./rendererRegistry";

type GridInfo = {
  cols: number;
  rows: number;
  seed?: Seed;
  renderers: WeightedRenderingFunctionList;
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

export function grid({
  cols,
  rows,
  seed,
  renderers,
}: GridInfo): RenderingFunction {
  const suggestedSeed = seed;
  // populate an array according to the suggested probability
  const weightedInfoList = (() => {
    // return an empty array if no renderer is provided
    if (!renderers) return [];

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
    cellX: number,
    cellY: number,
    cellAbsX: number,
    cellAbsY: number,
    cellWidth: number,
    cellHeight: number,
    seed: Seed
  ) {
    // const cellX = col * cellWidth;
    // const cellY = row * cellHeight;

    const rand = Math.round(
      ((seed.openSimplexNoise.noise2D(cellAbsX, cellAbsY) + 1) / 2) *
        (weightedInfoList.length - 1)
    );

    weightedInfoList[rand]?.renderer({
      context: context,
      x: cellX,
      y: cellY,
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
        const cellX = currCol * cellWidth;
        const cellY = currRow * cellHeight;

        renderCell(
          context,
          cellX,
          cellY,
          cellX + x,
          cellY + y,
          cellWidth,
          cellHeight,
          seed
        );
        context.restore();
      }
    }
  };
}

RendererEditorRegistry.register("grid", grid, {
  cols: {
    type: RenderConfigType.NUMBER,
    value: 2,
  },
  rows: {
    type: RenderConfigType.NUMBER,
    value: 2,
  },
  renderers: {
    type: RenderConfigType.WEIGHTED_RENDERER_LIST,
    value: [],
  },
});
