// import 'expect-puppeteer';

const baseUrl = 'https://localhost:3000';

describe('this should test the checkout flow', () => {
  it('should show the home page', async () => {
    await page.goto(`${baseUrl}/`);
    await expect(page).toMatch('Guts & Jannsen Interiors');
    expect(page.url()).toBe(`${baseUrl}/`);
  });
});
