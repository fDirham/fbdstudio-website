import styles from "./HomeView.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppCarousel from "../../components/AppCarousel";
import DetailMode from "../../components/DetailMode";
import { AppInfo, UseStateValue } from "../../utilities/customTypes";

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
        {isDetailMode ? (
          <DetailMode
            appInfoArr={appInfoArr}
            chosenAppIndexState={chosenAppIndexState}
            isScrollDirectionRight={isScrollDirectionRight}
            onBackChosenAppIndex={onBackChosenAppIndex}
            onNextChosenAppIndex={onNextChosenAppIndex}
          />
        ) : (
          <>
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
          </>
        )}

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
