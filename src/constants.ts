import focusDuckIcon from "./assets/focus_duck_icon.jpg";
import duckBlockIcon from "./assets/duck_block_icon.png";
import justFocusIcon from "./assets/just_focus_icon.png";
import pixelRocketsIcon from "./assets/pixel_rockets_icon.jpg";
import { AppInfo, AppInfoType } from "./utilities/customTypes";

export const appInfoArr: AppInfo[] = [
  {
    appName: "Focus Duck",
    iconSrc: focusDuckIcon,
    description: `
    Focus Duck is a pomodoro focus timer that helps you work! It's duck theming makes the app a fun and cute companion to take to your work.
    With Focus Duck, you can be more productive by taking necessary breaks during long work sessions as well as get access to a work journal. You can customize your focus duck to suit your needs.
    `,
    links: [
      {
        baseUrl:
          "https://apps.apple.com/us/app/focus-duck-pomodoro-timer/id6670568589",
        type: AppInfoType.IOS_APP_STORE,
      },
      {
        baseUrl:
          "https://apps.apple.com/us/app/focus-duck-pomodoro-timer/id6670568589",
        type: AppInfoType.MAC_APP_STORE,
      },
      {
        baseUrl:
          "https://apps.apple.com/us/app/focus-duck-pomodoro-timer/id6670568589",
        type: AppInfoType.EXTERNAL_LINK,
        label: "Support page",
      },
    ],
  },
  { appName: "Duck Block", iconSrc: duckBlockIcon },
  { appName: "Just Focus", iconSrc: justFocusIcon },
  { appName: "Pixel Rockets", iconSrc: pixelRocketsIcon },
];
