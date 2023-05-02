import moment from 'moment'
import { InvoiceSummary } from 'models/types'

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{5})\d+?$/, '$1') // captura 5 numeros e não deixa ser digitado mais nada
}

export const getDateFormatted = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD')
}

export const getTomorrowDate = (today?: Date): Date => {
  const tomorrow = today ?? new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

export const getTomorrowFormatted = (): string => {
  return getDateFormatted(getTomorrowDate())
}

export const formatDateDayMonth = (date?: string): string => {
  if (!date) {
    return ''
  }
  return date.slice(8) + '/' + date.slice(5, 7)
}

export const weekDayMapping: { [index: number]: string } = {
  0: 'domingo',
  1: 'segunda-feira',
  2: 'terça-feira',
  3: 'quarta-feira',
  4: 'quinta-feira',
  5: 'sexta-feira',
  6: 'sábado',
}

export const blackFridayIsActive = () => {
  const today = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const startBlackFriday = new Date('November 25 2022 05:00:00').toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
  const endBlackFriday = new Date('November 25 2022 22:00:00').toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
  return today >= startBlackFriday && today <= endBlackFriday
}

export const checkDelayedPayment = (billingStatus: string) => {
  return billingStatus === 'OVERDUE' || billingStatus === 'DUNNING_REQUESTED'
}

export const filterInvoicesByBillingStatus = (invoices: InvoiceSummary[], getOverdue: boolean) => {
  return invoices.filter(({ billingStatus }) => checkDelayedPayment(billingStatus) === getOverdue)
}

export const convertPriceToBrlFormat = (price: number) =>
  price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
