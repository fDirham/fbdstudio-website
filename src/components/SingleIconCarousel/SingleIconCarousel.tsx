import { AppInfo } from "../../utilities/customTypes";
import styles from "./SingleIconCarousel.module.css";
import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import { motion, useAnimate } from "framer-motion";

type SingleIconCarouselProps = {
  chosenAppIndexState: [number, Dispatch<StateUpdater<number>>];
  appInfoArr: AppInfo[];
  isScrollDirectionRight: boolean;
};

export default function SingleIconCarousel({
  appInfoArr,
  isScrollDirectionRight,
  chosenAppIndexState,
}: SingleIconCarouselProps) {
  const [chosenAppIndex] = chosenAppIndexState;
  const chosenApp = appInfoArr[chosenAppIndex];
  const [currentSrc, setCurrentSrc] = useState(chosenApp.iconSrc);
  const [scope, animate] = useAnimate();
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    if (!canAnimate) {
      return;
    }

    transitionToNewImage();
  }, [chosenAppIndex]);

  useEffect(() => {
    setCanAnimate(true);
  }, []);

  function transitionToNewImage() {
    const newSrc = appInfoArr[chosenAppIndex].iconSrc;
    animate(
      "img",
      { opacity: 0 },
      {
        duration: 0.5,
        onComplete: () => {
          setCurrentSrc(newSrc);
          animate("img", { opacity: 1 }, { duration: 0.5, delay: 0.1 });
        },
      }
    );
  }

  const IMG_SIZE = 280;

  return (
    <div className={styles.componentContainer} ref={scope}>
      <motion.img
        //@ts-ignore
        src={currentSrc}
        alt=""
        style={{
          width: IMG_SIZE,
          height: IMG_SIZE,
        }}
      ></motion.img>
    </div>
  );
}
