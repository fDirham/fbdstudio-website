import "./style.css";
import styles from "./home.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppCarousel from "../../components/AppCarousel";

export function Home() {
  return (
    <div class={styles.pageContainer}>
      <Header />
      <main>
        <div class={styles.heroTextContainer}>
          <h1>We make apps!</h1>
          <h2>-FBDStudio</h2>
        </div>
        <AppCarousel />
      </main>
      <Footer />
    </div>
  );
}
