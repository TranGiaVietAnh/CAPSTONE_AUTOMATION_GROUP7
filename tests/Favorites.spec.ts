import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ListRoomPage } from "../pages/ListRoomPage";

// TC01- Lưu vào danh sách yêu thích
test("TC01: Thêm chỗ ở vào danh sách yêu thích", async ({ page }) => {
  const login = new LoginPage(page);
  const listing = new ListRoomPage(page);

  await page.goto("https://demo4.cybersoft.edu.vn/");

  await login.login();

  await listing.openFirstListing();
  await listing.addToFavorites();

  const isFav = await listing.isFavorited();
  expect(isFav).toBeTruthy();
});
