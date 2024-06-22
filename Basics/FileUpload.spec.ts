import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';
import path from 'path';

test('file upload test single', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://cgi-lib.berkeley.edu/ex/fup.html');
    await page.locator("css=input[name='upfile']").setInputFiles("C:/Documentum/Files/1.bmp")
    await page.waitForTimeout(5000);
    await browser.close();
});


test('file upload test mutliple', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await page.locator("css=#filesToUpload").setInputFiles([path.join("C:/Documentum/Files/1.bmp"),path.join("C:/Documentum/Files/Sherlock.pdf")])
    await page.waitForTimeout(5000);
    await browser.close();
});