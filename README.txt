Happy Golf Team PWA UI v2.1.2-lite

前端修正：
- 個人頁參賽場數分母可讀取 API top-level: heldCount / eventCount / totalEvents / d1
- 個人頁哈哈獎可讀取 API top-level: hahaAward / haha，或 member["哈哈獎"]
- service-worker cache 版本更新為 golf-pwa-ui-v2-1-2-lite

重要：
請同步更新 Apps Script：
1. action=member 的回傳加：
   heldCount: sheet.getRange("D1").getDisplayValue()
   hahaAward: rowObj["哈哈獎"] || rowObj["哈哈"] || ""
2. 若 action=members 也要支援，可在回傳加 top-level heldCount。
