export type MediaResume = {
  id: number
  type: string | MediaType
  title: string
  genres: string
  description: string
  thumbnail: string
  rating: number
  fav: boolean
  viewed: boolean
}

export interface Media extends MediaResume {
  year: number
  firstAir: number
  seasons: number
  caps: number
  runtime: number
  image: string
}

export enum MediaType {
  Movie = "movie",
  Series = "series"
}
