import {test, expect, Browser, Page, chromium,Locator,Expect} from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';


test('delay and focus test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"}); 
    const page:Page=await browser.newPage();
    await page.goto('https://flipkart.com');
    await page.waitForLoadState('networkidle');
    await page.getByPlaceholder('Search for Products, Brands and More').pressSequentially('Macbook Air',{delay:500});
    await page.waitForTimeout(2000);
    await browser.close();
});



test('focus test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"}); 
    const page:Page=await browser.newPage();
    await page.goto('https://facebook.com');
    await page.waitForLoadState('networkidle');
    const name = await page.locator('id=pass');
    await name.focus();
    await name.fill("gokuls2381@gmail.com");
    await page.waitForTimeout(2000);
    await browser.close();
});