import React, { useEffect, useRef, useState } from "react";
import style from "./appCarousel.module.css";
import focusDuckIcon from "../../assets/focus_duck_icon.jpg";
import duckBlockIcon from "../../assets/duck_block_icon.png";
import justFocusIcon from "../../assets/just_focus_icon.png";
import pixelRocketsIcon from "../../assets/pixel_rockets_icon.jpg";
import { motion, useAnimate } from "framer-motion";

const CAROUSEL_TIMEOUT_MS = 3000;

export default function AppCarousel() {
  const IMG_SIZE = 180;
  const IMG_BIG_SCALE = 1.2;
  const IMG_MARGIN = 60;

  const srcList = [
    focusDuckIcon,
    duckBlockIcon,
    justFocusIcon,
    pixelRocketsIcon,
    focusDuckIcon,
    duckBlockIcon,
    justFocusIcon,
    pixelRocketsIcon,
  ];

  const [leftmostAppIndex, setSelectedAppIndex] = useState(0);
  const selectedAppIndex = leftmostAppIndex + 1;
  const halfwayIndex = Math.floor(srcList.length / 2);

  const [scope, animate] = useAnimate();

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSelectedAppIndex((prevIndex) => prevIndex + 1);
      }, CAROUSEL_TIMEOUT_MS);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    var scaleDuration = 0.5;
    if (leftmostAppIndex == 0) {
      animate("img", { x: 0 }, { duration: 0 });
      scaleDuration = 0;
    } else {
      const moveSpeed = -(IMG_SIZE + IMG_MARGIN);
      animate(
        `img`,
        {
          x: moveSpeed * leftmostAppIndex,
        },
        { ease: "easeInOut", duration: 1 }
      );
    }

    animate(
      `img:not(:nth-child(${selectedAppIndex + 1}))`,
      {
        scale: 1,
        marginBottom: 0,
      },
      { duration: scaleDuration }
    );

    animate(
      `img:nth-child(${selectedAppIndex + 1})`,
      {
        scale: IMG_BIG_SCALE,
        marginBottom: 100,
      },
      { duration: scaleDuration }
    );

    if (leftmostAppIndex > 0) {
      animate(
        `img:nth-child(${leftmostAppIndex})`,
        {
          opacity: 0,
        },
        { duration: scaleDuration }
      );
    }

    animate(
      `img:not(:nth-child(${leftmostAppIndex}))`,
      {
        opacity: 1,
      },
      { duration: scaleDuration }
    );

    if (leftmostAppIndex == halfwayIndex) {
      setTimeout(() => {
        setSelectedAppIndex(0);
      }, 1000);
    }
  }, [leftmostAppIndex]);

  return (
    <div class={style.componentContainer}>
      <div class={style.icons__container}>
        <div class={style.icons__wrapper} ref={scope}>
          {srcList.map((src) => {
            return (
              <motion.img
                //@ts-ignore
                src={src}
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

      <ScrollWheelControls
        leftmostAppIndex={leftmostAppIndex}
        numApps={srcList.length}
      />
    </div>
  );
}

/**
 * MARK: Scroll wheel controls
 */
function ScrollWheelControls(props: {
  leftmostAppIndex: number;
  numApps: number;
}) {
  const { leftmostAppIndex, numApps } = props;
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
    </div>
  );
}
