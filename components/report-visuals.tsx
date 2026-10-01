/* report-visuals.tsx */
'use client'

import { ArrowUpRight, BarChart3, Gauge, Star, TrendingDown, TrendingUp } from 'lucide-react'
import type { Report } from '@/lib/types'

function scoreColor(score: number | null) {
  if (score === null) return '#98a2b3'
  if (score >= 80) return '#22a06b'
  if (score >= 60) return '#f5a623'
  return '#d64545'
}

function ScoreRing({ score, label }: { score: number | null; label: string }) {
  const value = score ?? 0
  return <div className="relative grid h-32 w-32 place-items-center rounded-full" style={{ background: `conic-gradient(${scoreColor(score)} ${value * 3.6}deg, #e9eef3 0deg)` }}><div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center"><strong className="text-3xl text-[#0f2747]">{score ?? '—'}</strong><span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085]">{label}</span></div></div>
}

export function ReportVisuals({ report }: { report: Report }) {
  const leaderboard = report.benchmark.leaderboard || []
  const top = leaderboard[0]
  const own = leaderboard.find((row) => row.role === 'own')
  const bestScore = top?.health_score || 0
  const ownScore = own?.health_score || 0
  const gap = own && top && top.place_id !== own.place_id ? Math.round(bestScore - ownScore) : 0
  const entitiesWithWindow = report.entities.filter((entity) => entity.window)
  const maxVelocity = Math.max(...entitiesWithWindow.map((entity) => entity.window?.velocity_per_30d || 0), 1)

  return <section className="mt-6 space-y-6"><div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><section className="overflow-hidden rounded-2xl bg-[#0f2747] p-6 text-white shadow-[0_14px_32px_rgba(15,39,71,0.14)]"><div className="flex items-center gap-2 text-[#b6ebe5]"><Gauge size={17} /><span className="text-xs font-bold uppercase tracking-[0.18em]">Market health</span></div><div className="mt-6 flex items-start gap-5"><div className="shrink-0"><ScoreRing score={(own?.health_score ?? bestScore) || null} label={own ? 'your score' : 'leader'} /></div><div className="min-w-0 flex-1 pt-2"><p className="text-2xl font-semibold leading-tight">{own ? (gap > 0 ? `${gap} points to close` : 'You lead the market') : `${leaderboard.length} businesses ranked`}</p><p className="mt-2 text-sm leading-6 text-[#c8d4e2]">{own ? 'Your health score combines reputation, activity, responsiveness, and profile strength.' : 'Health scores make the market easier to scan before you read the detail.'}</p></div></div></section><section className="rounded-2xl border border-[#dfe5ec] bg-white p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-[#0f2747]">Market leaderboard</h2><p className="mt-1 text-sm text-[#667085]">A fast read on who is strongest overall.</p></div><BarChart3 size={20} className="text-[#0f8b8d]" /></div><div className="mt-5 space-y-4">{leaderboard.slice(0, 6).map((row) => { const width = bestScore ? Math.max(5, ((row.health_score || 0) / bestScore) * 100) : 5; return <div key={row.place_id} className="flex items-center gap-3"><span className="w-5 text-xs font-bold text-[#98a2b3]">#{row.rank}</span><div className="min-w-0 flex-1"><div className="mb-1 flex justify-between gap-3 text-sm"><span className={`truncate font-semibold ${row.role === 'own' ? 'text-[#0f8b8d]' : 'text-[#172033]'}`}>{row.name}{row.role === 'own' ? ' · You' : ''}</span><span className="shrink-0 font-semibold text-[#172033]">{row.health_score ?? '—'}</span></div><div className="h-2 overflow-hidden rounded-full bg-[#edf2f7]"><div className="h-full rounded-full transition-all" style={{ width: `${width}%`, backgroundColor: row.role === 'own' ? '#0f8b8d' : '#7b9bb8' }} /></div></div></div> })}</div></section></div><section className="rounded-xl border border-[#dfe5ec] bg-white p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-[#0f2747]">Review momentum</h2><p className="mt-1 text-sm text-[#667085]">Which businesses are generating fresh customer feedback?</p></div><span className="rounded-full bg-[#d9f3f0] px-3 py-1 text-xs font-semibold text-[#0f6f72]">Per 30 days</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{entitiesWithWindow.map((entity) => { const velocity = entity.window?.velocity_per_30d || 0; const positive = entity.window?.momentum.direction === 'accelerating'; const slowing = entity.window?.momentum.direction === 'slowing'; return <div key={entity.place_id} className="rounded-xl bg-[#f7f9fc] p-4"><div className="flex items-center justify-between gap-3"><span className="truncate text-sm font-semibold text-[#172033]">{entity.name}</span>{positive ? <TrendingUp size={17} className="text-[#22a06b]" /> : slowing ? <TrendingDown size={17} className="text-[#d64545]" /> : <ArrowUpRight size={17} className="text-[#f5a623]" />}</div><div className="mt-4 flex items-end gap-2"><strong className="text-2xl text-[#0f2747]">{velocity}</strong><span className="pb-1 text-xs text-[#667085]">new reviews</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#dfe5ec]"><div className={`h-full rounded-full ${positive ? 'bg-[#22a06b]' : slowing ? 'bg-[#d64545]' : 'bg-[#f5a623]'}`} style={{ width: `${Math.max(6, (velocity / maxVelocity) * 100)}%` }} /></div><div className="mt-2 text-xs font-medium capitalize text-[#667085]">{entity.window?.momentum.direction.replace('_', ' ')}</div></div>})}</div></section></section>
}