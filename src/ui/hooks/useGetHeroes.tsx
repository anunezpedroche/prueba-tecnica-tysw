import { useCallback, useEffect, useState } from "react"
import { getEntityUseCase } from "../../use-cases/get-entity-use-case"
import { CharacterDataWrapper } from "../../types/dtos/character/character-data-wrapper"
import { Character } from "../../types/dtos/character/character"
import { useHeroesStore } from "../store/heroes-store"
import { useNavigate } from "react-router-dom"

export function useGetHeroes() {
  const [heroes, addHeroes, selectHero, container] = useHeroesStore((state) => [
    state.heroes,
    state.addHeroes,
    state.selectHero,
    state.container
  ])

  const [heroesState, setHeroesState] = useState({
    count: 0,
    limit: 0,
    offset: 0,
    results: 0
  })

  const mapTo = useCallback((data: CharacterDataWrapper) => {
    return data
  }, [])

  const getAllHeroes = async () => {
    const heros = await getEntityUseCase<
      CharacterDataWrapper,
      CharacterDataWrapper,
      any
    >(
      container,
      {
        url: `/characters?ts=1000&apikey=${import.meta.env.VITE_API_KEY}&hash=${
          import.meta.env.VITE_HASH_KEY
        }`
      },
      mapTo
    )
    addHeroes(heros.data?.data?.results as Character[])
  }

  const navigate = useNavigate()
  const handleSelectHero = (id: number | undefined) => {
    if (id === undefined) return
    selectHero(id)
    navigate(`/hero/${id}`)
  }
  useEffect(() => {
    getAllHeroes()
  }, [])

  return { heroes, handleSelectHero }
}
