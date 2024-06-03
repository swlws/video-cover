import NavMd from './nav.md'

export default function () {
  // 类似 vue 的 v-html 指令
  return <nav dangerouslySetInnerHTML={{__html: NavMd}}></nav>
}
