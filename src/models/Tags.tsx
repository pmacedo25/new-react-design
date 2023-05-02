import { Product } from "./Product"

export interface TagProducts {
    id: number
    name: string
    parent_id: number | null
    type: string // maybe other
    products: Product[]
}

export interface Tag {
    id: string
    name: string
}