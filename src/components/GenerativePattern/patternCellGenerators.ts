import { GridItemRenderer } from "./RandomGridItemRenderer";

export const circleRenderer: GridItemRenderer = (context, width, height) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";
  context.beginPath();
  context.arc(width / 2, width / 2, width / 2, 0, 2 * Math.PI);
  context.stroke();
};

export const horizontaLineRenderer: GridItemRenderer = (
  context,
  width,
  height
) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";

  context.beginPath();
  context.moveTo(0, height / 2);
  context.lineTo(width, height / 2);
  context.stroke();
};

export const verticalLineRenderer: GridItemRenderer = (
  context,
  width,
  height
) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";

  context.beginPath();
  context.moveTo(width / 2, 0);
  context.lineTo(width / 2, height);
  context.stroke();
};
