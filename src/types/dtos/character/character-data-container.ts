import { Character } from "./character"

export type CharacterDataContainer = {
    offset?:number
    limit?: number
    total?:number
    count?:number
    results?: Character[]
}