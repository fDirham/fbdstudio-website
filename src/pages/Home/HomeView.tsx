import styles from "./HomeView.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppCarousel from "../../components/AppCarousel";
import DetailMode from "../../components/DetailMode";
import { AppInfo, UseStateValue } from "../../utilities/customTypes";
import { useEffect, useState } from "preact/hooks";
import { useAnimate } from "framer-motion";

type HomeViewProps = {
  isDetailModeState: UseStateValue<boolean>;
  chosenAppIndexState: UseStateValue<number>;
  appInfoArr: AppInfo[];
  isScrollDirectionRight: boolean;
  onBackChosenAppIndex: () => void;
  onNextChosenAppIndex: () => void;
};

export default function HomeView(props: HomeViewProps) {
  const {
    chosenAppIndexState,
    isDetailModeState,
    appInfoArr,
    isScrollDirectionRight,
    onBackChosenAppIndex,
    onNextChosenAppIndex,
  } = props;
  const [isDetailMode, setIsDetailMode] = isDetailModeState;
  const [chosenAppIndex] = chosenAppIndexState;
  const [canAnimate, setCanAnimate] = useState(false);
  const chosenApp = appInfoArr[chosenAppIndex];
  const [subtitleScope, subtitleAnimate] = useAnimate();
  const [subtitleText, setSubtitleText] = useState(chosenApp.tagline);

  useEffect(() => {
    let animDuration = 1;
    if (!canAnimate) {
      animDuration = 0;
    }
    subtitleAnimate(
      subtitleScope.current,
      { opacity: 0 },
      {
        duration: animDuration,
        onComplete: () => {
          setSubtitleText(chosenApp.tagline);
          subtitleAnimate(
            subtitleScope.current,
            { opacity: 1 },
            { duration: animDuration }
          );
        },
      }
    );
  }, [chosenAppIndex]);

  useEffect(() => {
    setCanAnimate(true);
  }, []);

  function toggleDetailMode() {
    setIsDetailMode((curr) => !curr);
  }

  return (
    <div class={styles.pageContainer}>
      <Header
        onShowDetailToggle={toggleDetailMode}
        isDetailMode={isDetailMode}
      />
      <main>
        <div
          class="detailMode"
          style={{ display: isDetailMode ? "initial" : "none" }}
        >
          <DetailMode
            appInfoArr={appInfoArr}
            chosenAppIndexState={chosenAppIndexState}
            isScrollDirectionRight={isScrollDirectionRight}
            onBackChosenAppIndex={onBackChosenAppIndex}
            onNextChosenAppIndex={onNextChosenAppIndex}
          />
        </div>
        <div
          class="homeMode"
          style={{ display: isDetailMode ? "none" : "initial" }}
        >
          <div class={styles.heroTextContainer}>
            <h1>we made this</h1>
            <h2 ref={subtitleScope}>{subtitleText}</h2>
          </div>
          <AppCarousel
            appInfoArr={appInfoArr}
            chosenAppIndexState={chosenAppIndexState}
            isScrollDirectionRight={isScrollDirectionRight}
            onBackChosenAppIndex={onBackChosenAppIndex}
            onNextChosenAppIndex={onNextChosenAppIndex}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
