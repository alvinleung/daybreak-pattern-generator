import { RenderingFunction } from "../rendering";

export function empty(): RenderingFunction {
  return () => {};
}
