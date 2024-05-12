import { Page, expect } from '@playwright/test';

export class NewPost {
    
    readonly page: Page;
    readonly titleInputLocator = '[data-testid="property-edit-title"] input'; // Adjust the selector based on your actual HTML
    readonly contentTextareaLocator = '[data-testid="property-edit-content"] input'; // Adjust the selector based on your actual HTML
    readonly jsonInputLocator = 'textarea[name="jsonContent"]'; // Adjust the selector based on your actual HTML
    readonly addButtonLocator = 'button[data-testid="someJson-add"]'; // Adjust the selector based on your actual HTML
    readonly statusSelectorLocator = '#react-select-5-placeholder'; // Adjust the selector based on your actual HTML
    readonly statusOptionPublishedLocator = 'option[value="Published"]'; // Adjust the selector based on your actual HTML
    readonly publisherSelectorLocator = 'react-select-6-listbox' // Adjust the selector based on your actual HTML
    readonly saveButton: 'button-save';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToNewPostPage() {
        await this.page.goto('http://localhost:3000/admin/posts/new');
    }

    async fillTitle(title: string) {
        await this.page.fill(this.titleInputLocator, title);
    }

    async fillContent(content: string) {
        await this.page.fill(this.contentTextareaLocator, content);
    }

    async fillJson(jsonString: string) {
        await this.page.fill(this.jsonInputLocator, jsonString);
    }

    async clickAddNewItem() {
        await this.page.click(this.addButtonLocator);
    }

    async selectStatus(status:string) {
        await this.page.getByTestId('property-edit-status').locator('div').filter({ hasText: 'Select...' }).nth(3).click();
        this.page.getByText(status, { exact: true }).click();
    }

    async selectPublisher(publisherName: string) {
        await this.page.getByTestId('property-edit-publisher').locator('.adminjs_Select').click()
        this.page.getByText(publisherName, { exact: true }).click();
    }
    async addJsonItem() {
        await this.page.click('button[data-testid="someJson-add"]');
    }

   
    async fillJsonNumber(index: number, number: number) {
        const selector = `input[name="someJson.${index}.number"]`;
        await this.page.fill(selector, number.toString());
    }

   
    async fillJsonString(index: number, text: string) {
        const selector = `[data-testid="property-edit-someJson.${index}.string"] input`;
        await this.page.fill(selector, text.toString());

    }

    
    async setJsonBoolean(index: number, value: boolean) {
        const checkboxSelector = this.page.locator(`[data-testid="property-edit-someJson.0.boolean"] a`);
        checkboxSelector.click()
    }
    
    async setJsonDate(index: number, date: string) {
        const selector = `[data-testid="property-edit-someJson.0.date"] input`;
        await this.page.fill(selector, date);
    }

  
    async deleteJsonItem(index: number) {
        await this.page.click(`button[data-testid="delete-item"]:nth-of-type(${index + 1})`);
    }

    async clickSaveButton() {
        await this.page.getByTestId('button-save').click();
    }
}
