import { ComicsSummary } from "./comics-summary"

export type ComicList = {
  available?: number
  returned?: number
  collectionURI?: string
  items?: ComicsSummary[]
}
