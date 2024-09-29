import preactLogo from "../../assets/preact.svg";
import iconImg from "../../assets/Icon.jpg";
import "./style.css";
import styles from "./home.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export function Home() {
  return (
    <div class={styles.pageContainer}>
      <Header />
      <main>
        <div class={styles.heroTextContainer}>
          <h1>We make apps!</h1>
          <h2>-FBDStudio</h2>
        </div>
        <div class={styles.appCarouselContainer}>
          <img src={iconImg} alt="" />
          <img src={iconImg} alt="" />
          <img src={iconImg} alt="" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
