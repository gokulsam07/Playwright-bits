import {test, expect, Browser, Page, chromium,Locator,Expect, BrowserContext} from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';
test.use({ launchOptions: { args: ['--deny-permission-prompts'] } }); //blocks permission prompts
test('hover test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"});
    const context:BrowserContext=await browser.newContext();
    const page:Page=await context.newPage();
    await page.goto('https://www.spicejet.com/');
    await page.waitForLoadState('networkidle');
    await page.getByText('Add-ons').first().hover();
    await page.getByText('You1st').click();
    await context.waitForEvent('page');
    await page.waitForTimeout(5000);

});