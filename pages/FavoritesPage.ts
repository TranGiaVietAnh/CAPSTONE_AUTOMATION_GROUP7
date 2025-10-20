import { Page } from "@playwright/test";

export class FavoritesPage {
  constructor(private page: Page) {}

  async openFavorites() {
    await this.page.click('text=Yêu thích');
  }

  async getFavoritesCount(): Promise<number> {
    return this.page.locator('.favorite-item').count();
  }
}