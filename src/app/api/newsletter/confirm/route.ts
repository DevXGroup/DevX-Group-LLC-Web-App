import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/newsletter-email'

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin
  const token = req.nextUrl.searchParams.get('token')

  if (!token || !isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=invalid`)
  }

  try {
    const { data: subscriber, error: selectError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, email, confirmed, confirmation_token')
      .eq('confirmation_token', token)
      .maybeSingle()

    if (selectError) {
      console.error('[newsletter/confirm] select failed', selectError)
      return NextResponse.redirect(`${origin}/newsletter/confirmed?status=error`)
    }

    if (!subscriber) {
      return NextResponse.redirect(`${origin}/newsletter/confirmed?status=invalid`)
    }

    if (subscriber.confirmed) {
      return NextResponse.redirect(`${origin}/newsletter/confirmed?status=already`)
    }

    const { error: updateError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .update({ confirmed: true, confirmed_at: new Date().toISOString() })
      .eq('id', subscriber.id)

    if (updateError) {
      console.error('[newsletter/confirm] update failed', updateError)
      return NextResponse.redirect(`${origin}/newsletter/confirmed?status=error`)
    }

    try {
      await sendWelcomeEmail(subscriber.email, subscriber.confirmation_token, origin)
    } catch (err) {
      console.error('[newsletter/confirm] welcome email failed', err)
    }

    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=success`)
  } catch (err) {
    console.error('[newsletter/confirm] unexpected failure', err)
    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=error`)
  }
}
