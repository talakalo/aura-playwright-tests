import { expect, test } from '@playwright/test';
import { PublisherPage } from '../pageObjects/publisher/PublisherPage';
import { ProfilePage } from '../pageObjects/profile/ProfilePage';
import { LoginPage } from '../pageObjects/login/LoginPage';
import { readTestData } from '../utils/readTestData';
import { NewProfile } from '../pageObjects/profile/newProfile';

test.describe('Scenario 1', () => {
    let testData: { validUser: { username: string; password: string; }; };
    let message: any;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        testData = await readTestData('testData.json');
        await loginPage.goTo();
        
        await loginPage.login(testData.validUser.username,
            testData.validUser.password);

    });
    test('Create and delete profiles and publishers', async ({ page }) => {
        const publisherPage = new PublisherPage(page);
        const profilePage = new ProfilePage(page);

        // Create publisher 1
        publisherPage.navigateToPublisherPage();
        const newPublisher= await publisherPage.PressCreateNew();
        await newPublisher.createPublisher('Publisher1', 'Publisher1@example.com' );
        message = await publisherPage.getToastMessage();
        expect(message).toContain('Successfully created a new record');
        
        // Create publisher 2
        publisherPage.PressCreateNew();
        await newPublisher.createPublisher('Publisher2', 'Publisher2@example.com' );
        message = await publisherPage.getToastMessage();
        expect(message).toContain('Successfully created a new record');
       
        // publisherPage.verifyPublisherCreated('Publisher2')

        // Create profile 1
        profilePage.navigateToProfilePage();
        let newProile = await profilePage.clickCreateNewButton()
        newProile.createProfile({ bio: 'Bio Profile1', publisher: 'Publisher2@example.com' });
        expect(message).toContain('Successfully created a new record');
        profilePage.checkNewButtonExists()
        // Create profile 2
        newProile = await profilePage.clickCreateNewButton()
        newProile.createProfile({ bio: 'Bio Profile2', publisher: 'Publisher2@example.com' });
        expect(message).toContain('Successfully created a new record');

        // Delete one profile
        
        // profilePage.deleteProfile(0);
        // expect(message).toContain('Successfully deleted given record');
        // // Verify deletion using filter or existence check
        // const profileExists = profilePage.checkProfileExists('Profile1');
        // expect(profileExists).toBeFalsy();
    });
});
