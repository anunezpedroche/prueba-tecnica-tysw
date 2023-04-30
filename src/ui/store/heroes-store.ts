import { create } from "zustand"
import { Character } from "../../types/dtos/character/character"
import { DependencyContainer } from "tsyringe"
import { useContainer } from "../../dependency-injection/container"

interface IHeroesStore {
  heroes: Character[]
  selectedHero: Character
  selectHero: (id: number) => void
  addHeroes: (heroes: Character[]) => void
  container: DependencyContainer
}

const container = useContainer()

export const useHeroesStore = create<IHeroesStore>()((set) => ({
  heroes: [],
  selectedHero: {},
  selectHero: (id) =>
    set((state) => ({
      selectedHero: state.heroes.find((hero) => hero.id === id)
    })),
  addHeroes: (heroes) =>
    set((state) => ({
      heroes: [...state.heroes, ...heroes]
    })),
  container: container
}))
