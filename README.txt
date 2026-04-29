Happy Golf Team PWA UI v2.1.1-lite

修正項目：
- 個人頁「參賽場數」分母增加更多欄位與 API meta fallback
- 個人頁「哈哈獎」改為自動抓任何含「哈哈獎 / 哈哈」的欄位
- 財務報表固定第一欄（Column 1），並保留表頭固定
- service-worker cache 版本更新為 golf-pwa-ui-v2-1-1-lite

重要：
若 D1 舉辦場次仍未顯示，代表目前 Apps Script API 沒有把會員總表 D1 輸出給前端。
請依照聊天中的 Apps Script 小補丁加入 heldCount/eventCount 欄位。
