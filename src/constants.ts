import focusDuckIcon from "./assets/focus_duck_icon.jpg";
import duckBlockIcon from "./assets/duck_block_icon.png";
import justFocusIcon from "./assets/just_focus_icon.png";
import pixelRocketsIcon from "./assets/pixel_rockets_icon.jpg";

export type AppInfo = {
  appName: string;
  iconSrc: string;
};

export const appInfoArr: AppInfo[] = [
  { appName: "focusDuckIcon", iconSrc: focusDuckIcon },
  { appName: "duckBlockIcon", iconSrc: duckBlockIcon },
  { appName: "justFocusIcon", iconSrc: justFocusIcon },
  { appName: "pixelRocketsIcon", iconSrc: pixelRocketsIcon },
];
