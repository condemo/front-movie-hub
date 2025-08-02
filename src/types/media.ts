export type MediaResume = {
  id: number
  type: string | MediaType
  title: string
  genres: string
  description: string
  image: string
  fav: boolean
  viewed: boolean
}

export interface Media extends MediaResume {
  year: number
  firstAir: number
  seasons: number
  caps: number
  rating: number
  runtime: number
}

export enum MediaType {
  Movie = "movie",
  Series = "series"
}
