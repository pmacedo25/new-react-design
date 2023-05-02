import { Product } from "./Product"

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