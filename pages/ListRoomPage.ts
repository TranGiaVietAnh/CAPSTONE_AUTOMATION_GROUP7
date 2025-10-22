import { Locator, Page } from "@playwright/test";

export class ListRoomPage {
  readonly page: Page;
  readonly firstListing = ".ant-card-body >> nth=0";
  readonly heartButton = 'button:has(svg path[d^="m16"])';
  readonly heartActive = 'button:has(svg[fill="red"])';
  readonly firstRoomHCM: Locator; //Room đầu tiên ở HCM

  constructor(page: Page) {
    this.page = page;
    //Room đầu ở trang HCM
    this.firstRoomHCM = page.locator('p.truncate.text-xl', { hasText: 'NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!' });
  }
  
  async openFirstListing() {
    await this.page.click(this.firstListing);
  }

  async addToFavorites() {
    await this.page.click(this.heartButton);
  }

  async isFavorited() {
    return this.page.isVisible(this.heartActive);
  }

   async clickFirstRoomHCM() {
  await this.firstRoomHCM.click(); //Mở phòng đầu HCM
  }

}
