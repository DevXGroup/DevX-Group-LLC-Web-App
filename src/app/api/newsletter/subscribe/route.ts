import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/newsletter-email'

const schema = z.object({
  email: z.string().email('Invalid email address').max(254),
})

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_HOURS = 1

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    console.error('[newsletter/subscribe] supabase not configured', {
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL),
      hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    })
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const body = await req.json().catch(() => ({}))
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }

  const email = parsed.data.email.toLowerCase().trim()
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  try {
    // Rate limit: max 3 signups per IP per hour
    const windowStart = new Date(
      Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000
    ).toISOString()
    const { count, error: rateError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .gte('subscribed_at', windowStart)

    if (rateError) {
      console.error('[newsletter/subscribe] rate-limit query failed', rateError)
      return NextResponse.json({ error: 'Failed to subscribe. Try again.' }, { status: 500 })
    }

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
    }

    // Check existing subscriber
    const { data: existing, error: lookupError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, confirmed, unsubscribed_at, confirmation_token')
      .eq('email', email)
      .maybeSingle()

    if (lookupError) {
      console.error('[newsletter/subscribe] existing lookup failed', lookupError)
      return NextResponse.json({ error: 'Failed to subscribe. Try again.' }, { status: 500 })
    }

    if (existing) {
      if (existing.confirmed && !existing.unsubscribed_at) {
        return NextResponse.json({ ok: true, alreadySubscribed: true })
      }

      if (existing.unsubscribed_at) {
        // Resubscribe: reset state, issue new token
        const { data: updated, error } = await supabaseAdmin
          .from('newsletter_subscribers')
          .update({
            confirmed: false,
            confirmation_token: crypto.randomUUID(),
            subscribed_at: new Date().toISOString(),
            confirmed_at: null,
            unsubscribed_at: null,
            ip_address: ip,
          })
          .eq('email', email)
          .select('confirmation_token')
          .single()

        if (error || !updated) {
          console.error('[newsletter/subscribe] resubscribe update failed', error)
          return NextResponse.json({ error: 'Failed to subscribe. Try again.' }, { status: 500 })
        }

        await sendConfirmationEmail(email, updated.confirmation_token, req.nextUrl.origin)
        return NextResponse.json({ ok: true })
      }

      // Unconfirmed: resend confirmation
      await sendConfirmationEmail(email, existing.confirmation_token, req.nextUrl.origin)
      return NextResponse.json({ ok: true })
    }

    // New subscriber
    const { data: inserted, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({ email, ip_address: ip, source: 'website' })
      .select('confirmation_token')
      .single()

    if (error || !inserted) {
      console.error('[newsletter/subscribe] insert failed', error)
      return NextResponse.json({ error: 'Failed to subscribe. Try again.' }, { status: 500 })
    }

    await sendConfirmationEmail(email, inserted.confirmation_token, req.nextUrl.origin)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter/subscribe] unexpected failure', err)
    return NextResponse.json({ error: 'Failed to subscribe. Try again.' }, { status: 500 })
  }
}
