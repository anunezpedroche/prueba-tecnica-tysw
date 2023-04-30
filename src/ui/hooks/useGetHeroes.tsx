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
    count: 20,
    limit: 20,
    offset: 20,
    total: 20,
    loading: true,
    apiError: false
  })

  const mapTo = useCallback((data: CharacterDataWrapper) => {
    return data
  }, [])

  const getAllHeroes = useCallback(
    async (offset?: number) => {
      console.log(offset, heroesState.loading)
      if (heroes.length >= heroesState.total) return

      let url = `/characters?ts=1000&apikey=${
        import.meta.env.VITE_API_KEY
      }&hash=${import.meta.env.VITE_HASH_KEY}`

      if (offset) {
        url += `&offset=${offset}`
      }

      const heros = await getEntityUseCase<
        CharacterDataWrapper,
        CharacterDataWrapper,
        any
      >(
        container,
        {
          url: url
        },
        mapTo
      )
      if (heros.status === 200) {
        addHeroes(heros.data?.data?.results as Character[])
        setHeroesState((prev) => ({
          ...prev,
          loading: false,
          apiError: false,
          count: heros.data?.data?.count as number,
          limit: heros.data?.data?.limit as number,
          offset: heros.data?.data?.offset as number,
          total: heros.data?.data?.total as number
        }))
      }
      if (heros.status !== 200) {
        setHeroesState((prev) => ({
          ...prev,
          loading: false,
          apiError: true
        }))
      }
    },
    [heroesState, heroes, container]
  )

  const navigate = useNavigate()
  const handleSelectHero = (id: number | undefined) => {
    if (id === undefined) return
    selectHero(id)
    navigate(`/hero/${id}`)
  }
  useEffect(() => {
    getAllHeroes()
  }, [])

  const handleScroll = useCallback(() => {
    getAllHeroes(heroesState.offset + heroesState.limit)
  }, [heroesState])

  return { heroes, heroesState, handleSelectHero, handleScroll }
}
