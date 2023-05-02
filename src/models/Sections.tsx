import { Category, CategoryProducts } from "./Categories"
import { Product } from "./Product"


export interface CustomSection {
    id: string
    label: string
    images: string[]
    products: Product[]
    isPartner: boolean
    endTime?: string
}

export interface SectionCategories extends Category {
    categories: CategoryProducts[]
}