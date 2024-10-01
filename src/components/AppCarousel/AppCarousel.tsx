import styles from "./appCarousel.module.css";
import { motion, useAnimate } from "framer-motion";
import {
  Dispatch,
  StateUpdater,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";
import { AppInfo } from "../../constants";
import ScrollWheelControls from "../ScrollWheelControls";

type AppCarouselProps = {
  chosenAppIndexState: [number, Dispatch<StateUpdater<number>>];
  appInfoArr: AppInfo[];
};

export default function AppCarousel(props: AppCarouselProps) {
  const { chosenAppIndexState, appInfoArr } = props;
  const [chosenAppIndex, setChosenAppIndex] = chosenAppIndexState;

  const [autoScrollRight, _setAutoScrollRight] = useState(true); // going right means new apps come from right
  const autoScrollRightRef = useRef<boolean>(false);
  function setAutoScrollRight(newVal: boolean) {
    autoScrollRightRef.current = newVal;
    _setAutoScrollRight(newVal);
  }

  const [manualControl, _setManualControl] = useState(false);
  const manualControlRef = useRef<boolean>(false);
  function setManualControl(newVal: boolean) {
    manualControlRef.current = newVal;
    _setManualControl(newVal);
  }

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const CAROUSEL_TIMEOUT_MS = 3000;
  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (manualControlRef.current) {
          return;
        }

        setChosenAppIndex((curr) => {
          let newIdx = curr;
          if (autoScrollRightRef.current) {
            newIdx += 1;
          } else {
            newIdx -= 1;
          }

          if (newIdx < 0) {
            newIdx = 1;
            setAutoScrollRight(true);
          }
          if (newIdx >= appInfoArr.length) {
            newIdx = appInfoArr.length - 2;
            setAutoScrollRight(false);
          }

          return newIdx;
        });
      }, CAROUSEL_TIMEOUT_MS);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  function handleNext() {
    if (!manualControl) {
      setManualControl(true);
    }
    setAutoScrollRight(true);
    setChosenAppIndex((e) => {
      let newVal = e + 1;
      if (newVal < appInfoArr.length) {
        return newVal;
      }
      return e;
    });
  }

  function handleBack() {
    if (!manualControl) {
      setManualControl(true);
    }
    setAutoScrollRight(false);
    setChosenAppIndex((e) => {
      let newVal = e - 1;
      if (newVal > -1) {
        return newVal;
      }
      return e;
    });
  }

  return (
    <div class={styles.componentContainer}>
      <AppIconCarousel
        appInfoArr={appInfoArr}
        chosenAppIndex={chosenAppIndex}
        isDirectionRight={autoScrollRight}
      />
      <ScrollWheelControls
        appInfoArr={appInfoArr}
        chosenAppIndex={chosenAppIndex}
        isDirectionRight={autoScrollRight}
        onBack={handleBack}
        onNext={handleNext}
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

  const IMG_SIZE = 180;
  const IMG_BIG_SCALE = 1.2;
  const IMG_MARGIN = 60;

  useEffect(() => {
    var scaleDuration = 0.5;

    // Move
    const moveSpeed = -(IMG_SIZE + IMG_MARGIN);
    animate(
      `img`,
      {
        x: moveSpeed * leftmostAppIndex,
      },
      { ease: "easeInOut", duration: 1 }
    );

    // Chosen lift up
    animate(
      `img:not(:nth-child(${chosenAppIndex + 1}))`,
      {
        scale: 1,
        marginBottom: 0,
      },
      { duration: scaleDuration }
    );

    animate(
      `img:nth-child(${chosenAppIndex + 1})`,
      {
        scale: IMG_BIG_SCALE,
        marginBottom: 100,
      },
      { duration: scaleDuration }
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
        { duration: scaleDuration }
      );
    }

    animate(
      `img:not(:nth-child(${outgoingIndex}))`,
      {
        opacity: 1,
      },
      { duration: scaleDuration }
    );
  }, [chosenAppIndex]);

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
              }}
            ></motion.img>
          );
        })}
      </div>
    </div>
  );
}
