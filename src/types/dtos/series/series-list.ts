import { SeriesSummary } from "./series-summary"

export type SeriesList = {
  available?: number
  returned?: number
  collectionURI?: string
  items?: SeriesSummary[]
}
