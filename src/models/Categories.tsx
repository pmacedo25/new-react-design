import { Product } from "./Product";

export interface Category {
    name: string
    slug: string
    parent?: Category
}

export interface CategoryProducts extends Category {
    products: Product[]
}