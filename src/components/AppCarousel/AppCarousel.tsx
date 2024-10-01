import React, { useEffect, useRef, useState } from "react";
import style from "./appCarousel.module.css";
import focusDuckIcon from "../../assets/focus_duck_icon.jpg";
import duckBlockIcon from "../../assets/duck_block_icon.png";
import justFocusIcon from "../../assets/just_focus_icon.png";
import pixelRocketsIcon from "../../assets/pixel_rockets_icon.jpg";
import leftButtonIcon from "../../assets/left_button.png";
import rightButtonIcon from "../../assets/right_button.png";
import { motion, useAnimate } from "framer-motion";

type AppInfo = {
  appName: string;
  iconSrc: string;
};

export default function AppCarousel() {
  const CAROUSEL_TIMEOUT_MS = 3000;

  const appInfoArr: AppInfo[] = [
    { appName: "focusDuckIcon", iconSrc: focusDuckIcon },
    { appName: "duckBlockIcon", iconSrc: duckBlockIcon },
    { appName: "justFocusIcon", iconSrc: justFocusIcon },
    { appName: "pixelRocketsIcon", iconSrc: pixelRocketsIcon },
  ];

  const [chosenAppIndex, setChosenAppIndex] = useState(0);
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
    <div class={style.componentContainer}>
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
    <div class={style.icons__container}>
      <div class={style.icons__wrapper} ref={scope}>
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

/**
 * MARK: Scroll wheel controls
 */
function ScrollWheelControls(props: {
  chosenAppIndex: number;
  appInfoArr: AppInfo[];
  isDirectionRight: boolean;
  onNext: () => void;
  onBack: () => void;
}) {
  const { chosenAppIndex, appInfoArr, isDirectionRight, onNext, onBack } =
    props;

  const NUM_BLOCKS = 7;
  const BLOCK_COLOR = "#909090";
  const BLOCK_BIG_COLOR = "#565656";
  const BLOCK_MED_SCALE = 1.2;
  const BLOCK_BIG_SCALE = 1.4;
  const BLOCK_MARGIN = 10;
  const BLOCK_WIDTH = 5;

  const isFirstIndex = chosenAppIndex == 0;
  const isLastIndex = chosenAppIndex == appInfoArr.length;

  const [wheelScope, wheelAnimate] = useAnimate();

  useEffect(() => {
    if (isDirectionRight) {
      moveRight();
    } else {
      moveLeft();
    }
  }, [chosenAppIndex]);

  function resetBlocks() {
    // Hide
    wheelAnimate(
      `div:nth-child(${1})`,
      { opacity: 0, x: 0, scale: 1, backgroundColor: BLOCK_COLOR },
      { duration: 0 }
    );
    wheelAnimate(
      `div:nth-child(${7})`,
      { opacity: 0, x: 0, scale: 1, backgroundColor: BLOCK_COLOR },
      { duration: 0 }
    );

    // normal blocks
    wheelAnimate(
      `div:nth-child(${2})`,
      { opacity: 1, x: 0, scale: 1, backgroundColor: BLOCK_COLOR },
      { duration: 0 }
    );
    wheelAnimate(
      `div:nth-child(${6})`,
      { opacity: 1, x: 0, scale: 1, backgroundColor: BLOCK_COLOR },
      { duration: 0 }
    );

    // Med blocks
    wheelAnimate(
      `div:nth-child(${3})`,
      {
        opacity: 1,
        x: 0,
        scale: BLOCK_MED_SCALE,
        backgroundColor: BLOCK_COLOR,
      },
      { duration: 0 }
    );
    wheelAnimate(
      `div:nth-child(${5})`,
      {
        opacity: 1,
        x: 0,
        scale: BLOCK_MED_SCALE,
        backgroundColor: BLOCK_COLOR,
      },
      { duration: 0 }
    );

    // Big block
    wheelAnimate(
      `div:nth-child(${4})`,
      {
        opacity: 1,
        x: 0,
        scale: BLOCK_BIG_SCALE,
        backgroundColor: BLOCK_BIG_COLOR,
      },
      { duration: 0 }
    );
  }

  function moveRight() {
    // Show and hide
    wheelAnimate(
      `div:nth-child(${NUM_BLOCKS})`,
      { opacity: 1 },
      { duration: 0.5 }
    );
    wheelAnimate(`div:nth-child(${2})`, { opacity: 0 }, { duration: 0.5 });

    // Enlarge new mediums
    wheelAnimate(
      `div:nth-child(${4})`,
      { scale: BLOCK_MED_SCALE, backgroundColor: BLOCK_COLOR },
      { duration: 0.5 }
    );
    wheelAnimate(
      `div:nth-child(${6})`,
      { scale: BLOCK_MED_SCALE },
      { duration: 0.5 }
    );

    // Enlarge new chosen
    wheelAnimate(
      `div:nth-child(${5})`,
      { scale: BLOCK_BIG_SCALE, backgroundColor: BLOCK_BIG_COLOR },
      { duration: 0.5 }
    );

    // Scale down old medium
    wheelAnimate(`div:nth-child(${3})`, { scale: 1 }, { duration: 0.5 });

    const moveSpeed = -(BLOCK_MARGIN + BLOCK_WIDTH);
    wheelAnimate(
      "div",
      { x: moveSpeed },
      { ease: "easeInOut", duration: 1, onComplete: resetBlocks }
    );
  }

  function moveLeft() {
    // Show and hide
    wheelAnimate(`div:nth-child(${1})`, { opacity: 1 }, { duration: 0.5 });
    wheelAnimate(
      `div:nth-child(${NUM_BLOCKS - 1})`,
      { opacity: 0 },
      { duration: 0.5 }
    );

    // Enlarge new mediums
    wheelAnimate(
      `div:nth-child(${2})`,
      { scale: BLOCK_MED_SCALE },
      { duration: 0.5 }
    );
    wheelAnimate(
      `div:nth-child(${4})`,
      { scale: BLOCK_MED_SCALE, backgroundColor: BLOCK_COLOR },
      { duration: 0.5 }
    );

    // Enlarge new chosen
    wheelAnimate(
      `div:nth-child(${3})`,
      { scale: BLOCK_BIG_SCALE, backgroundColor: BLOCK_BIG_COLOR },
      { duration: 0.5 }
    );

    // Scale down old medium
    wheelAnimate(`div:nth-child(${5})`, { scale: 1 }, { duration: 0.5 });

    const moveSpeed = BLOCK_MARGIN + BLOCK_WIDTH;
    wheelAnimate(
      "div",
      { x: moveSpeed },
      { ease: "easeInOut", duration: 1, onComplete: resetBlocks }
    );
  }

  const renderBlocks = () => {
    const toReturn = [];
    for (let i = 0; i < NUM_BLOCKS; i++) {
      toReturn.push(
        <motion.div
          style={{
            width: BLOCK_WIDTH,
            height: 21,
            borderRadius: 12,
            backgroundColor: BLOCK_COLOR,
            marginRight: BLOCK_MARGIN,
            opacity: i == 0 || i == NUM_BLOCKS - 1 ? 0 : 1,
          }}
        />
      );
    }

    return toReturn;
  };

  return (
    <div class={style.controls__container}>
      <button onClick={onBack} disabled={isFirstIndex}>
        <img src={leftButtonIcon} alt="" />
      </button>
      <div class={style.scrollWheel__container}>
        <div class={style.scrollWheel__wrapper} ref={wheelScope}>
          {renderBlocks()}
        </div>
      </div>
      <button onClick={onNext} disabled={isLastIndex}>
        <img src={rightButtonIcon} alt="" />
      </button>
    </div>
  );
}
