import { useLocation } from "preact-iso";
import style from "./header.module.css";

function Header() {
  const { url } = useLocation();

  return (
    <header class={style.headerContainer}>
      <nav class={style.navContainer}>
        <a href="/" class={style.navButton}>
          hire us
        </a>
        <a href="/" class={style.navLink}>
          about
        </a>
        <a href="/" class={style.navLink}>
          contact
        </a>
      </nav>
    </header>
  );
}

export default Header;
