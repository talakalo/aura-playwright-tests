import { test, expect, ChromiumBrowserContext } from '@playwright/test';
import { LoginPage } from '../pageObjects/login/LoginPage';
import { readTestData } from '../utils/readTestData';
import { BrowserManager, BrowserType } from '../utils/BrowserManager';


let testData: any;
let browserManager: BrowserManager;
let loginPage:LoginPage;

(async () => {
    testData = await readTestData('testData.json');  // Load test data 
    browserManager = new BrowserManager();
    await browserManager.launchBrowser(BrowserType.Chromium);
})();

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
     loginPage = new LoginPage(page);
        await loginPage.goTo();
    });
    test.afterEach(async () => {
        await browserManager.closeBrowser();
    });
    test.afterAll(async () => {
        await browserManager.closeBrowser();
    });

    test.skip('TC1.1: Test login with valid credentials', async ({ page }) => {
        
        loginPage = new LoginPage(page);
        const { username, password, message } = testData.validUser;
        if (!testData.validUser) {
            throw new Error("TestData for 'validUser' not found");
          }
        console.log('Starting TC1.1: Test login with valid credentials');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
    
        await loginPage.login(username, password);
        await loginPage.checkRedirection('http://localhost:3000/admin');

        console.log('TC1.1: Test login with valid credentials completed');
    });

    test.skip('TC1.2: Test login with invalid credentials', async ({ page, context }) => {
        loginPage = new LoginPage(page);
        const { username, password } = testData.invalidUser;

        console.log('Starting TC1.2: Test login with invalid credentials');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);

        await loginPage.login(username, password);
        await loginPage.checkRedirection('http://localhost:3000/admin/login');

        console.log('TC1.2: Test login with invalid credentials completed');
    });

    test.skip('TC1.3: Test login with empty credentials', async ({ page, context }) => {
        const loginPage = new LoginPage(page);
        const { username, password } = testData.invalidUser;

        console.log('Starting TC1.3: Test login with empty credentials');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);

        await loginPage.login(username, password);
        await loginPage.checkRedirection('http://localhost:3000/admin/login');

        console.log('TC1.3: Test login with empty credentials completed');
    });

    test.skip('TC1.4: Verify redirection after successful login', async ({ page, context }) => {
        const loginPage = new LoginPage(page);
        const { username, password, message } = testData.validUser;

        console.log('Starting TC1.4: Verify redirection after successful login');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);

        await loginPage.login(username, password); 
        await loginPage.checkRedirection('http://localhost:3000/admin');
        await loginPage.checkErrorMessage(message);

        console.log('TC1.4: Verify redirection after successful login completed');
    });
});