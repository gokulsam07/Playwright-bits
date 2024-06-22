import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';

test('screenshot test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"}); 
    const page:Page=await browser.newPage();
    await page.goto('https://facebook.com');
    await page.waitForLoadState('networkidle');
    const name = await page.locator('id=pass');
    await name.screenshot({path : 'element.png'}); // element level screenshot
    await name.focus();
    await name.fill("gokuls2381@gmail.com");
    await page.screenshot({ path: 'screenshot.png',fullPage:true }) //page level screenshot -- supports options for customisation
    await browser.close();
}); 