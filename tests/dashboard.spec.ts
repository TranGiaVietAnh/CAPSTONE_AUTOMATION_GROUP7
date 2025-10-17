// import { test, expect } from "@playwright/test";
// import { DashboardPage } from "../pages/DashboardPage";
// import { HomePage } from "../pages/HomePage";
// import { LoginPage } from "../pages/LoginPage";
// import { EMAIL } from "../utils/utils";
// // test("So sánh userName và title", async ({ page }) => {
// //   const dashboardPage = new DashboardPage(page);

// //   const titleText = (await dashboardPage.getTitleText()).trim();
// //   const userNameText = (await dashboardPage.getUserNameText()).trim();

// //   // kiểm tra xem title có chứa username không
// //   expect(titleText).toContain(userNameText.toUpperCase());
// // });

// test.describe("Test function admin", () => {
//   let loginPage: LoginPage;
//   let dashboardPage: DashboardPage;
//   let homePage: HomePage;
//   //set up beforeEach
//   test.beforeEach(async ({ page }) => {
//     //1 khởi tạo các page
//     homePage = new HomePage(page);
//     await homePage.goto();
//     loginPage = await homePage.openLoginPopup();
//     await loginPage.login();
//     dashboardPage = await homePage.openDashboard();
//   });

//   //test case2: xác nhận xem có dùng trang admin hay không
//   test("isAtDashBoardPage", async () => {
//     await dashboardPage.isAtDashBoardPage();
//   });
//   //test case3.1: update ảnh avatar
//   test("Upload avatar thành công", async () => {
//     // đợi để load các IMG lên
//     await expect(dashboardPage.avatarBiggest).toHaveAttribute("src", /.+/);
//     const avatar1 = dashboardPage.avatarBiggest;
//     const avatar2 = dashboardPage.avatarSmallest;
//     // Upload ảnh
//     await dashboardPage.uploadAvatar("tests/fixtures/avatar.png");

//     // Kiểm tra xem ảnh đã đổi (hoặc có thông báo thành công)
//     const srcAfter1 = await avatar1.getAttribute("src"); // lấy source sau khi đổi ảnh
//     const srcAfter2 = await avatar2.getAttribute("src");

//     // 2. Hai avatar sau khi upload phải giống nhau
//     await expect(srcAfter1).toBe(srcAfter2);
//     // thông báo lưu ảnh thành công
//     await dashboardPage.isSuccessfullyUpdate();
//   });
//   //test case3.2: update ảnh avatar fail do ảnh >1MB
//   test("Upload avatar thất bại với ảnh lớn hơn 1mb", async () => {
//     // Upload ảnh
//     await dashboardPage.uploadAvatar("tests/fixtures/avatarBigger1mb.png");
//     // thông báo lưu ảnh thất bại
//     await dashboardPage.isFailUpdate1MBStorage();
//   });
//   //test case3.3: update ảnh avatar fail do update file không đúng định dạng ảnh
//   test("Upload avatar thất bại với file không đúng định dạng ảnh", async () => {
//     // Upload ảnh
//     await dashboardPage.uploadAvatar("tests/fixtures/notIMG.txt");
//     // thông báo lưu ảnh thất bại
//     await dashboardPage.isFailUpdateWrongType();
//   });
//   //test case4: so sánh xem liệu img trong popup trùng với img bên ngoài không
//   test("Ảnh trong popup khác với ảnh bên ngoài", async () => {
//     await dashboardPage.updateImgLink.click();
//     // kiểm tra ảnh bên ngoài popup có phải ảnh mặc định khồn
//     await expect(dashboardPage.avatarBiggest).not.toHaveAttribute(
//       "src",
//       /6596121\.png/
//     );
//     //kiểm tra xem ảnh bên trong có phải ảnh mặc đinh không
//     const src = await dashboardPage.avatarImgPopup.getAttribute("src");
//     expect(src).toContain("6596121");
//   });
//   //test case5:Kiểm tra thông tin người dùng trong hồ sơ
//   test("Kiểm tra thông tin người dùng trong hồ sơ", async () => {
//     await dashboardPage.openProfile();
//     const inputEmailValue = await dashboardPage.inputEmail.inputValue();
//     const inputPhoneValue = await dashboardPage.inputPhone.inputValue();
//     const inputNameValue = await dashboardPage.inputName.inputValue();
//     const inputDOBValue = await dashboardPage.inputDOB.inputValue();
//     const inputGenderValue = await dashboardPage.inputGender.innerText();
//     const userName = await dashboardPage.userName.innerText();
//     await expect(inputEmailValue).toBe(EMAIL);
//     await expect(inputNameValue.toUpperCase()).toBe(userName);
//     await expect(inputPhoneValue).not.toBe("");
//     await expect(inputDOBValue).not.toBe("");
//     await expect(inputGenderValue).not.toBe("");
//   });
//   //test case6: nhập thông tin vào ô input chuẩn regex
//   test("Kiểm tra nhập thông tin không sai regex", async () => {
//     await dashboardPage.openProfile();
//     await dashboardPage.inputEmail.fill("168bunthegod@gmail.com");
//     await dashboardPage.inputPhone.fill("0985041841");
//     await dashboardPage.inputName.fill("Việt Anh");
//     await dashboardPage.inputDOB.fill("16/08/2001");
//     await dashboardPage.searchGender.click();
//     await dashboardPage.searchGenderGirl.click();

//     const inputEmailValue = await dashboardPage.inputEmail.inputValue();
//     const inputPhoneValue = await dashboardPage.inputPhone.inputValue();
//     const inputNameValue = await dashboardPage.inputName.inputValue();
//     const inputDOBValue = await dashboardPage.inputDOB.inputValue();
//     const inputGenderValue = await dashboardPage.inputGender.innerText();

//     await expect(inputEmailValue).toBe("168bunthegod@gmail.com");
//     await expect(inputNameValue).toBe("Việt Anh");
//     await expect(inputPhoneValue).toBe("0985041841");
//     await expect(inputDOBValue).toBe("16/08/2001");
//     await expect(inputGenderValue).toBe("Nữ");
//   });

//   //test case7: nhập thông tin vào ô input sai regex
//   test("Kiểm tra nhập thông tin sai regex", async () => {
//     await dashboardPage.openProfile();
//     await dashboardPage.inputEmail.fill("168bunthegod");
//     await dashboardPage.inputPhone.fill("12345567");
//     await dashboardPage.inputName.fill("1233");
//     await dashboardPage.clearDOB.click(); //clear ô giới tính
//     await dashboardPage.clearGender.click(); //clear ô ngày sinh

//     await expect(dashboardPage.errorEmail).toHaveText("Email không hợp lệ!");
//     await expect(dashboardPage.errorName).toHaveText("Họ tên không hợp lệ!");
//     await expect(dashboardPage.errorDob).toHaveText("Vui lòng chọn ngày sinh!");
//     await expect(dashboardPage.errorGender).toHaveText(
//       "Vui lòng chọn giới tính"
//     );
//     await expect(dashboardPage.errorPhone).toHaveText(
//       "Sai định dạng số điện thoại!"
//     );
//   });
//   //test case: với trường hợp email đã tồn tại thì sẽ có thông báo email tồn tại
//   //test case8: kiểm tra update thông tin với thông tin truyền vào ô input đúng regex
//   // test case này update thành công nên sẽ làm ảnh hưởng đến việc đăng nhặp nên để chạy sau

//   // test("Kiểm tra updatee thông tin đúng regex", async () => {
//   //   //vào popup infor
//   //   await dashboardPage.openProfile();
//   //   //điển các trường thông tin
//   //   await dashboardPage.inputEmail.fill("167bunthegod@gmail.com");
//   //   await dashboardPage.inputPhone.fill("0985041841");
//   //   await dashboardPage.inputName.fill("Việt Anh");
//   //   await dashboardPage.inputDOB.fill("16/08/2001");
//   //   await dashboardPage.searchGender.click();
//   //   await dashboardPage.searchGenderGirl.click();
//   //   await dashboardPage.inforUpdateButton.click();
//   //   await expect(dashboardPage.successUpdateInfoMess).toBeVisible(); // hiển thị update thành công
//   //   //vào lại popup infor để kiểm tra
//   //   await dashboardPage.openProfile();
//   //   const inputEmailValue = await dashboardPage.inputEmail.inputValue();
//   //   const inputPhoneValue = await dashboardPage.inputPhone.inputValue();
//   //   const inputNameValue = await dashboardPage.inputName.inputValue();
//   //   const inputDOBValue = await dashboardPage.inputDOB.inputValue();
//   //   const inputGenderValue = await dashboardPage.inputGender.innerText();

//   //   await expect(inputEmailValue).toBe("167bunthegod@gmail.com");
//   //   await expect(inputNameValue).toBe("Việt Anh");
//   //   await expect(inputPhoneValue).toBe("0985041841");
//   //   await expect(inputDOBValue).toBe("16/08/2001");
//   //   await expect(inputGenderValue).toBe("Nữ");
//   // });
//   //test case9: kiểm tra update thông tin với thông tin truyền vào ô input sai regex
//   test("Kiểm tra updatee thông tin sai regex", async () => {
//     //vào popup infor
//     await dashboardPage.openProfile();
//     //điển các trường thông tin
//     await dashboardPage.inputEmail.fill("168bunthegod");
//     await dashboardPage.inputPhone.fill("12345567");
//     await dashboardPage.inputName.fill("1233");
//     await dashboardPage.clearDOB.click(); //clear ô giới tính
//     await dashboardPage.clearGender.click(); //clear ô ngày sinh
//     await dashboardPage.inforUpdateButton.click();
//     //không hiện thông báo update thành công
//     await expect(dashboardPage.successUpdateInfoMess).not.toBeVisible({
//       timeout: 10000,
//     });
//   });
// });
