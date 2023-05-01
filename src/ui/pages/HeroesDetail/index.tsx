import { Character } from "../../../types/dtos/character/character"
import { ComicsSummary } from "../../../types/dtos/comics/comics-summary"
import { Image } from "../../components/image/image"
import { List } from "../../components/list/list"
import { ListItem } from "../../components/list/list-item"
import { useHeroesStore } from "../../store/heroes-store"
import heroesDetailStyle from "./heroes-detail.module.css"

export function HeroesDetail() {
  const [selectedHero] = useHeroesStore((state) => [state.selectedHero])

  const uri = `${selectedHero.thumbnail?.path}.${selectedHero.thumbnail?.extension}`
  const desc =
    selectedHero.description !== ""
      ? selectedHero.description
      : "Sin descripción conocida"

  const isComicsAvailable =
    selectedHero.comics?.items?.length === 0 ? false : true

  return (
    <main>
      <article
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%"
        }}
      >
        <section style={{ height: "fit-content" }}>
          <Image
            uri={uri}
            alt={selectedHero.name ?? "Undefined hero"}
            style={{ height: "33vh" }}
          />
        </section>
        <section style={{ padding: "0 10px" }}>
          <span>Nombre: {selectedHero.name}</span>
          <p>Descripción: {desc}</p>
        </section>
      </article>
      <article>
        <span>Listado de cómics:</span>
        <List>
          {isComicsAvailable &&
            selectedHero.comics?.items?.map((comic: ComicsSummary) => {
              return (
                <ListItem
                  key={crypto.randomUUID()}
                  styles={heroesDetailStyle["tiny-list"]}
                >
                  <span>{comic.name}</span>
                </ListItem>
              )
            })}
        </List>
        {!isComicsAvailable && "Sin cómics disponibles"}
      </article>
    </main>
  )
}
