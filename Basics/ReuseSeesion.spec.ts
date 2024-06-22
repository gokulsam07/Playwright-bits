import {test, expect, Browser,BrowserContext, Page, chromium,Locator,Expect} from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';
import path from 'path';

test('login test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"});
    const context:BrowserContext = await browser.newContext();
    const page:Page=await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForLoadState('networkidle');
    const uName:Locator = await page.getByPlaceholder("Username");
    await uName.fill("Admin");
    const password:Locator = await page.getByPlaceholder("Password");
    await password.fill("admin123");
    const login: Locator = await page.locator("css=button[type='submit']");
    await login.click();
    await context.storageState({path:"./loginAuth.json"});
    await page.waitForTimeout(4000);
});

test('login without login page',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"});
    const context:BrowserContext = await browser.newContext({storageState:"./loginAuth.json"});
    const page:Page=await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForLoadState('networkidle');
    expect(page.locator("//h6[normalize-space()='Dashboard']")).toBeVisible();
    await page.waitForTimeout(4000);
    await browser.close();
});