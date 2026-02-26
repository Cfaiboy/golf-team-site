球隊資訊查詢（靜態網站 + Apps Script API）- 快速上線指南

1) Google Sheets
- 把你的 Excel 上傳到 Google Drive，使用 Google 試算表開啟（轉成 Sheets）
- 建議同一份試算表內保留分頁名稱：
  會員總表、年度成績、總月例賽、1月例賽...12月例賽、財務報表、隊球庫存、參數設定（等）

2) Apps Script（部署成 API）
- 在試算表：擴充功能 → Apps Script
- 貼上你那份 doGet 程式（我也可以幫你再加上：會員/月例賽/年度榜 API）
- 部署 → 新增部署作業 → 網路應用程式
  - 執行身分：你
  - 存取權：任何人
- 複製部署網址（/exec 結尾）

3) 設定前端 API_BASE
- 打開 config.js，把 API_BASE 換成你的 Apps Script 網址

4) 上線（任選）
A. GitHub Pages
- 建一個 repo，將這整包檔案上傳
- Settings → Pages → Deploy
B. Cloudflare Pages
- 新增專案，連 GitHub repo
C. 任何可放靜態檔案的空間

5) 會員使用
- 手機開網址 → 輸入 球隊密碼 + 姓名 → 進入
- 可「加入主畫面」像 App 一樣使用（PWA）

注意
- 因不採個別帳號登入，安全屬於“球隊內部門檻式”，建議球隊密碼定期更換。


月例賽龍虎榜（新增）
- 前端會呼叫：?action=monthly&team=球隊密碼&month=1..12
- 需試算表有分頁：1月榜單~12月榜單
