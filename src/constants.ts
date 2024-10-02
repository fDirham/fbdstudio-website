import { AppInfo, AppInfoType } from "./utilities/customTypes";

const S3_ROOT_URL = "https://d1af2lvvh100pg.cloudfront.net/";

export const downloadButtonMacAppStoreSrc =
  S3_ROOT_URL + "fbdstudio/download_app_store_mac.png";
export const downloadButtonIosAppStoreSrc =
  S3_ROOT_URL + "fbdstudio/download_app_store_ios.png";

export const appInfoArr: AppInfo[] = [
  {
    appName: "Just Focus",
    iconSrc: S3_ROOT_URL + "fbdstudio/just_focus_icon.png",
    description: `
    Just Focus is a MacOS app that helps you focus. It is a simple, minimalistic timer that lives in your Mac's status bar, fine tuned for the pomodoro technique. You can customize it's functionality, appearance, and even it's alarm sounds.
    `,
    links: [
      {
        baseUrl:
          "https://appstoreconnect.apple.com/apps/6615067696/distribution",
        type: AppInfoType.MAC_APP_STORE,
      },
    ],
  },
  {
    appName: "Focus Duck",
    iconSrc: S3_ROOT_URL + "fbdstudio/focus_duck_icon.jpg",
    description: `
    Focus Duck is a pomodoro focus timer that helps you work! Its duck themed art makes the app a fun and cute companion to take to your work.
    With Focus Duck, you can be more productive by taking necessary breaks during long work sessions as well as get access to a work journal. You can customize your focus duck to suit your needs.
    `,
    links: [
      {
        baseUrl:
          "https://apps.apple.com/us/app/focus-duck-pomodoro-timer/id6670568589",
        type: AppInfoType.IOS_APP_STORE,
      },
    ],
  },
  {
    appName: "Pixel Rockets",
    iconSrc: S3_ROOT_URL + "fbdstudio/pixel_rockets_icon.jpg",
    description: `
Dodge asteroids and collect gold in this fun endless runner of a game. Featuring custom pixel art and simple controls.
`,
    links: [
      {
        baseUrl:
          "https://apps.apple.com/us/app/just-focus-work-timer/id6615067696",
        type: AppInfoType.IOS_APP_STORE,
      },
    ],
  },
  {
    appName: "Duck Block",
    iconSrc: S3_ROOT_URL + "fbdstudio/duck_block_icon.png",
    description: `
    Duck Block helps you stay off social media and other addicting apps or websites. Simply choose apps you want blocked and you will no longer be able to access them. Key features include: 
    - customizable schedules for when apps should be blocked
    - grouping apps to block together
    - a rationed blocking system where you have X amount of unlocks per schedule
    `,
    links: [
      {
        baseUrl: "",
        type: AppInfoType.EXTERNAL_LINK,
        label: "COMING SOON!",
      },
    ],
  },
];
