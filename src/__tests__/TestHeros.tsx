import { useEffect } from "react"
import { Character } from "../types/dtos/character/character"
import { HeroesDetail } from "../ui/pages/HeroesDetail"
import { useHeroesStore } from "../ui/store/heroes-store"

export function TestHeros({ hero, heroes }: { hero: Character, heroes:Character[] }) {
  const [addHeroes,selectHero] = useHeroesStore((state) => [state.addHeroes,state.selectHero])

  useEffect(() => {
    addHeroes(heroes)
    selectHero(hero.id as number)
  }, [])

  return <HeroesDetail />
}
