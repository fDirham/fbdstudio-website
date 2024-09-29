import React from "react";
import style from "./appCarousel.module.css";
import iconImg from "../../assets/Icon.jpg";

export default function AppCarousel() {
  return (
    <div class={style.componentContainer}>
      <div class={style.iconContainer}>
        <img src={iconImg} alt="" />
        <img src={iconImg} alt="" />
        <img src={iconImg} alt="" />
      </div>
      <div class={style.scrollWheel}></div>
    </div>
  );
}
