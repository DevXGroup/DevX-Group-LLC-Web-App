import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isEmailConfigured, sendContactEmail } from '@/lib/email'

export const runtime = 'nodejs'

const contactSchema = z
  .object({
    source: z.enum(['footer', 'contact-page', 'unknown']).default('unknown'),
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(120, 'Name is too long')
      .optional()
      .or(z.literal('').transform(() => undefined)),
    email: z
      .string({ message: 'Email is required' })
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email'),
    message: z
      .string({ message: 'Message is required' })
      .trim()
      .min(1, 'Message is required')
      .max(5000, 'Message is too long'),
    company: z
      .string()
      .trim()
      .max(160)
      .optional()
      .or(z.literal('').transform(() => undefined)),
    projectType: z
      .enum([
        'Web App',
        'Mobile App',
        'AI / Automation',
        'MVP / Prototype',
        'Enterprise Software',
        'Other',
      ])
      .optional()
      .or(z.literal('').transform(() => undefined)),
    budget: z
      .enum(['Under $10k', '$10k – $25k', '$25k – $50k', '$50k – $100k', '$100k+', 'Not sure yet'])
      .optional()
      .or(z.literal('').transform(() => undefined)),
    timeline: z
      .enum(['ASAP', '1–3 months', '3–6 months', '6+ months', 'Flexible'])
      .optional()
      .or(z.literal('').transform(() => undefined)),
  })
  .strict()

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid JSON payload',
      },
      { status: 400 }
    )
  }

  const parsed = contactSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message: 'Email service is not configured. Please try again later.',
      },
      { status: 503 }
    )
  }

  try {
    const contactPayload = {
      email: parsed.data.email,
      message: parsed.data.message,
      source: parsed.data.source,
      ...(parsed.data.name ? { name: parsed.data.name } : {}),
      ...(parsed.data.company ? { company: parsed.data.company } : {}),
      ...(parsed.data.projectType ? { projectType: parsed.data.projectType } : {}),
      ...(parsed.data.budget ? { budget: parsed.data.budget } : {}),
      ...(parsed.data.timeline ? { timeline: parsed.data.timeline } : {}),
    }

    await sendContactEmail(contactPayload)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send contact email', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    )
  }
}
