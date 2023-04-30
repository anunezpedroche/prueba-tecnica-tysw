import { useCallback, useEffect, useState } from "react"
import { getEntityUseCase } from "../../use-cases/get-entity-use-case"
import { CharacterDataWrapper } from "../../types/dtos/character/character-data-wrapper"
import { useContainer } from "../../dependency-injection/container"
import { Character } from "../../types/dtos/character/character"

export function useGetHeros() {
  const [heros, setHeros] = useState<Character[]>()
  const [herosState, setHerosState] = useState({
    count: 0,
    limit: 0,
    offset: 0,
    results: 0
  })
  const container = useContainer()

  const mapTo = useCallback((data: CharacterDataWrapper) => {
    console.log(data)
    return data
  }, [])
  const getAllHeros = async () => {
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
    console.log(heros.data)
    setHeros(heros.data?.data?.results)
  }

  useEffect(() => {
    getAllHeros()
  }, [])

  useEffect(() => {
    console.log(heros)
  }, [heros])

  return { heros }
}
