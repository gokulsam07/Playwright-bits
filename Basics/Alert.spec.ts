import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import assert from 'assert';
import { channel } from 'diagnostics_channel';


test('alert test', async () => {
    test.setTimeout(120000);
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const cntxt : BrowserContext =  await browser.newContext();
    await cntxt.clearCookies();
    await cntxt.clearPermissions();
    const page: Page = await cntxt.newPage();
    await page.goto('http://10.194.42.241:8080/D2-Smartview');
    await page.waitForLoadState('domcontentloaded');
    await page.locator(".input-username").fill("previewuser");
    await page.locator(".input-password").fill("Password@1234567");
    await page.locator("select[aria-label='Select a repository']").selectOption({ value: 'testenv' });
    await page.locator(".login-btn.btn-submit").click();
  //  await page.waitForTimeout(15000)
  await page.route('**/*', route => {
    const url = route.request().url();
    const resourceType = route.request().resourceType();
    if ((resourceType=== 'fetch'|| resourceType==='xhr') && url.includes('ctfConfig.json')) {
      console.log(`Blocking request to: ${url}`);
      route.abort();  
    } else {
      route.continue();
    }
  });
  await page.waitForSelector("a[title='Profile Menu']");
    // await page.getByText("Prompt Alert").click();
    // await page.waitForTimeout(2000);
    await expect(page.locator("#myName")).toContainText("Hello world");
    // await page.waitForTimeout(1000);
    // await page.reload();
    // await page.waitForLoadState('domcontentloaded');
    // await page.getByText("Simple Alert").click(); // don't handle dialog twice
    // await browser.close();
});