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