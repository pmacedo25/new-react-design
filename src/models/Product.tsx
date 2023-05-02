import { Category } from "./Categories"
import { Mission } from "./Missions"

export interface SupplierPrice {
  supplierName: string
  price: number
  packagePrice: number
  datetimeToExpire?: string | number | Date | undefined
  datetimeToStart?: string | number | Date | undefined
  supplierId: string
  inStockQuantity?: number
  availableQuantity?: number
  offerType?: number | undefined
  unitOfferId?: number | undefined
  limitPerOrder?: number | undefined
}

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

export interface LinkData {
  text: string
  href: string
  images?: string[]
}

export interface ProductsGroup {
  name: string
  link: LinkData
  products: Product[]
  context?: string | undefined
  missions?: Mission[]
}

export interface GroupListing {
  title?: string
  products: Product[]
  creationDatetime: string
  expirationDate: string
}


