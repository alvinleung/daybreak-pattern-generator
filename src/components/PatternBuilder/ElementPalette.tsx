import { AnimatePresence, motion } from "framer-motion";
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  RendererEditorRegistry,
  RendererInfo,
} from "../../graphicRendering/renderers/rendererRegistry";
import useClickOutside from "../../hooks/useClickOutside";
import {
  PatternElement,
  PatternElementConfigCollection,
} from "./PatternBuilder";

type Props = {
  onPatternElementAdded?: (newElement: PatternElement) => void;
};

const ElementPalette = ({ onPatternElementAdded }: Props) => {
  const allRenderers = useMemo(
    () => RendererEditorRegistry.getAllRenderer(),
    []
  );

  const [isShowingMenu, setIsShowingMenu] = useState(false);

  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  useClickOutside(
    containerRef,
    () => {
      // handle click outside
      setIsShowingMenu(false);
    },
    true
  );

  const handleElementAdd = (rendererName: string) => {
    setIsShowingMenu(false);

    const rendererInfo = RendererEditorRegistry.getRendererEntry(rendererName);

    const newpatternElementConfig: PatternElementConfigCollection = {};
    Object.keys(rendererInfo.configs).forEach((configName) => {
      newpatternElementConfig[configName] = {
        type: rendererInfo.configs[configName].type,
        value: rendererInfo.configs[configName].value,
      };
    });
    const newPatternElement: PatternElement = {
      rendererName: rendererInfo.rendererName,
      configs: newpatternElementConfig,
    };

    onPatternElementAdded && onPatternElementAdded(newPatternElement);
  };

  const [menuTopPosition, setMenuTopPosition] = useState(0);
  useEffect(() => {
    setMenuTopPosition(containerRef.current.getBoundingClientRect().top);
  }, [isShowingMenu]);

  return (
    <div className="flex flex-col w-full relative" ref={containerRef}>
      <button
        className="hover:opacity-50"
        onClick={() => setIsShowingMenu(!isShowingMenu)}
      >
        +
      </button>
      <AnimatePresence>
        {isShowingMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            style={{ top: menuTopPosition }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-2 gap-2 fixed border bg-[#FFF] p-2 shadow-xl z-10 rounded-lg"
          >
            <div className="col-span-2">Add a Renderer</div>
            {Object.keys(allRenderers).map((rendererName, index) => {
              return (
                <button
                  key={index}
                  className="py-8 px-8 rounded-lg border text-center hover:opacity-50"
                  onClick={() => handleElementAdd(rendererName)}
                >
                  {rendererName}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElementPalette;
