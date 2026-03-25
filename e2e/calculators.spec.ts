import { test, expect } from '@playwright/test';

test.describe('Calculator Index', () => {
  test('lists all 10 calculators', async ({ page }) => {
    await page.goto('/calculators');
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toContainText('Financial Calculators');
    // Each calculator is an <a> linking to /calculators/<slug>
    const cards = page.locator('a[href^="/calculators/"]');
    await expect(cards).toHaveCount(10);
  });
});

test.describe('Mortgage Calculator', () => {
  test('renders with defaults, displays results and chart', async ({
    page,
  }) => {
    await page.goto('/calculators/mortgage-payment');
    // Verify page loads with title
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toContainText('Mortgage Payment Calculator');
    // Verify results panel exists
    await expect(page.getByLabel('Calculator results')).toBeVisible();
    // Verify a result card shows a currency value (monthly payment)
    const resultsSection = page.getByLabel('Calculator results');
    await expect(resultsSection).toContainText('$');
    // Verify chart renders (charts use role="img" with aria-label)
    await expect(
      page.locator('[role="img"][aria-label*="chart"]').first()
    ).toBeVisible();
  });

  test('URL state persists input values', async ({ page }) => {
    // Navigate with query params matching mortgage YAML urlKeys
    await page.goto(
      '/calculators/mortgage-payment?price=500000&rate=7&term=15'
    );
    // Wait for results to compute
    await page.waitForTimeout(500);
    // Verify the URL params are reflected
    const url = page.url();
    expect(url).toContain('price=500000');
    expect(url).toContain('rate=7');
    expect(url).toContain('term=15');
  });

  test('comparison mode toggles via switch', async ({ page }) => {
    await page.goto('/calculators/mortgage-payment');
    // Toggle comparison mode via the visible switch (desktop layout renders two
    // ScenarioToggle instances; use first visible match at default 1280px viewport)
    const compareSwitch = page
      .getByLabel('Compare two scenarios')
      .first();
    await compareSwitch.click();
    // Wait for comparison UI to update
    await page.waitForTimeout(300);
    // Verify URL has compare=true
    expect(page.url()).toContain('compare=true');
  });
});

test.describe('Budget Calculator', () => {
  test('shows 50/30/20 split for $7,000 income', async ({ page }) => {
    await page.goto('/calculators/budget');
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toContainText('Budget Calculator');
    // Default income is $7,000 -- verify results show 3500/2100/1400 split
    const resultsSection = page.getByLabel('Calculator results');
    await expect(resultsSection).toContainText('$3,500');
    await expect(resultsSection).toContainText('$2,100');
    await expect(resultsSection).toContainText('$1,400');
  });
});

test.describe('All calculators load', () => {
  const slugs = [
    'mortgage-payment',
    'rent-affordability',
    'compound-interest',
    'loan-repayment',
    'savings-goal',
    'retirement',
    'budget',
    'tax-estimator',
    'rent-vs-buy',
    'student-loan',
  ];

  for (const slug of slugs) {
    test(`/calculators/${slug} returns 200 and renders`, async ({ page }) => {
      const response = await page.goto(`/calculators/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByLabel('Calculator results')).toBeVisible();
    });
  }
});
