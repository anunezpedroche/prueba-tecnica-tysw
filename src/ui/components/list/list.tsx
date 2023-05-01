import "./list.css"

export function List({ children }: { children: React.ReactNode }) {
  return <ul className={'listContainer'}>{children}</ul>
}
