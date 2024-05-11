import { test, expect, Browser, Page, chromium, Locator, Expect, BrowserContext } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';
import os from 'os';
import * as fs from 'fs';
import path from 'path';
let dwnldDir:string;
let homeDirectory;

const logger = {
    isEnabled: (name: string, severity: string) =>true,
    log: (name: string, severity: string, message: string, args: any) => console.log(`${name} ${message} ${severity} ${args}`)
};

test('download test',async()=>{
    const browser:Browser = await chromium.launch({headless:false,channel:"chrome",  logger: {isEnabled: logger.isEnabled,log: logger.log}});
    const context = await browser.newContext({viewport: { width: 1920, height: 1080 }}); //maximise browser
    const page:Page=await context.newPage();
    await page.goto('https://facebook.com');
    await page.waitForLoadState('networkidle');
    const name = await page.locator('id=pass');
    await name.focus();
    await name.fill("gokuls2381@gmail.com");
    await page.waitForTimeout(2000); 
  });
