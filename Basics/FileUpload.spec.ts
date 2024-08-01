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

test('d2sv non input file tag upload',async()=>{
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://10.194.42.241:8080/D2-Smartview/ui/#d2/nodes/0c0000018001ed91');
    await page.waitForLoadState('domcontentloaded');
    await page.locator(".input-username").fill("previewuser");
    await page.locator(".input-password").fill("Password@1234567");
    await page.locator("select[aria-label='Select a repository']").selectOption({ value: 'testenv' });
    await page.locator(".login-btn.btn-submit").click()
    await page.locator("otc-checkbox[title='Select Dummy']").click()
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator("//a[normalize-space()='Add version']").click()
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('C:\\D2SV\\d2smartview-d2tafcode\\E2ED2UnityTools\\D2UnityAutomation\\stories\\D2Unity\\16.6\\UI\\CheckIn\\Docs\\37615.pdf');
    await page.waitForTimeout(15000)
})