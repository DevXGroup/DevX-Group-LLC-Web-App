import { test, expect } from '@playwright/test'

test.describe('Contact form submit happy path', () => {
  test('valid submission redirects to /contact/thank-you', async ({ page }) => {
    // Mock the API so the test never sends real mail and doesn't depend on
    // SMTP env. The wiring we want to verify is the frontend path:
    // form → handleSubmit → router.push('/contact/thank-you').
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    })

    await page.goto('/contact')
    await page.waitForLoadState('domcontentloaded')

    await page.getByLabel('Your Name').fill('Jane Doe')
    await page.getByLabel('Email Address').fill('jane@example.com')
    await page
      .getByLabel('Your Message')
      .fill('I would love to work with your team on a new SaaS product.')

    await page.getByRole('button', { name: /send message/i }).click()

    await page.waitForURL('**/contact/thank-you', { timeout: 15_000 })
    await expect(page).toHaveURL(/\/contact\/thank-you$/)
    await expect(page.getByRole('heading', { name: /message received/i })).toBeVisible()
  })

  test('submitting with an empty required field does not navigate away', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('domcontentloaded')

    // Leave name blank, fill only email + message.
    await page.getByLabel('Email Address').fill('jane@example.com')
    await page.getByLabel('Your Message').fill('Some message')

    await page.getByRole('button', { name: /send message/i }).click()

    // We should still be on /contact after ~1s — the client-side validation
    // should block the submission.
    await page.waitForTimeout(500)
    await expect(page).toHaveURL(/\/contact(\?|$)/)
  })
})
