import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/newsletter-email'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.devxgroup.io'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token || !isSupabaseConfigured()) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=invalid`)
  }

  const { data: subscriber } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('id, email, confirmed, confirmation_token')
    .eq('confirmation_token', token)
    .maybeSingle()

  if (!subscriber) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=invalid`)
  }

  if (subscriber.confirmed) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=already`)
  }

  const { error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .update({ confirmed: true, confirmed_at: new Date().toISOString() })
    .eq('id', subscriber.id)

  if (error) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=error`)
  }

  await sendWelcomeEmail(subscriber.email, subscriber.confirmation_token)

  return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=success`)
}
