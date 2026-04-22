import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { buildDigest, sendDigest, buildPreviewHtml } from '@/lib/newsletter-digest'

const CRON_SECRET = process.env.CRON_SECRET

function isAuthorized(req: NextRequest): boolean {
  if (!CRON_SECRET) return false
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${CRON_SECRET}`
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  // Idempotency: skip if an issue was already sent in the last 5 days
  const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  const { data: recentIssue } = await supabaseAdmin
    .from('newsletter_issues')
    .select('id, sent_at')
    .gte('sent_at', fiveDaysAgo)
    .maybeSingle()

  if (recentIssue) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: 'Issue already sent this week',
      lastSentAt: recentIssue.sent_at,
    })
  }

  try {
    const { subject, categories, dateLabel } = await buildDigest()

    const recipientCount = await sendDigest(subject, categories, dateLabel)

    await supabaseAdmin.from('newsletter_issues').insert({
      subject,
      html_body: buildPreviewHtml(subject, categories, dateLabel),
      items: categories,
      recipient_count: recipientCount,
    })

    return NextResponse.json({ ok: true, subject, recipientCount })
  } catch (err) {
    console.error('[newsletter/send]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const preview = req.nextUrl.searchParams.get('preview') === '1'
  if (!preview) {
    return NextResponse.json({ error: 'Use ?preview=1' }, { status: 400 })
  }

  try {
    const { subject, categories, dateLabel } = await buildDigest()
    const html = buildPreviewHtml(subject, categories, dateLabel)

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (err) {
    console.error('[newsletter/send preview]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 }
    )
  }
}
