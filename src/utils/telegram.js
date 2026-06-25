import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "../config";

function esc(str) {
  return String(str).replace(/([_*[\]()~`>#+=|{}.!-])/g, "\\$1");
}

const ACTIVITY_MAP = {
  stories: "💬 Sharing stories & memories",
  games: "🎮 Games & fun challenges",
  crafts: "🎨 Creative crafts & art",
  music: "🎵 Music & dancing",
  food: "🍕 Food & feasting together",
};

export async function sendToTelegram(data) {
  const token = TELEGRAM_BOT_TOKEN;
  const chatId = TELEGRAM_CHAT_ID;

  if (!token || token.startsWith("YOUR_") || !chatId || chatId.startsWith("YOUR_")) {
    console.warn("⚠️ Telegram not configured. Fill in src/config.js to enable notifications.");
    return { skipped: true };
  }

  const msg = [
    "💛 *New Friendship Day 2026 Registration*",
    "",
    `👤 *Name:*     ${esc(data.name)}`,
    `📧 *Email:*    ${esc(data.email)}`,
    `📞 *Phone:*    ${esc(data.phone)}`,
    `📍 *City:*     ${esc(data.address)}`,
    `🎉 *Excited:*  ${ACTIVITY_MAP[data.focus] || esc(data.focus)}`,
    `🤝 *Friend:*   ${data.friend ? esc(data.friend) : "Coming solo"}`,
    `🕐 *Time:*     ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: "Markdown" }),
  });

  const json = await res.json();
  if (!json.ok) throw new Error(`Telegram error: ${json.description}`);
  return { ok: true };
}
