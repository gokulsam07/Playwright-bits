import {test, expect, Browser, Page, chromium,Locator,Expect} from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';

test('login test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"});
    const page:Page=await browser.newPage();
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/login');
    await page.waitForLoadState('networkidle');
    //id
    const uName:Locator = await page.locator("id=input-email");
    await uName.fill("gokuls2381@gmail.com");
    //css
    const pass:Locator = await page.locator("css=#input-password"); 
    await pass.fill("Gokul@123");
    await page.locator("css=input[value='Login']").click();
    //class
    const phoneLogo:Locator =await page.locator(".fa.fa-phone");
    expect(phoneLogo.isEnabled());
    expect(await page.title()).toBe('My Account');
    await page.locator("xpath=//a[normalize-space()='Desktops']").click();
});