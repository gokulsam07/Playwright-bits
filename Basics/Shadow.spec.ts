import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';

test('open shadow root test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://letcode.in/shadow');
    const frame = await page.locator("id=fname"); //open shadow root can be pierced directly
    await frame.fill('Gokul');
    await page.waitForTimeout(5000);
    await browser.close();
});


test('closed shadow root test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://letcode.in/shadow');
    await page.waitForLoadState(); //closed shadow root can't be piereced, use some workaround like this
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Saminathan');
    await page.waitForTimeout(5000);
    await browser.close();
});
