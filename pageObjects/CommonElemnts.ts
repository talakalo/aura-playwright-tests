abstract class CommonElemnts {
    protected page: import('@playwright/test').Page;

    constructor(page: import('@playwright/test').Page) {
        this.page = page;
    }

    async clickCreateNewButton(): Promise<void> {
        await this.page.click(this.getCreateButtonSelector());
    }

    protected abstract getCreateButtonSelector(): string;
}


