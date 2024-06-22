import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';

test('mouse actions test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://www.demo.guru99.com/test/simple_context_menu.html');
    await page.waitForLoadState('networkidle');
    await page.getByText("Double-Click Me To See Alert").dblclick();
    await page.waitForTimeout(5000);
    await browser.close();
});

test('right test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://www.demo.guru99.com/test/simple_context_menu.html');
    await page.waitForLoadState('networkidle');
    await page.getByText("right click me").click({ button: 'right' });
    await page.waitForTimeout(5000);
    await browser.close();
});

test('shift test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/shifting_content');
    await page.waitForLoadState('networkidle');
    await page.getByText("Example 1: Menu Element").click({ modifiers: ["Shift"] });
    await page.waitForTimeout(5000);
    await browser.close();
});

test('click and hold test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://letcode.in/buttons');
    await page.waitForLoadState();
    const button = await page.waitForSelector("css=button[id='isDisabled'] div h2");
    //await page.click("css=button[id='isDisabled'] div h2",{delay:5000});
    //or
    await button.scrollIntoViewIfNeeded();
    await button.click({ delay: 5000 });
    await browser.close();
});

