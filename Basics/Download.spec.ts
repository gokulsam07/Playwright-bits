import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';
import os from 'os';
import * as fs from 'fs';
import path from 'path';
let dwnldDir:string;
let homeDirectory;



test('download test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome"});
    const context = await browser.newContext(); 
    const page:Page=await context.newPage();
    await page.goto('https://demo.automationtesting.in/FileDownload.html');
    await page.waitForLoadState();
    const downloadPromise  = page.waitForEvent('download'); //action should not be async else it will wait here till download event is fired & it will fail,because ele for dwnld isn't clicked
    await page.locator("css=a[type='button']").click();
    const download = await downloadPromise;
    homeDirectory = os.homedir();
    dwnldDir = path.join(homeDirectory, 'Downloads');
    console.log(dwnldDir);
    let fileLocation = dwnldDir+ "\\" + download.suggestedFilename();
    await download.saveAs(fileLocation);
    await page.waitForTimeout(5000);
    if (checkFileExists(fileLocation)) {
        console.log(`The file '${fileLocation}' exists in the download location.`);
        deleteFile(fileLocation);
    } else {
        console.log(`The file '${fileLocation}' does not exist in the download location.`);
    }
}); 


function checkFileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
}

function deleteFile(filePath: string): void {
    try {
        fs.unlinkSync(filePath);
        console.log(`File '${filePath}' has been deleted.`);
    } catch (err) {
        console.error(`Error deleting file '${filePath}':`, err);
    }
}
