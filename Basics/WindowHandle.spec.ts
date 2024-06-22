import { test, expect, Browser, BrowserContext, Page, chromium, Locator, Expect } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';


test('window test', async () => {
    test.setTimeout(40000);
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://letcode.in/windows');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('id=home').click();
    const newTab = await context.waitForEvent("page");
    await expect(newTab.url()).toContain("test");
    await page.waitForTimeout(2000);
    await newTab.bringToFront();
    newTab.locator("//a[normalize-space()='Edit']").click();
    await page.waitForTimeout(2000);
    await page.bringToFront();
    await page.locator('id=multi').click();
    const multiTab = await context.waitForEvent("page");
    await expect(multiTab.url()).toMatch(/alert|dropdowns/);
    console.log(multiTab.url());
    await multiTab.bringToFront();
    const alertSelectorPromise = await multiTab.waitForSelector("//h1[normalize-space()='Alert']");
    const dropdownsSelectorPromise = await multiTab.waitForSelector("//h1[normalize-space()='Dropdowns']");
    await expect(Promise.race([alertSelectorPromise, dropdownsSelectorPromise])).toBeTruthy();

    await page.waitForTimeout(1000);
    await browser.close();
});


test('multi window handle', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://letcode.in/windows');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('id=multi').click();
    await context.waitForEvent('page');
    const tabs = await page.context().pages();
    console.log(tabs.length);
    await Promise.all(tabs.map(async (tab) => {
        await tab.waitForLoadState('domcontentloaded');
    }));
    for (const tab of tabs) {
        console.log(await tab.title());
    }
    await page.waitForTimeout(4000);
    await browser.close();
});

test('multi window array handle', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://letcode.in/windows');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('id=home').click();
    //await page.locator('id=multi').click();
    const newPages:Page[] =[] ;
    context.on('page', async (newPage) => {
        await newPage.waitForLoadState();
        newPages.push(newPage);
        console.log('New tab opened with title:', await newPage.title());
    });
    await page.waitForTimeout(5000);

    const pageTitleToFocus = 'Letcode - Testing Hub';
    const pageToFocus = newPages.find(async (page)=>(await page.title())===pageTitleToFocus);
    if (pageToFocus) {
        await pageToFocus.bringToFront();
        await pageToFocus.locator("//a[normalize-space()='Edit']").click();
        await pageToFocus.waitForTimeout(2000);
    } else {
        console.error('Page with title', pageTitleToFocus, 'not found!');
    }
    await browser.close();
});