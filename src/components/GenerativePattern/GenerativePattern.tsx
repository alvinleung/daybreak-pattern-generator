import { motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { generatePatternImage } from "./generatePatternImage";
import {
  circleRenderer,
  horizontaLineRenderer,
  subGridRenderer,
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
      rows: 10,
      cols: 10,
      cellHeight: 100,
      cellWidth: 100,
      patternGenerators: [
        circleRenderer,
        circleRenderer,
        horizontaLineRenderer,
        verticalLineRenderer,
        subGridRenderer,
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
