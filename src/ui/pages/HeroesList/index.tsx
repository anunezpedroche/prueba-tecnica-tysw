import { useNavigate } from "react-router-dom"
import { List } from "../../components/list/list"
import { ListItem } from "../../components/list/list-item"
import { useGetHeroes } from "../../hooks/useGetHeroes"
import { useNearScreen } from "../../hooks/useNearScreen"
import { MutableRefObject, useEffect, useRef } from "react"

export function HeroesList() {
  const { heroes, heroesState, handleSelectHero, handleScroll } = useGetHeroes()
  const ref = useRef<HTMLLIElement>({} as HTMLLIElement)
  const { isNearScreen } = useNearScreen<HTMLLIElement>({
    once: false,
    externalRef: !heroesState.loading ? ref : undefined
  })

  useEffect(() => {
    if (isNearScreen === true) {
      handleScroll()
    }
  }, [isNearScreen])

  if (heroesState.loading) {
    return <>Loading...</>
  }

  if (heroes.length === 0) {
    return <>No hay datos</>
  }

  if (heroesState.apiError) {
    return <>Error en la llamda</>
  }

  return (
    <>
      <List>
        {heroes?.map((hero) => {
          let uri = `${hero.thumbnail?.path}.${hero.thumbnail?.extension}`
          return (
            <ListItem
              key={crypto.randomUUID()}
              onClick={() => {
                handleSelectHero(hero.id)
              }}
            >
              {hero.name}
              <img style={{ width: "20vw" }} src={uri} />
            </ListItem>
          )
        })}
        <li id="visor" style={{ height: "1px" }} ref={ref}>
          {heroes.length !== heroesState.total
            ? "Cargando más..."
            : "No hay más datos"}
        </li>
      </List>
    </>
  )
}
