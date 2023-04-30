import { ComicList } from "../comics/comic-list"
import { URL } from "../common/url"
import { EventsList } from "../events/events-list"
import { SeriesList } from "../series/series-list"
import { StoryList } from "../stories/story-list"
import { Thumbnail } from "./thumbnail"

export type Character = {
  id?: number
  name?: string
  description?: string
  modified?: Date
  resourceURI?: string
  urls?: URL[]
  thumbnail?: Thumbnail
  comics?: ComicList
  stories?: StoryList
  events?: EventsList
  series?: SeriesList
}
