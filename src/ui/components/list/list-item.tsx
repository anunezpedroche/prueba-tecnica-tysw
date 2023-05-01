import { MouseEventHandler } from "react"
import listStyles from "./list.module.css"

export function ListItem({
  children,
  onClick,
  styles
}: {
  children: React.ReactNode | string
  onClick?: MouseEventHandler<HTMLLIElement>
  styles?: string
}) {
  return (
    <li className={`${listStyles.listItem} ${styles}`} onClick={onClick}>
      {children}
    </li>
  )
}
