import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ListRoomPage } from "../pages/ListRoomPage";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { RoomDetailPage } from "../pages/RoomDetailPage";

test.describe("Test function admin", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let dashboardPage: DashboardPage;
  let listRoomPage: ListRoomPage;
  let roomDetailPage: RoomDetailPage;
   ;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto(); // Mở trang chủ
    loginPage = await homePage.openLoginPopup();
    await loginPage.login();
  });

  //TC01: Xác minh chức năng đăng nhập và xem chi tiết căn phòng đầu tiên ở HCM
  test("TC01: Xác minh chức năng đăng nhập và xem chi tiết căn phòng đầu tiên ở HCM", async ({ page}) => {
    //Chọn 1 chỗ ở (TP.HCM)
    const firstListing = homePage.HCMbutton;
    await firstListing.scrollIntoViewIfNeeded();
    await firstListing.waitFor({ state: "visible", timeout: 5000 });
    await firstListing.click();//click vào nút HCM

    //Chọn căn phòng đầu tiên ở HCM 
    listRoomPage = new ListRoomPage (page); 
    await listRoomPage.clickFirstRoomHCM();//click vào phòng đầu tiên HCM
    roomDetailPage = new RoomDetailPage (page);
    await expect(roomDetailPage.superHostLabel).toBeVisible({ //check xem có dòng "chủ nhà siêu cấp"
      timeout: 5000,
    });

  });
  //TC02: Kiểm tra hoạt động của nút “Ẩn bớt tiện nghi” trong phần chi tiết phòng
    test("TC02: Kiểm tra hoạt động của nút Ẩn bớt tiện nghi trong phần chi tiết phòng", async ({ page}) => {
    //Chọn 1 chỗ ở (TP.HCM)
    const firstListing = homePage.HCMbutton;
    await firstListing.scrollIntoViewIfNeeded();
    await firstListing.waitFor({ state: "visible", timeout: 5000 });
    await firstListing.click();//click vào nút HCM

    //Click nút ẩn tiện nghi
    listRoomPage = new ListRoomPage (page); 
    await listRoomPage.clickFirstRoomHCM();//click vào phòng đầu tiên HCM
    roomDetailPage = new RoomDetailPage (page);
    await roomDetailPage.clickHideAmenities(); //nhấn út ẩn tiện nghi
    await expect(roomDetailPage.amenTitle).toBeVisible();//check xem có dòng "các tiện ích đi kèm"

  });
  //TC03: Xác minh hiển thị bình luận và đánh giá sao của khách đã lưu trú
  test("TC03: Xác minh hiển thị bình luận và đánh giá sao của khách đã lưu trú", async ({ page}) => {
    //Chọn 1 chỗ ở (TP.HCM)
    const firstListing = homePage.HCMbutton;
    await firstListing.scrollIntoViewIfNeeded();
    await firstListing.waitFor({ state: "visible", timeout: 5000 });
    await firstListing.click();//click vào nút HCM

    //Vào trang chi tiết của phòng và kiểm tra bình luận
    listRoomPage = new ListRoomPage (page); 
    await listRoomPage.clickFirstRoomHCM();//click vào phòng đầu tiên HCM
    roomDetailPage = new RoomDetailPage (page);
    await roomDetailPage.commentsSection.scrollIntoViewIfNeeded(); //Tìm ô bình luận

    const count = await roomDetailPage.commentBlocks.count();
    expect(count).toBeGreaterThan(0); // phải có ít nhất 1 bình luận
    for (let i = 0; i < count; i++) {
    const comment = roomDetailPage.commentBlocks.nth(i);

    // Sao thường là các thẻ <span class="anticon anticon-star"> hoặc có aria-label="star"
    const stars = comment.locator('span[class*="anticon-star"], [aria-label="star"]');

    const starCount = await stars.count();
    // Kiểm tra: nếu sao = 0 -> fail
    expect(starCount, `❌ Bình luận thứ ${i + 1} không có sao hiển thị`).toBeGreaterThan(0);
  }
  });

  //TC04: Kiểm tra hoạt động của nút cộng/trừ trong phần chọn khách lưu trú
 test("TC04: Kiểm tra hoạt động của nút cộng/trừ trong phần chọn khách lưu trú", async ({ page}) => {
    //Chọn 1 chỗ ở (TP.HCM)
    const firstListing = homePage.HCMbutton;
    await firstListing.scrollIntoViewIfNeeded();
    await firstListing.waitFor({ state: "visible", timeout: 5000 });
    await firstListing.click();//click vào nút HCM

    //Click vào nút trừ và cộng
    listRoomPage = new ListRoomPage (page); 
    await listRoomPage.clickFirstRoomHCM();//click vào phòng đầu tiên HCM
    roomDetailPage = new RoomDetailPage (page);
    await roomDetailPage.decreaseButton.click();//click dấu trừ
    await expect(roomDetailPage.warningMsg).toContainText("Phải có tối thiểu 1 khách!");//thông báo
    await roomDetailPage.increaseButton.click();
    await roomDetailPage.increaseButton.click();//click dấu cộng 3 lần
    await roomDetailPage.increaseButton.click();
    await expect(roomDetailPage.warningMsg).toContainText("Đã đạt tới số khách tối đa!");// thông báo

  });
//TC05: Xác minh hoạt động của nút “Dịch sang tiếng Anh” trong chi tiết phòng
 test("TC05: Xác minh hoạt động của nút Dịch sang tiếng Anh trong chi tiết phòng", async ({ page}) => {
    //Chọn 1 chỗ ở (TP.HCM)
    const firstListing = homePage.HCMbutton;
    await firstListing.scrollIntoViewIfNeeded();
    await firstListing.waitFor({ state: "visible", timeout: 5000 });
    await firstListing.click();//click vào nút HCM

    //Click vào nút Dịch sang tiếng Anh
    listRoomPage = new ListRoomPage (page); 
    await listRoomPage.clickFirstRoomHCM();//click vào phòng đầu tiên HCM
    roomDetailPage = new RoomDetailPage (page);
    await roomDetailPage.translateToEnglish.click(); //nhấn nút Dịch sang tiếng Anh
    await expect(roomDetailPage.amenTitle).toHaveText("Các tiện ích đi kèm");//check xem có dòng "các tiện ích đi kèm"
    //Khi nhân vào nút dịch sang tiếng Anh, trang vẫn hiện lên tiếng Việt => Mặc dù test case pass, nhưng đó là bug
  });

  //TC06: Xác minh nút “Hiển thị thêm” mở rộng toàn bộ đoạn mô tả phòng
   test("TC06: Xác minh nút “Hiển thị thêm” mở rộng toàn bộ đoạn mô tả phòng", async ({ page}) => {
    //Chọn 1 chỗ ở (TP.HCM)
    const firstListing = homePage.HCMbutton;
    await firstListing.scrollIntoViewIfNeeded();
    await firstListing.waitFor({ state: "visible", timeout: 5000 });
    await firstListing.click();//click vào nút HCM

    //Click vào nút "Hiển thi thêm"
    listRoomPage = new ListRoomPage (page); 
    await listRoomPage.clickFirstRoomHCM();//click vào phòng đầu tiên HCM
    roomDetailPage = new RoomDetailPage (page);
    
    // Kiểm tra text có dài hơn không
    const beforeText = await roomDetailPage.roomDescription.innerText();
    const beforeWordCount = beforeText.trim().split(/\s+/).length;
    console.log("Số lượng từ trước khi click:", beforeWordCount);

    // Click nút "Hiển thị thêm"
    await roomDetailPage.showMoreButton.click();

    // Lấy số lượng từ của đoạn text sau khi mở rộng
    const afterText = await roomDetailPage.roomDescription.innerText();
    const afterWordCount = afterText.trim().split(/\s+/).length;
    console.log("Số lượng từ sau khi click:", afterWordCount);

    // Kiểm tra rằng đoạn text dài hơn
    expect(afterWordCount).toBeGreaterThan(beforeWordCount);
  });

});