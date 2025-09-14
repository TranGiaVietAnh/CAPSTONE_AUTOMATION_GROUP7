import { Page, Locator, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { BASE_URL } from "../utils/utils";
export class HomePage {
  readonly page: Page;
  readonly nonImgAvatarButton: Locator;
  readonly imgAvatarButton: Locator;
  readonly dashboardLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.nonImgAvatarButton = page.locator(
    //   "button.text-sm.bg-main.rounded-full"
    // );
    this.nonImgAvatarButton = page.locator(
      'button:has(img[src*="6596121.png"])'
    );
    this.imgAvatarButton = page.locator("#user-menu-button");
    this.dashboardLink = page.locator("text=Dashboard");
    this.loginLink = page.locator("text=Đăng nhập");
  }

  async goto() {
    await this.page.goto(BASE_URL || "");
  }

  async openLoginPopup(): Promise<LoginPage> {
    await expect(this.nonImgAvatarButton).toBeVisible();
    await this.nonImgAvatarButton.click();
    await expect(this.loginLink).toBeVisible();
    await this.loginLink.click();
    return new LoginPage(this.page);
  }
  async openDashboard(): Promise<DashboardPage> {
    await this.imgAvatarButton.click(); // mở dropdown
    await this.dashboardLink.click();
    return new DashboardPage(this.page);
  }
}
