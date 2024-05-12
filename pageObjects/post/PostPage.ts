import { Page } from '@playwright/test';
import { NewPost } from './NewPost';

export class PostPage {
    
    readonly page: Page;
    readonly createNewButton = 'a[data-testid="action-new"]';
    readonly filterButton = 'a[data-css="Post-filter-button"]';
    readonly filterForm = 'form[data-css="Post-filter-drawer"]';
    readonly filterApplyButton = 'button[data-css="Post-filter-drawer-button-apply"]';
    readonly postTable = 'table[data-css="Post-table"]';
    readonly saveButton = 'table[data-css="Post-table"]';
    constructor(page: Page) {
        
        this.page = page;
    }
   
    async navigateTo() {
        await this.page.goto('http://localhost:3000/admin/resources/Post');
    }

    async createNewPost() {
        await this.page.click(this.createNewButton);
        return new NewPost(this.page);
    }

    async openFilterDrawer() {
        await this.page.click(this.filterButton);
        await this.page.waitForSelector(this.filterForm, { state: 'visible' });
    }

    async applyFilter() {
        await this.page.click(this.filterApplyButton);
        // Wait for the filter to be applied and the table to refresh
        await this.page.waitForSelector(this.postTable);
    }

    async showPost(index: number) {
        await this.page.getByTestId('actions-dropdown').nth(index).hover();
        await this.page.getByTestId('action-show').nth(index).click();
    }
    async sort() {
        const sortTble = this.page.locator('[data-css="Post-table-head-row"]>td:nth-child(3)')
        sortTble.click();

    }
    async editPost(index: number) {
        await this.page.getByTestId('actions-dropdown').nth(index).hover();
        await this.page.getByTestId('action-edit').nth(index).click();
        return new NewPost(this.page)
       
    }

    async deletePost(index: number) {
        await this.page.getByTestId('actions-dropdown').nth(index).hover();
        await this.page.getByTestId('action-delete').nth(index).click();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
}
