/**
 * @jest-environment node
 */

jest.mock('@/lib/email', () => ({
  __esModule: true,
  isEmailConfigured: jest.fn(() => true),
  sendContactEmail: jest.fn().mockResolvedValue(undefined),
}))

import { POST } from '@/app/api/contact/route'
import * as emailLib from '@/lib/email'

const sendContactEmail = emailLib.sendContactEmail as jest.MockedFunction<
  typeof emailLib.sendContactEmail
>
const isEmailConfigured = emailLib.isEmailConfigured as jest.MockedFunction<
  typeof emailLib.isEmailConfigured
>

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendContactEmail.mockClear()
    isEmailConfigured.mockReturnValue(true)
  })

  it('accepts a minimal valid payload and forwards it to sendContactEmail', async () => {
    const res = await POST(
      makeRequest({
        source: 'contact-page',
        name: 'Jane',
        email: 'jane@example.com',
        message: 'Hi there',
      })
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'jane@example.com',
        message: 'Hi there',
        name: 'Jane',
        source: 'contact-page',
      })
    )
  })

  it('passes every new optional qualification field through to the email layer', async () => {
    await POST(
      makeRequest({
        source: 'contact-page',
        email: 'jane@example.com',
        message: 'Hi',
        company: 'Acme',
        projectType: 'MVP / Prototype',
        budget: '$25k – $50k',
        timeline: '1–3 months',
      })
    )
    expect(sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        company: 'Acme',
        projectType: 'MVP / Prototype',
        budget: '$25k – $50k',
        timeline: '1–3 months',
      })
    )
  })

  it('coerces empty-string optional fields to undefined so they do not render in the email', async () => {
    await POST(
      makeRequest({
        source: 'contact-page',
        name: '',
        email: 'x@example.com',
        message: 'Hello',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
      })
    )
    const call = sendContactEmail.mock.calls[0]![0]
    expect(call.name).toBeUndefined()
    expect(call.company).toBeUndefined()
    expect(call.projectType).toBeUndefined()
    expect(call.budget).toBeUndefined()
    expect(call.timeline).toBeUndefined()
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(
      makeRequest({
        source: 'contact-page',
        message: 'Hi',
      })
    )
    expect(res.status).toBe(400)
    expect(sendContactEmail).not.toHaveBeenCalled()
  })

  it('returns 400 when email is malformed', async () => {
    const res = await POST(
      makeRequest({
        source: 'contact-page',
        email: 'not-an-email',
        message: 'Hi',
      })
    )
    expect(res.status).toBe(400)
    expect(sendContactEmail).not.toHaveBeenCalled()
  })

  it('returns 400 when budget is not one of the allowed enum values', async () => {
    const res = await POST(
      makeRequest({
        source: 'contact-page',
        email: 'x@example.com',
        message: 'Hi',
        budget: 'not-a-real-budget',
      })
    )
    expect(res.status).toBe(400)
    expect(sendContactEmail).not.toHaveBeenCalled()
  })

  it('rejects unknown keys because the schema is strict', async () => {
    const res = await POST(
      makeRequest({
        source: 'contact-page',
        email: 'x@example.com',
        message: 'Hi',
        hackerField: 'evil',
      })
    )
    expect(res.status).toBe(400)
    expect(sendContactEmail).not.toHaveBeenCalled()
  })

  it('returns 503 when email transport is not configured', async () => {
    isEmailConfigured.mockReturnValue(false)
    const res = await POST(
      makeRequest({
        source: 'contact-page',
        email: 'x@example.com',
        message: 'Hi',
      })
    )
    expect(res.status).toBe(503)
    expect(sendContactEmail).not.toHaveBeenCalled()
  })

  it('returns 400 for malformed JSON bodies', async () => {
    const res = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: 'not json',
      })
    )
    expect(res.status).toBe(400)
    expect(sendContactEmail).not.toHaveBeenCalled()
  })
})
