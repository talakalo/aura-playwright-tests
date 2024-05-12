import { Page } from '@playwright/test';
import { Browser, BrowserContext, chromium, firefox, webkit } from 'playwright';

export enum BrowserType {
  Chromium = 'chromium',
  Firefox = 'firefox',
  WebKit = 'webkit',
}

export class BrowserManager {
  private browser: Browser | undefined;
  private context: BrowserContext | undefined;
  private page: Page | undefined;

  async launchBrowser(browserType: BrowserType): Promise<void> {
    switch (browserType) {
      case BrowserType.Chromium:
        this.browser = await chromium.launch();
        break;
      case BrowserType.Firefox:
        this.browser = await firefox.launch();
        break;
      case BrowserType.WebKit:
        this.browser = await webkit.launch();
        break;
      default:
        throw new Error(`Unsupported browser type: ${browserType}`);
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser(): Promise<void> {
    if (this.page) {
      await this.page.close();
    }

    if (this.context) {
      await this.context.close();
    }

    if (this.browser) {
      await this.browser.close();
    }
  }

  getPage(): Page | undefined {
    return this.page;
  }
}