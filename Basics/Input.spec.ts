import {test, expect, Browser, Page, chromium,Locator,Expect} from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';


test('input types test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"}); 
    const page:Page=await browser.newPage();
    await page.goto('https://letcode.in/edit');
    await page.waitForLoadState('domcontentloaded');
    await page.locator("id=fullName").fill("admin"); //fill will clear the input field & type in the value
    await page.waitForTimeout(2000);
    const fill =  await page.locator("id=join");
    await fill.focus(); 
    await page.keyboard.press("End");
    await fill.pressSequentially(" Human");
    await page.waitForTimeout(2000);
    await page.locator("id=clearMe").clear();
    await page.waitForTimeout(2000);
});