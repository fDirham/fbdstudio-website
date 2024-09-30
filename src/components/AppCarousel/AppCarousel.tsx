import React, { useEffect, useRef, useState } from "react";
import style from "./appCarousel.module.css";
import focusDuckIcon from "../../assets/focus_duck_icon.jpg";
import duckBlockIcon from "../../assets/duck_block_icon.png";
import justFocusIcon from "../../assets/just_focus_icon.png";
import pixelRocketsIcon from "../../assets/pixel_rockets_icon.jpg";
import { motion, useAnimate } from "framer-motion";

const CAROUSEL_TIMEOUT_MS = 3000;
const IMG_SIZE = 180;
const IMG_BIG_SCALE = 1.2;
const IMG_MARGIN = 50;

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

export default function AppCarousel() {
  const [leftmostAppIndex, setSelectedAppIndex] = useState(0);
  const selectedAppIndex = leftmostAppIndex + 1;

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

    animate(
      `img:nth-child(${leftmostAppIndex})`,
      {
        opacity: 0,
      },
      { duration: scaleDuration }
    );

    animate(
      `img:not(:nth-child(${leftmostAppIndex}))`,
      {
        opacity: 1,
      },
      { duration: scaleDuration }
    );

    if (leftmostAppIndex == srcList.length / 2) {
      setTimeout(() => {
        setSelectedAppIndex(0);
      }, 1000);
    }
  }, [leftmostAppIndex]);

  return (
    <div class={style.componentContainer}>
      <div class={style.iconContainer} ref={scope}>
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
  );
}
