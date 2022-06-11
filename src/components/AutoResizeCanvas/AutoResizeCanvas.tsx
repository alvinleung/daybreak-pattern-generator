import React, { MutableRefObject, useEffect, useRef, useState } from "react";

type Props = {
  onRender?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    delta: number
  ) => void;
  onInit?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => Promise<any>;
  onResize?: (width: number, height: number) => void;
};

function AutoResizeCanvas({ onRender, onInit, onResize }: Props) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;
  const [hasInit, setHasInit] = useState(false);

  // context and loop
  useEffect(() => {
    // setup canvas
    contextRef.current = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    let currentAnimationFrameNumber = 0;

    async function init() {
      // init
      onInit && (await onInit(canvasRef.current, contextRef.current));
      setHasInit(true);

      let lastFrameTime = 0;
      function updateFrame(currentFrameTime: number) {
        const delta = currentFrameTime - lastFrameTime;
        lastFrameTime = currentFrameTime;

        canvasRef.current &&
          contextRef.current &&
          onRender &&
          onRender(canvasRef.current, contextRef.current, delta);

        currentAnimationFrameNumber = requestAnimationFrame(updateFrame);
      }
      currentAnimationFrameNumber = requestAnimationFrame(updateFrame);
    }
    init();

    // clean up
    return () => {
      cancelAnimationFrame(currentAnimationFrameNumber);
    };
  }, []);

  useEffect(() => {
    if (!hasInit) return;

    function handleResize() {
      // instead of window size, use the canvas size to drive the value
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const width = canvasRect.width;
      const height = canvasRect.height;

      // handle window resize
      setCanvasSize({
        width: width,
        height: height,
      });

      onResize && onResize(width, height);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasInit]);

  return (
    <canvas
      className="w-full h-full"
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
}

export default AutoResizeCanvas;
