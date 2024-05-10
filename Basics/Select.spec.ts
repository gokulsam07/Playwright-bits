import { test, expect, Browser, Page, chromium, Locator, Expect } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';


test('select test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const page: Page = await browser.newPage();
    await page.goto('https://letcode.in/dropdowns');
    await page.waitForLoadState('domcontentloaded');
    await page.selectOption('select#fruits', 'Banana');
    await expect(page.locator('css=.subtitle')).toContainText('Banana');
    await page.waitForTimeout(1000);
    await page.selectOption('select#superheros',[{label:"Ant-Man"},{value:'aq'},{index:2}]); //can select based on label, index, value
    const options = await page.locator('select#superheros option').all();
    for(const option of options){
        console.log(option);
        const op = await option.textContent();
        if(op==="Ant-Man"||op==='Aquaman'||op==='The Avengers'){
            await expect(await option).toHaveCSS('background-color','rgb(206, 206, 206)');
        }
        else{
            await expect(await option).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
        }
    }
});