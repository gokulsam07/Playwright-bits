

import { test, expect, Browser, Page, chromium, Locator, Expect } from '@playwright/test';
import { ChromiumBrowser } from '@playwright/test';
import { channel } from 'diagnostics_channel';


test('cross frame drop test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    const page: Page = await browser.newPage();
    await page.goto('https://www.useragentman.com/tests/dragAndDrop/05b-crossFrameSetData/');
    await page.waitForLoadState('domcontentloaded');
    // await page.waitForTimeout(1000);
    //const frame = await page.frameLocator('#draggableNodes');
    // await frame.locator("css=img[alt='John Lennon']").click({ button: 'left', delay: 500 });
    // await page.mouse.down();

    // const dropTarget = await page.frameLocator("#dropTargets").locator("css=#dropTarget");
    // const box = await dropTarget.boundingBox();
    // if (box) {
    //     await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    // }
    // await page.mouse.up();

    const draggableElement = await page.frameLocator('#draggableNodes')?.locator("css=img[alt='John Lennon']");
    draggableElement ? await draggableElement.dragTo(await page.frameLocator("#dropTargets").locator("css=#dropTarget")) : console.log('element can be moved');
    await page.waitForTimeout(5000);
});

