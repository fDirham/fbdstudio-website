import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./AboutPage.module.css";

function AboutPage() {
  return (
    <div class={styles.pageContainer}>
      <Header hideDetailToggle />
      <main class={styles.mainContainer}>
        <h1>About</h1>
        <div class={styles.contentContainer}>
          <p>
            FBDstudio is an independent software development studio, located in
            Seattle, Washington. Our mission is to improve the world by building
            quality software aimed to uplift the lives of our users. We
            specialize in building iOS applications.
          </p>
          <br />
          <p>
            We are also available for contract work including, but not limited
            to:
          </p>
          <ul>
            <li>Mobile app development (Swift, React Native)</li>
            <li>Website development (React)</li>
            <li>Game development (Godot)</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
