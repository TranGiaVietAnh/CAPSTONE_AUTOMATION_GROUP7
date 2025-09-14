import { Page, Locator } from "@playwright/test";
import { EMAIL, PASSWORD } from "../utils/utils";
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(
      "input[placeholder='Vui lòng nhập tài khoản']"
    );
    this.passwordInput = page.locator(
      "input[placeholder='Vui lòng nhập mật khẩu']"
    );
    this.loginButton = page.locator(
      'button[type="submit"]:has-text("Đăng nhập")'
    );
    this.signUpButton = page.locator("button", { hasText: "Đăng ký" });
  }

  async login(username: string = EMAIL, password: string = PASSWORD) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
