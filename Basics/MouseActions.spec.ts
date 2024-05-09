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
});

test('right test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://www.demo.guru99.com/test/simple_context_menu.html');
    await page.waitForLoadState('networkidle');
    await page.getByText("right click me").click({button:'right'});
    await page.waitForTimeout(5000);
});

test('shift test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/shifting_content');
    await page.waitForLoadState('networkidle');
    await page.getByText("Example 1: Menu Element").click({modifiers:["Shift"]});
    await page.waitForTimeout(5000);
});