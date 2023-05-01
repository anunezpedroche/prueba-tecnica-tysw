import { useCallback, useEffect, useState } from "react"
import { getEntityUseCase } from "../../use-cases/get-entity-use-case"
import { CharacterDataWrapper } from "../../types/dtos/character/character-data-wrapper"
import { Character } from "../../types/dtos/character/character"
import { useHeroesStore } from "../store/heroes-store"
import { useNavigate } from "react-router-dom"

interface GetHeroesStateProps {
  count: number
  limit: number
  offset: number
  total: number
  loading: boolean
  apiError: boolean
}

type GetHeroes = {
  heroes: Character[]
  heroesState: GetHeroesStateProps
}

export function useGetHeroes() {
  const [heroes, addHeroes, selectHero, container] = useHeroesStore((state) => [
    state.heroes,
    state.addHeroes,
    state.selectHero,
    state.container
  ])

  const [heroesState, setHeroesState] = useState<GetHeroesStateProps>({
    count: 20,
    limit: 20,
    offset: heroes.length - 20,
    total: heroes.length + 1,
    loading: heroes.length === 0 ? true : false,
    apiError: false
  })

  const mapTo = useCallback((data: CharacterDataWrapper): GetHeroes => {
    return {
      heroes: data.data?.results ?? [],
      heroesState: {
        apiError: data.code !== 200,
        count: data.data?.count ?? 20,
        limit: data.data?.limit ?? 20,
        loading: data.code !== 200,
        offset: data.data?.offset ?? 0,
        total: data.data?.total ?? 0
      }
    }
  }, [])

  const getAllHeroes = useCallback(
    async (offset?: number) => {
      if (heroes.length >= heroesState.total) return

      let url = `/characters?ts=1000&apikey=${
        import.meta.env.VITE_API_KEY
      }&hash=${import.meta.env.VITE_HASH_KEY}`

      if (offset) {
        url += `&offset=${offset}`
      }

      const heros = await getEntityUseCase<
        GetHeroes,
        CharacterDataWrapper,
        { url: string }
      >(
        container,
        {
          url: url
        },
        mapTo
      )
      if (heros.status === 200) {
        addHeroes(heros.data?.heroes ?? [])
        setHeroesState((prev) => ({
          ...prev,
          ...heros.data?.heroesState
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
    if (heroes.length !== 0) return
    getAllHeroes()
  }, [])

  const handleScroll = useCallback(() => {
    getAllHeroes(heroesState.offset + heroesState.limit)
  }, [heroesState])

  return { heroes, heroesState, handleSelectHero, handleScroll }
}
