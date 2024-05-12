import { test, expect, ChromiumBrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pageObjects/login/LoginPage';
import { readTestData } from '../utils/readTestData';
import { BrowserManager, BrowserType } from '../utils/BrowserManager';
import { DashboardPage } from '../pageObjects/dashboard/DashboardPage';
import { Sidebar } from '../pageObjects/sidebar/Sidebar';

let testData: any;
let browserManager: BrowserManager;
let loginPage:LoginPage;
let sidebar: Sidebar;
let dashboardPage: DashboardPage;

(async () => {
    testData = await readTestData('testData.json');  // Load test data 
    browserManager = new BrowserManager();
    await browserManager.launchBrowser(BrowserType.Chromium);
})();

test.describe('Dashboard Page Tests', () => {
    let page: Page;
    
    test.beforeEach(async ({ page }) => {
        console.log('Opening a new page...');
        loginPage = new LoginPage(page);
        await loginPage.goTo();
    
        console.log('Logging in...');
        dashboardPage = await loginPage.loginAndReturnDashboardPage(testData.validUser.username, 
            testData.validUser.password);
            dashboardPage.verifyLoggedInSuccessfully(testData.validUser.message);
        // const wellcomMeaasge = dashboardPage.getWelcomeMessage();
        // console.log('assert wellcome message (in dashboad).');
        // expect(wellcomMeaasge).toBeTruthy();
        
    });
    test.afterAll(async () => {
        console.log('Closing browser...');
        await browserManager.closeBrowser();
    });
    test.afterEach(async () => {
        await browserManager.closeBrowser();
    });

    test('should display the correct welcome message', async ({ page }) => {
        console.log('Checking the welcome message...');
        const welcomeMessage = await dashboardPage.getWelcomeMessage();
        expect(welcomeMessage).toEqual('Welcome, Candidate!');
        console.log('Welcome message verified.');
    });

    test('should open SlideBar and verfiy', async ({ page }) => {
       
        sidebar = await dashboardPage.openSlideBar();
        console.log('SlideBar opened.');
    });

    test('should log out successfully', async ({ page }) => {
        console.log('Attempting to log out...');
        await dashboardPage.logout();
        expect(page.url()).toContain('/login');
        console.log('Logout verified.');
    });

    test('should display additional motivational message', async ({ page }) => {
        console.log('Checking for additional motivational message...');
        const message = await dashboardPage.getAdditionalMessage();
        expect(message).toContain('Happy coding and good luck, may the Force be with you!');
        console.log('Motivational message verified.');
    });
});
