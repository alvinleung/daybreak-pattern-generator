import { generatePatternImage } from "./generatePatternImage";
import { GridItemRenderer } from "./RandomGridItemRenderer";

async function init(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  // init
}

let patternImage: HTMLCanvasElement;

const circleRenderer: GridItemRenderer = (context, width, height) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";
  context.beginPath();
  context.arc(width / 2, width / 2, width / 2, 0, 2 * Math.PI);
  context.stroke();
};
const horizontaLineRenderer: GridItemRenderer = (context, width, height) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";

  context.beginPath();
  context.moveTo(0, height / 2);
  context.lineTo(width, height / 2);
  context.stroke();
};

const verticalLineRenderer: GridItemRenderer = (context, width, height) => {
  context.strokeStyle = "#000";
  context.fillStyle = "#000";

  context.beginPath();
  context.moveTo(width / 2, 0);
  context.lineTo(width / 2, height);
  context.stroke();
};

function update(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  seed: number
) {
  renderContent(canvas, context, seed);
}

function renderContent(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  seed: number
) {
  // render
  if (!patternImage) {
    patternImage = generatePatternImage({
      rows: 100,
      cols: 100,
      cellWidth: 10,
      cellHeight: 10,
      patternGenerators: [
        circleRenderer,
        horizontaLineRenderer,
        verticalLineRenderer,
      ],
    });
  }

  context.fillStyle = "#EEE";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const centeringPosX = (canvas.width - patternImage.width) / 2;
  const centeringPosY = (canvas.height - patternImage.height) / 2;
  context.drawImage(patternImage, centeringPosX, centeringPosY);
}
export { init, update };
