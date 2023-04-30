import { useNavigate } from "react-router-dom"
import { List } from "../../components/list/list"
import { ListItem } from "../../components/list/list-item"
import { useGetHeroes } from "../../hooks/useGetHeroes"

export function HeroesList() {
  const { heroes, handleSelectHero } = useGetHeroes()

  return (
    <>
      <List>
        {heroes?.map((hero) => {
          console.log(hero)
          return (
            <ListItem
              key={crypto.randomUUID()}
              onClick={() => {
                handleSelectHero(hero.id)
              }}
            >
              {hero.name}
              <img
                style={{ width: "20vw" }}
                src={`${hero.thumbnail?.path}.jpg`}
              />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
