import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin
  const token = req.nextUrl.searchParams.get('token')

  if (!token || !isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=invalid`)
  }

  const { data: subscriber } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('id, unsubscribed_at')
    .eq('confirmation_token', token)
    .maybeSingle()

  if (!subscriber) {
    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=invalid`)
  }

  if (subscriber.unsubscribed_at) {
    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=already`)
  }

  await supabaseAdmin
    .from('newsletter_subscribers')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('id', subscriber.id)

  return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=success`)
}
