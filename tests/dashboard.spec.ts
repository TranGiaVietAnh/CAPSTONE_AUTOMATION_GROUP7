import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

// test("So sánh userName và title", async ({ page }) => {
//   const dashboardPage = new DashboardPage(page);

//   const titleText = (await dashboardPage.getTitleText()).trim();
//   const userNameText = (await dashboardPage.getUserNameText()).trim();

//   // kiểm tra xem title có chứa username không
//   expect(titleText).toContain(userNameText.toUpperCase());
// });

test.describe("Test function admin", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let homePage: HomePage;
  //set up beforeEach
  test.beforeEach(async ({ page }) => {
    //1 khởi tạo các page
    homePage = new HomePage(page);
    await homePage.goto();
    loginPage = await homePage.openLoginPopup();
    await loginPage.login();
    dashboardPage = await homePage.openDashboard();
  });

  //test case1: xác nhận xem có dùng trang admin hay không
  //toBeTruthy kiểm tra xem giá trị trả về có phải true ko
  //toBeFalsy kiểm tra xem giá trị trả ve có phải false ko

  test("isAtDashBoardPage", async () => {
    await dashboardPage.isAtDashBoardPage();
    // expect(adminPage.isAtAdminPage()).toBe(true);
    // expect(adminPage.isAtAdminPage()).toBeTruthy();
    // khi so sánh với toBeTruthy thì nó sẽ luôn true
  });
});
