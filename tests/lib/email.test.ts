/**
 * @jest-environment node
 */

// SMTP env must be set before the email module loads, since the transporter is
// built at module-init. `jest.mock` is hoisted above `import`, but plain env
// assignments are not — so we set env first and then `require` the module
// inside the test scope.
process.env.SMTP_HOST = 'smtp.example.com'
process.env.SMTP_USER = 'noreply@example.com'
process.env.SMTP_PASS = 'secret'
process.env.CONTACT_FORWARD_TO = 'leads@example.com'
process.env.CONTACT_FROM_EMAIL = 'noreply@example.com'

const sendMailMock = jest.fn().mockResolvedValue({})

jest.mock('nodemailer', () => {
  const createTransport = jest.fn(() => ({ sendMail: sendMailMock }))
  return {
    __esModule: true,
    default: { createTransport },
    createTransport,
  }
})

type EmailModule = typeof import('@/lib/email')
let emailModule: EmailModule

beforeAll(() => {
  emailModule = require('@/lib/email') as EmailModule
})

describe('sendContactEmail', () => {
  beforeEach(() => {
    sendMailMock.mockClear()
  })

  it('reports email as configured when SMTP env is present', () => {
    expect(emailModule.isEmailConfigured()).toBe(true)
  })

  it('sends a minimal payload with only required fields', async () => {
    await emailModule.sendContactEmail({
      email: 'lead@example.com',
      message: 'Hello there',
      source: 'contact-page',
    })

    expect(sendMailMock).toHaveBeenCalledTimes(1)
    const call = sendMailMock.mock.calls[0][0]
    expect(call.to).toBe('leads@example.com')
    expect(call.replyTo).toBe('lead@example.com')
    expect(call.subject).toBe('DevX Website Inquiry (Contact Page)')
    expect(call.text).toContain('Email: lead@example.com')
    expect(call.text).toContain('Hello there')
    // Optional sections must not leak when undefined.
    expect(call.text).not.toContain('Company:')
    expect(call.text).not.toContain('Budget:')
    expect(call.html).not.toContain('Project Type')
  })

  it('includes every optional qualification field when provided', async () => {
    await emailModule.sendContactEmail({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Scope: new SaaS',
      source: 'contact-page',
      company: 'Acme Inc',
      projectType: 'MVP / Prototype',
      budget: '$25k – $50k',
      timeline: '1–3 months',
    })

    const call = sendMailMock.mock.calls[0][0]
    expect(call.text).toContain('Name: Jane')
    expect(call.text).toContain('Company: Acme Inc')
    expect(call.text).toContain('Project Type: MVP / Prototype')
    expect(call.text).toContain('Budget: $25k – $50k')
    expect(call.text).toContain('Timeline: 1–3 months')
    expect(call.html).toContain('Acme Inc')
    expect(call.html).toContain('MVP / Prototype')
    expect(call.html).toContain('$25k – $50k')
    expect(call.html).toContain('1–3 months')
  })

  it('escapes HTML in user-supplied fields to prevent injection into the email body', async () => {
    await emailModule.sendContactEmail({
      name: 'Bob <b>',
      email: 'x@example.com',
      message: '<script>alert(1)</script>',
      source: 'contact-page',
      company: 'Acme & Co',
    })

    const call = sendMailMock.mock.calls[0][0]
    expect(call.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
    expect(call.html).toContain('Bob &lt;b&gt;')
    expect(call.html).toContain('Acme &amp; Co')
    expect(call.html).not.toMatch(/<script>alert\(1\)<\/script>/)
  })
})
