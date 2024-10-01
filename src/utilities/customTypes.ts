import { Dispatch, StateUpdater } from "preact/hooks";

export type UseStateValue<T> = [T, Dispatch<StateUpdater<T>>];
export type AppInfo = {
  appName: string;
  iconSrc: string;
};
