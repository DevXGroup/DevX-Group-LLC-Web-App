import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin
  const token = req.nextUrl.searchParams.get('token')

  if (!token || !isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=invalid`)
  }

  try {
    const { data: subscriber, error: selectError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, unsubscribed_at')
      .eq('confirmation_token', token)
      .maybeSingle()

    if (selectError) {
      console.error('[newsletter/unsubscribe] select failed', selectError)
      return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=invalid`)
    }

    if (!subscriber) {
      return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=invalid`)
    }

    if (subscriber.unsubscribed_at) {
      return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=already`)
    }

    const { error: updateError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('id', subscriber.id)

    if (updateError) {
      console.error('[newsletter/unsubscribe] update failed', updateError)
      return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=invalid`)
    }

    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=success`)
  } catch (err) {
    console.error('[newsletter/unsubscribe] unexpected failure', err)
    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=invalid`)
  }
}
