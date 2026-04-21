import { test, expect } from '@playwright/test'

test.describe('Newsletter form validation and submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home')
    await page.waitForLoadState('domcontentloaded')
    // Scroll newsletter section into view
    await page.locator('[data-testid="newsletter-section"]').scrollIntoViewIfNeeded()
  })

  test('shows validation error when submitting with empty email', async ({ page }) => {
    await page.locator('[data-testid="newsletter-submit"]').click()
    const errorMsg = page.locator('[role="alert"]')
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toContainText('Please enter a valid email address.')
  })

  test('shows validation error when submitting with invalid email', async ({ page }) => {
    await page.locator('[data-testid="newsletter-email-input"]').fill('not-an-email')
    await page.locator('[data-testid="newsletter-submit"]').click()
    const errorMsg = page.locator('[role="alert"]')
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toContainText('Please enter a valid email address.')
  })

  test('shows success state after valid email submission with mocked API', async ({ page }) => {
    // Mock /api/contact to return 200 so the component reaches setSubmitted(true)
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    await page.locator('[data-testid="newsletter-email-input"]').fill('test@example.com')
    await page.locator('[data-testid="newsletter-submit"]').click()

    // Success state renders with aria-live="polite" region
    const successRegion = page.locator('[aria-live="polite"]')
    await expect(successRegion).toBeVisible({ timeout: 5000 })
    await expect(successRegion).toContainText("You're in")
  })
})
