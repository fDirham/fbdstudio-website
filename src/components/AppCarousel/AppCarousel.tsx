import styles from "./appCarousel.module.css";
import { motion, useAnimate, useScroll } from "framer-motion";
import { useEffect, useState } from "preact/hooks";
import ScrollWheelControls from "../ScrollWheelControls";
import { AppInfo, UseStateValue } from "../../utilities/customTypes";

type AppCarouselProps = {
  chosenAppIndexState: UseStateValue<number>;
  appInfoArr: AppInfo[];
  isScrollDirectionRight: boolean;
  onBackChosenAppIndex: () => void;
  onNextChosenAppIndex: () => void;
};

export default function AppCarousel(props: AppCarouselProps) {
  const {
    chosenAppIndexState,
    appInfoArr,
    isScrollDirectionRight,
    onBackChosenAppIndex,
    onNextChosenAppIndex,
  } = props;
  const [chosenAppIndex] = chosenAppIndexState;

  return (
    <div class={styles.componentContainer}>
      <AppIconCarousel
        appInfoArr={appInfoArr}
        chosenAppIndex={chosenAppIndex}
        isDirectionRight={isScrollDirectionRight}
      />
      <ScrollWheelControls
        appInfoArr={appInfoArr}
        chosenAppIndex={chosenAppIndex}
        isDirectionRight={isScrollDirectionRight}
        onBack={onBackChosenAppIndex}
        onNext={onNextChosenAppIndex}
      />
    </div>
  );
}

/**
 * MARK: App icon carousel
 */
function AppIconCarousel(props: {
  chosenAppIndex: number;
  appInfoArr: AppInfo[];
  isDirectionRight: boolean;
}) {
  const { chosenAppIndex, appInfoArr, isDirectionRight } = props;
  let leftmostAppIndex = chosenAppIndex - 1;
  let rightmostAppIndex = chosenAppIndex + 1;
  const [scope, animate] = useAnimate();
  const [canAnimate, setCanAnimate] = useState(false);

  const IMG_SIZE = 180;
  const IMG_BIG_SCALE = 1.2;
  const IMG_MARGIN = 60;

  useEffect(() => {
    let effectDuration = 0.5;
    let moveDuration = 1;

    if (!canAnimate) {
      effectDuration = 0;
      moveDuration = 0;
    }

    // Move
    const moveSpeed = -(IMG_SIZE + IMG_MARGIN);
    animate(
      `img`,
      {
        x: moveSpeed * leftmostAppIndex,
        opacity: 1,
      },
      { ease: "easeInOut", duration: moveDuration }
    );

    // Chosen lift up
    animate(
      `img:not(:nth-child(${chosenAppIndex + 1}))`,
      {
        scale: 1,
        marginBottom: 0,
      },
      { duration: effectDuration }
    );

    animate(
      `img:nth-child(${chosenAppIndex + 1})`,
      {
        scale: IMG_BIG_SCALE,
        marginBottom: 100,
      },
      { duration: effectDuration }
    );

    // Hide outgoing
    let outgoingIndex = 0;
    if (isDirectionRight) {
      outgoingIndex = leftmostAppIndex;
    } else {
      outgoingIndex = rightmostAppIndex + 2;
    }

    if (outgoingIndex > 0 && outgoingIndex <= appInfoArr.length) {
      animate(
        `img:nth-child(${outgoingIndex})`,
        {
          opacity: 0,
        },
        { duration: effectDuration }
      );
    }

    animate(
      `img:not(:nth-child(${outgoingIndex}))`,
      {
        opacity: 1,
      },
      { duration: effectDuration }
    );
  }, [chosenAppIndex]);

  useEffect(() => {
    setCanAnimate(true);
  }, []);

  return (
    <div class={styles.icons__container}>
      <div class={styles.icons__wrapper} ref={scope}>
        {appInfoArr.map((appInfo) => {
          return (
            <motion.img
              //@ts-ignore
              src={appInfo.iconSrc}
              alt=""
              style={{
                width: IMG_SIZE,
                height: IMG_SIZE,
                marginRight: IMG_MARGIN,
                opacity: 0,
              }}
            ></motion.img>
          );
        })}
      </div>
    </div>
  );
}
