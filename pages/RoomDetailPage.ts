import { Page, Locator } from "@playwright/test";

export class RoomDetailPage {
  readonly page: Page;
  readonly superHostLabel: Locator; //"Chủ nhà siêu cấp"
  readonly amenTitle: Locator; //Dòng "Các tiện ích đi kèm"
  readonly hideAmenButton: Locator; //Nút ẩn bớt tiện nghi
  readonly commentsSection: Locator; //Dòng bình luận
  readonly commentBlocks: Locator; //Lấy danh sách tất cả các khối bình luận
  readonly warningMsg: Locator;// Cảnh báo chung
  readonly decreaseButton: Locator; // nút "–"
  readonly increaseButton: Locator; // nút "+"
  readonly translateToEnglish: Locator; //nút "Dịch sang tiếng Anh" 
  readonly showMoreButton: Locator; // Nút "Hiển thị thêm"
  readonly roomDescription: Locator; // Đoạn text mô tả

  constructor(page: Page) {
    this.page = page;
    this.superHostLabel = page.locator('span.text-gray-600', { hasText: 'Chủ nhà siêu cấp' });
    this.amenTitle = page.locator('h3.text-xl.font-bold', { hasText: 'Các tiện ích đi kèm' });
    this.hideAmenButton = page.locator('button', { hasText: 'Ẩn bớt tiện nghi' });
    this.commentsSection = page.getByRole('heading', { name: 'Bình luận' }); //Dòng text bình luận
    this.commentBlocks = page.locator("div:has(span.uppercase.font-bold)"); //Danh sách bình luận
    this.warningMsg = page.locator('.ant-message-notice-content .ant-message-warning');//cảnh báo chung
    // this.decreaseButton = page.locator('button', { hasText: '-' });//nút trừ 
    // this.increaseButton = page.locator('button', { hasText: '+' });//nút cộng
    this.decreaseButton = page.locator('button:has(div)', { hasText: /[-–−]/ }); //nút trừ
    this.increaseButton = page.locator('button:has(div)', { hasText: /\+/ });  //nút cộng
    this.translateToEnglish = page.locator('span', { hasText: 'Dịch sang tiếng Anh' });//nút dịch sang Tiếng Anh
    this.roomDescription = page.locator('p.text-justify.py-3'); //Text mô tả phòng
    this.showMoreButton = page.locator('span.font-bold.underline.cursor-pointer', {
      hasText: 'Hiển thị thêm',}) //Nút Hiển thị thêm
  }
   async isSuperHostVisible(): Promise<boolean> { //"Chủ nhà siêu cấp" có hiển thị hay k
    return await this.superHostLabel.isVisible();}

  async clickHideAmenities() {
    await this.hideAmenButton.click();
}
}