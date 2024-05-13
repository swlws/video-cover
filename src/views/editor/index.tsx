// 组件
import Material from "./components/material";
import DrawBoard from "./components/draw-board";
import Attribute from "./components/attribute";

import "./index.scss";

import styles from "./index.module.scss";
console.log(styles);

export default function () {
  return (
    <article className="vc-layout">
      <header className="vc-layout--left">
        <Material />
      </header>
      <main className="vc-layout--middle">
        <DrawBoard />
      </main>
      <footer className="vc-layout--right">
        <Attribute />
      </footer>
    </article>
  );
}
