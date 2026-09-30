'use client'

import type { Report } from '@/lib/types'

export function QualityPanel({ report }: { report: Report }) {
  const quality = report.data_quality
  return <div className="mt-6 grid gap-6 lg:grid-cols-2"><section className="rounded-xl border border-[#dfe5ec] bg-white p-5"><h2 className="font-semibold text-[#0f2747]">Data quality</h2><p className="mt-2 text-sm text-[#667085]">Confidence: <strong>{quality.sample_size_confidence}</strong> · AI: <strong>{quality.ai_status}</strong></p>{quality.ai_message && <p className="mt-4 rounded-lg bg-[#fff4df] p-3 text-sm text-[#a76b00]">{quality.ai_message}</p>}<ul className="mt-4 space-y-2 text-sm text-[#667085]">{quality.limitations.map((item) => <li key={item}>• {item}</li>)}{quality.apify_errors.map((item) => <li key={item} className="text-[#d64545]">• {item}</li>)}</ul></section><section className="rounded-xl border border-[#dfe5ec] bg-white p-5"><h2 className="font-semibold text-[#0f2747]">Businesses needing attention</h2>{quality.entities_without_period_reviews.length || quality.entities_failed.length ? <ul className="mt-4 space-y-3 text-sm text-[#667085]">{quality.entities_without_period_reviews.map((item) => <li key={item.place_id} className="rounded-lg bg-[#fff4df] p-3">{item.name}: no reviews in this period</li>)}{quality.entities_failed.map((item) => <li key={item.place_id} className="rounded-lg bg-[#fff0f0] p-3">{item.name}: {item.reason}</li>)}</ul> : <p className="mt-4 text-sm text-[#667085]">All businesses returned usable data for this report.</p>}</section></div>
}
