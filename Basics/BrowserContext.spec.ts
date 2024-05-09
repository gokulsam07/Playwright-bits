import {test, expect, Browser, Page, chromium,Locator,Expect, BrowserContext} from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';

test('multi context test',async({}, testInfo)=>{
    testInfo.setTimeout(60000);
    const browser:Browser = await chromium.launch({headless:false,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
    //this will run in the version available in the path mentioned
    const context1:BrowserContext = await browser.newContext();
    const context2:BrowserContext = await browser.newContext();
    const page1:Page=await context1.newPage();
    const page2:Page=await context2.newPage();
    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page1.waitForLoadState('networkidle');
    const uName:Locator = await page1.locator("css=input[placeholder='Username']");
    await uName.fill("Admin");
    const password:Locator = await page1.locator("css=input[placeholder='Password']");
    await password.fill("admin123");
    const login: Locator = await page1.locator("css=button[type='submit']");
    await login.click();
    const alertMessage1 = await page1.locator("css=.oxd-userdropdown-tab");
    expect(await alertMessage1.waitFor({ state: 'visible' }));

    await page2.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page2.waitForLoadState('networkidle');
    const uName2:Locator = await page2.locator("css=input[placeholder='Username']");
    await uName2.fill("admin1");
    const password2:Locator = await page2.locator("css=input[placeholder='Password']");
    await password2.fill("Admin123");
    const login2: Locator = await page2.locator("css=button[type='submit']");
    await login2.click();
    const alertMessage = await page2.locator("css=.oxd-text.oxd-text--p.oxd-alert-content-text");
    await alertMessage.waitFor({ state: 'visible' });
    expect(await alertMessage.textContent()).toBe('Invalid credentials');
});