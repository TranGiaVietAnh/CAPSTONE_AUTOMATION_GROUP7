import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly title: Locator; // tên người dùng title ở giữa
  readonly userName: Locator; //tên người dùng góc phải trên màn hình
  readonly userName2: Locator; // tên người dùng ở câu xin chào
  readonly helloTitle: Locator; // câu chào
  //popup update ảnh
  readonly fileInput: Locator; // input nhận file
  readonly uploadBtn: Locator; // nút upload ảnh
  readonly avatarImgPopup: Locator; //ava trong popup đổi ảnh
  readonly updateImgLink: Locator; //đường dẫn vào để update ảnh
  readonly avatarBiggest: Locator; // avatar to nhất trong trang
  readonly avatarSmallest: Locator; //avatar nhỏ nhất trong trang
  readonly successMessage: Locator; // message lưu ảnh thành công
  readonly errorStorageMessage: Locator; // message thông báo ảnh phải <1mb
  readonly errorWrongTypeMessage: Locator; // message thông báo phải đúng định dạng ảnh
  readonly sourceBaseImg: string;
  //popup thông tin
  readonly updateInforLink: Locator; //button truy cập vào popup infor
  readonly modalTitle: Locator; //title trong popup infor
  readonly inputEmail: Locator;
  readonly inputName: Locator;
  readonly inputPhone: Locator;
  readonly inputDOB: Locator;
  readonly inputGender: Locator; //phần text của chọn giới tính
  readonly searchGender: Locator; //phần chọn giới tính
  readonly searchGenderBoy: Locator; //phần chọn giới tính
  readonly searchGenderGirl: Locator; //phần chọn giới tính
  readonly inforUpdateButton: Locator; //nút update thông tin
  readonly errorEmail: Locator; //thông báo sai định dạng email hoặc chưa nhập email
  readonly errorName: Locator; //thông báo sai định dạng email hoặc chưa nhập tên
  readonly errorDob: Locator; //thông báo chưa nhập ngày tháng năm sinh
  readonly errorGender: Locator; //thông báo chưa chọn giới tính
  readonly errorPhone: Locator; //thông báo sai định dạng số điện thoại hoặc chưa nhập sdt
  readonly clearGender: Locator; //nút clear thông in ô gender
  readonly clearDOB: Locator;
  readonly successUpdateInfoMess: Locator; //thông báo update thông tin thành công
  readonly favoriteRoom: Locator; //text phòng yêu thich
  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("p.smm\\:pt-10.font-bold.text-white"); // chỉnh locator theo thực tế
    this.userName = page.locator(
      "span.ml-3.smm\\:text-white.leading-7.uppercase.smm\\:w-28.truncate"
    );
    this.userName2 = page.locator("p.font-bold.text-xl span.capitalize");
    this.helloTitle = page.locator(".font-bold.text-xl").last();
    this.fileInput = page.locator('input[type="file"]');
    this.uploadBtn = page.locator('button:has-text("Upload Avatar")');
    this.avatarImgPopup = page.locator(
      "img.mx-auto.w-24.h-24.object-cover.rounded-full"
    );
    this.updateImgLink = page.getByRole("button", { name: /Cập nhật ảnh/i });
    this.avatarBiggest = page.locator(
      "img.mx-auto.w-36.h-36.object-cover.rounded-full"
    );
    this.avatarSmallest = page.locator(".w-10.h-10.rounded-full.object-cover");
    this.successMessage = page.getByText("Cập nhật avatar thành công!");
    this.errorStorageMessage = page.getByText("Dung lượng hình phải dưới 1Mb");
    this.errorWrongTypeMessage = page.getByText(
      "Chỉ cho phép dịnh dạng (jpg, jpeg, png, gif)"
    );
    this.sourceBaseImg = "6596121.png";
    this.updateInforLink = page.getByRole("button", {
      name: "Chỉnh sửa hồ sơ",
    });
    this.modalTitle = page
      .locator(".ant-modal-header")
      .locator(".ant-modal-title");
    this.inputEmail = page.locator("input[placeholder='vidu@gmail.com']");
    this.inputPhone = page.locator("#phone");
    this.inputName = page.locator("#name");
    this.inputDOB = page.locator("#birthday");
    this.inputGender = page.locator("span.ant-select-selection-item");
    this.searchGender = page.locator("div.ant-select-selector");
    this.searchGenderGirl = page.locator(".ant-select-item[title='Nữ']");
    this.searchGenderBoy = page.locator(".ant-select-item[title='Nam']");
    this.inforUpdateButton = page.locator(
      ".ant-btn.css-mzwlov.ant-btn-primary.bg-blue-500"
    );
    this.errorEmail = page.locator("#email_help .ant-form-item-explain-error");
    this.errorName = page.locator("#name_help .ant-form-item-explain-error");
    this.errorGender = page.locator(
      "#gender_help .ant-form-item-explain-error"
    );
    this.errorDob = page.locator("#birthday_help .ant-form-item-explain-error");
    this.errorPhone = page.locator("#phone_help .ant-form-item-explain-error");
    this.clearGender = page.locator("span.ant-select-clear");
    this.clearDOB = page.locator("span.ant-picker-clear");
    this.successUpdateInfoMess = page.locator(
      "text=Cập nhật thông tin thành công"
    );
    this.favoriteRoom =  page.locator(
      "text= Phòng Yêu Thích"
    );
  }
  //kiểm tra xem đẫ vào dashboard chưa
  async isAtDashBoardPage() {
    await expect(this.helloTitle).toBeVisible();
  }
  //update ảnh thành công show message thành công
  async isSuccessfullyUpdate() {
    await expect(this.successMessage).toBeVisible();
  }
  //update anh fail show message lỗi
  async isFailUpdate1MBStorage() {
    await expect(this.errorStorageMessage).toBeVisible({ timeout: 10000 });
  }
  //update fail vì update không đúng định dạng
  async isFailUpdateWrongType() {
    await expect(this.errorWrongTypeMessage).toBeVisible();
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
  // update ảnh
  async uploadAvatar(filePath: string) {
    //click nút cập nhật ảnh để mở popup
    await this.updateImgLink.click();
    //chọn file
    await this.fileInput.setInputFiles(filePath);
    await this.uploadBtn.click();
  }

  async openProfile() {
    await expect(this.updateInforLink).toBeVisible();
    await this.updateInforLink.click();
    await expect(this.modalTitle).toBeVisible();
  }
}
