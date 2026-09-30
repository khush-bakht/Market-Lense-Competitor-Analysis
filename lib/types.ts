export type ReviewWindowKey = '30d' | '60d' | '90d' | 'all'
export type Role = 'own' | 'competitor'
export type Verdict = 'leading' | 'competitive' | 'behind'

export type Address = {
  full: string | null
  street: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  country_code: string | null
}

export type Place = {
  place_id: string
  name: string
  category: string | null
  categories: string[]
  address: Address
  location: { lat: number; lng: number } | null
  distance_km: number | null
  phone: string | null
  website: string | null
  rating: number | null
  reviews_count: number | null
  price_level: string | null
  google_maps_url: string | null
  image_url: string | null
  search_rank: number
  is_permanently_closed: boolean
  is_temporarily_closed: boolean
}

export type Config = {
  status?: string
  version?: string
  limits: { min_competitors: number; max_competitors: number; max_discover_results: number; max_reviews_per_place: number }
  review_windows: { key: ReviewWindowKey; label: string; default?: boolean }[]
  theme_taxonomy: { key: string; label: string }[]
  health_score: { weights: Record<string, number>; labels: Record<string, string> }
  metrics: { key: string; label: string; unit: string; higher_is_better: boolean }[]
  goal_suggestions: string[]
  business_type_suggestions: string[]
  report_languages: string[]
}

export type Entity = {
  role: Role
  place_id: string
  name: string
  data_status: 'success' | 'no_reviews_in_window' | 'no_reviews' | 'error'
  error_reason: string | null
  category: string | null
  categories: string[]
  address: Address
  location: { lat: number; lng: number } | null
  distance_km: number | null
  phone: string | null
  website: string | null
  emails: string[]
  social: Record<string, string | undefined>
  google_maps_url: string | null
  price_level: string | null
  flags: { permanently_closed: boolean; temporarily_closed: boolean; claimed: boolean | null }
  description: string | null
  opening_hours: { day: string; hours: string }[]
  hours_summary: { days_open: number; weekend_days_open: number; open_24h_days: number } | null
  popular_times_summary: { busiest_day: string; quietest_day: string; peak_slot: { day: string; hour: string; occupancy_pct: number } | null } | null
  amenities: string[]
  images_count: number | null
  review_tags: { title: string; count: number }[]
  people_also_search: { name: string; category: string | null; rating: number | null; reviews_count: number | null }[]
  search_rank: number | null
  lifetime: { rating: number | null; reviews_count: number | null; distribution: Record<'5' | '4' | '3' | '2' | '1', number> | null; distribution_pct: Record<'5' | '4' | '3' | '2' | '1', number> | null }
  window: WindowStats | null
  profile_completeness: { score: number; missing: string[] }
  health: { score: number | null; breakdown: Record<string, { label: string; score: number | null; weight: number; effective_weight: number }> }
  notable_reviews: { recent_negative: NotableReview[]; most_liked: NotableReview[] }
  ai: EntityAI | null
  content?: ContentProfile | null
  content_sources?: ContentSources | null
}

export type ContentProfile = {
  overall_impression: string
  reputation_in_one_line: string
  services_offered: { name: string; description: string; source: string; prominence: string }[]
  specializations: string[]
  target_customers: string[]
  value_proposition: string
  unique_selling_points: string[]
  proof_and_trust_signals: { signal: string; source: string }[]
  pricing_signals: { model: string; details: string; positioning: string }
  conversion_and_contact: { channels: string[]; calls_to_action: string[]; process: string }
  messaging_and_tone: { tone: string; key_phrases: string[]; clarity_score: number; clarity_notes: string }
  content_gaps: string[]
  google_profile_quality: { strengths: string[]; improvements: string[] }
  website_quality: { assessed: boolean; strengths: string[]; improvements: string[]; note: string }
  review_vs_promise: { matches: string[]; mismatches: string[] }
  data_used: { website: boolean; google_profile: boolean; reviews: boolean; note: string }
}

export type ContentSources = { status: string; url: string | null; pages_fetched: number; reason: string | null }

export type WindowStats = {
  key: ReviewWindowKey
  label: string
  start_date: string | null
  end_date: string | null
  review_count: number
  rated_count: number
  avg_rating: number | null
  distribution: Record<'5' | '4' | '3' | '2' | '1', number>
  pct_5star: number | null
  pct_negative: number | null
  negative_count: number
  reply_rate: number | null
  negative_reply_rate: number | null
  avg_reply_days: number | null
  pct_with_photos: number | null
  pct_with_text: number | null
  avg_review_length: number | null
  velocity_per_30d: number | null
  cap_reached: boolean
  momentum: { direction: 'accelerating' | 'steady' | 'slowing' | 'insufficient_data'; newer_half: number; older_half: number }
  trend: { granularity: 'week' | 'month'; points: { period: string; count: number; avg_rating: number | null }[] }
}

export type NotableReview = { rating: number; published_at: string; likes: number; text: string; owner_replied: boolean }
export type Review = { review_id: string; rating: number; text: string; published_at: string; likes: number; owner_reply: string | null; owner_reply_at: string | null; reply_days: number | null; has_photos: boolean; is_local_guide: boolean }
export type EntityAI = { reviews_analyzed: number; coverage: string; sentiment_summary: string; strengths: AITheme[]; weaknesses: AITheme[]; theme_scores: Record<string, ThemeScore>; standout_offerings: string[]; customer_segments: string[]; pricing_perception: { label: string; evidence_summary: string }; urgent_issues: { issue: string; evidence_summary: string; review_count: number }[]; representative_quotes: { quote: string; sentiment: string }[] }
export type AITheme = { theme: string; evidence_summary: string; mentions: number; frequency: string }
export type ThemeScore = { positive: number; negative: number; mentions: number; positive_pct: number; negative_pct: number; net_pct: number }
export type BenchmarkRow = { key: string; label: string; unit: string; higher_is_better: boolean; values: { place_id: string; name: string; role: Role; value: number | null }[]; best: { place_id: string; name: string; value: number | null }; worst: { place_id: string; name: string; value: number | null }; competitor_avg: number | null; you: number | null; your_rank: number | null; ranked_total: number; delta_vs_avg: number | null; relative_diff_pct: number | null; verdict: Verdict | null }
export type Gap = { key: string; label: string; unit: string; you: number | null; competitor_avg: number | null; best_name: string; best_value: number | null; relative_diff_pct: number | null }
export type LeaderRow = { rank: number; place_id: string; name: string; role: Role; health_score: number | null; breakdown: Record<string, number> }
export type HeadToHead = { you: { place_id: string; name: string }; competitor: { place_id: string; name: string }; rows: { key: string; label: string; unit: string; you: number | null; them: number | null; winner: 'you' | 'them' | 'tie'; difference: number | null }[]; score: { you: number; them: number; ties: number } }
export type ThemeMatrix = { taxonomy: { key: string; label: string }[]; rows: { place_id: string; name: string; role: Role; reviews_analyzed: number; themes: Record<string, ThemeScore> }[]; leaders: { key: string; label: string; best: { name: string; place_id: string; net_pct: number } | null; weakest: { name: string; place_id: string; net_pct: number } | null }[] }
export type AiStrategy = { executive_summary: { headline: string; market_position_statement: string; overall_verdict: string; key_findings: { finding: string; evidence: string; importance: string }[] }; competitive_landscape: { competition_intensity: string; reasoning: string; market_leaders: string[]; market_summary: string }; competitor_profiles: { place_id: string; name: string; positioning_label: string; how_they_win: string[]; vulnerabilities: string[]; threat_level: string; threat_reasoning: string; what_you_can_learn: string[] }[]; own_business_assessment: { where_you_win: { point: string; evidence: string }[]; where_you_lose: { point: string; evidence: string }[]; swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] }; reputation_risks: string[] } | null; head_to_head: { winner_by_dimension: { dimension: string; winner: 'you' | 'them' | 'tie'; explanation: string }[]; how_to_beat_competitor: string[] } | null; market_gaps: { gap: string; evidence: string; opportunity: string; who_is_affected: string }[]; customer_expectations: { must_haves: string[]; delighters: string[]; deal_breakers: string[] }; pricing_landscape: { summary: string; by_business: { place_id: string; perception: string }[] }; strategy: { positioning_recommendation: string; differentiators_to_build: string[]; messaging_angles: string[]; things_to_fix_first: string[]; ideas_borrowed_from_competitors: { idea: string; from: string; how_to_adapt: string }[] }; action_plan: { priority: number; title: string; why: string; evidence: string; impact: string; effort: string; timeframe: string; kpi: string; owner_suggestion: string }[]; reputation_playbook: { review_generation_tactics: string[]; response_guidelines: string[]; issues_to_address_publicly: string[] }; kpis_to_track: { kpi: string; current_value: string; target: string; why: string }[]; watchlist: { item: string; reason: string }[]; confidence: { level: string; reasons: string[] }; limitations: string[] }

export type Report = { meta: { generated_at: string; business_type: string; location: { area?: string; city: string; country: string }; review_window: { key: ReviewWindowKey; label: string; start_date: string | null; end_date: string | null; max_reviews_per_place: number }; comparison_mode: 'head_to_head' | 'market_benchmark' | 'market_overview'; own_business_included: boolean; competitors_count: number; goals: string[]; owner_context_provided: boolean; report_language: string }; entities: Entity[]; benchmark: { metrics: BenchmarkRow[]; advantages: Gap[]; gaps: Gap[]; leaderboard: LeaderRow[]; head_to_head: HeadToHead | null }; theme_matrix: ThemeMatrix; ai: AiStrategy | null; health_score_method: { weights: Record<string, number>; note: string }; data_quality: { ai_status: string; ai_message: string | null; entities_requested: number; entities_with_data: number; entities_without_period_reviews: { place_id: string; name: string }[]; entities_failed: { place_id: string; name: string; reason: string }[]; entity_analysis_failures: { place_id: string; name: string; reason: string }[]; apify_errors: string[]; sample_size_confidence: string; limitations: string[] } }

export type ConfigResponse = Config & { status: string }
export type DiscoverResponse = { status: string; query: Record<string, unknown>; count: number; excluded_count: number; places: Place[] }
export type StatsResponse = { status: string; own_business: Entity | null; competitors: Entity[]; benchmark_preview: { metrics: BenchmarkRow[]; advantages: Gap[]; gaps: Gap[]; head_to_head: HeadToHead | null }; data_quality: { requested: number; succeeded: number; errors: { place_id: string; name: string; reason: string }[] } }
export type ReviewsResponse = { status: string; place: Entity; window: WindowStats; reviews: Review[]; returned_count: number; filtered_by_rating: number }
export type AnalyzeResponse = { status: string; report: Report }
