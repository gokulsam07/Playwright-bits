import {test, expect, Browser, Page, chromium,Locator,Expect} from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';


test('login test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"}); //to run in locally available browser run channel 
    const page:Page=await browser.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForLoadState('networkidle');
    const uName:Locator = await page.locator("css=input[placeholder='Username']");
    await uName.fill("admin");
    const password:Locator = await page.locator("css=input[placeholder='Password']");
    await password.fill("Admin123");
    const login: Locator = await page.locator("css=button[type='submit']");
    await login.click();
    const title:String = await page.title();
    console.log(title);
    expect(title).toBe('OrangeHRM');
    await browser.close();
});