import { EventsSummary } from "./events-summary"

export type EventsList = {
  available?: number
  returned?: number
  collectionURI?: string
  items?: EventsSummary[]
}
