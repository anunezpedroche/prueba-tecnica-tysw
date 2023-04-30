import { StorySummary } from "./story-summary"

export type StoryList = {
  available?: number
  returned?: number
  collectionURI?: string
  items?: StorySummary[]
}
