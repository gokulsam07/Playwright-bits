import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';

test('drag drop test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://jqueryui.com/droppable/');
    const frame = await page.frameLocator("//iframe[@class='demo-frame']");
    await frame?.locator('id=draggable').dragTo(await frame.locator('id=droppable')); //checks if not null or undefined
    await page.waitForTimeout(5000);
});

test('drag drop test via mouse', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://jqueryui.com/droppable/');
    const frame = await page.frameLocator("//iframe[@class='demo-frame']");
    await frame.locator('id=draggable').hover();
    page.mouse.down();
    await frame.locator('id=droppable').hover();
    page.mouse.up();
    await page.waitForTimeout(5000);
});


test('silder test', async () => {
    const browser: Browser = await chromium.launch({ headless: false,channel:'chrome'});
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://demo.automationtesting.in/Slider.html');
    await page.waitForLoadState();
    const slideBar = await page.locator('css=#slider'); //just focus on the bar and the location need to be set
    const sliderBarBB = await slideBar.boundingBox();
    if(sliderBarBB){
        const targetX = sliderBarBB.x + sliderBarBB.width / 2;
        const targetY = sliderBarBB.y + sliderBarBB.height / 2;
        await slideBar.click(); 
        await page.mouse.down(); 
        await page.mouse.move(targetX, targetY); 
        await page.mouse.up(); 
    }
        await page.waitForTimeout(5000);  
});