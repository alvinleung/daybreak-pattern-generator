import { motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { generatePatternImage } from "./generatePatternImage";
import {
  circleRenderer,
  emptyRenderer,
  horizontaLineRenderer,
  createSubGridRenderer,
  verticalLineRenderer,
} from "./patternCellGenerators";

type Props = {
  seed: number;
};

const GenerativePattern = ({ seed }: Props) => {
  const [isPanning, setIsPanning] = useState(false);

  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  useEffect(() => {
    generatePatternImage({
      canvas: canvasRef.current,
      rows: 8,
      cols: 8,
      cellHeight: 100,
      cellWidth: 100,
      renderers: [
        {
          renderer: circleRenderer,
          weight: 30,
        },
        {
          renderer: createSubGridRenderer([
            {
              renderer: circleRenderer,
              weight: 20,
            },
            {
              renderer: emptyRenderer,
              weight: 70,
            },
            {
              renderer: horizontaLineRenderer,
              weight: 5,
            },
            {
              renderer: verticalLineRenderer,
              weight: 20,
            },
          ]),
          weight: 60,
        },
        {
          renderer: verticalLineRenderer,
          weight: 20,
        },
        {
          renderer: horizontaLineRenderer,
          weight: 20,
        },
        {
          renderer: emptyRenderer,
          weight: 90,
        },
      ],
      seed: seed,
    });
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
