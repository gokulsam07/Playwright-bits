import { PlaywrightTestConfig, chromium,firefox,webkit } from "@playwright/test";

const config = {
    timeout :60000,
    //retries :2,
    testDir:'./api-testing-bits',
    fullyParallel: true,
    reporter: 'html',
    workers:5,
    use:{
        headless:false,
        viewport:{width :1280, height :720},
        actionTimeout :15000, //click, wait for selector, timeout
        video:"off",
        screenshot:"on",
        ignoreHTTPErrors:true, 
    },
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' }
        }, {
            name: 'Firefox',
            use: { browserName: 'firefox' }
        }, {
            name: 'WebKit',
            use: { browserName: 'webkit' }
        }]
}

export default config;