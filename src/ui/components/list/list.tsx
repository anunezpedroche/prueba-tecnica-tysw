import listStyles from "./list.module.css"

export function List({ children }: { children: React.ReactNode }) {
  return <ul className={listStyles.listContainer}>{children}</ul>
}
