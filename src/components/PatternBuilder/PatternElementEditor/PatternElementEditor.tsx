import { motion } from "framer-motion";
import React from "react";
import {
  PatternElement,
  PatternElementConfigCollection,
} from "../PatternBuilder";
import CircleEditor from "./CircleEditor";
import GridEditor from "./GridEditor";
import ImageEditor from "./ImageEditor";

type Props = {
  patternElement: PatternElement;
  onChange: (newConfig: PatternElementConfigCollection) => void;
  onDelete: () => void;
};

const PatternElementEditor = ({
  patternElement,
  onChange,
  onDelete,
}: Props) => (
  <motion.div className="bg-[rgba(0,0,0,.05)]  rounded-md mb-2">
    <div className="flex mb-2 py-0.5 px-2 text-[#878787] bg-[rgba(0,0,0,.05)] uppercase tracking-wide">
      <h2>{patternElement.rendererName}</h2>
      <button className="ml-auto" onClick={onDelete}>
        x
      </button>
    </div>
    <div className="pb-2">
      {(() => {
        if (patternElement.rendererName === "grid") {
          return (
            //@ts-ignore
            <GridEditor
              {...patternElement.configs}
              onChange={(newConfig: PatternElementConfigCollection) =>
                onChange(newConfig)
              }
            />
          );
        }

        if (patternElement.rendererName === "circle") {
          return <CircleEditor />;
        }
        if (patternElement.rendererName === "image") {
          return <ImageEditor />;
        }

        return (
          <div>Editor for {patternElement.rendererName} not implemented</div>
        );
      })()}
    </div>
  </motion.div>
);

export default PatternElementEditor;
