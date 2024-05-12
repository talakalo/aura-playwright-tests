import { Page, expect } from '@playwright/test';
import { PublisherPage } from '../publisher/PublisherPage';
import { ProfilePage } from '../profile/ProfilePage';
import { PostPage } from '../post/PostPage';
export enum Pages {
    Publisher = 'Publisher',
    Profile = 'Profile',
    Post = 'Post',
}

// Assuming you have classes for each of these pages



export interface PageInstances {
    [Pages.Publisher]: PublisherPage;
    [Pages.Profile]: ProfilePage;
    [Pages.Post]: PostPage;
}
export class Sidebar {
    private readonly page: Page;
    readonly happyFolder: string;
    readonly logo: string;
    constructor(page: Page) {
        this.page = page;
        this.logo = '[data-css="sidebar-logo"]'
        this.happyFolder = '[data-css="sidebar-resources"] > section > ul > li> a'
    }

    async openHappyFolder(): Promise<void> {

        console.log('Attempting to open the Happy Folder');

        // Using locator to find a link that has the text 'Happy Folder'
        const link = this.page.locator('a').filter({ hasText: 'Happy Folder' });
        await link.click();

    }

    
    async verifySideBarOpend()  {
        const isVisible = await this.page.isVisible(this.logo);
        expect(isVisible).toBeTruthy();
    }

    async navigateTo<T extends Pages>(pageName: T): Promise<PageInstances[T]> {
        await this.page.click(`text=${pageName}`);
        switch (pageName) {
            case Pages.Publisher:
                return new PublisherPage(this.page) as PageInstances[T];
            case Pages.Profile:
                return new ProfilePage(this.page) as PageInstances[T];
            case Pages.Post:
                return new PostPage(this.page) as PageInstances[T];
            default:
                throw new Error(`Unsupported page: ${pageName}`);
        }
    }

}