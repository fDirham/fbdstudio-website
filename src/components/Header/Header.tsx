import { useLocation } from "preact-iso";
import style from "./header.module.css";
import { useState } from "preact/hooks";
import hamburgerIcon from "../../assets/hamburger_icon.png";
import closeIcon from "../../assets/close_icon.png";

function Header() {
  const { url } = useLocation();

  return (
    <header class={style.headerContainer}>
      <nav class={style.navContainer}>
        {desktopHeader()}
        {mobileHeader()}
      </nav>
    </header>
  );
}

function desktopHeader() {
  return (
    <div class={style["navContent--desktop"]}>
      <a href="/" class={style.navButton}>
        hire us
      </a>
      <a href="/" class={style.navLink}>
        about
      </a>
      <a href="/" class={style.navLink}>
        contact
      </a>
    </div>
  );
}

function mobileHeader() {
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
      <div class={style["navContent--mobile"]}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          class={style.mobileMenuButton}
        >
          <img src={isOpen ? closeIcon : hamburgerIcon} alt="" />
          {!isOpen && <p>menu</p>}
        </button>
      </div>
      {isOpen && (
        <div class={style.mobileMenuPopupContainer}>
          <a href="/" class={style.navLink}>
            hire us
          </a>
          <a href="/" class={style.navLink}>
            about
          </a>
          <a href="/" class={style.navLink}>
            contact
          </a>
        </div>
      )}
    </>
  );
}

export default Header;
