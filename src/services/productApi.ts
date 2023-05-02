import {
  CategoryProducts,
  CustomCorridor,
  GroupListing,
  Product,
  ProductsGroup,
  SectionCategories,
  SpecialSupplier,
  Tag,
  TagProducts,
} from 'models/types'
import * as querystring from 'querystring'
import { apiGet } from 'utils/api'

export interface WelcomeData {
  ofertoes: Product[]
  dailyOffers: Product[]
  weekOffers: Product[]
  bestPrices: Product[]
  bestSellers: Product[]
  previouslyOrdered: Product[]
  seuMercado: Product[]
  sections: CategoryProducts[]
  specialSuppliers: SpecialSupplier[]
  bfCorridor?: Product[]
  customPromotions: Product[]
  customCorridors: CustomCorridor[]
}

interface PromotionsData {
  dailyOffers: Product[]
  weekOffers: Product[]
  bestPrices: Product[]
}

export const buildProductURL = (
  url: string,
  params: Record<string, string | string[] | number | number[]> = {}
): string => {
  params = { ...params, region_id: 1 }

  const merchantCode = "QTKAU"
  if (merchantCode) {
    params = {
      ...params,
      merchant_code: "QTKAU",
    }
  }

  const p = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value) => p.append(key, value.toString()))
    } else {
      p.append(key, value.toString())
    }
  })

  return `${url}?${p.toString()}`
}

export const getWelcome = async (
  merchantCode?: string,
  controller?: AbortController
): Promise<WelcomeData> =>
  await apiGet(
    buildProductURL('/products/welcome'),
    false,
    '',
    merchantCode
      ? {
          ['x-merchant']: merchantCode,
        }
      : undefined,
    { controller }
  )

export const getBestSellers = async (): Promise<Product[]> =>
  await apiGet(buildProductURL('/products/best-sellers'))

export const getOfertoes = async (): Promise<Product[]> =>
  await apiGet(buildProductURL('/products/ofertoes'))

export const getSuggestions = async (
  eans: string[],
  getMethod: (url: string) => Promise<Product[]> = apiGet,
  limit = 10
): Promise<Product[]> => {
  try {
    const allPromises = Promise.all([
      getMethod(buildProductURL('/suggestions/merchant')),
      getMethod(buildProductURL('/suggestions', { eans: eans, limit: limit })),
    ])

    const suggestions = await allPromises
    if (!(suggestions[0].length || suggestions[1].length)) return [] as Product[]

    let suggestionsValue = suggestions[0] as Product[]
    suggestionsValue = suggestionsValue.concat(suggestions[1] as Product[])
    return suggestionsValue
  } catch (e) {
    return [] as Product[]
  }
}

export const getMoreItemsBetterPrices = async (): Promise<ProductsGroup> => {
  try {
    return await apiGet(buildProductURL('/products/more-items-better-prices'))
  } catch (e) {
    return {} as ProductsGroup
  }
}

export const getProductsSectionByCategory = async (
  sectionSlug: string
): Promise<SectionCategories> => await apiGet(buildProductURL(`/products/sections/${sectionSlug}`))

export const getProductsGroup = async (id: string): Promise<GroupListing> =>
  await apiGet(buildProductURL(`/products/listing-id`, { id }))

export const getCategoryProducts = async (
  sectionSlug: string,
  categorySlug: string
): Promise<CategoryProducts> =>
  await apiGet(buildProductURL(`/products/sections/${sectionSlug}/categories/${categorySlug}`))

export const getAvailableProducts = async (products: Product[]): Promise<Product[]> => {
  if (!products.length) return []

  const productsEan = products.map((item) => item.ean)
  const url = buildProductURL(`/products`, { ean: productsEan })
  return await apiGet(url)
}

export type SearchResult = {
  numberOfMatches: number
  products: Product[]
  queryId: string
  index: string
}

export const searchProducts = async (
  term: string | string[],
  offset: number,
  length: number
): Promise<SearchResult> => {
  const url = buildProductURL('/products/_search', {
    query: term,
    offset,
    length,
  })
  return await apiGet(url)
}

export const getSupplierProducts = async (
  corridorId: string
): Promise<{
  supplierId: string
  products: Product[]
  supplierName: string
}> => await apiGet(buildProductURL(`/products/suppliers/${corridorId}`))

export const getCustomCorridorProducts = async (
  supplierId: string
): Promise<{
  id: string
  label: string
  images: string[]
  products: Product[]
  isPartner: boolean
  endTime: string
}> => await apiGet(buildProductURL(`/products/corridor/${supplierId}`))

export const getPreviouslyOrdered = async (merchantCode: string): Promise<Product[]> =>
  await apiGet(buildProductURL(`/products/previously-ordered`, { merchant_code: merchantCode }))

export const getSeuMercadoProducts = async (
  merchantCode: string
): Promise<{
  sections: CategoryProducts[]
}> => await apiGet(`/products/seu-mercado/${merchantCode}`)

export const getTags = async (term: string): Promise<Tag[]> => {
  const params = querystring.stringify({
    q: term,
  })
  return await apiGet(`/tag/search?${params}`)
}

export const getTagProducts = async (tagId: string): Promise<TagProducts> => {
  return await apiGet(buildProductURL(`/products/tag/${tagId}`))
}

export const getDayOff = async (date: string): Promise<any> => {
  return await apiGet(`/day_off?date=${date}`)
}

export const getPromotions = async (): Promise<PromotionsData> =>
  await apiGet(buildProductURL('/promotions'))

export const getPromotionsDaily = async (): Promise<GroupListing> =>
  await apiGet(buildProductURL('/promotions/daily-promotions'))

export const getBestPrices = async (): Promise<GroupListing> =>
  await apiGet(buildProductURL('/promotions/best-prices'))

export const getWeekPromotions = async (): Promise<Product[]> =>
  await apiGet(buildProductURL('/promotions/week-promotions'))

export const getCustomPromotions = async (): Promise<Product[]> =>
  await apiGet(buildProductURL('/custom-promotions/products'))

export const getPromotionsSuggestions = async (
  merchantCode: string,
  regionId: number
): Promise<Product[]> =>
  await apiGet(
    buildProductURL('/promotions/last-offers', { merchant_code: merchantCode, region_id: regionId })
  )
