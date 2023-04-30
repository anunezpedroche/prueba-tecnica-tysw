import { List } from "../../components/list/list"
import { ListItem } from "../../components/list/list-item"
import { useGetHeros } from "../../hooks/useGetHeros"

export function HerosList() {
  const { heros } = useGetHeros()
  console.log(heros)
  return (
    <>
      <List>
        {heros?.map((hero) => {
          console.log(hero)
          return (
            <ListItem>
              <img
                style={{ width: "50px", height: "50px" }}
                src={`${hero.thumbnail?.path}.jpg`}
              />
              {hero.name}
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
