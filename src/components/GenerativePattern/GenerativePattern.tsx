import React, { MutableRefObject, useEffect, useRef } from "react";
import AutoResizeCanvas from "../AutoResizeCanvas/AutoResizeCanvas";
import { init, update } from "./canvasLogic";

type Props = {};

const GenerativePattern = (props: Props) => {
  const onRender = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    delta: number
  ) => {
    update(canvas, context, 234);
  };

  const onInit = async (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => {
    init(canvas, context);
  };

  return <AutoResizeCanvas onInit={onInit} onRender={onRender} />;
};

export default GenerativePattern;
