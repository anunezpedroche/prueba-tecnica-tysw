import { MouseEventHandler } from "react"
import listStyles from "./list.module.css"

export function ListItem({
  children,
  onClick
}: {
  children: React.ReactNode | string
  onClick: MouseEventHandler<HTMLLIElement>
}) {
  return (
    <li className={listStyles.listItem} onClick={onClick}>
      {children}
    </li>
  )
}
