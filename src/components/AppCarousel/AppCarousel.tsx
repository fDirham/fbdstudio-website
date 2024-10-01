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

  const [manualControl, setManualControl] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
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
    // if (!manualControl) {
    //   setManualControl(true);
    // }
    // setLeftmostAppIndex((e) => {
    //   let newVal = e + 1;
    //   return newVal;
    // });
  }

  function handleBack() {
    // if (!manualControl) {
    //   setManualControl(true);
    // }
    // setLeftmostAppIndex((e) => {
    //   let newVal = e - 1;
    //   if (newVal < 0) {
    //     newVal = halfwayIndex - 1;
    //   }
    //   return newVal;
    // });
  }

  return (
    <div class={style.componentContainer}>
      <AppIconCarousel
        appInfoArr={appInfoArr}
        chosenAppIndex={chosenAppIndex}
        isDirectionRight={autoScrollRight}
      />
      {/* <ScrollWheelControls
        leftmostAppIndex={leftmostAppIndex}
        numApps={srcList.length}
        onBack={handleBack}
        onNext={handleNext}
      /> */}
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
  leftmostAppIndex: number;
  numApps: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const { leftmostAppIndex, numApps, onNext, onBack } = props;
  const numBlocks = numApps + 2;

  const BLOCK_COLOR = "#909090";
  const BLOCK_BIG_COLOR = "#565656";
  const BLOCK_MED_SCALE = 1.2;
  const BLOCK_BIG_SCALE = 1.4;
  const BLOCK_MARGIN = 10;
  const BLOCK_WIDTH = 5;
  const NUM_TO_SHOW = 5;
  const WRAPPER_MARGIN_LEFT =
    5 + (numBlocks - NUM_TO_SHOW) * (BLOCK_MARGIN + BLOCK_WIDTH);

  const [wheelScope, wheelAnimate] = useAnimate();

  useEffect(() => {
    var showDuration = 1;
    if (leftmostAppIndex == 0) {
      wheelAnimate("div", { x: 0 }, { duration: 0 });
      showDuration = 0;
    } else {
      const moveSpeed = -(BLOCK_MARGIN + BLOCK_WIDTH);
      wheelAnimate(
        "div",
        {
          x: moveSpeed * leftmostAppIndex,
        },
        { ease: "easeInOut", duration: 1 }
      );
    }

    const startShowIdx = leftmostAppIndex;
    const endShowIdx = leftmostAppIndex + NUM_TO_SHOW;

    const indicesToShow = [];
    const indicesToHide = [];

    for (let i = 0; i < numBlocks; i++) {
      if (i < endShowIdx && i >= startShowIdx) {
        indicesToShow.push(i);
      } else {
        indicesToHide.push(i);
      }
    }

    indicesToShow.forEach((idx) => {
      wheelAnimate(
        `div:nth-child(${idx + 1})`,
        {
          opacity: 1,
        },
        { duration: showDuration }
      );
    });

    indicesToHide.forEach((idx) => {
      wheelAnimate(
        `div:nth-child(${idx + 1})`,
        {
          opacity: 0,
        },
        { duration: showDuration }
      );
    });

    // Make 1 of the ones big
    const bigIdx = leftmostAppIndex + Math.floor(NUM_TO_SHOW / 2);
    wheelAnimate(
      `div:nth-child(${bigIdx + 1})`,
      {
        scale: BLOCK_BIG_SCALE,
        backgroundColor: BLOCK_BIG_COLOR,
      },
      { duration: showDuration }
    );

    wheelAnimate(
      `div:not(:nth-child(${bigIdx + 1}))`,
      {
        scale: 1,
        backgroundColor: BLOCK_COLOR,
      },
      { duration: showDuration }
    );
  }, [leftmostAppIndex]);

  const renderBlocks = () => {
    const toReturn = [];
    for (let i = 0; i < numBlocks; i++) {
      toReturn.push(
        <motion.div
          style={{
            width: BLOCK_WIDTH,
            height: 21,
            borderRadius: 12,
            backgroundColor: BLOCK_COLOR,
            marginRight: BLOCK_MARGIN,
          }}
        />
      );
    }

    return toReturn;
  };

  return (
    <div class={style.controls__container}>
      <button onClick={onBack}>
        <img src={leftButtonIcon} alt="" />
      </button>
      <div class={style.scrollWheel__container}>
        <div
          class={style.scrollWheel__wrapper}
          ref={wheelScope}
          style={{
            marginLeft: WRAPPER_MARGIN_LEFT,
          }}
        >
          {renderBlocks()}
        </div>
      </div>
      <button onClick={onNext}>
        <img src={rightButtonIcon} alt="" />
      </button>
    </div>
  );
}
