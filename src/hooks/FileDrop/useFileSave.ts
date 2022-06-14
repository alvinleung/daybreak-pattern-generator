import { useHotkeys } from "react-hotkeys-hook";
import { PatternElement } from "../../components/PatternBuilder/PatternBuilder";
import { HotkeyConfig } from "../../utils/Hotkeys";
import { downloadFile } from "./downloadFile";

/**
 * Enable scene saving function
 * @param game
 */
export const useFileSave = (baseElement: PatternElement) => {
  useHotkeys(
    HotkeyConfig.SAVE,
    (e) => {
      e.preventDefault();
      if (!baseElement) {
        console.warn("Document empty, changes not saved.");
        return;
      }

      const documentStructureJSON = JSON.stringify(baseElement);
      downloadFile(
        documentStructureJSON,
        "pattern-data.json",
        "application/json"
      );
      // downloadFile(serializedScene, "Scene.json", "application/json");
    },
    [baseElement]
  );
};
