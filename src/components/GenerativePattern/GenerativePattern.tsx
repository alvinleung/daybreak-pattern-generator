import { motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { generatePatternImage } from "./generatePatternImage";
import { circleRenderer } from "./patternCellGenerators";

type Props = {};

const GenerativePattern = (props: Props) => {
  const [isPanning, setIsPanning] = useState(false);

  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  useEffect(() => {
    generatePatternImage({
      canvas: canvasRef.current,
      rows: 100,
      cols: 100,
      cellHeight: 10,
      cellWidth: 10,
      patternGenerators: [circleRenderer],
    });
  }, []);

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
