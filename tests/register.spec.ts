import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";

test.describe("Test function register", () => {
  let homePage: HomePage;
  let registerPage: RegisterPage;

  // Thiết lập trước mỗi test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/cybersoft\.edu\.vn/);

    // Mở form đăng ký
    registerPage = await homePage.openRegister();
    await expect(page.getByRole("heading", { name: /đăng ký/i })).toBeVisible();
  });

  // ✅ TC01 - Đăng ký thành công
  test("TC01 - Đăng ký thành công với dữ liệu hợp lệ", async ({ page }) => {
    const uniqueEmail = `nguyenvana${Date.now()}@example.com`;
    await registerPage.register(
      "Nguyen Van A",
      uniqueEmail,
      "Abc@1234",
      "0912345678",
      "01/01/2000",
      "Nam"
    );
    await expect(page.getByText("Đăng ký thành công")).toBeVisible({
      timeout: 10000,
    });
  });

  // ❌ TC02 - Bỏ trống tên
  test("TC02 - Đăng ký thất bại do bỏ trống tên", async ({ page }) => {
    const uniqueEmail = `user${Date.now()}@example.com`;
    await registerPage.register(
      "",
      uniqueEmail,
      "Abc@1234",
      "0912345678",
      "01/01/2000",
      "Nam"
    );
    await expect(page.getByText("Vui lòng không bỏ trống")).toBeVisible({
      timeout: 5000,
    });
  });

  // ❌ TC03 - Email sai định dạng
  test("TC03 - Đăng ký thất bại do email sai định dạng", async ({ page }) => {
    await registerPage.register(
      "Nguyen Van C",
      "nguyenvanc",
      "Abc@1234",
      "0911111111",
      "03/03/2002",
      "Nữ"
    );
    await expect(
      page.getByText("Vui lòng nhập đúng định dạng email")
    ).toBeVisible({ timeout: 5000 });
  });

  // ❌ TC04 - Email đã tồn tại
  test("TC04 - Đăng ký thất bại do email đã được đăng ký", async ({ page }) => {
    const fixedEmail = "nguyenvana@example.com";
    await registerPage.register(
      "Test nek",
      fixedEmail,
      "Hehe@123",
      "0954565599",
      "03/05/2009",
      "Nữ"
    );
    await expect(page.getByText("Email đã tồn tại")).toBeVisible({
      timeout: 8000,
    });
  });

  // ❌ TC05 - Bỏ trống email
  test("TC05 - Đăng ký thất bại do bỏ trống email", async ({ page }) => {
    await registerPage.register(
      "Nguyen Van A",
      "",
      "Abc@1234",
      "0912345678",
      "01/01/2000",
      "Nam"
    );
    await expect(page.getByText("Vui lòng không bỏ trống")).toBeVisible({
      timeout: 5000,
    });
  });

  // ❌ TC06 - Bỏ trống password
  test("TC06 - Đăng ký thất bại do password bỏ trống", async ({ page }) => {
    const uniqueEmail = `user${Date.now()}@example.com`;
    await registerPage.register(
      "Nguyen Van A",
      uniqueEmail,
      "",
      "0912345678",
      "01/01/2000",
      "Nam"
    );
      await expect(page.getByText("Vui lòng không bỏ trống")).toBeVisible({
    timeout: 5000,
  });
  });

  // ❌ TC07 - Đăng ký thất bại do SĐT sai định dạng
  test("TC07 - Đăng ký thất bại do SĐT sai định dạng", async ({ page }) => {
    const uniqueEmail = `user${Date.now()}@example.com`;

    await registerPage.register(
      "Ah hi hi",
      uniqueEmail,
      "Nehe@123",
      "123abc",
      "02/11/1977",
      "Nam"
    );

    await expect(page.getByText("Số điện thoại không hợp lệ")).toBeVisible({
      timeout: 5000,
    });
  });

    // ❌ TC08 - Đăng ký thất bại do SĐT đã được đăng ký (Execution Status: Fail)
  test("TC08 - Đăng ký thất bại do SĐT đã được đăng ký", async ({ page }) => {
    // Sử dụng SĐT đã có trong hệ thống
    const usedPhone = "0954565599";
    const uniqueEmail = `user${Date.now()}@example.com`;

    await registerPage.register(
      "Test nek",
      uniqueEmail,
      "Hehe@123",
      usedPhone,
      "03/05/2009",
      "Nữ"
    );

    await expect(page.getByText("SĐT đã được đăng ký")).toBeVisible({
      timeout: 5000,
    });
  });

  // ❌ TC09 - Đăng ký thất bại do để trống SĐT
  test("TC09 - Đăng ký thất bại do để trống SĐT", async ({ page }) => {
    const uniqueEmail = `user${Date.now()}@example.com`;

    await registerPage.register(
      "Nguyen Van I",
      uniqueEmail,
      "Abc@1234",
      "", // bỏ trống phone
      "01/01/2000",
      "Nam"
    );

    await expect(page.getByText("Vui lòng không bỏ trống")).toBeVisible({
      timeout: 5000,
    });
  });

  // ❌ TC10 - Đăng ký thất bại do để trống ngày sinh
  test("TC10 - Đăng ký thất bại do để trống ngày sinh", async ({ page }) => {
    const uniqueEmail = `user${Date.now()}@example.com`;

    await registerPage.register(
      "Nguyen Van A",
      uniqueEmail,
      "Abc@1234",
      "0912345678",
      "", //bỏ trống birthday
      "Nam"
    );

    await expect(page.getByText("Vui lòng chọn ngày sinh")).toBeVisible({
      timeout: 5000,
    });
  });

  // // ❌ TC11 - Đăng ký thất bại do để trống toàn bộ thông tin
  test("TC11 - Đăng ký thất bại do để trống toàn bộ thông tin", async ({ page }) => {
    await registerPage.register(
      "",
      "",
      "",
      "",
      "",
      ""
    );
    await expect(page.getByText("Vui lòng không bỏ trống")).toBeVisible({
      timeout: 5000,
    });
  });

  // ❌ TC12 - Đăng ký thất bại do SĐT không có thực
  test("TC12 - Đăng ký thất bại do SĐT không có thực", async ({ page }) => {
    const uniqueEmail = `user${Date.now()}@example.com`;
    await registerPage.register(
      "Nguyen Van H",
      uniqueEmail,
      "Abc@1234",
      "0999999999", // số điện thoại giả, không có thực
      "01/01/2000",
      "Nữ"
    );
    await expect(page.getByText("SĐT không có thực")).toBeVisible({
      timeout: 8000,
    });
  });

  // ❌ TC13 - Đăng ký thất bại do email không có thực
  test("TC13 - Đăng ký thất bại do email không có thực", async ({ page }) => {
    await registerPage.register(
      "Ah hi hi",
      "notrealemail@notreal.com", // email giả
      "Nehe@123",
      "0345645619",
      "02/11/1977",
      "Nam"
    );
    await expect(page.getByText("Email không có thực")).toBeVisible({
      timeout: 8000,
    });
  });


});