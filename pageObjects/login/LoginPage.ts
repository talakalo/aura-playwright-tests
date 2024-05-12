import { Page, expect } from '@playwright/test';
import { DashboardPage } from '../dashboard/DashboardPage';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput;
    readonly passwordInput: string;
    readonly loginButton: string;
    readonly errorMessage: string;
    readonly Url: string;
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = 'input[name="email"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = '//button[text()="Login"]';
        this.errorMessage = '.error-message';
        this.Url='http://localhost:3000/admin/login'
    }

    async goTo() {
        await this.page.goto(this.Url);
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
    async loginAndReturnDashboardPage(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
        return new DashboardPage(this.page)
    }

    async checkErrorMessage(message: string) {
        await expect(this.page.locator('text=' + message)).toBeVisible();
    }

    async checkRedirection(url: string) {
        await expect(this.page).toHaveURL(url);
    }
}
