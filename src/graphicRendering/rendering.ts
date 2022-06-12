import { Seed } from "./seed";

export type RenderingFunctionInfo = {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  seed: Seed;
};

export type Dimension = { width: number; height: number };

export type RenderingFunction = (
  info: RenderingFunctionInfo
) => void | Dimension;
