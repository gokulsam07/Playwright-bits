import {test, expect, Browser, Page, chromium,Locator,Expect} from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';

 const uname ='admin';
 const pass ='admin';

test('Auth login test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"}); //to run in locally available browser run channel 
    const page:Page=await browser.newPage();
    page.setExtraHTTPHeaders({Authorization:createAuth(uname,pass)});
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.waitForLoadState('networkidle');
    const alertMessage:Locator = await page.locator("css=div[class='example'] p");
    expect(await alertMessage.textContent()).toContain('Congratulations! You must have the proper credentials.');
    await browser.close();
});

function createAuth(username: string, password: string): string {
    return "Basic " + btoa(username + ":" + password); //btoa is a globla js function in console, will convert the str to basic64 encoding
}

