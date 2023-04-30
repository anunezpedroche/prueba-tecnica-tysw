import listStyles from "./list.module.css"

export function ListItem({ children }: { children: React.ReactNode | string }) {
  return <li className={listStyles.listItem}>
    {children}
  </li>
}
