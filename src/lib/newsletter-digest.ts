import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin } from './supabase'
import { sendDigestEmail, type DigestCategory } from './newsletter-email'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY
const SITE_URL = process.env.NEWSLETTER_SITE_URL ?? 'https://www.devxgroup.io'

const EMAIL_FONT = `'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`

const CATEGORY_ICON_SVG: Record<string, string> = {
  'Model Releases': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>`,
  'Developer Tools': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  Research: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  'Cloud and Infrastructure': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  'Community Picks': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#4CD787" stroke="#4CD787" stroke-width="0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
}

const DEFAULT_CATEGORY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

interface FirecrawlResult {
  url: string
  title?: string
  description?: string
  metadata?: { title?: string; description?: string }
}

interface RawArticle {
  title: string
  description: string
  url: string
}

interface DigestPayload {
  subject: string
  categories: DigestCategory[]
}

async function searchFirecrawl(query: string, limit = 8): Promise<RawArticle[]> {
  if (!FIRECRAWL_API_KEY) return []

  const res = await fetch('https://api.firecrawl.dev/v1/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
    },
    body: JSON.stringify({ query, limit }),
  })

  if (!res.ok) {
    console.error(`[Firecrawl] ${res.status} for query "${query}":`, await res.text())
    return []
  }

  const json = await res.json()
  const results: FirecrawlResult[] = json.data ?? []

  return results
    .filter((r) => r.url && (r.title ?? r.metadata?.title))
    .map((r) => ({
      title: r.title ?? r.metadata?.title ?? '',
      description: r.description ?? r.metadata?.description ?? '',
      url: r.url,
    }))
}

async function fetchNews(): Promise<RawArticle[]> {
  const queries = [
    'new AI model released developer',
    'LLM framework tool release open source',
    'AI research paper practical application',
    'cloud AI developer features announcement',
  ]

  const results = await Promise.all(queries.map((q) => searchFirecrawl(q, 6)))
  const flat = results.flat()

  // Deduplicate by domain (max 2 per domain)
  const domainCount = new Map<string, number>()
  const seen = new Set<string>()
  const deduped: RawArticle[] = []

  for (const article of flat) {
    try {
      const domain = new URL(article.url).hostname
      if (seen.has(article.url)) continue
      if ((domainCount.get(domain) ?? 0) >= 2) continue
      seen.add(article.url)
      domainCount.set(domain, (domainCount.get(domain) ?? 0) + 1)
      deduped.push(article)
    } catch {
      // skip malformed URLs
    }
  }

  return deduped.slice(0, 24)
}

async function generateDigest(articles: RawArticle[]): Promise<DigestPayload> {
  const now = new Date()
  const dateLabel = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const prompt = `You are a technical newsletter curator for DevX, a group of software engineers building AI products.

Given these articles, select 5 to 7 of the most interesting and useful ones for engineers shipping AI products. Skip marketing fluff, funding announcements, job posts, and opinion pieces without concrete takeaways. Prioritize: new model releases, new developer tools, research with code, cloud AI features, and practical techniques.

Return ONLY valid JSON in this exact format with no extra text:
{
  "subject": "DevX Weekly — ${dateLabel}",
  "categories": [
    {
      "name": "Category Name",
      "items": [
        {
          "title": "Short punchy title, 5 to 8 words",
          "description": "One sentence. Direct. What it does and why it matters. No hyphens used as a dash.",
          "url": "https://..."
        }
      ]
    }
  ]
}

Use only these category names (skip any with no items): Model Releases, Developer Tools, Research, Cloud and Infrastructure, Community Picks

Articles to evaluate:
${JSON.stringify(articles, null, 2)}`

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0]?.type === 'text' ? message.content[0].text : ''

  try {
    const parsed = JSON.parse(text.trim()) as DigestPayload
    return parsed
  } catch {
    // Fallback: extract JSON block if Claude wrapped it in markdown
    const match = text.match(/```(?:json)?\s*([\s\S]+?)```/)
    if (match?.[1]) {
      return JSON.parse(match[1].trim()) as DigestPayload
    }
    throw new Error('Failed to parse digest JSON from Claude response')
  }
}

export async function buildDigest(): Promise<{
  subject: string
  categories: DigestCategory[]
  dateLabel: string
}> {
  const articles = await fetchNews()
  if (articles.length === 0) throw new Error('No articles fetched from Firecrawl')

  const payload = await generateDigest(articles)

  const dateLabel = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return { subject: payload.subject, categories: payload.categories, dateLabel }
}

export async function sendDigest(
  subject: string,
  categories: DigestCategory[],
  dateLabel: string
): Promise<number> {
  const { data: subscribers, error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('email, confirmation_token')
    .eq('confirmed', true)
    .is('unsubscribed_at', null)

  if (error) throw new Error(`Failed to fetch subscribers: ${error.message}`)
  if (!subscribers || subscribers.length === 0) return 0

  // Send to all subscribers concurrently (batched to avoid rate limits)
  const BATCH_SIZE = 10
  let sent = 0

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE)
    await Promise.all(
      batch.map((sub) =>
        sendDigestEmail(sub.email, sub.confirmation_token, subject, categories, dateLabel).catch(
          (err) => console.error(`Failed to send to ${sub.email}:`, err)
        )
      )
    )
    sent += batch.length
  }

  return sent
}

export function buildPreviewHtml(
  subject: string,
  categories: DigestCategory[],
  dateLabel: string
): string {
  // Build a preview HTML by sending to a dummy address and capturing the template
  // (Re-use the same template logic by constructing it inline here for preview)
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=preview`

  const categorySections = categories
    .map((cat) => {
      const iconSrc = svgToDataUri(CATEGORY_ICON_SVG[cat.name] ?? DEFAULT_CATEGORY_ICON)
      const count = cat.items.length
      return `
      <tr>
        <td style="padding:32px 40px 0">
          <table cellpadding="0" cellspacing="0" style="margin-bottom:20px">
            <tr>
              <td style="vertical-align:middle;padding-right:14px">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="44" height="44" style="width:44px;height:44px;background:#0c1e13;border:1px solid #1c3f27;border-radius:11px;text-align:center;vertical-align:middle">
                      <img src="${iconSrc}" width="22" height="22" alt="" style="display:block;margin:11px auto">
                    </td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align:middle">
                <span style="display:block;color:#4CD787;font-size:11px;font-family:monospace;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;margin-bottom:3px">${cat.name}</span>
                <span style="color:#3f3f46;font-size:12px;font-family:${EMAIL_FONT}">${count} article${count > 1 ? 's' : ''} this week</span>
              </td>
            </tr>
          </table>
          ${cat.items
            .map(
              (item) => `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;border-radius:10px;overflow:hidden">
            <tr>
              <td width="3" style="background:#4CD787;width:3px;min-width:3px;line-height:1;font-size:0">&nbsp;</td>
              <td style="background:#161618;padding:18px 20px 16px 18px">
                <a href="${item.url}" style="display:block;color:#f4f4f5;font-weight:700;font-size:16px;font-family:${EMAIL_FONT};text-decoration:none;line-height:1.4;margin-bottom:8px">${item.title}</a>
                <p style="margin:0 0 14px;color:#a1a1aa;font-size:14px;font-family:${EMAIL_FONT};line-height:1.65">${item.description}</p>
                <a href="${item.url}" style="display:inline-block;color:#4CD787;font-size:12px;font-family:${EMAIL_FONT};font-weight:600;text-decoration:none;background:#0c1e13;border:1px solid #1c3f27;padding:5px 12px;border-radius:6px">Read more &rarr;</a>
              </td>
            </tr>
          </table>`
            )
            .join('')}
        </td>
      </tr>`
    })
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:${EMAIL_FONT}">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:32px 0 48px">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%">

        <tr>
          <td style="background:#4CD787;height:3px;border-radius:3px 3px 0 0;line-height:3px;font-size:0">&nbsp;</td>
        </tr>

        <tr>
          <td style="background:#111113;border:1px solid #1f1f23;border-top:none;border-radius:0 0 16px 16px;overflow:hidden">
            <table width="100%" cellpadding="0" cellspacing="0">

              <tr>
                <td style="padding:24px 40px">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td><span style="color:#4CD787;font-size:12px;font-family:monospace;letter-spacing:0.14em;text-transform:uppercase;font-weight:700">DevX Group LLC</span></td>
                      <td align="right"><span style="color:#3f3f46;font-size:12px;font-family:${EMAIL_FONT}">${dateLabel}</span></td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr><td style="padding:0 40px"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#1f1f23;height:1px;line-height:1px;font-size:0">&nbsp;</td></tr></table></td></tr>

              <tr>
                <td style="padding:36px 40px 32px">
                  <p style="margin:0 0 10px;color:#4CD787;font-size:10px;font-family:monospace;letter-spacing:0.18em;text-transform:uppercase;font-weight:600">Weekly Intelligence Brief</p>
                  <h1 style="margin:0 0 14px;font-size:30px;font-weight:800;color:#ffffff;font-family:${EMAIL_FONT};line-height:1.15;letter-spacing:-0.025em">This week in AI<br>and dev</h1>
                  <p style="margin:0;color:#71717a;font-size:15px;font-family:${EMAIL_FONT};line-height:1.6;max-width:420px">Hand-curated from the frontier — model drops, new tools, and research worth shipping.</p>
                </td>
              </tr>

              <tr><td style="padding:0 40px"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#1f1f23;height:1px;line-height:1px;font-size:0">&nbsp;</td></tr></table></td></tr>

              ${categorySections}

              <tr><td style="padding:32px 40px 0"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#1f1f23;height:1px;line-height:1px;font-size:0">&nbsp;</td></tr></table></td></tr>

              <tr>
                <td style="padding:24px 40px 28px">
                  <p style="margin:0;color:#3f3f46;font-size:12px;font-family:${EMAIL_FONT};line-height:1.7">
                    No spam.&ensp;<a href="${unsubscribeUrl}" style="color:#52525b;text-decoration:underline">Unsubscribe</a> anytime.&ensp;DevX Group LLC &middot; <a href="https://www.devxgroup.io" style="color:#52525b;text-decoration:underline">devxgroup.io</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
