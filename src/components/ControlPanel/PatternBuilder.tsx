import React, { useState } from "react";

type Props = {};

enum CellRendererTypes {
  IMAGE,
  EMPTY,
  SUB_GRID,
}
interface CellRenderer {
  type: CellRendererTypes;
  weight: number;
}
interface SubgridRenderer extends CellRenderer {
  renderers: CellRendererList;
}

type CellRendererList = Array<CellRenderer> | Array<SubgridRenderer>;

const ImageCell = () => {
  return (
    <div>
      <div className="rounded-lg bg-[#EEE] w-full h-24"></div>
      image
    </div>
  );
};

const PatternBuilder = (props: Props) => {
  const [patternStructureInfo, setPatternStructureInfo] =
    useState<CellRendererList>([]);

  return (
    <div className="border-t px-3 py-3">
      <div>
        <ImageCell />
        <ImageCell />
        <ImageCell />
      </div>
    </div>
  );
};

export default PatternBuilder;
