// 组件
import Material from "./components/material";
import DrawBoard from "./components/draw-board";
import Attribute from "./components/attribute";

import styles from "./index.module.scss";

export default function () {
  console.log(styles);
  return (
    <article className={styles["vc-layout"]}>
      <header className={styles["vc-layout--left"]}>
        <Material />
      </header>
      <main className={styles["vc-layout--middle"]}>
        <DrawBoard />
      </main>
      <footer className={styles["vc-layout--right"]}>
        <Attribute />
      </footer>
    </article>
  );
}
