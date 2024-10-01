import { Dispatch, StateUpdater } from "preact/hooks";
import styles from "./DetailMode.module.css";
import { motion } from "framer-motion";
import ScrollWheelControls from "../ScrollWheelControls";
import { AppInfo } from "../../utilities/customTypes";

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
  const [chosenAppIndex, setChosenAppIndex] = chosenAppIndexState;
  const chosenApp: AppInfo = appInfoArr[chosenAppIndex];

  const IMG_SIZE = 320;
  const IMG_MARGIN = 60;

  const renderIconImg = () => {
    return (
      <motion.img
        //@ts-ignore
        src={chosenApp.iconSrc}
        alt=""
        style={{
          width: IMG_SIZE,
          height: IMG_SIZE,
        }}
      />
    );
  };
  return (
    <div class={styles.componentContainer}>
      <div class={styles.leftSide}>
        {renderIconImg()}
        <ScrollWheelControls
          appInfoArr={appInfoArr}
          chosenAppIndex={chosenAppIndex}
          isDirectionRight={isScrollDirectionRight}
          onBack={onBackChosenAppIndex}
          onNext={onNextChosenAppIndex}
        />
      </div>
      <div class={styles.divider}></div>
      <div class={styles.rightSide}>
        <h2>{chosenApp.appName}</h2>
      </div>
    </div>
  );
}
