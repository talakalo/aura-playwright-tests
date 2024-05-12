import { test, expect } from '@playwright/test';
import { PostPage } from '../pageObjects/post/PostPage';
import { Pages, Sidebar } from '../pageObjects/sidebar/Sidebar';
import { LoginPage } from '../pageObjects/login/LoginPage';
import { readTestData } from '../utils/readTestData';
import { BrowserManager, BrowserType } from '../utils/BrowserManager';
import { NewPost } from '../pageObjects/post/NewPost';
let testData: any;
let browserManager: BrowserManager;
let loginPage:LoginPage;
let postPage: PostPage;
(async () => {
    testData = await readTestData('testData.json');  // Load test data 
    browserManager = new BrowserManager();
    await browserManager.launchBrowser(BrowserType.Chromium);
})();

test.describe('Post Page Tests', () => {
    
    
   let newPost:NewPost;
    let sidebar: Sidebar;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
        testData = await readTestData('testData.json');
        const dashboardPage = await loginPage.loginAndReturnDashboardPage(testData.validUser.username,
            testData.validUser.password);
        await dashboardPage.verifyLoggedInSuccessfully(testData.validUser.message);
        sidebar = await dashboardPage.openSlideBar();
        sidebar.verifySideBarOpend();
        sidebar.openHappyFolder();
        postPage = await sidebar.navigateTo(Pages.Post);
        

    });
    test.afterEach(async () => {
        await browserManager.closeBrowser();
    });
    test.afterAll(async () => {
        await browserManager.closeBrowser();
    });
    test('Create new post', async ({ page }) => {
        newPost = await postPage.createNewPost();
        expect(page.url()).toContain('http://localhost:3000/admin/resources/Post/actions/new');
        
        await newPost.fillTitle('Test Tile');
        await newPost.fillContent('Test content ');
        // await newPost.clickAddNewItem();
        // await newPost.fillJsonNumber(0, 123);
        // await newPost.fillJsonString(0, 'Hello, world!');
        // await newPost.setJsonBoolean(0, true);
        //await newPost.setJsonDate(0, '2024/05/09 00:00');
        await newPost.selectStatus('ACTIVE');
        await newPost.selectPublisher('publisher@example.com');
        
        
        
        await newPost.clickSaveButton()
    });

    test('Open and apply filters', async ({ page }) => {
        await postPage.openFilterDrawer();
        await postPage.applyFilter();
        expect(await page.locator(postPage.postTable).isVisible()).toBeTruthy();
    });

    test('Show post actions', async ({ page }) => {
        const postId = 0; // Example post ID
        await postPage.showPost(postId);
        // await postPage.sort();
        expect(page.url()).toContain(`http://localhost:3000/admin/resources/Post/records/${postId}/show`);
    });
    test(' edit post actions', async ({ page }) => {
        const postId = 0; // Example post ID
       
        newPost = await postPage.editPost(postId);
        await newPost.fillTitle('edited Title');
        await newPost.fillContent('edited content ');
        await newPost.clickSaveButton()
        expect(page.url()).toContain(`http://localhost:3000/admin/resources/Post/records/${postId}/edit`);

    })
    test('delete post actions', async ({ page }) => {
        const postId = 0; // Example post ID
        await postPage.deletePost(postId);
        expect(await page.locator(`a[href='/admin/resources/Post/records/${postId}/delete']`).isVisible()).toBeFalsy();
    });
});
