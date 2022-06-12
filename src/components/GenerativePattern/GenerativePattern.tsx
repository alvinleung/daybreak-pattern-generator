import { motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { renderGraphic } from "../../graphicRendering/renderGraphic";
import { circle } from "../../graphicRendering/renderers/circle";
import { empty } from "../../graphicRendering/renderers/empty";
import graphic from "../../graphicRendering/renderers/graphic";
import { image } from "../../graphicRendering/renderers/image";
import { line, Line } from "../../graphicRendering/renderers/line";
import { createSeed } from "../../graphicRendering/seed";

type Props = {
  seed: number;
  lazyUpdate?: boolean;
};

const GenerativePattern = ({ seed, lazyUpdate = false }: Props) => {
  const [isPanning, setIsPanning] = useState(false);
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    const seedInfo = createSeed(seed);
    let animFrameReq: number;

    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    function draw() {
      renderGraphic(
        {
          context: context,
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

      if (!lazyUpdate) animFrameReq = requestAnimationFrame(draw);
    }
    animFrameReq = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameReq);
    };
  }, [seed, lazyUpdate]);

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
