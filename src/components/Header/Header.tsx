import styles from "./header.module.css";
import { useEffect, useState } from "preact/hooks";
import hamburgerIcon from "../../assets/hamburger_icon.png";
import closeIcon from "../../assets/close_icon.png";

type HeaderProps = {
  onShowDetailToggle?: () => void;
  hideDetailToggle?: boolean;
  isDetailMode?: boolean;
};

function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onScroll = (e) => {
    setScrollTop(window.scrollY);
  };

  return scrollTop;
}

function Header(props: HeaderProps) {
  const scrollTop = useScrollTop();

  return (
    <header
      class={styles.headerContainer}
      style={{
        transition: "all 0.3s",
        borderBottom:
          scrollTop > 0 ? "2px solid #A4C6C3" : "2px solid transparent",
      }}
    >
      <nav class={styles.navContainer}>
        <DesktopHeader
          onShowDetailToggle={props.onShowDetailToggle}
          isDetailMode={props.isDetailMode}
          hideDetailToggle={props.hideDetailToggle}
        />
        <MobileHeader
          onShowDetailToggle={props.onShowDetailToggle}
          isDetailMode={props.isDetailMode}
          hideDetailToggle={props.hideDetailToggle}
        />
      </nav>
    </header>
  );
}

function DesktopHeader({
  onShowDetailToggle,
  isDetailMode,
  hideDetailToggle,
}: {
  onShowDetailToggle: () => void;
  isDetailMode: boolean;
  hideDetailToggle?: boolean;
}) {
  return (
    <div class={styles["navContent--desktop"]}>
      <div class={styles["navContent__linksContainer--desktop"]}>
        <a class={styles.navTitle} href="/">
          FBDstudio
        </a>
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
      {!hideDetailToggle && (
        <button
          class={styles["showDetailButton--desktop"]}
          onClick={onShowDetailToggle}
        >
          {isDetailMode ? "Hide detail" : "Show detail"}
        </button>
      )}
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
          <p>FBDstudio</p>
        </button>
        {!isOpen && !hideDetailToggle && (
          <button
            onClick={onShowDetailToggle}
            class={styles["showDetailButton--mobile"]}
          >
            {isDetailMode ? "Hide detail" : "Show detail"}
          </button>
        )}
      </div>
      {isOpen && (
        <div class={styles.mobileMenuPopupContainer}>
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
          <a href="/" class={styles.navLink}>
            home
          </a>
        </div>
      )}
    </>
  );
}

export default Header;
