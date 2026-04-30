import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/newsletter-email'

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin
  const token = req.nextUrl.searchParams.get('token')

  if (!token || !isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=invalid`)
  }

  const { data: subscriber } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('id, email, confirmed, confirmation_token')
    .eq('confirmation_token', token)
    .maybeSingle()

  if (!subscriber) {
    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=invalid`)
  }

  if (subscriber.confirmed) {
    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=already`)
  }

  const { error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .update({ confirmed: true, confirmed_at: new Date().toISOString() })
    .eq('id', subscriber.id)

  if (error) {
    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=error`)
  }

  try {
    await sendWelcomeEmail(subscriber.email, subscriber.confirmation_token, origin)
  } catch (err) {
    console.error('[newsletter/confirm] welcome email failed', err)
  }

  return NextResponse.redirect(`${origin}/newsletter/confirmed?status=success`)
}
