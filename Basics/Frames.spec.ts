import { test, expect, Browser, BrowserContext, Page, chromium, Locator, Expect } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';


test('frames test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://letcode.in/frame');
    await page.waitForLoadState();
    const frame1 = await page.frameLocator('#firstFr');
    await frame1?.locator("css=input[placeholder='Enter name']").fill("Gokul");
    const frame2 = await frame1.frameLocator("//iframe[@class='has-background-white']");
    await frame2?.locator("css=input[placeholder='Enter email']").fill("gokuls2381@gmail.com");
    await frame1?.locator("css=input[placeholder='Enter email']").fill("Saminathan");
    await page.waitForTimeout(3000); 
});