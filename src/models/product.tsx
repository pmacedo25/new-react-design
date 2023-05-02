import { Category, SupplierPrice } from "./types"

export interface Product {
    id: string
    ean: string
    datetimeToExpire?: string | number | Date | undefined
    packageEan: string
    imageUrls: {
      image120Px: string
      image300Px: string
    }
    description: string
    category: Category
    price: number
    discount?: number | undefined
    limitPerOrder?: number | null
    supplierPrices: SupplierPrice[]
    packageNumberOfItems?: number
    packagePrice?: number
    inOfertao?: boolean
    inPromotion?: boolean
    inStock?: boolean
    relatedPrices?: string[]
  }