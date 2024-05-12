import { Page, expect } from '@playwright/test';
import { NewPublisher } from './NewPublisher';

export class PublisherPage  {
    
    readonly page: Page;
    readonly createNewButton: string;
    readonly nameInput: string;
    readonly emailInput: string;
    readonly saveButton: string;
    readonly publisherList: string;
    readonly editButtonLocator: string; // Adjust these selectors to your application
    readonly deleteButtonLocator: string;

    constructor(page: Page) {
        
        
        this.page = page;
        this.createNewButton = 'a[data-testid="action-new"]';
        this.nameInput = 'input[name="name"]';
        this.emailInput = 'input[id="email"]';
        this.saveButton = '[data-testid="button-save"]';
        this.publisherList = '[data-testid="property-list-name"]'; // Adjust selector based on your actual UI
        this.editButtonLocator = 'text=Edit';
        this.deleteButtonLocator = 'text=Delete';
    }
    navigateToPublisherPage() {
        this.page.goto('http://localhost:3000/admin/resources/Publisher')
    }
    async PressCreateNew() {
        await this.page.click(this.createNewButton);
        return new NewPublisher(this.page)
    }
    async getToastMessage() {
        const toastSelector = 'div[data-testid="notice-wrapper"] .adminjs_Text';
        await this.page.waitForSelector(toastSelector); // Ensure the toast is visible
        return await this.page.textContent(toastSelector);
    }
    

    async createPublisher(name: string, email: string) {
        await this.page.fill(this.nameInput, name);
        await this.page.fill(this.emailInput, email);
        await this.page.click(this.saveButton);
    }
   
    async verifyPublisherCreated(name: string) {
        await expect(this.page.locator(`[data-css="notice"]`)).toBeVisible();
    }

    async editPublisher(index:number, newName: string, newEmail: string) {
        // await this.page.click(`${this.publisherList} >> text=${name} >> ${this.editButtonLocator}`);
        await this.page.getByTestId('actions-dropdown').nth(index).hover();
        await this.page.getByTestId('action-edit').nth(index).click();
        await this.page.fill(this.nameInput, newName);
        await this.page.fill(this.emailInput, newEmail);
        await this.page.click(this.saveButton);
    }

    // async deletePublisher(name: string) {
    //     await this.page.click(`${this.publisherList} >> text=${name} >> ${this.deleteButtonLocator}`);
    //     await this.page.click('text=Confirm'); // Assuming there's a confirmation dialog
    // }

    async deletePublisher(index: number) {
        await this.page.getByTestId('actions-dropdown').nth(index).hover();
        await this.page.getByTestId('action-delete').nth(index).click();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
    async verifyPublisherDeleted(name: string) {
        await expect(this.page.locator(`${this.publisherList} >> text=${name}`)).not.toBeVisible();
    }
}
