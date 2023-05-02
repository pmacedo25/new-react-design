export interface Mission {
  id: number
  description: string
  type: string
  criteria: string
  discountAmount?: number | undefined
  eans: string[]
  expireAt?: string | number | Date | undefined
}