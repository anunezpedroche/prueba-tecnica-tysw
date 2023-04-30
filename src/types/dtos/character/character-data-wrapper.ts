import { CharacterDataContainer } from "./character-data-container"

export type CharacterDataWrapper = {
  code?: number
  status?: string
  copyright?: string
  attributionText?: string
  attributionHtml?: string
  data?: CharacterDataContainer
  etag?: string
}
