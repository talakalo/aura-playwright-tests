import { Locator, Page } from '@playwright/test';
import { PublisherPage } from './PublisherPage';

export class NewPublisher {
    readonly page: Page;
    readonly nameInput: Locator ; 
    readonly emailInput : Locator ;  
    readonly saveButton : Locator ; 

    
    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('input[name="name"]'); // Adjust the selector based on your actual HTML
        this.emailInput = page.locator('input[id="email"]'); // Adjust the selector based on your actual HTML
        this.saveButton = page.locator('[data-testid="button-save"]'); // Adjust the selector based on your actual HTML
    
    }

    // Navigate to the publisher creation page
    async navigateToPublisherPage() {
        // The URL would be the route to the publisher page which should be adjusted as per your application routes
        await this.page.goto('http://localhost:3000/admin/resources/Publisher'); 
    }

    // Function to fill the name field
    async setName(name: string) {
        await this.nameInput.fill(name);
    }

    // Function to fill the email field
    async setEmail(email: string) {
        await this.emailInput.fill(email);
    }

    // Function to click the save button
    async clickSave() {
        await this.saveButton.click();
    }

    // // Function to verify the publisher is in the list
    // async verifyPublisherInList(publisherName: string) {
    //     await this.page.waitForSelector(this.publisherListLocator);
    //     const isVisible = await this.page.isVisible(`${this.publisherListLocator} >> text="${publisherName}"`);
    //     return isVisible;
    // }
    async createPublisher(name: string, email: string) {
        await this.setName( name);
        await this.setEmail( email);
        await this.clickSave();
        return new PublisherPage(this.page)
    }
}
