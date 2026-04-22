import { test, expect } from '@playwright/test'

test.describe('Home page sections visibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home')
    // Wait for the page to hydrate before interacting
    await page.waitForLoadState('domcontentloaded')
  })

  test('TrustedBy section is visible after scrolling', async ({ page }) => {
    const section = page.locator('[data-testid="trusted-by-section"]')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()
  })

  test('Testimonials section is visible after scrolling', async ({ page }) => {
    const section = page.locator('[data-testid="testimonials-section"]')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()
  })

  test('Newsletter section is visible after scrolling', async ({ page }) => {
    const section = page.locator('[data-testid="newsletter-section"]')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()
  })

  test('Newsletter email input is present and accepts text input', async ({ page }) => {
    const emailInput = page.locator('[data-testid="newsletter-email-input"]')
    await emailInput.scrollIntoViewIfNeeded()
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toBeEnabled()
    await emailInput.fill('user@example.com')
    await expect(emailInput).toHaveValue('user@example.com')
  })
})
