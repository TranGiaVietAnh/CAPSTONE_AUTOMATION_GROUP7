import { Page, Locator, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { BASE_URL } from "../utils/utils";
import { RegisterPage } from "./RegisterPage";
export class HomePage {
  readonly page: Page;
  readonly nonImgAvatarButton: Locator;
  readonly imgAvatarButton: Locator;
  readonly dashboardLink: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly HCMbutton: Locator; //nut chọn cac phong HCM
  readonly heartbutton: Locator; //nút tim
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
    this.registerLink = page.locator("text=Đăng ký");
    this.HCMbutton = page.locator(".ant-card-body").first();
    this.heartbutton = page.locator(".absolute.top-3.right-3.z-30").first();
  }

  async goto() {
    await this.page.goto(BASE_URL || "");
    await this.page.waitForLoadState("networkidle");
  }
  // mở login popup và đăng nhập
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
  async openRegister(): Promise<RegisterPage> {
    await expect(this.nonImgAvatarButton).toBeVisible();
    await this.nonImgAvatarButton.click();
    await expect(this.registerLink).toBeVisible();
    await this.registerLink.click();
    return new RegisterPage(this.page);
  }
}
