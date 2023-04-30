import { useCallback, useEffect } from "react"
import { getEntityUseCase } from "../../use-cases/get-entity-use-case"
import { CharacterDataWrapper } from "../../types/dtos/character/character-data-wrapper"
import { useContainer } from "../../dependency-injection/container"
import { URL } from "../../types/dtos/common/url"

export function useGetHeros() {
  const container = useContainer()

  const mapTo = useCallback((data: CharacterDataWrapper) => {
    return data
  }, [])

  useEffect(() => {
    const getAllHeros = async () => {
      const heros = await getEntityUseCase<
        CharacterDataWrapper,
        CharacterDataWrapper,
        any
      >(
        container,
        {
          url: `/characters?ts=1000&apikey=${
            import.meta.env.VITE_API_KEY
          }&hash=${import.meta.env.VITE_HASH_KEY}`
        },
        mapTo
      )
      console.log(heros)
    }
    getAllHeros()
  }, [])

  return {}
}
