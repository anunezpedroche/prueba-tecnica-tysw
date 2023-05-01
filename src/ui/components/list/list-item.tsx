import { MouseEventHandler } from "react"
import "./list.css"

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
    <li className={`listItem ${styles}`} onClick={onClick}>
      {children}
    </li>
  )
}
