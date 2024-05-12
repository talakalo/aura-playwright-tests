import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/login/LoginPage';
import { DashboardPage } from '../pageObjects/dashboard/DashboardPage';
import { PublisherPage } from '../pageObjects/publisher/PublisherPage';
import { readTestData } from '../utils/readTestData';
import { Pages, Sidebar } from '../pageObjects/sidebar/Sidebar';
import { BrowserManager, BrowserType } from '../utils/BrowserManager';

let testData: any;
let browserManager: BrowserManager;
let loginPage:LoginPage;
let publisherPage: PublisherPage;    
let sidebar: Sidebar;
(async () => {
    testData = await readTestData('testData.json');  // Load test data 
    browserManager = new BrowserManager();
    await browserManager.launchBrowser(BrowserType.Chromium);
})();

test.describe('Publisher Management', () => {
    

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
        testData = await readTestData('testData.json');
        const dashboardPage = await loginPage.loginAndReturnDashboardPage(testData.validUser.username,
            testData.validUser.password,);
        await dashboardPage.verifyLoggedInSuccessfully( testData.validUser.message);
        sidebar = await dashboardPage.openSlideBar();
        sidebar.verifySideBarOpend()
        sidebar.openHappyFolder();
        publisherPage = await sidebar.navigateTo(Pages.Publisher);

    });

    test.afterEach(async () => {
        await browserManager.closeBrowser();
    });
    test.afterAll(async () => {
        await browserManager.closeBrowser();
    });


    test('Create a new Publisher', async ({ page }) => {
        await publisherPage.PressCreateNew();
        await publisherPage.createPublisher('New Publisher', 'publisher@example.com');
        await publisherPage.verifyPublisherCreated('New Publisher');
    });

    test('Edit an existing Publisher', async ({ page }) => {
        await publisherPage.editPublisher(0, 'Updated Publisher', 'updated@example.com');
        await publisherPage.verifyPublisherCreated('Updated Publisher');
    });

    test('Delete a Publisher', async ({ page }) => {
        await publisherPage.deletePublisher(0);
        await publisherPage.verifyPublisherDeleted('Updated Publisher');
    });
});

