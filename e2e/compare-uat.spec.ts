import { test, expect } from '@playwright/test';

// Uses baseURL from playwright config

test.describe('Phase 4 UAT: Comparison Pages', () => {

  test('1. Compare index shows 4 category cards with counts', async ({ page }) => {
    await page.goto('/compare');
    // Each category should have a link
    for (const href of ['credit-cards', 'personal-loans', 'savings-accounts', 'insurance']) {
      await expect(page.locator(`a[href="/compare/${href}"]`)).toBeVisible();
    }
    // Product counts should show "12 products"
    await expect(page.getByText('12 products')).toHaveCount(4);
  });

  test('2. Product strips render with key elements', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/compare/credit-cards');
    // Should have 12 checkboxes (one per product strip)
    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(12);
    // Product name links should be visible in desktop strips
    await expect(page.getByRole('link', { name: 'Chase Sapphire Preferred Card' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Citi Double Cash Card' }).first()).toBeVisible();
  });

  test('3. Strip expand/collapse shows details', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/compare/credit-cards');
    await page.waitForTimeout(1000);
    // Click first collapsible trigger to expand
    const firstTrigger = page.locator('[data-slot="collapsible-trigger"]').first();
    await firstTrigger.click();
    // Collapsible content appears dynamically after click
    const detailPanel = page.locator('[data-slot="collapsible-content"]').first();
    await expect(detailPanel).toBeVisible({ timeout: 5000 });
    // Click again to collapse
    await firstTrigger.click();
    await expect(detailPanel).not.toBeVisible({ timeout: 5000 });
  });

  test('4. Compare panel appears when 2+ checkboxes selected', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/compare/credit-cards');
    await page.waitForTimeout(1000);
    // Click first two checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(0).click({ force: true });
    await page.waitForTimeout(300);
    await checkboxes.nth(1).click({ force: true });
    await page.waitForTimeout(500);
    // Compare panel should appear with "Compare (2)"
    await expect(page.getByText('Compare (2)')).toBeVisible({ timeout: 5000 });
    // Close button should dismiss the panel
    const closeButton = page.locator('[role="complementary"] button').first();
    await closeButton.click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Compare (')).not.toBeVisible({ timeout: 3000 });
  });

  test('5. Filter chips filter products and update URL', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/compare/credit-cards');
    await page.waitForTimeout(1000);
    // Click "Cash Back" filter chip
    await page.getByRole('button', { name: 'Cash Back', exact: true }).click();
    await page.waitForTimeout(1000);
    // URL should have filter param
    expect(page.url()).toContain('rewards=cash-back');
    // Should show fewer products
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    expect(count).toBeLessThan(12);
    expect(count).toBeGreaterThan(0);
    // Click "All" to reset
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await page.waitForTimeout(1000);
    await expect(checkboxes).toHaveCount(12);
  });

  test('6. Mobile view shows cards, hides strips', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/compare/credit-cards');
    // Strips should be hidden (lg:block means hidden on mobile)
    const strips = page.locator('[data-slot="collapsible-trigger"]');
    await expect(strips.first()).not.toBeVisible();
    // Mobile product cards should be visible
    const mobileCards = page.locator('[data-slot="card"]');
    expect(await mobileCards.count()).toBeGreaterThan(0);
  });

  test('7. /go/ redirect works with UTM params', async ({ page }) => {
    await page.goto('/go/chase-sapphire-preferred');
    // Should have redirected to Chase's site with UTM params
    expect(page.url()).toContain('creditcards.chase.com');
    expect(page.url()).toContain('utm_source=walletwaypoint');
    expect(page.url()).toContain('utm_medium=comparison_table');
  });

  test('8. Affiliate disclosure appears above fold', async ({ page }) => {
    await page.goto('/compare/credit-cards');
    const disclosure = page.getByText(/Disclosure:/i);
    await expect(disclosure).toBeVisible();
    const box = await disclosure.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeLessThan(600);
  });

  test('9. Company logos render for non-credit-card categories', async ({ page }) => {
    await page.goto('/compare/personal-loans');
    const loanLogos = page.locator('img[alt*="logo"]');
    expect(await loanLogos.count()).toBeGreaterThanOrEqual(10);

    await page.goto('/compare/insurance');
    const insuranceLogos = page.locator('img[alt*="logo"]');
    expect(await insuranceLogos.count()).toBeGreaterThanOrEqual(8);
  });

  test('10. How We Rank page with cross-links', async ({ page }) => {
    await page.goto('/how-we-rank');
    await expect(page.getByText('Our Independence Promise')).toBeVisible();
    await expect(page.getByText('How We Rank Credit Cards')).toBeVisible();
    await expect(page.locator('a[href="/editorial-standards"]').first()).toBeVisible();
    await expect(page.locator('a[href="/compare"]').first()).toBeVisible();
  });
});
