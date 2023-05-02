import { Product } from "./Product"

export type AlgoliaEvent = {
  eventType: string
  eventName: string
  userToken: string
  timestamp: number
  objectIds: string[]
  queryId?: string
  positions?: number[]
}

export interface SpecialSupplier {
  supplierId: string
  images: string[]
  products: Product[]
  label: string
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



