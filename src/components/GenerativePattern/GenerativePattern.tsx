import { motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  generateGraphic,
  getCanvasSizeFromCellInfo,
} from "../../graphicRendering/generateGraphic";
import { circle } from "../../graphicRendering/renderers/circle";
import { empty } from "../../graphicRendering/renderers/empty";
import graphic from "../../graphicRendering/renderers/graphic";
import { image } from "../../graphicRendering/renderers/image";
import { line, Line } from "../../graphicRendering/renderers/line";
import { createSeed } from "../../graphicRendering/seed";

type Props = {
  seed: number;
};

const GenerativePattern = ({ seed }: Props) => {
  const [isPanning, setIsPanning] = useState(false);

  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  useEffect(() => {
    const seedInfo = createSeed(seed);

    const img = new Image();
    img.src =
      "https://i.picsum.photos/id/907/200/300.jpg?hmac=BYvJHklGn1KzEhHiZTkbQtFiRXUET5zYdLLKS6RXF3I";

    img.onload = () => {
      generateGraphic(
        {
          canvas: canvasRef.current,
          seed: seedInfo,
          width: 1000,
          height: 1000,
        },
        graphic.grid({ rows: 10, cols: 10 }, [
          graphic.gridItem(20, circle()),
          graphic.gridItem(5, line(Line.HORIZONTAL)),
          graphic.gridItem(10, line(Line.VERTICAL)),
          graphic.gridItem(30, empty()),
          // graphic.gridItem(30, image(img)),
          graphic.gridItem(
            50,
            graphic.grid({ cols: 4, rows: 4 }, [
              graphic.gridItem(10, circle()),
              graphic.gridItem(10, line(Line.VERTICAL)),
              graphic.gridItem(30, empty()),
            ])
          ),
        ])
      );
    };
  }, [seed]);

  return (
    <div className="bg-[#EEE] w-screen h-screen overflow-hidden">
      <motion.div
        drag
        dragMomentum={false}
        className={`${
          isPanning ? "cursor-grabbing" : "cursor-grab"
        } w-full h-full flex`}
        onPointerDown={() => setIsPanning(true)}
        onPointerUp={() => setIsPanning(false)}
      >
        <canvas ref={canvasRef} className="mx-auto my-auto" />
      </motion.div>
    </div>
  );
};

export default GenerativePattern;
