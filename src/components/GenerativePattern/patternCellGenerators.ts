import { generatePatternImage } from "./generatePatternImage";
import {
  createRandomGridItemRenderer,
  GridItemRenderer,
} from "./gridItemRenderer";

export const circleRenderer: GridItemRenderer = ({ context, x, y, width }) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";
  context.beginPath();
  context.arc(x + width / 2, y + width / 2, width / 2, 0, 2 * Math.PI);
  context.stroke();
};

export const horizontaLineRenderer: GridItemRenderer = ({
  context,
  x,
  y,
  width,
  height,
}) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";

  context.beginPath();
  context.moveTo(x, y + height / 2);
  context.lineTo(x + width, y + height / 2);
  context.stroke();
};

export const verticalLineRenderer: GridItemRenderer = ({
  context,
  x,
  y,
  width,
  height,
}) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";

  context.beginPath();
  context.moveTo(x + width / 2, y);
  context.lineTo(x + width / 2, y + height);
  context.stroke();
};

export const subGridRenderer: GridItemRenderer = ({
  context,
  x,
  y,
  width,
  height,
  seed,
}) => {
  const image = generatePatternImage({
    rows: 10,
    cols: 10,
    cellWidth: width / 10,
    cellHeight: height / 10,
    patternGenerators: [
      verticalLineRenderer,
      circleRenderer,
      horizontaLineRenderer,
    ],
    seed: seed + x * y,
  });

  context.drawImage(image, x, y, width, height);
};
