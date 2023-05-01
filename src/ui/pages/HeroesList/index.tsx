import { List } from "../../components/list/list"
import { ListItem } from "../../components/list/list-item"
import { useGetHeroes } from "../../hooks/useGetHeroes"
import { useNearScreen } from "../../hooks/useNearScreen"
import { MutableRefObject, useEffect, useRef } from "react"
import { Image } from "../../components/image/image"
import heroesListStyle from "./heroes-list.module.css"

export function HeroesList() {
  const ref = useRef<HTMLLIElement>()

  const { heroes, heroesState, handleSelectHero, handleScroll } = useGetHeroes()

  const isReferenceInScreen =
    heroesState.loading !== false && heroesState.apiError === false

  const { isNearScreen } = useNearScreen<HTMLLIElement>({
    once: false,
    externalRef: isReferenceInScreen ? ref : undefined
  })

  useEffect(() => {
    if (isNearScreen === true) {
      handleScroll()
    }
  }, [isNearScreen])

  if (heroesState.loading) {
    return <>Loading...</>
  }

  if (heroes.length === 0 && !heroesState.apiError) {
    return <>No hay datos</>
  }

  if (heroesState.apiError) {
    return <>Error en la llamda</>
  }

  return (
    <main>
      <List>
        {heroes?.map((hero) => {
          let uri = `${hero.thumbnail?.path}.${hero.thumbnail?.extension}`
          return (
            <ListItem
              key={crypto.randomUUID()}
              onClick={() => {
                handleSelectHero(hero.id)
              }}
              styles={heroesListStyle["hero-list"]}
            >
              {hero.name}
              <Image
                style={{ width: "20vw" }}
                uri={uri}
                alt={hero.name ?? "Undefined hero"}
              />
            </ListItem>
          )
        })}
        {isReferenceInScreen && (
          <li
            id="visor"
            style={{ height: "1px" }}
            ref={ref as MutableRefObject<HTMLLIElement>}
          >
            {heroes.length !== heroesState.total
              ? "Cargando más..."
              : "No hay más datos"}
          </li>
        )}
      </List>
    </main>
  )
}
