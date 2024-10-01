import { useState } from "preact/hooks";
import styles from "./home.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppCarousel from "../../components/AppCarousel";
import DetailMode from "../../components/DetailMode";
import { appInfoArr } from "../../constants";

export function Home() {
  const [isDetailMode, setIsDetailMode] = useState(false);
  const [chosenAppIndex, setChosenAppIndex] = useState(0);

  function handleShowDetail() {
    setIsDetailMode(true);
  }

  return (
    <div class={styles.pageContainer}>
      <Header />
      <main>
        <div class={styles.heroTextContainer}>
          <h1>We make apps!</h1>
          <h2>-FBDStudio</h2>
        </div>
        {isDetailMode ? (
          <DetailMode />
        ) : (
          <AppCarousel
            appInfoArr={appInfoArr}
            chosenAppIndexState={[chosenAppIndex, setChosenAppIndex]}
          />
        )}

        <div class={styles.showDetail__container}>
          <button
            class={styles.showDetail__button}
            onClick={handleShowDetail}
            disabled={false}
          >
            Show detail
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
