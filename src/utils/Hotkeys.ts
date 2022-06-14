import { isWindows } from "./platform";

function createBinding(mac: string, windows: string) {
  if (isWindows()) return windows;
  return mac;
}

const HotkeyConfig = {
  HIDE_UI: createBinding("cmd+\\", "ctrl+\\"),
  ESCAPE: createBinding("esc", "esc"),
  DELETE: createBinding("backspace", "del"),
  SUBMIT: createBinding("enter", "enter"),
  UNDO: createBinding("cmd+z", "ctrl+z"),
  REDO: createBinding("cmd+shift+z", "ctrl+y"),
  COPY: createBinding("cmd+c", "ctrl+c"),
  PASTE: createBinding("cmd+v", "ctrl+v"),
  SAVE: createBinding("cmd+s", "ctrl+s"),
  OPEN: createBinding("cmd+o", "ctrl+o"),
  ASSET_EXPLORER: createBinding("cmd+e", "ctrl+e"),
};

export { HotkeyConfig };
