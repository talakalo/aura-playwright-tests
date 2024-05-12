import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pageObjects/profile/ProfilePage';
import { LoginPage } from '../pageObjects/login/LoginPage';
import { Pages, Sidebar } from '../pageObjects/sidebar/Sidebar';
import { readTestData } from '../utils/readTestData';
import { BrowserManager, BrowserType } from '../utils/BrowserManager';
import { NewProfile } from '../pageObjects/profile/newProfile';

let profilePage: ProfilePage;
let sidebar:Sidebar;
let testData: any;
let browserManager: BrowserManager;
let loginPage:LoginPage;
let newProfile:NewProfile;
(async () => {
    testData = await readTestData('testData.json');  // Load test data 
    browserManager = new BrowserManager();
    await browserManager.launchBrowser(BrowserType.Chromium);
})();

test.describe('Profile Page Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
        const dashboardPage = await loginPage.loginAndReturnDashboardPage(testData.validUser.username,
            testData.validUser.password );
        await dashboardPage.verifyLoggedInSuccessfully(testData.validUser.message);
        sidebar =await dashboardPage.openSlideBar();
        sidebar.verifySideBarOpend()
        sidebar.openHappyFolder();
        profilePage =await sidebar.navigateTo(Pages.Profile);

    });

    test('should allow editing and saving the profile', async ({ page }) => {
        newProfile= await profilePage.clickCreateNewButton()
        await profilePage.setProfileName('New Name');
        await profilePage.setProfileEmail('new@example.com');
        await profilePage.saveProfile();
        
        // Verify that the new details are saved
        expect(await profilePage.getProfileName()).toBe('New Name');
        expect(await profilePage.getProfileEmail()).toBe('new@example.com');
    });

    test('should display the correct initial profile details', async ({ page }) => {
        // Assuming initial data to be fetched and checked
        expect(await profilePage.getProfileName()).toBe('Initial Name');
        expect(await profilePage.getProfileEmail()).toBe('initial@example.com');
    });
});
