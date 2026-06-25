/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         WORKSHOP 2026 — TELEGRAM NOTIFICATION CONFIG        ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * HOW TO SET THIS UP (takes ~3 minutes):
 *
 * STEP 1 — Create your Telegram Bot:
 *   1. Open Telegram on your phone
 *   2. Search for @BotFather → tap Start
 *   3. Type:  /newbot
 *   4. Enter any name  →  e.g. "Workshop Alerts"
 *   5. Enter a username ending in 'bot'  →  e.g. "workshop2026_bot"
 *   6. Copy the Bot Token it gives you  (e.g. 7123456789:AAGx...)
 *   7. Paste it below as TELEGRAM_BOT_TOKEN
 *
 * STEP 2 — Get your Chat ID:
 *   1. In Telegram, search your new bot → tap Start  (IMPORTANT)
 *   2. Open this URL in a browser — replace YOUR_TOKEN with real token:
 *      https://api.telegram.org/botYOUR_TOKEN/getUpdates
 *   3. Find "from": { "id": 123456789 }  — that number is your Chat ID
 *   4. Paste it below as TELEGRAM_CHAT_ID
 */

var WORKSHOP_CONFIG = {
  TELEGRAM_BOT_TOKEN: "YOUR_BOT_TOKEN",  // e.g. "7123456789:AAGxxxxxxxxxxx"
  TELEGRAM_CHAT_ID:   "YOUR_CHAT_ID",    // e.g. "987654321"
};
