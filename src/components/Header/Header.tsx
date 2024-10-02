import { useLocation } from "preact-iso";
import styles from "./header.module.css";
import { useState } from "preact/hooks";
import hamburgerIcon from "../../assets/hamburger_icon.png";
import closeIcon from "../../assets/close_icon.png";

type HeaderProps = {
  onShowDetailToggle?: () => void;
  hideDetailToggle?: boolean;
  isDetailMode?: boolean;
};

function Header(props: HeaderProps) {
  const { url } = useLocation();

  return (
    <header class={styles.headerContainer}>
      <nav class={styles.navContainer}>
        <DesktopHeader />
        <MobileHeader
          onShowDetailToggle={props.onShowDetailToggle}
          isDetailMode={props.isDetailMode}
          hideDetailToggle={props.hideDetailToggle}
        />
      </nav>
    </header>
  );
}

function DesktopHeader() {
  return (
    <div class={styles["navContent--desktop"]}>
      <a
        href="mailto:team@fbdstudio.com?subject=We would like to hire your team"
        class={styles.navLink}
      >
        hire us
      </a>
      <a href="/about" class={styles.navLink}>
        about
      </a>
      <a href="mailto:team@fbdstudio.com" class={styles.navLink}>
        contact
      </a>
    </div>
  );
}

function MobileHeader({
  onShowDetailToggle,
  isDetailMode,
  hideDetailToggle,
}: {
  onShowDetailToggle: () => void;
  isDetailMode: boolean;
  hideDetailToggle?: boolean;
}) {
  const [isOpen, _setIsOpen] = useState<boolean>(false);

  function setIsOpen(newVal: boolean) {
    _setIsOpen(newVal);

    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }

  return (
    <>
      <div class={styles["navContent--mobile"]}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          class={styles.mobileMenuButton}
        >
          <img src={isOpen ? closeIcon : hamburgerIcon} alt="" />
          {!isOpen && <p>menu</p>}
        </button>
        {!isOpen && !hideDetailToggle && (
          <button
            onClick={onShowDetailToggle}
            class={styles.mobileShowDetailButton}
          >
            {isDetailMode ? "Hide detail" : "Show detail"}
          </button>
        )}
      </div>
      {isOpen && (
        <div class={styles.mobileMenuPopupContainer}>
          <a href="mailto:team@fbdstudio.com" class={styles.navLink}>
            hire us
          </a>
          <a href="/about" class={styles.navLink}>
            about
          </a>
          <a href="mailto:team@fbdstudio.com" class={styles.navLink}>
            contact
          </a>
        </div>
      )}
    </>
  );
}

export default Header;
