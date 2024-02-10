import React from "react";
import style from "./Footer.module.css";

import { FaTwitterSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <div className={style.body}>
      <div className={style.context}>
        <p>
          © 2023 All rights reserved. Developed by{" "}
          <a target="_blank" href="https://github.com/TheDev05">
            <span>TheDev05</span>
          </a>
        </p>
        <p className={style.socials}>
          <a target="_blank" href="https://www.linkedin.com/in/thedev05/"><BsLinkedin className={style.social1} /></a> <a target="_blank" href="https://twitter.com/TheDev05"><FaTwitterSquare className={style.social2} /> </a>
        </p>
      </div>
    </div>
  );
}
