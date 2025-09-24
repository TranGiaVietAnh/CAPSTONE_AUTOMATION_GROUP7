import { Page } from "@playwright/test";

export class ListRoomPage {
  readonly page: Page;
  readonly firstListing = ".ant-card-body >> nth=0";
  readonly heartButton = 'button:has(svg path[d^="m16"])';
  readonly heartActive = 'button:has(svg[fill="red"])';

  constructor(page: Page) {
    this.page = page;
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
}
