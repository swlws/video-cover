// 组件
import Material from "./components/material";
import DrawBoard from "./components/draw-board";
import Attribute from "./components/attribute";

// 样式
import styles from "./index.module.scss";

// 图片
import StarSvg from '@/assets/star-fill.svg'

function Title(){
  return <div className="vc-header-title">
    <img width={20} height={20} alt="star" src={StarSvg}/>
    <span>Title</span>
  </div>
}

export default function () {
  return (
    <article className={styles["vc-layout"]}>
      {/* 头部 */}
      <header className={styles["vc-layout--header"]}>
        <Title />
      </header>

      {/* 中部左侧 */}
      <main className={styles["vc-layout--left"]}>
        <Material />
      </main>

      {/* 中部 */}
      <main className={styles["vc-layout--middle"]}>
        <DrawBoard />
      </main>

      {/* 中部右侧  */}
      <main className={styles["vc-layout--right"]}>
        <Attribute />
      </main>

      {/* 底部 */}
      <footer className={styles["vc-layout--footer"]}></footer>
    </article>
  );
}
