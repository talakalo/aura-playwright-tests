import { Page, expect } from '@playwright/test';
import { Sidebar } from '../sidebar/Sidebar';
import { LoginPage } from '../login/LoginPage';

export class DashboardPage {
    readonly page: Page;
    readonly welcomeMessage: 'Welcome, Candidate!';
    readonly burgerIcon: string;

    constructor(page: Page) {
        this.page = page;

        this.burgerIcon = '[data-css="topbar"] > section';
    }

    async getWelcomeMessage(): Promise<string | null> {
        const welcomeMessageElement = this.page.getByRole('heading', { name: 'Welcome, Candidate!' });
        if (welcomeMessageElement) {
            const welcomeMessageText = await welcomeMessageElement.textContent();
            return welcomeMessageText;
        }
        return null;
    }

    async getAdditionalMessage(): Promise<string> {
        return (await this.page.textContent('h4'))!;
    }

    async logout() {
        await this.page.hover('[data-css="logged-in"]');
        await this.page.click('text=Log out');
        
        return new LoginPage(this.page)
    }
    async openSlideBar(): Promise<Sidebar>{
       const happyFolderLink = this.page.locator(this.burgerIcon).first()
        // await this.page.click(this.burgerIcon);
        happyFolderLink.click()
        return new Sidebar(this.page)
    }

    async verifyLoggedInSuccessfully(message:string) {
        await expect(this.page.locator('text=' + message)).toBeVisible();
    }
    
}