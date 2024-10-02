import { Dispatch, StateUpdater } from "preact/hooks";

export type UseStateValue<T> = [T, Dispatch<StateUpdater<T>>];
export type AppInfo = {
  appName: string;
  iconSrc: string;
  description?: string;
  links?: AppInfoLink[];
  tagline: string;
};

export enum AppInfoType {
  EXTERNAL_LINK,
  MAC_APP_STORE,
  IOS_APP_STORE,
}

export type AppInfoLink = {
  baseUrl: string;
  type: AppInfoType;
  label?: string;
};
