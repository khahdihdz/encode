const ALLOWED_ORIGIN = "https://khahdihdz.github.io";
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
const hits = new Map();

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}
function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors(origin) }
  });
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
}
function clip(value, max) {
  const text = String(value ?? "");
  return text.length > max ? text.slice(0, max) + "\n… [đã rút gọn]" : text;
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors(origin) });
    }
    if (origin !== ALLOWED_ORIGIN) return json({ error: "Origin không được phép." }, 403, origin);
    if (request.method !== "POST") return json({ error: "Method không được hỗ trợ." }, 405, origin);
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return json({ error: "Worker chưa được cấu hình Telegram." }, 503, origin);
    }
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    const entry = hits.get(ip);
    if (entry && now - entry.start < WINDOW_MS && entry.count >= MAX_REQUESTS) {
      return json({ error: "Vượt giới hạn gửi lịch sử. Thử lại sau." }, 429, origin);
    }
    if (!entry || now - entry.start >= WINDOW_MS) hits.set(ip, { start: now, count: 1 });
    else entry.count++;
    let data;
    try {
      const length = Number(request.headers.get("Content-Length") || 0);
      if (length > 24_000) return json({ error: "Dữ liệu quá lớn." }, 413, origin);
      data = await request.json();
    } catch {
      return json({ error: "JSON không hợp lệ." }, 400, origin);
    }
    const operation = data.operation === "DECODE" ? "DECODE" : data.operation === "ENCODE" ? "ENCODE" : "";
    const allowedFormats = new Set(["base64","base64url","url","html","unicode","hex","binary","decimal","rot13","caesar","morse","reverse","json","md5","sha1","sha256","sha512"]);
    if (!operation || !allowedFormats.has(data.format) || typeof data.input !== "string" || typeof data.output !== "string") {
      return json({ error: "Thiếu hoặc sai trường dữ liệu." }, 400, origin);
    }
    const input = clip(data.input, 1400);
    const output = clip(data.output, 1400);
    const time = new Date(data.timestamp || now).toISOString();
    const message = [
      "🧾 <b>ENCODE &amp; DECODE PRO</b>",
      "<b>Thao tác:</b> " + operation,
      "<b>Định dạng:</b> " + escapeHtml(data.format),
      "<b>Thời gian:</b> " + escapeHtml(time),
      "",
      "<b>INPUT</b>",
      "<pre>" + escapeHtml(input) + "</pre>",
      "<b>OUTPUT</b>",
      "<pre>" + escapeHtml(output) + "</pre>"
    ].join("\n");
    const telegram = await fetch("https://api.telegram.org/bot" + env.TELEGRAM_BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    });
    const result = await telegram.json().catch(() => ({}));
    if (!telegram.ok || !result.ok) return json({ error: "Telegram không nhận được tin nhắn." }, 502, origin);
    return json({ ok: true }, 200, origin);
  }
};
