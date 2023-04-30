import { Character } from "../../../types/dtos/character/character"
import { useHeroesStore } from "../../store/heroes-store"
export function HeroesDetail() {
  const [selectedHero] = useHeroesStore((state) => [state.selectedHero])

  return <>{selectedHero.name}</>
}
