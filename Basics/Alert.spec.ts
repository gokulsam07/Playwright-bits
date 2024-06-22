import { test, expect, Browser, Page, chromium, Locator, Expect } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';


test('alert test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const page: Page = await browser.newPage();
    await page.goto('https://letcode.in/alert');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    page.on('dialog', dialog => {
        console.log(dialog.message()); //handle events before click
        dialog.accept("Hello world!");
    });
    await page.getByText("Prompt Alert").click();
    await page.waitForTimeout(2000);
    await expect(page.locator("#myName")).toContainText("Hello world");
    await page.waitForTimeout(1000);
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.getByText("Simple Alert").click(); // don't handle dialog twice
    await browser.close();
});