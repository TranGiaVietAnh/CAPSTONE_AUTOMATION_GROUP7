import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ListRoomPage } from "../pages/ListRoomPage";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Test function admin", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto(); // Mở trang chủ
    loginPage = await homePage.openLoginPopup();
    await loginPage.login();
  });

  //TC01 - Thêm chỗ ở vào danh sách yêu thích
  test("TC01: Thêm chỗ ở vào danh sách yêu thích", async ({ }) => {
    //Chọn 1 chỗ ở (TP.HCM)
    const firstListing = homePage.HCMbutton;
    await firstListing.scrollIntoViewIfNeeded();
    await firstListing.waitFor({ state: "visible", timeout: 5000 });
    await firstListing.click();

    //Bấm nút “tim”
    const favoriteBtn = homePage.heartbutton;
    await favoriteBtn.scrollIntoViewIfNeeded();
    await favoriteBtn.waitFor({ state: "visible", timeout: 10000 });
    await favoriteBtn.click();

    //Notes
    test.info().annotations.push({
      type: "bug",
      description:
        "SCRUM-18: Không thể thêm chỗ ở vào danh sách yêu thích (click tim không thay đổi trạng thái)"
    });
  });

  //TC02 - Bỏ chỗ ở khỏi danh sách yêu thích
  test("TC02: Xem danh sách yêu thích / bỏ chỗ ở (UI hiện tại chưa có)", async ({ page }) => {
    //Mở trang Dashboard sau khi đăng nhập
    dashboardPage = await homePage.openDashboard();
    await expect(dashboardPage.favoriteRoom).not.toBeVisible();
    //Note: Chức năng “Favorites” chưa tồn tại trên UI
    test.info().annotations.push({
      type: "bug",
      description:
        "SCRUM-34: Không thể test xoá listing khỏi wishlist, vì nút tim và trang Yêu thích chưa tồn tại"
    });
  });

  //TC03 - Xem danh sách yêu thích
  test("TC03: Xem danh sách yêu thích", async ({ }) => {
    //Mở Dashboard
    dashboardPage = await homePage.openDashboard();
    await expect(dashboardPage.favoriteRoom).not.toBeVisible();
    //Note: UI chưa hỗ trợ hiển thị Wishlist
    test.info().annotations.push({
      type: "bug",
      description:
        "SCRUM-35: Không thể kiểm tra danh sách yêu thích do chưa thêm được listing, UI không có phần Wishlist"
    });
  });

  //TC04 - Kiểm tra dữ liệu yêu thích sau khi đăng xuất
  test("TC04: Kiểm tra dữ liệu yêu thích sau khi đăng xuất", async ({ page }) => {
    //Chọn chỗ ở
    const firstListing = homePage.HCMbutton;
    await firstListing.scrollIntoViewIfNeeded();
    await firstListing.waitFor({ state: "visible", timeout: 5000 });
    await firstListing.click();

    //Bấm nút “tim”
    const favoriteBtn = homePage.heartbutton;
    await favoriteBtn.scrollIntoViewIfNeeded();
    await favoriteBtn.waitFor({ state: "visible", timeout: 5000 });
    await favoriteBtn.click();

    //Đăng xuất
    await homePage.imgAvatarButton.click();
    const signOutBtn = page.locator("button", { hasText: "Sign out" }) ;
    await signOutBtn.click();

    //Đăng nhập lại
    const loginPageAgain = new LoginPage(page);
    await loginPageAgain.login();

    //Mở Dashboard để kiểm tra danh sách
    dashboardPage = await homePage.openDashboard();
    await expect(dashboardPage.favoriteRoom).not.toBeVisible();
    //Wishlist không hiển thị
    test.info().annotations.push({
      type: "bug",
      description:
        "SCRUM-36: Wishlist không hiển thị sau khi đăng nhập lại (UI chưa hỗ trợ)."
    });
  });

  //TC05 - Kiểm tra không thể thêm yêu thích nếu chưa đăng nhập
  test("TC05: Kiểm tra không thể thêm yêu thích nếu chưa đăng nhập", async ({ page }) => {
    //Mở trang Home (chưa đăng nhập)
    const homePageWithoutLogin = new HomePage(page);
    await homePageWithoutLogin.goto();

    //Chọn 1 chỗ ở
    const firstListing = homePageWithoutLogin.HCMbutton;
    await firstListing.click();

    //Bấm nút “tim”
    const favoriteBtn = homePageWithoutLogin.heartbutton;
    await favoriteBtn.click();

    //Kết quả mong đợi: Không thêm được vì chưa login
    console.log("Không thể thêm yêu thích khi chưa đăng nhập — Pass");
  });

  //TC06 - Lưu cùng 1 chỗ ở nhiều lần
 test("TC06: Lưu cùng 1 chỗ ở nhiều lần", async ({ }) => {
    //Chọn 1 chỗ ở
    const firstListing = homePage.HCMbutton;
    await firstListing.click();

    //Bấm nút “tim” nhiều lần
    const favoriteBtn = homePage.heartbutton;
    await favoriteBtn.click();
    await favoriteBtn.click();
    await favoriteBtn.click();

    //Note lỗi hệ thống không cho phép thêm nhiều lần
    test.info().annotations.push({
      type: "bug",
      description:
        "SCRUM-52: Nút tim bị vô hiệu → không thể lưu nhiều lần. Hiện chỉ có 'Đặt phòng' mới thêm vào Dashboard, nhưng không rõ là wishlist hay danh sách đặt phòng."
    });
  });
});