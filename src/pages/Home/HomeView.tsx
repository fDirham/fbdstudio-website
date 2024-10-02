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
  const [dmScope, dmAnimate] = useAnimate();
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    let animDuration = 1;
    if (!canAnimate) {
      animDuration = 0;
    }

    if (isDetailMode) {
      dmAnimate(
        "div.homeMode",
        { opacity: 0 },
        {
          duration: animDuration,
          onComplete: () => {
            dmAnimate("div.homeMode", { display: "none" }, { duration: 0 });
            dmAnimate(
              "div.detailMode",
              { opacity: 1, display: "initial" },
              { duration: animDuration }
            );
          },
        }
      );
    } else {
      dmAnimate(
        "div.detailMode",
        { opacity: 0 },
        {
          duration: animDuration,
          onComplete: () => {
            dmAnimate("div.detailMode", { display: "none" }, { duration: 0 });
            dmAnimate(
              "div.homeMode",
              { opacity: 1, display: "initial" },
              { duration: animDuration }
            );
          },
        }
      );
    }
  }, [isDetailMode]);

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
      <main ref={dmScope}>
        <div class="detailMode" style={{ display: "none" }}>
          <DetailMode
            appInfoArr={appInfoArr}
            chosenAppIndexState={chosenAppIndexState}
            isScrollDirectionRight={isScrollDirectionRight}
            onBackChosenAppIndex={onBackChosenAppIndex}
            onNextChosenAppIndex={onNextChosenAppIndex}
          />
        </div>
        <div class="homeMode" style={{ display: "none" }}>
          <div class={styles.heroTextContainer}>
            <h1>We make apps!</h1>
            <h2>-FBDStudio</h2>
          </div>
          <AppCarousel
            appInfoArr={appInfoArr}
            chosenAppIndexState={chosenAppIndexState}
            isScrollDirectionRight={isScrollDirectionRight}
            onBackChosenAppIndex={onBackChosenAppIndex}
            onNextChosenAppIndex={onNextChosenAppIndex}
          />
        </div>
        <div class={styles.showDetail__container}>
          <button
            class={styles.showDetail__button}
            onClick={toggleDetailMode}
            disabled={false}
          >
            {isDetailMode ? "Hide detail" : "Show detail"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
