import type { AnalyzeResponse, ConfigResponse, DiscoverResponse, ReviewsResponse, StatsResponse } from './types'
import demoFixtures from '../sample_responses.json'

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '')
const WEBHOOK_URL = API_BASE.endsWith('/competitor-intel') ? API_BASE : `${API_BASE}/webhook/competitor-intel`
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export class ApiError extends Error {
  statusCode: number
  errors: string[]
  stage?: string

  constructor(message: string, statusCode = 0, errors: string[] = [], stage?: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
    this.stage = stage
  }
}

async function post<T>(body: unknown, timeoutMs: number): Promise<T> {
  const mode = typeof body === 'object' && body !== null && 'mode' in body ? String((body as { mode: unknown }).mode) : ''
  if (DEMO_MODE && mode in demoFixtures) {
    const fixture = (demoFixtures as Record<string, unknown>)[mode]
    const config = typeof fixture === 'object' && fixture !== null && 'config' in fixture ? (fixture as { config: unknown }).config : fixture
    return config as T
  }
  if (!API_BASE) throw new ApiError('API URL is not configured. Add NEXT_PUBLIC_API_BASE to .env.')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal })
    const raw = await response.text()
    let data: T & { errors?: string[]; reason?: string; message?: string; stage?: string; status?: string }
    try { data = JSON.parse(raw) } catch { throw new ApiError('The API returned an invalid response.', response.status) }
    if (!response.ok || ['validation_error', 'error', 'upstream_error'].includes(data.status || '')) {
      throw new ApiError(data.errors?.join(', ') || data.reason || data.message || `Request failed (${response.status}).`, response.status, data.errors || [], data.stage)
    }
    return data
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error instanceof Error && error.name === 'AbortError') throw new ApiError(`Request timed out after ${Math.round(timeoutMs / 1000)} seconds.`)
    throw new ApiError('Unable to reach the competitor intelligence API.')
  } finally { clearTimeout(timeout) }
}

export const getConfig = () => post<ConfigResponse>({ mode: 'config' }, 10_000)
export const discover = (input: Record<string, unknown>) => post<DiscoverResponse>({ mode: 'discover', ...input }, 360_000)
export const findOwnBusiness = (businessName: string, city: string, country: string, area?: string) => discover({ business_name: businessName, city, country, ...(area ? { area } : {}), max_results: 5 })
export const quickCompare = (ownBusiness: { place_id: string; name: string } | null, competitors: { place_id: string; name: string; search_rank: number }[]) => post<StatsResponse>({ mode: 'stats', ...(ownBusiness ? { own_business: ownBusiness } : {}), competitors, include_contacts: true }, 360_000)
export const getReviews = (placeId: string, name?: string, reviewWindow = '30d', maxReviews = 100, ratingFilter?: number[]) => post<ReviewsResponse>({ mode: 'reviews', place_id: placeId, ...(name ? { name } : {}), review_window: reviewWindow, max_reviews: maxReviews, ...(ratingFilter?.length ? { rating_filter: ratingFilter } : {}) }, 360_000)
export const analyze = (input: Record<string, unknown>) => post<AnalyzeResponse>({ mode: 'analyze', ...input }, 900_000)

export { API_BASE, WEBHOOK_URL }
