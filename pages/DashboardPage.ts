import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly title: Locator;
  readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("p.smm\\:pt-10.font-bold.text-white"); // chỉnh locator theo thực tế
    this.userName = page.locator(
      "span.ml-3.smm\\:text-white.leading-7.uppercase.smm\\:w-28.truncate"
    );
  }
  //kiểm tra xem đẫ vào dashboard chưa
  async isAtDashBoardPage() {
    await expect(this.title.isVisible());
  }
  // lấy title ở giữa header có text là thông tin người dùng
  async getTitleText(): Promise<string> {
    return (await this.title.textContent()) || "";
  }

  // lấy username của người dùng ở nút account
  async getUserNameText(): Promise<string> {
    return (await this.userName.textContent()) || "";
  }

  // so sánh xem liệu tên có trùng không
  async isUserNameMatchingTitle(): Promise<boolean> {
    const titleText = (await this.title.innerText()).trim();
    const userNameText = (await this.userName.innerText()).trim();

    // Ví dụ title có dạng: "THÔNG TIN NGƯỜI DÙNG VANH"
    return titleText.includes(userNameText.toUpperCase());
  }
}
