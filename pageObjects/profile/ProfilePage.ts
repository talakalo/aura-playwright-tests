import { Page, Locator } from '@playwright/test';
import { NewProfile } from './newProfile';

export class ProfilePage {
   
    readonly page: Page;
    readonly createNewButton: Locator
    readonly editButton: Locator;
    readonly profileName: Locator;
    readonly profileEmail: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        
        this.page = page;
        this.createNewButton =page.locator('a[data-testid="action-new"]');
        this.editButton = page.locator('button:has-text("Edit")');
        this.profileName = page.locator('input[name="name"]');
        this.profileEmail = page.locator('input[name="email"]');
        this.saveButton = page.locator('[data-testid="button-save"]');
    }
    async navigateToProfilePage() {
        await this.page.goto('http://localhost:3000/admin/resources/Profile');
        return new ProfilePage(this.page)
    }
    createProfile(_arg0: { name: string; email: string; }) {
        this.setProfileName(_arg0.name)
        this.setProfileEmail(_arg0.email)
        this.saveProfile()
    }
    async pressCreateNew() {
        await this.createNewButton.click();
        return new NewProfile(this.page)
    }
    async deleteProfile(index: number) {
        await this.page.getByTestId('actions-dropdown').nth(index).hover();
        await this.page.getByTestId('action-delete').nth(index).click();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
    checkProfileExists(arg0: string) {
        throw new Error('Method not implemented.');
    }
    async checkNewButtonExists() {
        await this.page.waitForSelector('[data-testid="button-save"]', { timeout: 30000 });
    }
    async goTo() {
        await this.page.goto('http://localhost:3000/profile');
    }

    async editProfile(index: number) {
        await this.page.getByTestId('actions-dropdown').nth(index).hover();
        await this.page.getByTestId('action-edit').nth(index).click();
        return new NewProfile(this.page)
    }
    async clickCreateNewButton() {
        await this.createNewButton.click();
        return new NewProfile(this.page)
    }

    async setProfileName(name: string) {
        await this.profileName.fill(name);
    }

    async setProfileEmail(email: string) {
        await this.profileEmail.fill(email);
    }

    async saveProfile() {
        await this.saveButton.click();
    }

    async getProfileName(): Promise<string> {
        return this.profileName.inputValue();
    }

    async getProfileEmail(): Promise<string> {
        return this.profileEmail.inputValue();
    }
}
