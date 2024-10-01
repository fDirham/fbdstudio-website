import { useAnimate, motion } from "framer-motion";
import styles from "./ScrollWheelControls.module.css";
import { useEffect, useState } from "preact/hooks";
import leftButtonIcon from "../../assets/left_button.png";
import rightButtonIcon from "../../assets/right_button.png";
import { AppInfo } from "../../utilities/customTypes";

type ScrollWheelControlsProps = {
  chosenAppIndex: number;
  appInfoArr: AppInfo[];
  isDirectionRight: boolean;
  onNext: () => void;
  onBack: () => void;
};

export default function ScrollWheelControls(props: ScrollWheelControlsProps) {
  const { chosenAppIndex, appInfoArr, isDirectionRight, onNext, onBack } =
    props;

  const NUM_BLOCKS = 7;
  const BLOCK_COLOR = "#909090";
  const BLOCK_BIG_COLOR = "#565656";
  const BLOCK_MED_SCALE = 1.3;
  const BLOCK_BIG_SCALE = 1.6;
  const BLOCK_MARGIN = 18;
  const BLOCK_WIDTH = 5;

  const isFirstIndex = chosenAppIndex == 0;
  const isLastIndex = chosenAppIndex == appInfoArr.length - 1;

  const [wheelScope, wheelAnimate] = useAnimate();
  const [controlScope, controlAnimate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    if (!canAnimate) {
      resetBlocks();
      return;
    }

    setIsAnimating(true);

    if (isDirectionRight) {
      moveRight();
    } else {
      moveLeft();
    }
  }, [chosenAppIndex]);

  useEffect(() => {
    setCanAnimate(true);
  }, []);

  useEffect(() => {
    animateControls();
  }, [isAnimating]);

  function animateControls() {
    let hideBack = isFirstIndex || isAnimating;
    let hideNext = isLastIndex || isAnimating;

    if (hideBack) {
      controlAnimate("button:first-child", { opacity: 0.5 }, { duration: 0.5 });
    } else {
      controlAnimate("button:first-child", { opacity: 1 }, { duration: 0.5 });
    }

    if (hideNext) {
      controlAnimate("button:last-child", { opacity: 0.5 }, { duration: 0.5 });
    } else {
      controlAnimate("button:last-child", { opacity: 1 }, { duration: 0.5 });
    }
  }

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
      {
        ease: "easeInOut",
        duration: 1,
        onComplete: () => {
          resetBlocks();
          setIsAnimating(false);
        },
      }
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
      {
        ease: "easeInOut",
        duration: 1,
        onComplete: () => {
          resetBlocks();
          setIsAnimating(false);
        },
      }
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
            marginRight: i == NUM_BLOCKS - 1 ? 0 : BLOCK_MARGIN,
            opacity: i == 0 || i == NUM_BLOCKS - 1 ? 0 : 1,
          }}
        />
      );
    }

    return toReturn;
  };

  return (
    <div class={styles.controls__container} ref={controlScope}>
      <button
        onClick={() => {
          setIsAnimating(true);
          onBack();
        }}
        disabled={isFirstIndex || isAnimating}
      >
        <img src={leftButtonIcon} alt="" />
      </button>
      <div class={styles.scrollWheel__container}>
        <div class={styles.scrollWheel__wrapper} ref={wheelScope}>
          {renderBlocks()}
        </div>
      </div>
      <button
        onClick={() => {
          setIsAnimating(true);
          onNext();
        }}
        disabled={isLastIndex || isAnimating}
      >
        <img src={rightButtonIcon} alt="" />
      </button>
    </div>
  );
}
