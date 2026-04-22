import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('[newsletter-email] RESEND_API_KEY is not set.')
    _resend = new Resend(key)
  }
  return _resend
}

const SITE_URL = process.env.NEWSLETTER_SITE_URL ?? 'https://www.devxgroup.io'
// Use verified domain address once DNS is set up in Resend. Until then, onboarding@resend.dev works for testing.
const FROM_ADDRESS = process.env.NEWSLETTER_FROM_EMAIL ?? 'DevX Group LLC <onboarding@resend.dev>'

const EMAIL_FONT = `'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`

const CATEGORY_ICON_SVG: Record<string, string> = {
  'Model Releases': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>`,
  'Developer Tools': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  Research: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  'Cloud and Infrastructure': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  'Community Picks': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#4CD787" stroke="#4CD787" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
}

const DEFAULT_CATEGORY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CD787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

async function send(options: {
  to: string
  subject: string
  text: string
  html: string
}): Promise<void> {
  const { error } = await getResend().emails.send({
    from: FROM_ADDRESS,
    ...options,
  })
  if (error) throw new Error(`Resend error: ${error.message}`)
}

export async function sendConfirmationEmail(email: string, token: string): Promise<void> {
  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${token}`

  await send({
    to: email,
    subject: 'Confirm your DevX Group LLC Newsletter subscription',
    text: [
      'Hi there,',
      '',
      "One quick step to complete your subscription to the DevX Weekly Newsletter — the shortest, most actionable AI & dev digest you'll find.",
      '',
      `Confirm here: ${confirmUrl}`,
      '',
      "This link expires in 48 hours. If you didn't sign up, just ignore this email.",
      '',
      '— Max & the DevX Group LLC team',
    ].join('\n'),
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <title>Confirm your DevX Group LLC Newsletter subscription</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:${EMAIL_FONT};color:#e4e4e7">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111113;border:1px solid #27272a;border-radius:12px;overflow:hidden;max-width:600px;width:100%">
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #27272a">
            <span style="color:#4CD787;font-size:14px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;font-weight:600">DevX Group LLC &mdash; Newsletter</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px">
            <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#ffffff;font-family:${EMAIL_FONT};line-height:1.3">Confirm your subscription</h1>
            <p style="margin:0 0 24px;color:#a1a1aa;font-size:15px;font-family:${EMAIL_FONT};line-height:1.65">
              One click and you're in. Every Friday you'll get the shortest, most actionable AI and dev insights — real patterns from shipping products, agentic workflows, and MVPs.
            </p>
            <a href="${confirmUrl}"
              style="display:inline-block;background:#4CD787;color:#000000;text-decoration:none;font-weight:700;font-size:15px;font-family:${EMAIL_FONT};padding:14px 28px;border-radius:8px;letter-spacing:0.01em">
              Confirm Subscription
            </a>
            <p style="margin:24px 0 0;color:#71717a;font-size:13px;font-family:${EMAIL_FONT};line-height:1.5">
              Or copy this link: <span style="color:#4CD787;word-break:break-all">${confirmUrl}</span><br>
              Link expires in 48 hours. If you didn't sign up, ignore this.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #27272a">
            <p style="margin:0;color:#52525b;font-size:12px;font-family:${EMAIL_FONT};line-height:1.7">No spam. Unsubscribe anytime. DevX Group LLC &middot; <a href="https://www.devxgroup.io" style="color:#71717a;text-decoration:underline">devxgroup.io</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}

export async function sendWelcomeEmail(email: string, unsubscribeToken: string): Promise<void> {
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}`

  await send({
    to: email,
    subject: "You're subscribed to DevX Group LLC Newsletter",
    text: [
      "You're in.",
      '',
      'Every Friday you get the shortest, most actionable AI and dev digest around.',
      'Real patterns from shipping AI products, agentic workflows, and MVPs — not fluff, not hype.',
      '',
      "Look out for your first issue this Friday. We'll see you there.",
      '',
      '— Max & the DevX Group LLC team',
      '',
      `Unsubscribe: ${unsubscribeUrl}`,
    ].join('\n'),
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <title>You're subscribed to DevX Group LLC Newsletter</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:${EMAIL_FONT};color:#e4e4e7">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111113;border:1px solid #27272a;border-radius:12px;overflow:hidden;max-width:600px;width:100%">
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #27272a">
            <span style="color:#4CD787;font-size:14px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;font-weight:600">DevX Group LLC &mdash; Newsletter</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px">
            <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#ffffff;font-family:${EMAIL_FONT}">You're subscribed.</h1>
            <p style="margin:0 0 16px;color:#a1a1aa;font-size:15px;font-family:${EMAIL_FONT};line-height:1.65">
              Every Friday you get the shortest, most actionable AI and dev digest around. Real patterns from shipping AI products, agentic workflows, and MVPs. Not fluff.
            </p>
            <p style="margin:0;color:#a1a1aa;font-size:15px;font-family:${EMAIL_FONT};line-height:1.65">
              Look out for your first issue. See you Friday.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #27272a">
            <p style="margin:0;color:#52525b;font-size:12px;font-family:${EMAIL_FONT};line-height:1.7">
              No spam. <a href="${unsubscribeUrl}" style="color:#52525b">Unsubscribe</a> anytime. DevX Group LLC &middot; <a href="https://www.devxgroup.io" style="color:#71717a;text-decoration:underline">devxgroup.io</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}

export interface DigestItem {
  title: string
  description: string
  url: string
}

export interface DigestCategory {
  name: string
  items: DigestItem[]
}

export async function sendDigestEmail(
  email: string,
  unsubscribeToken: string,
  subject: string,
  categories: DigestCategory[],
  dateLabel: string
): Promise<void> {
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}`

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

  const html = `
<!DOCTYPE html>
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

  const textLines = [
    `DevX Group LLC Newsletter — ${dateLabel}`,
    'This week in AI and dev',
    '',
    ...categories.flatMap((cat) => [
      `[${cat.name}]`,
      ...cat.items.map((item) => `${item.title}\n${item.description}\n${item.url}`),
      '',
    ]),
    `Unsubscribe: ${unsubscribeUrl}`,
  ]

  await send({ to: email, subject, text: textLines.join('\n'), html })
}
