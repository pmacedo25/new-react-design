import { Product } from "./product"

export type {Product}

export interface Category {
  name: string
  slug: string
  parent?: Category
}

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



export interface CartChange {
  context?: string
  quantity: number
  previousQuantity?: number
  changeDatetime?: string
}

export interface CartItem {
  product: Product
  quantity: number
  isPackageMode: boolean
  changes: CartChange[]
  isAvailable?: boolean
}

export interface Purchase {
  id: string
  orderDatetime: string
  paymentType: number
  itemsData: CartItem[]
}

export enum PaymentType {
  BOLETO = 'Boleto',
  CARTAO = 'Cartão de crédito',
  PIX = 'Pix',
}

export interface CategoryProducts extends Category {
  products: Product[]
}

export interface SectionCategories extends Category {
  categories: CategoryProducts[]
}

export interface GroupListing {
  title?: string
  products: Product[]
  creationDatetime: string
  expirationDate: string
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

export type AlgoliaEvent = {
  eventType: string
  eventName: string
  userToken: string
  timestamp: number
  objectIds: string[]
  queryId?: string
  positions?: number[]
}

export interface CustomCorridor {
  id: string
  label: string
  images: string[]
  products: Product[]
  isPartner: boolean
  endTime?: string
}

export interface SpecialSupplier {
  supplierId: string
  images: string[]
  products: Product[]
  label: string
}

export interface Tag {
  id: string
  name: string
}

export interface TagProducts {
  id: number
  name: string
  parent_id: number | null
  type: string // maybe other
  products: Product[]
}

export type DayOff = {
  weekday: number | null
  date: string
  nextBusinessDayIsDayOff: string
  specialDayOffOnTuesday: boolean
  nextDeliveryDay: string
  nextDeliveryDayWeekday: number
}

export interface Popup {
  showModal: boolean
  today: string
  dayOff: DayOff
}

export interface BlockedBanner {
  showBanner: boolean
}

export interface InvoiceSummary {
  billingValue: number
  creationDatetime: string
  deliveryFinishDatetime: string
  leftForDeliveryDatetime: string
  dueDate: string
  invoiceType: number
  paymentType: number
  shopperPlanId: string
  status: string
  totalDeliveredPrice: number
  totalPrice: number
  url: string
  billingUrl: string
  billingStatus: string
  orderId?: number[]
  nfeUrls: string[]
  invoiceDiscount?: number | null
}

export interface Mission {
  id: number
  description: string
  type: string
  criteria: string
  discountAmount?: number | undefined
  eans: string[]
  expireAt?: string | number | Date | undefined
}


