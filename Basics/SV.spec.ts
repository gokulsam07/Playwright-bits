
import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';
import path from 'path';
test('file chooser test', async () => {
    test.setTimeout(120000);
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://10.194.42.241:8080/D2-Smartview/ui/#d2/nodes/0b0000018002d8e6');
    await page.getByPlaceholder('User name').fill('previewuser');
    await page.getByPlaceholder('Password').fill('Password@1234567');
    await page.selectOption("//select[@aria-label='Select a repository']", 'testenv');
    await page.locator('css=.login-btn.btn-submit').click();
    await page.waitForLoadState();
    await page.waitForTimeout(45000);
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByText('Add version').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join("C:/Documentum/Files", 'Sherlock.pdf'));
    await page.waitForTimeout(15000);
    await page.keyboard.press('Escape')
});