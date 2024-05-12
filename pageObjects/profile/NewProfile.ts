import { Locator, Page } from "@playwright/test";
import { ProfilePage } from "./ProfilePage";

export class NewProfile {
    readonly page: Page;
    readonly saveButton: Locator
  
    readonly profileBio: Locator;

    readonly publisher : Locator;


    constructor(page: Page) {
        this.page = page;
        this.profileBio = page.locator('input[name="bio"]')
        this.saveButton = page.locator('[data-testid="button-save"]')
        this.publisher = page.locator('#react-select-27-input')
    }


    async setProfileBio(bio: string) {
        await this.profileBio.fill(bio);
    }
    async setPublisher(publisher: string) {
        await this.page.getByTestId('property-edit-publisher').locator('.adminjs_Select').click()
        this.page.getByText(publisher).click();
    }

   
    async saveProfile() {
        await this.saveButton.click();
    }
    createProfile(_arg0: { bio: string; publisher: string; }) {
        this.setProfileBio(_arg0.bio)
        this.setPublisher(_arg0.publisher)
        this.saveProfile()
        return new ProfilePage(this.page);
    }
}