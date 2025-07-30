export type MediaResume = {
  Id: number
  Type: string | MediaType
  Title: string
  Genres: string
  Description: string
  Image: string
  Fav: boolean
  Viewed: boolean
}

export interface Media extends MediaResume {
  Year: number
  FirstAir: number
  Seasons: number
  Caps: number
  Rating: number
  Runtime: number
}

export enum MediaType {
  Movie = "movie",
  Series = "series"
}
