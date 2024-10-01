import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import styles from "./DetailMode.module.css";
import { motion } from "framer-motion";
import ScrollWheelControls from "../ScrollWheelControls";
import { AppInfo, AppInfoLink, AppInfoType } from "../../utilities/customTypes";
import SingleIconCarousel from "../SingleIconCarousel";
import downloadAppStoreIosIcon from "../../assets/download_app_store_ios.png";
import downloadAppStoreMacIcon from "../../assets/download_app_store_mac.png";

type DetailModeProps = {
  chosenAppIndexState: [number, Dispatch<StateUpdater<number>>];
  appInfoArr: AppInfo[];
  isScrollDirectionRight: boolean;
  onBackChosenAppIndex: () => void;
  onNextChosenAppIndex: () => void;
};

export default function DetailMode(props: DetailModeProps) {
  const {
    chosenAppIndexState,
    appInfoArr,
    onBackChosenAppIndex,
    onNextChosenAppIndex,
    isScrollDirectionRight,
  } = props;
  const [chosenAppIndex] = chosenAppIndexState;
  const chosenApp: AppInfo = appInfoArr[chosenAppIndex];
  const [currDisplayedApp, setCurrDisplayedApp] = useState<AppInfo>(chosenApp);

  const renderDescription = (desc: string) => {
    const toReturn = [];
    desc.split("\n").forEach((substr) => {
      toReturn.push(<p>{substr}</p>);
      toReturn.push(<br />);
    });
    return toReturn;
  };

  useEffect(() => {
    // TODO: Animate
    setCurrDisplayedApp(chosenApp);
  }, [chosenAppIndex]);

  return (
    <div class={styles.componentContainer}>
      <div class={styles.leftSide}>
        <SingleIconCarousel
          chosenAppIndexState={chosenAppIndexState}
          appInfoArr={appInfoArr}
          isScrollDirectionRight={isScrollDirectionRight}
        />
        <ScrollWheelControls
          appInfoArr={appInfoArr}
          chosenAppIndex={chosenAppIndex}
          isDirectionRight={isScrollDirectionRight}
          onBack={onBackChosenAppIndex}
          onNext={onNextChosenAppIndex}
        />
      </div>
      <div class={styles.divider}></div>
      <div class={styles.appInfo__container}>
        <h2>{currDisplayedApp.appName}</h2>
        {!!currDisplayedApp.description && (
          <div class={styles.appInfo__description}>
            {renderDescription(currDisplayedApp.description)}
          </div>
        )}
        {!!currDisplayedApp.links && !!currDisplayedApp.links.length && (
          <AppLinks appLinks={currDisplayedApp.links} />
        )}
      </div>
    </div>
  );
}

function AppLinks({ appLinks }: { appLinks: AppInfoLink[] }) {
  const renderLink = (appLink: AppInfoLink) => {
    if (appLink.type == AppInfoType.EXTERNAL_LINK) {
      return (
        <a
          class={styles[`appInfoLink--plain`]}
          href={appLink.baseUrl}
          target="_blank"
        >
          {appLink.label ?? "Link"}
        </a>
      );
    }
    if (appLink.type == AppInfoType.IOS_APP_STORE) {
      return (
        <a
          class={styles[`appInfoLink--iosAppStore`]}
          href={appLink.baseUrl}
          target="_blank"
        >
          <img src={downloadAppStoreIosIcon} alt="" />
        </a>
      );
    }
    if (appLink.type == AppInfoType.MAC_APP_STORE) {
      return (
        <a
          class={styles[`appInfoLink--macAppStore`]}
          href={appLink.baseUrl}
          target="_blank"
        >
          <img src={downloadAppStoreMacIcon} alt="" />
        </a>
      );
    }
    return null;
  };

  return (
    <div class={styles.appLinks__container}>
      {appLinks.map((appLink) => {
        return renderLink(appLink);
      })}
    </div>
  );
}
