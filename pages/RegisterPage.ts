import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly phoneInput: Locator;
  readonly birthdayInput: Locator;
  readonly genderDropdown: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator("#name");
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.phoneInput = page.locator("#phone");
    this.birthdayInput = page.locator("#birthday");
    this.genderDropdown = page.locator("#gender");
    this.submitButton = page.locator('form button[type="submit"]');
  }

  async register(
    name: string,
    email: string,
    password: string,
    phone: string,
    birthday: string,
    gender: string
  ) {
    // ❌ Chặn script web tự động đổi giá trị email
    await this.page.evaluate(() => {
  const input = document.querySelector("#email") as HTMLInputElement | null;
  if (input) {
    // Ngắt các event listener frontend tự động gán
    input.addEventListener = () => {};
    input.oninput = null;
    input.onchange = null;
  }
});

    // ✅ Điền dữ liệu
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.phoneInput.fill(phone);
    await this.phoneInput.press("Tab");

    // Điền ngày sinh
    if (birthday) {
      await this.birthdayInput.click();
      await this.birthdayInput.fill(birthday);
      await this.birthdayInput.press("Enter");
    }

    // Chọn giới tính
    if (gender) {
      await this.genderDropdown.click();
      await this.page.getByText(gender, { exact: true }).click();
    }

    // ✅ Click Đăng ký
    await this.submitButton.click();

    // Chờ trang xử lý
    await this.page.waitForTimeout(5000);
  }

  async getToastMessage() {
  return await this.page.locator(".ant-notification-notice-message").innerText();
}

async getValidationMessage() {
  return await this.page.locator(".ant-form-item-explain-error").first().innerText();
}
}
